import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import {AppRoutingModule} from './app-routing.module';
import { TrackComponent } from './track/track.component';
import { ViewRecordComponent } from './view-record/view-record.component';
import { AboutComponent } from './about/about.component';
import { TrackFormComponent } from './track/track-form/track-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TrackComponent,
    ViewRecordComponent,
    AboutComponent,
    TrackFormComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
