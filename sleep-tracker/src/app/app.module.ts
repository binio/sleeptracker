import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import {AppRoutingModule} from './app-routing.module';
import { TrackComponent } from './track/track.component';
import { ViewRecordComponent } from './view-record/view-record.component';
import { AboutComponent } from './about/about.component';
import { TrackFormComponent } from './track/track-form/track-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SleepDataService} from './sleep-data.service';
import {HttpClientModule} from '@angular/common/http';
import {WebDataService} from './web-data.service';
import { ChartComponent } from './view-record/chart/chart.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TrackComponent,
    ViewRecordComponent,
    AboutComponent,
    TrackFormComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    })
  ],
  providers: [SleepDataService, WebDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
