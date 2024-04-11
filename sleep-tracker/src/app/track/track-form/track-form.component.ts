import { Component } from '@angular/core';
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
      Date.now()
      );
    this.sleepDataService.addRecord(record);
    this.webDataService.storeSleepData(this.sleepDataService.sleepData.slice())
    console.log(this.sleepDataService.getAll());
    console.log(form);
  }

  onCancel(): void {}

}
