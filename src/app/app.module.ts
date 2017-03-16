import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { AppComponent } from './app.component';
// import {LineChartViewComponent}         from './components/line-chart-view/line-chart-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
// import {ActivityDetailComponent}     from './components/activity-detail/activity-detail.component';
// import {RecordsViewComponent} from "./components/records-view/records-view.component";
// import {StatisticsViewComponent} from "./components/statistics-view/statistics-view.component";
import {CalendarViewComponent} from "./components/calendar-view/calendar-view.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: ListViewComponent},
      {path: 'activityList', component: ListViewComponent},
      // {path: 'activityDetail/:id',  component: ActivityDetailComponent},
      // {path: 'lineChart/:id',  component: LineChartViewComponent},
      {path: 'calendar',  component: CalendarViewComponent}
      // {path: 'records',  component: RecordsViewComponent},
      // {path: 'statistics',  component: StatisticsViewComponent}
    ])
  ],
  declarations: [
    AppComponent,
    ListViewComponent,
    CalendarViewComponent
    // HeroesComponent
  ],
  providers: [
    // HeroService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
