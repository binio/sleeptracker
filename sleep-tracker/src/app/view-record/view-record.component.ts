import {Component, OnInit, ViewChild} from '@angular/core';
import {SleepDataService} from '../sleep-data.service';
import {WebDataService} from '../web-data.service';
import {EChartsOption} from 'echarts';
import {BasicChartModel} from '../services/echart.model';
import {ChartComponent} from './chart/chart.component';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrl: './view-record.component.css'
})
export class ViewRecordComponent implements OnInit{
  @ViewChild(ChartComponent) child:ChartComponent;
  chartData:BasicChartModel[];
  chartOption: EChartsOption;
  userName: string = '';

  constructor(
    private webDataService: WebDataService,
    private sleepDataService: SleepDataService,
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
    this.chartData = this.mergeAndSumData(userRecords);
    this.child.initChart(this.chartData);
    return this.chartData;
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
