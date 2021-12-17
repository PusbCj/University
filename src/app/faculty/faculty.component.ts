import {Component, OnInit} from '@angular/core';
import {Faculty} from "../models/faculty";
import {HttpClient} from "@angular/common/http";
import {ModelControllerService} from "../restServices/modelController.service";


@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  createdFaculty = new Faculty();

  result: Array<Faculty> = new Array<Faculty>();
  createFlag = false;
  buttonLabel = "Nowy";
  editId = -1;
  editFaculty = new Faculty();

  constructor(private modelControllerService: ModelControllerService) {
  }

  ngOnInit(): void {
    let faculty = new Faculty();
    faculty.name="test";
    faculty.description="testdescription";
    this.modelControllerService.getAllFaculty().subscribe(res=>{
      this.result = res;
    }
    );

  }

  getAll(): void{
    this.modelControllerService.getAllFaculty().subscribe(res=>{
        this.result = res;
      }
    );
  }

  create() {
    this.createFlag = !this.createFlag;
    if(this.createFlag){
      this.buttonLabel = "Anuluj";
    }else {
      this.buttonLabel = "Nowy";
    }
  }

  save() {
    this.modelControllerService.createFaculty(this.createdFaculty).subscribe(res=>{
      this.createdFaculty = new Faculty();
      this.create();
      this.getAll()
    });

  }

  remove(faculty: Faculty) {
    if (faculty.id != null) {
      let id: number = faculty.id;
      this.modelControllerService.deleteFaculty(id).subscribe(res=>this.getAll());
    }
  }

  saveEdit() {
    this.modelControllerService.createFaculty(this.editFaculty).subscribe(res=>{
      this.editFaculty = new Faculty();
      this.editId=-1;
      this.getAll()
    });
  }

  edit(item: Faculty) {
    this.editFaculty = item;
    if(item.id == null){
      return;
    }
    if(this.editId!=item.id) {
      this.editId = item.id;
    }else {
      this.editId = -1;
      this.getAll();
    }
  }
}
