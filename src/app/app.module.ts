import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DataService } from './data.service';
import { RecordsModule } from './records/records.module';
import { RecordsListComponent } from './records/records-list/records-list.component';
import { ProfessionalComponent } from './professional/professional.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'records', component: RecordsListComponent},
  { path: '**', component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RecordsListComponent,
    ProfessionalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true }),
    PdfViewerModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
