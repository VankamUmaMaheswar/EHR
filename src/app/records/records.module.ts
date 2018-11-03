import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsListComponent } from './records-list/records-list.component';

@NgModule({
  imports: [
    CommonModule,
    RecordsRoutingModule
  ],
  declarations: [RecordsListComponent]
})
export class RecordsModule { }
