import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as Survey from "node_modules/survey-angular";
import "node_modules/survey-angular/modern.css";
import {Question} from "../models/question";
import {RestApiControllerService} from "../restServices/restApiController.service";
import {SurveyjsQuestions} from "../models/surveyjsQuestions";


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

  constructor(private restApiController: RestApiControllerService) {this.listQuestion = new Array<Question>();}

  ngOnInit() {
    this.restApiController.getQuestion().subscribe(res=>{
      this.listQuestion = res;
      let surveyjsQuestion: Array<SurveyjsQuestions> = new Array<SurveyjsQuestions>(this.listQuestion.length);
      console.log(this.listQuestion);

      for (let i = 0; i < this.listQuestion.length; i++) {
        surveyjsQuestion[i] = {
          type: "rating",
          name: this.GetName(this.listQuestion[0],0),
          title: this.listQuestion[0].content,
          isRequired: true
        }
      }

      const json = { locale: "pl",

        pages: [
          {questions: surveyjsQuestion},

        ]
      };
      const survey = new Survey.Model(json);
      survey.showNavigationButtons = true;

      survey.onComplete.add(function (sender) {
        var mySurvey = sender;
        var surveyData = sender.data;
        console.log(surveyData);
      });

      Survey.SurveyNG.render("surveyElement", { model: survey });

    });


  }

  GetName(question: Question, id: number): string{
    return <string>question.subject?.name;
  }


}
