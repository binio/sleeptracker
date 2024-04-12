import {Component, OnInit} from '@angular/core';
import {SleepDataService} from '../sleep-data.service';
import {SleepRecord} from '../sleep-record.model';
import {WebDataService} from '../web-data.service';
import {from, Subscription} from 'rxjs';
import {EchartService} from '../services/echart.service';
import {EChartsOption} from 'echarts';
import {BasicChartModel} from '../services/echart.model';
import {Data} from './data.modeel';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrl: './view-record.component.css'
})
export class ViewRecordComponent implements OnInit{

  subscription: Subscription;
  chartOption: EChartsOption;
  records: SleepRecord[];
  userName: string = '';

  constructor(
    private webDataService: WebDataService,
    private sleepDataService: SleepDataService,
    private echartService: EchartService
  )  {
    this.chartOption  = {
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          rotate: 30
        },
        data: ['11-04-2024', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },

      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [1320, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar',
        },
      ],
    };
  }
  ngOnInit(): void {
    this.webDataService.onFetchSleepRecords().subscribe(
      a => console.log(a)
    );
    this.getDistinctValues();
    this.subscription = this.echartService.getData([]).subscribe(
      data => {
        //console.log(data);
        this.initChart(data);}
    );

  }

  getRecords() {
    return this.sleepDataService.getAll();
  }

  getDataForName(userName: String): BasicChartModel[] {
    const seenDates = new Set();
    const records = this.getRecords();
    const userRecords = [];
    const foldedUserRecords = [];
    records.forEach(item => {
      if(item.name === userName){
        const { date, amount,} = item;
        userRecords.push({name:date, value:amount});
      }
    });
    return this.mergeAndSumData(userRecords);
  }


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
        this.updateField(uniqueNames, 'recordNumber', name, 1)
      }
    });
    //console.log(uniqueNames);
    return uniqueNames;
  }

  updateField(jsonData, fieldName, nameToUpdate, value) {
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].name === nameToUpdate) {
        jsonData[i][fieldName] = jsonData[i][fieldName] + value;
      }
    }
    return jsonData;
  }

  changeData(name: string,) {
    const dataNew = this.getDataForName(name);
    this.userName = name;
    this.subscription = this.echartService.getData(dataNew).subscribe(
      data => {
        //console.log(data);
        this.initChart(data);}
    );
  }
  initChart(chartData: BasicChartModel[]){
    this.chartOption = {
      tooltip: {
        show: true
      },
      xAxis: {
        type: 'category',
        data: chartData.map(m => ({
          value: m.name}))
      },
      yAxis: {
        type: 'value'
      },
      series:[{
        type: 'bar',
        data: chartData.map(m => ({
          value: m.value}))
      }]
    }
  }


 mergeAndSumData(data: BasicChartModel[]): BasicChartModel[] {
   const mergedData: { [name: string]: number } = {};

   // Merge data with the same name and sum amounts
   for (const item of data) {
     if (mergedData[item.name]) {
       mergedData[item.name] += item.value;
     } else {
       mergedData[item.name] = item.value;
     }
   }

   // Convert merged data back to array of objects
   const mergedArray: BasicChartModel[] = [];
   for (const name in mergedData) {
     mergedArray.push({value: mergedData[name], name});
   }

   return mergedArray;
 }
}
