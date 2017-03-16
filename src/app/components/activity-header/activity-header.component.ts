import { Component, OnInit, Input } from '@angular/core';
import {Activity} from "../../models/activity";

@Component({
  selector: 'app-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.css']
})
export class ActivityHeaderComponent implements OnInit {
  error:any;
  @Input() activity: Activity;
  constructor() { }

  ngOnInit() {
  }

}
