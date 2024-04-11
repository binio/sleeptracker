import {Component, OnInit} from '@angular/core';
import {SleepDataService} from '../sleep-data.service';
import {SleepRecord} from '../sleep-record.model';
import {WebDataService} from '../web-data.service';
import {from } from 'rxjs';
import{ map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrl: './view-record.component.css'
})
export class ViewRecordComponent implements OnInit{

  records: SleepRecord[];

  constructor(private webDataService: WebDataService, private sleepDataService: SleepDataService)  {
  }
  ngOnInit(): void {
    this.webDataService.onFetchSleepRecords().subscribe(
      a => console.log(a)
    );
    this.getDistinctValues();

  }

  getRecords() {
    return this.sleepDataService.getAll();
  }

//   getDistinctNames(){
//     // Create an observable from the JSON data
//     const jsonDataObservable = from(this.getRecords());
//
// // Use RxJS operators to extract unique names and sexes
//     jsonDataObservable.pipe(
//       map(item => ({ name: item.name, sex: item.sex })),
//       distinctUntilChanged((prev, curr) => prev.name === curr.name && prev.sex === curr.sex)
//     )
//       .subscribe(uniqueNameSexPair => {
//         console.log(uniqueNameSexPair);
//       });
//   }

  getDistinctValues() {
    const uniqueNames = [];
    const seenNames = new Set();
    const records = this.getRecords();
    records.forEach(item => {
      const { name, sex} = item;
      const nameSexPair = `${name}-${sex}`; // Combine name and sex to form a unique identifier
      if (!seenNames.has(nameSexPair)) {
        uniqueNames.push({ name, sex,  'recordNumber': 1});
        seenNames.add(nameSexPair);
      } else {
        this.updateField(uniqueNames, 'recordNumber', name)
      }
    });
    //console.log(uniqueNames);
    return uniqueNames;
  }

  updateField(jsonData, fieldName, nameToUpdate) {
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].name === nameToUpdate) {
        jsonData[i][fieldName] = jsonData[i][fieldName] + 1;
      }
    }
    return jsonData;
  }

}
