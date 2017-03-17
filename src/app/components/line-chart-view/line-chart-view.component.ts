import { Component, OnInit, OnDestroy  } from '@angular/core';
import { LineChartComponent }         from '../line-chart/line-chart.component';
import { LineChartConfig }   from '../line-chart/line-chart-config';
import {ActivityService} from "../../services/activity.service";
import {ActivatedRoute} from "@angular/router";
import {ActivityHeaderComponent} from "../activity-header/activity-header.component";
import {ActivityData} from "../../models/activity-data";
import {Activity} from "../../models/activity";
import {LcMenuComponent} from "../lc-menu/lc-menu.component";

@Component({
  selector: 'app-line-chart-view',
  templateUrl: './line-chart-view.component.html',
  styleUrls: ['./line-chart-view.component.css'],
  providers: [ActivityService]//,
  // directives: [LineChartComponent, ActivityHeaderComponent,LcMenuComponent]
})
export class LineChartViewComponent implements OnInit, OnDestroy  {
    private activity:Activity;
    private activityData:ActivityData[];
    private tdLineChartConfig: Array<LineChartConfig>;
    private d3interpolation = 'basis';//basis implements beta spline (smoothens )
    private sub: any;
    private items: string[] = ['HeartRate', 'Speed','Temperature', 'Altitude'];

    constructor(private activityService: ActivityService, private route: ActivatedRoute) {

    }
   configChange(items: string[]) {
        console.log('configChange', items);
        this.items = items;
        this.ngOnInit();
    }

    interpolationChange(interpolation: string){
        console.log('changing interpolation of d3 chart (Parent)', interpolation);
        this.d3interpolation = interpolation;
        this.ngOnInit();
    }

  ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number

            this.activityService.getActivity(id).then(
                data => {
                    this.activity = data;
                    // for now..
                    //this.activityData = this.activity.data;
               })
            this.activityService.getActivityData(id).then(
                data => {
                    this.activityData = data;

                this.tdLineChartConfig = new Array<LineChartConfig>();


              /*  if(this.items.length<1) {
                    let empty = new LineChartConfig('',this.d3interpolation);
                    this.tdLineChartConfig.push(empty);
                }else {*/

                if (this.items.indexOf("Speed") > -1) {
                    let speed = new LineChartConfig('Speed','', 'orange',this.d3interpolation,'Line');

                    speed.dataset = this.activityData.map(data => {
                        return {x: data.number, y: data.speed};
                    });
                    this.tdLineChartConfig.push(speed);
                }
                if (this.items.indexOf("HeartRate") > -1) {
                    let hr = new LineChartConfig('HeartRate','', 'red',this.d3interpolation,'Line');

                    hr.dataset = this.activityData.map(data => {
                        return {x: data.number, y: data.heartRate};
                    });
                    this.tdLineChartConfig.push(hr);
                }
                if (this.items.indexOf("Temperature") > -1) {
                    let temp = new LineChartConfig('Temperature','', 'green',this.d3interpolation,'Line');

                    temp.dataset = this.activityData.map(data => {
                        return {x: data.number, y: data.temperature};
                    });
                    this.tdLineChartConfig.push(temp);
                }
                if (this.items.indexOf("Altitude") > -1) {
                    let altitude = new LineChartConfig('Altitude','rgba(1, 67, 163, .1)', 'blue',this.d3interpolation,'Area');

                    altitude.dataset = this.activityData.map(data => {
                        return {x: data.number, y: data.altitude*.10};
                    });
                    this.tdLineChartConfig.push(altitude);
                }

            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
