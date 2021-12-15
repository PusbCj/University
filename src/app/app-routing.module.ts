import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BackofficeComponent} from "./backoffice/backoffice.component";
import {SurveyComponent} from "./survey/survey.component";
import {FacultyComponent} from "./faculty/faculty.component";
import {QuestionComponent} from "./question/question.component";
import {SubjectComponent} from "./subject/subject.component";


const routes: Routes = [
  {path: 'backoffice', component: BackofficeComponent},
  {path: '', component: SurveyComponent},
  {path: 'faculty', component: FacultyComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'subject', component: SubjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
