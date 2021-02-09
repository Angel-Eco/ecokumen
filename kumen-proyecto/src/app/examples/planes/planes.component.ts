import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-planes',
    templateUrl: './planes.component.html',
    styleUrls: ['./planes.component.scss']
})

export class PlanesComponent implements OnInit {
  focus: any;
  focus1: any;

  constructor() { }

  ngOnInit() {}

  toContact(){
    document.getElementById("contact").scrollIntoView(); 
  }

}
