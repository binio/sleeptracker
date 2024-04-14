import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SleepRecord} from './sleep-record.model';
import {SleepDataService} from './sleep-data.service';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebDataService {

  private firebaseUrl = 'https://biniodata.firebaseio.com/sleepdata.json';

  constructor(private http: HttpClient, private sleepDataService: SleepDataService) { }

  storeSleepData(sleepRecords: SleepRecord[]) {
    this.http.put(this.firebaseUrl, sleepRecords).subscribe();
  }

  getAllSleepRecords() {
    return this.http.get<SleepRecord[]>(this.firebaseUrl);
  }

  onFetchSleepRecords() {
    // const postArray: Recipe[] = [];
    return this.http.get<SleepRecord[]>(this.firebaseUrl).pipe(
      tap(records => this.sleepDataService.addRecords(records)));
  }


}
