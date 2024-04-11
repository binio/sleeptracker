import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.css'
})
export class TrackFormComponent {

  onSubmit(form: NgForm): void {
    console.log(form);
  }

  onCancel(): void {}

}
