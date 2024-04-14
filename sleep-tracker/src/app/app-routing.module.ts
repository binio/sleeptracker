import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrackComponent} from './track/track.component';
import {ViewRecordComponent} from './view-record/view-record.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {path: '', redirectTo: '/view', pathMatch: 'full'},
  {path: 'track', component: TrackComponent},
  {path: 'view', component: ViewRecordComponent },
  {path: 'about', component: AboutComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
