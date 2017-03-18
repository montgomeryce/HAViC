import { Component, OnInit } from '@angular/core';
import {ActivityService}         from '../../services/activity.service';
import {Activity} from "../../models/activity";

@Component({
  selector: 'app-records-view',
  templateUrl: './records-view.component.html',
  styleUrls: ['./records-view.component.css']
})
export class RecordsViewComponent implements OnInit {
    calBurnActs:Activity[];
    longestActs:Activity[];

    constructor(private activityService:ActivityService) {

    }

    getData() {
        this.activityService.getActivities('totalCalories','desc',6).then(
            data => this.calBurnActs = data
        );
        this.activityService.getActivities('totalDistance','desc',6).then(
            data => this.longestActs = data
        );
    }

    ngOnInit() {
        this.getData();
    }
}