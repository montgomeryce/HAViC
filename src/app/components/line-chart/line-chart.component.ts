import {Component, Input, ElementRef} from '@angular/core';
import {LineChartConfig} from './line-chart-config';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  template: '<ng-content></ng-content>',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  @Input() config: Array<LineChartConfig>;

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private xScale;
  private yScale;
  private xAxis;
  private yAxis;
  private htmlElement: HTMLElement;
  /**
   * We request angular for the element reference
   * and then we create a d3 Wrapper for our host element
   **/
  constructor(private element: ElementRef) {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.element.nativeElement);
  }
  /**
   * Every time the @Input is updated, we rebuild the chart
   **/
  ngOnChanges(): void {
    if (!this.config || this.config.length === 0) return;
    this.setup();
    this.buildSVG();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
  }
  /**
   * Basically we get the dom element size and build the container configs
   * also we create the xScale and yScale ranges depending on calculations
   **/
  private setup(): void {
    //this.margin = { top: 20, right: 40, bottom: 10, left: 80 };
    this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    //this.width = this.width * 0.8;
    this.height = this.width * 0.3 - this.margin.top - this.margin.bottom;
    /*this.xScale = d3.time.scale().range([0, this.width]);*/
    this.xScale = d3.scaleLinear().range([0, this.width]);
    this.yScale = d3.scaleLinear().range([this.height, 0]);
  }
  /**
   * We can now build our SVG element using the configurations we created
   **/
  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  /**
   * Method to create the X Axis, will use Month as tick date format
   * Also passing some classes for CSS Styling
   **/
  private drawXAxis(): void {
    this.xAxis = d3.axisBottom(this.xScale)
        //.tickFormat(t => Moment(t).format('MMM').toUpperCase())
        /*.tickFormat(t => t)*/
        .tickSize(-this.height)
        .tickPadding(15);
    this.svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(this.xAxis);
  }

  /**
   * Method to create the Y Axis, will use numeric values as tick date format
   * Also passing some classes for CSS Styling and rotating the axis vertically
   **/
  private drawYAxis(): void {
    this.yAxis = d3.axisLeft(this.yScale)
        .tickPadding(10);
    this.svg.append('g')
        .attr('class', 'y axis')
        .call(this.yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)');
  }
  /**
   * Will return the maximum value in any dataset inserted, so we use
   * it later for the maximum number in the Y Axis
   **/
  private getMaxY(): number {
    let maxValuesOfLines = [];
    this.config.forEach(data => maxValuesOfLines.push(Math.max.apply(Math, data.dataset.map(d => d.y))));
    return Math.max(...maxValuesOfLines);
  }
  /**
   * Now we populate using our dataset, mapping the x and y values
   * into the x and y domains, also we set the interpolation so we decide
   * how the Line Chart is plotted.
   **/
  private populate(): void {
    this.config.forEach((line: any) => {
      this.xScale.domain(d3.extent(line.dataset, (d: any) => d.x));
      this.yScale.domain([0, this.getMaxY()]);
      if(line.settings.style=='Area') {
          this.svg.append('path')
              .datum(line.dataset)
              .attr('class', 'line')
              .style('fill', line.settings.fill)
              .style('stroke', line.settings.color)
              .attr('d', d3.area()
                  .x((d:any) => this.xScale(d.x))
                  .y0(this.height)
                  .y1((d:any) => this.yScale(d.y))
                  //.curve(line.settings.interpolation));
                  .curve(d3.curveBasisOpen));
      }else{
          this.svg.append('path')
              .datum(line.dataset)
              .attr('class', 'line')
              .style('fill', line.settings.fill)
              .style('stroke', line.settings.color)
              .attr('d', d3.line()
                  .x((d:any) => this.xScale(d.x))
                  .y((d: any) => this.yScale(d.y))
                  //.curve(line.settings.interpolation));
                  .curve(d3.curveBasisOpen));
      }
    });
  }
}
