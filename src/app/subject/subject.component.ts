import {Component, OnInit} from '@angular/core';
import {ModelControllerService} from "../restServices/modelController.service";
import {Subject} from "../models/subject";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  createdSubject = new Subject();

  result: Array<Subject> = new Array<Subject>();
  createFlag = false;
  buttonLabel = "Nowy";
  editId = -1;
  editSubject = new Subject();

  constructor(private modelControllerService: ModelControllerService) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.modelControllerService.getAllSubjects().subscribe(res => {
        this.result = res;
      }
    );
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
    this.modelControllerService.createSubject(this.createdSubject).subscribe(res => {
      this.createdSubject = new Subject();
      this.create();
      this.getAll()
    });

  }

  remove(subject: Subject) {
    if (subject.id != null) {
      let id: number = subject.id;
      this.modelControllerService.deleteSubject(id).subscribe(res => this.getAll());
    }
  }

  saveEdit() {
    this.modelControllerService.createSubject(this.editSubject).subscribe(res => {
      this.editSubject = new Subject();
      this.editId = -1;
      this.getAll()
    });
  }

  edit(item: Subject) {
    this.editSubject = item;
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
