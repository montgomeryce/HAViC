import { Component,EventEmitter,Output, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-lc-menu',
  templateUrl: './lc-menu.component.html',
  styleUrls: ['./lc-menu.component.css']
})
export class LcMenuComponent implements OnInit {
    @Output() configChange = new EventEmitter<string[]>();
    @Output() interpolationChange = new EventEmitter<string>();

    private d3interpolation = 'basis';//basis implements beta spline (smoothens )
    private items: string[] = ['HeartRate', 'Speed','Temperature', 'Altitude'];
    private interpolationValues = [
        {value: 'linear'},
        {value: 'basis'},
        {value: 'natural'}
    ];
    // private interpolationValues = [
    //     {value: 'linear'},{value: d3.curveLinear},
    //     {value: 'basis'},{value: d3.curveBasis},
    //     {value: 'basis-open'},{value: d3.curveBasisClosed},
    //     {value: 'cardinal'},{value: d3.curveCardinalOpen},
    //     {value: 'natural'},{value: d3.curveNatural}
    // ];

    // private interpolationValues = [
    //     {name:'linear',value: d3.curveLinear},
    //     {name: 'basis',value: d3.curveBasis},
    //     {name: 'cardinal',value: d3.curveCardinalOpen},
    //     {name: 'natural',value: d3.curveNatural}
    //
    //     // {value: 'linear'},{value: 'step-before'},
    //     // {value: 'step-after'},{value: 'basis'},
    //     // {value: 'basis-open'},{value: 'basis-closed'},
    //     // {value: 'cardinal'},{value: 'cardinal-open'},
    //     // {value: 'cardinal-closed'},{value: 'monotone'}

  constructor() { }

  ngOnInit() {
  }
  toggleSpeed(){
    this.toggle("Speed");
  }
  toggleHeartRate(){
    this.toggle("HeartRate");
  }
  toggleTemperature(){
    this.toggle("Temperature");
  }
  toggleAltitude(){
    this.toggle("Altitude");
  }
  toggle(param){
    var index = this.items.indexOf(param, 0);
    if (index > -1) {
      this.items.splice(index, 1);
    }else{
      this.items.push(param);
    }

    this.configChange.emit(this.items);
    console.log('should be emitting here');
    console.log(this.items);
  }

  changeInterpolation(value){
  console.log('changing interpolation of d3 chart (child)' ,value);
  this.interpolationChange.emit(value);
  }
}
