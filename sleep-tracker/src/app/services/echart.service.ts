import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import { of } from 'rxjs';
import {BasicChartModel} from './echart.model';
import {SleepRecord} from '../sleep-record.model';

@Injectable({
  providedIn: 'root'
})
export class EchartService {

  chartData = []
  chartDataChanged = new Subject<BasicChartModel[]>();

  constructor() { }

  getData(data):Observable<BasicChartModel[]> {
    this.chartData = data;
    this.chartDataChanged.next(this.chartData.slice());
    return of(this.chartData)
  }
}
