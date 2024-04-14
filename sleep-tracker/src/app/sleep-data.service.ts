import { Injectable } from '@angular/core';
import {SleepRecord} from './sleep-record.model';
import {Subject} from "rxjs";
import {WebDataService} from './web-data.service';

@Injectable({
  providedIn: 'root'
})
export class SleepDataService {

  sleepData: SleepRecord[] = [];
  sleepChanged = new Subject<SleepRecord[]>();

  constructor() { }

  getRecord(id: number) {
    return this.sleepData[id];
  }
  addRecord(record: SleepRecord){
    this.sleepData.push(record);
    this.sleepChanged.next(this.sleepData.slice());
  }

  addRecords(records: SleepRecord[]) {
    this.sleepData = records;
  }

  getAll(){
    return this.sleepData.slice();
  }
}
