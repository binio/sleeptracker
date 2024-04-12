import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { of } from 'rxjs';
import {BasicChartModel} from './echart.model';

@Injectable({
  providedIn: 'root'
})
export class EchartService {

  chartData = []

  constructor() { }

  getData(data):Observable<BasicChartModel[]> {
    this.chartData = data;
    return of(data)
  }
}
