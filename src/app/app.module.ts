import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { AppComponent } from './app.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import {CalendarViewComponent} from "./components/calendar-view/calendar-view.component";
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { ActivityHeaderComponent } from './components/activity-header/activity-header.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LineChartViewComponent } from './components/line-chart-view/line-chart-view.component';
import { RecordsViewComponent } from './components/records-view/records-view.component';
import { StatisticsViewComponent } from './components/statistics-view/statistics-view.component';
import {ActivityService} from './services/activity.service';
import { MetersToMilesPipe } from './pipes/meters-to-miles.pipe';
import { SecondsToMinutesPipe } from './pipes/seconds-to-minutes.pipe';
import { MetersToFeetPipe } from './pipes/meters-to-feet.pipe';
import { LcMenuComponent } from './components/lc-menu/lc-menu.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: ListViewComponent},
      {path: 'activityList', component: ListViewComponent},
      {path: 'activityDetail/:id',  component: ActivityDetailComponent},
      {path: 'lineChart/:id',  component: LineChartViewComponent},
      {path: 'calendar',  component: CalendarViewComponent},
      {path: 'records',  component: RecordsViewComponent},
      {path: 'statistics',  component: StatisticsViewComponent}
    ])
  ],
  declarations: [
    AppComponent,
    ListViewComponent,
    CalendarViewComponent,
    ActivityDetailComponent,
    ActivityHeaderComponent,
    BarChartComponent,
    LineChartComponent,
    LineChartViewComponent,
    RecordsViewComponent,
    StatisticsViewComponent,
    MetersToMilesPipe,
    SecondsToMinutesPipe,
    MetersToFeetPipe,
    LcMenuComponent,
    LoadingComponent
  ],
  providers: [
    ActivityService

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
