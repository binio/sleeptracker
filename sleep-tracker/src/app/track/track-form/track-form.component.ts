import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {SleepDataService} from '../../sleep-data.service';
import {SleepRecord} from '../../sleep-record.model';
import {WebDataService} from '../../web-data.service';


@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.css'
})
export class TrackFormComponent {

  constructor(private sleepDataService: SleepDataService,
              private webDataService: WebDataService) {
  }

  onSubmit(form: NgForm): void {
    const  record:SleepRecord  = new SleepRecord(
      form.value.userName,
      form.value.sex,
      form.value.sleepAmount,
      this.getCurrentDate()
      );
    this.sleepDataService.addRecord(record);
    this.webDataService.storeSleepData(this.sleepDataService.sleepData.slice())
    //console.log(this.sleepDataService.getAll());
    //console.log(form);
  }

  onCancel(): void {}

  getCurrentDate(){
    const currentDate = new Date();

    // Extract year, month, and day
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month index
    const day = ('0' + currentDate.getDate()).slice(-2);

    // Assemble the date string in yyyy-mm-dd format
    const formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
  }

}
