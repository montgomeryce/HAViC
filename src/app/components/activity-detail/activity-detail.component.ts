// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, OnDestroy} from '@angular/core';
import {Activity}                from '../../models/activity';
import {ActivityService}         from '../../services/activity.service';
// import {CelsiusToFahrenheitPipe} from '../../pipes/celsius-to-fahrenheit.pipe';
import {ActivityData} from "../../models/activity-data";
import {ActivatedRoute} from "@angular/router";
// import {SecondsToMinutesPipe} from "../../pipes/seconds-to-minutes.pipe";
// import {MetersToFeetPipe} from "../../pipes/meters-to-feet.pipe";
// import {MetersToMilesPipe} from "../../pipes/meters-to-miles.pipe";
import {ActivityHeaderComponent} from "../activity-header/activity-header.component";

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  // pipes: [CelsiusToFahrenheitPipe,SecondsToMinutesPipe, MetersToFeetPipe, MetersToMilesPipe],
  styleUrls: ['./activity-detail.component.css']//,
  // directives: [ActivityHeaderComponent]
})
export class ActivityDetailComponent implements OnInit {
  private activity:Activity;
  private activityData:ActivityData[];
  private sub: any;

  constructor(
    private activityService:ActivityService,
    private route: ActivatedRoute
  ) {
      console.log('ActivityDetailComponent');
  }

  ngOnInit() {
    console.log('ActivityDetailComponent: onInit');
    this.sub = this.route.params.subscribe(params => {
        let id = +params['id']; // (+) converts string 'id' to a number

        this.activityService.getActivity(id).then(data => {
            console.log('activity', data);
            this.activity = data;
            //this.activityData = this.activity.data;
        });

        //look into just calling http://localhost:8080/activity/{{id}} as this will return both parent and child data in one call.
        this.activityService.getActivityData(id).then(data => {
            console.log('activityData', data);
            this.activityData = data;
        });
    });
  }
  ngOnDestroy() {
      this.sub.unsubscribe();
  }

}
