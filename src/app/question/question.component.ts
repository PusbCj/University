import { Component, OnInit } from '@angular/core';

import {ModelControllerService} from "../restServices/modelController.service";
import {Question} from "../models/question";
import {Subject} from "../models/subject";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  createdQuestion = new Question();

  result: Array<Question> = new Array<Question>();
  subjects: Array<Subject> = new Array<Subject>();
  createFlag = false;
  buttonLabel = "Nowy";
  editId = -1;
  editQuestion = new Question();
  editSel = 0;
  createSel = 0;


  constructor(private modelControllerService: ModelControllerService) {
    this.createdQuestion.subject = new Subject();
  }

  ngOnInit(): void {
    this.getAll()


  }

  getAll(): void {
    this.modelControllerService.getAllQuestions().subscribe(res => {
        this.result = res;
      }
    );
    this.modelControllerService.getAllSubjects().subscribe(res=>this.subjects=res);
  }

  create() {
    this.createFlag = !this.createFlag;
    if (this.createFlag) {
      this.buttonLabel = "Anuluj";
    } else {
      this.buttonLabel = "Nowy";
    }
  }

  save() {
    this.modelControllerService.createQuestion(this.createdQuestion).subscribe(res => {
      this.createdQuestion = new Question();
      this.createdQuestion.subject = new Subject();
      this.create();
      this.getAll()
    });

  }

  remove(question: Question) {
    if (question.id != null) {
      let id: number = question.id;
      this.modelControllerService.deleteQuestion(id).subscribe(res => this.getAll());
    }
  }

  saveEdit() {
    this.modelControllerService.createQuestion(this.editQuestion).subscribe(res => {
      this.editQuestion = new Question();
      this.editId = -1;
      this.getAll()
    });
  }

  edit(item: Question) {
    this.editQuestion = item;
    this.editQuestion.subject = new Subject();
    if (item.id == null) {
      return;
    }
    if (this.editId != item.id) {
      this.editId = item.id;
    } else {
      this.editId = -1;
      this.getAll();
    }
  }

}
