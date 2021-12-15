import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { AppRoutingModule } from './app-routing.module';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { QuestionComponent } from './question/question.component';
import { FacultyComponent } from './faculty/faculty.component';
import { SubjectComponent } from './subject/subject.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    BackofficeComponent,
    QuestionComponent,
    FacultyComponent,
    SubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
