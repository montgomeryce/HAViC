import {Component, OnInit} from '@angular/core';
import {ActivityService}         from '../../services/activity.service';
import {Activity} from "../../models/activity";
import {Router} from "@angular/router";
// import {MetersToMilesPipe} from "../../pipes/meters-to-miles.pipe";
import {Page} from "./page";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
      // pipes: [MetersToMilesPipe]
})
export class ListViewComponent implements OnInit {
    error:any;
    activities:Activity[];
    pageSize = 10;
    page: Page;
    constructor(
        private activityService:ActivityService,
        private router: Router
      ) {

    }

    getListData(pageSize:number, page:number) {
        console.log('********* getListData **********');
        this.activityService.getActivities('date','desc',pageSize,page).then(
            data => {
                this.activities = data._embedded.activities;
                this.page = data.page;
            }
        );
    }

    ngOnInit() {
        this.getListData(this.pageSize,0);
    }
    
    nextPage(page:number){
        this.getListData(this.pageSize,page+1);
    }
    prevPage(page:number){
        this.getListData(this.pageSize,page-1);
    }

    onSelect(id: number) {
        console.log('onSelect', id);
        this.router.navigate(['/activityDetail',id]);
    }
    onSelectLine(id: number) {
        console.log('onSelectLine',id);
        this.router.navigate(['/lineChart', id]);
    }
}
