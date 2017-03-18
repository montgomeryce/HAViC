import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<div><i class="fa fa-spinner fa-pulse"></i></div>',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
