import {Component, OnInit} from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import {EchartService} from '../../services/echart.service';
import {Subscription} from 'rxjs';
import {BasicChartModel} from '../../services/echart.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit{

  subscription: Subscription;
  chartOption: EChartsOption;
  constructor(private echartService: EchartService) {

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


  changeChart() {
    const dataNew = [
      {"name":"Mon","value":5},
      {"name":"Tue","value":5},
      {"name":"Wed","value":6},
      {"name":"Thu","value":7},
      {"name":"Fri","value":8},
      {"name":"Sat","value":15},
      {"name":"Sun","value":9}
    ];
    this.subscription = this.echartService.getData(dataNew).subscribe(
      data => {
        //console.log(data);
        this.initChart(data);}
    );
  }
  changeChartB() {
    const dataNew = [
      {"name":"Mon","value":1},
      {"name":"Tue","value":5},
      {"name":"Wed","value":1},
      {"name":"Thu","value":7},
      {"name":"Fri","value":1},
      {"name":"Sat","value":15},
      {"name":"Sun","value":1}
    ];
    this.subscription = this.echartService.getData(dataNew).subscribe(
      data => {
        //console.log(data);
        this.initChart(data);}
    );
  }

  ngOnInit(): void {
    this.subscription = this.echartService.getData([]).subscribe(
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
}
