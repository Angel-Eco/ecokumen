import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoemprendedoresComponent } from './ecoemprendedores.component';

describe('EcoemprendedoresComponent', () => {
  let component: EcoemprendedoresComponent;
  let fixture: ComponentFixture<EcoemprendedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcoemprendedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoemprendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
