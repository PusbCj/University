import { Component, OnInit } from '@angular/core';
import {Faculty} from "../models/faculty";
import * as Survey from "survey-angular";

@Component({
  selector: 'app-summary',
  template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
  </div>`,
})
export class SummaryComponent implements OnInit {
  listFaculty:Array<Faculty>;

  constructor() {
    this.listFaculty = new Array<Faculty>();
    this.listFaculty = JSON.parse(localStorage.getItem("data")!);
    console.log(this.listFaculty);
    //localStorage.clear();
  }

  ngOnInit(): void {
    Survey
      .StylesManager
      .applyTheme("modern");
    let a = JSON.stringify(6);
    console.log(a);
    var json = { locale: "pl",
     questions: [
        {
          type: "html",
          name: "info",
          html: ""
        },

      ]
    };
    let survey = new Survey.Model(json);

    var q = survey.getQuestionByName('info');
    q['html'] = "<table><tr style='padding:20px'><td><h1>+" + {a} +"+</h1>ssssst, <b>text</b> or </td><td>test <b>text</b> or </td><td>test, <b>text</b> or </td></tr>" +
      "<tr style='padding:20px'><td>test, <b>text</b> or </td></tr></table>";



    Survey.SurveyNG.render("surveyElement", { model: survey });
  }


}
