import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {routing} from './dashboard.routing';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    routing,
  ]
})
export class DashboardModule {
}
