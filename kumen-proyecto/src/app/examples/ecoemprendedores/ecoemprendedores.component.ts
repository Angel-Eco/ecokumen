import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ecoemprendedores',
    templateUrl: './ecoemprendedores.component.html',
    styleUrls: ['./ecoemprendedores.component.scss']
})

export class EcoemprendedoresComponent implements OnInit {
  focus: any;
  focus1: any;
  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Valparaíso'
     },
     {
       id: 2,
       name: 'Santiago'
     }
  ];

  constructor() { }

  ngOnInit() {}



}
