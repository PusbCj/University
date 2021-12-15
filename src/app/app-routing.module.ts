import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BackofficeComponent} from "./backoffice/backoffice.component";
import {SurveyComponent} from "./survey/survey.component";


const routes: Routes = [
  {path: 'backoffice', component: BackofficeComponent},
  {path: '', component: SurveyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
