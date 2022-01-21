import { Component, OnInit } from '@angular/core';
import {Faculty} from "../models/faculty";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
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

  }

}
