import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})

export class FaqComponent implements OnInit {
  focus: any;
  focus1: any;

  constructor() { }

  ngOnInit() {}

  toContact(){
    document.getElementById("contact").scrollIntoView(); 
  }

}
