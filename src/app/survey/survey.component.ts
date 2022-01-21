import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as Survey from "node_modules/survey-angular";
import "node_modules/survey-angular/modern.css";
import {Question} from "../models/question";
import {RestApiControllerService} from "../restServices/restApiController.service";
import {SurveyjsQuestions} from "../models/surveyjsQuestions";
import {Faculty} from "../models/faculty";
import {Parameters} from "../models/parameters";
import {Router} from "@angular/router";


Survey.StylesManager.applyTheme("modern");
@Component({
  // tslint:disable-next-line:component-selector
  selector: "survey",
  template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
  </div>`
})
export class SurveyComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input()
  result: any;
  listQuestion: Array<Question>;
  listAnswer: Array<Parameters>
  listFaculty:Array<Faculty>;


  constructor(private restApiController: RestApiControllerService, private router: Router,)
                                                    {this.listQuestion = new Array<Question>();
                                                    this.listFaculty = new Array<Faculty>();
                                                    this.listAnswer = new Array<Parameters>();}

  ngOnInit() {
    this.restApiController.getQuestion().subscribe(res=>{
      this.listQuestion = res;
      let surveyjsQuestion: Array<SurveyjsQuestions> = new Array<SurveyjsQuestions>(this.listQuestion.length);

      //pętla wypełniająca dane do jsona konfiguracyjnego na podstawie pobranych z serwera pytań
      for (let i = 0; i < this.listQuestion.length; i++) {
        surveyjsQuestion[i] = {
          type: "rating",
          name: this.GetName(this.listQuestion[i]),
          title: this.GetName(this.listQuestion[i]),
          isRequired: true,
          minRateDescription: "nie lubie",
          maxRateDescription: "bardzo lubie"
        }
      }

      //tworzenie jsona konfiguracyjnego do surveyjs
      const json = { locale: "pl",

        pages: [{
        "title": "W skali od 1 do 5 jak badzo lubisz dany przedmiot",
        questions: surveyjsQuestion
        }]
      };

      const survey = new Survey.Model(json);
      survey.showNavigationButtons = true;
      survey.showCompletedPage=false;

      //wysyłanie danych na serwer po wciśnięciu przycisku
      survey.onComplete.add(survey => {
        for (let i = 0; i < this.listQuestion.length; i++) {
          this.listAnswer[i] = {
            subject: this.GetName(this.listQuestion[i]),
            mark: survey.getValue(this.GetName(this.listQuestion[i])),
          }
        }
        //console.log(this.listAnswer);
        this.restApiController.getList(this.listAnswer).subscribe(res =>{
          //console.log(res);
          localStorage.setItem("data", JSON.stringify(res));
          this.router.navigate(['summary'])
        });

      });


      Survey.SurveyNG.render("surveyElement", { model: survey });

    });


  }

  //funkcja pobierająca nazwe z podmacierzy
  GetName(question: Question,): string{
    return <string>question.subject?.name;
  }
}
