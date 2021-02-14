import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { FaqComponent } from './faq/faq.component';
import { PlanesComponent } from './planes/planes.component';
import { EcoemprendedoresComponent } from './ecoemprendedores/ecoemprendedores.component';

import {AutocompleteLibModule} from 'angular-ng-autocomplete'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        AutocompleteLibModule
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        FaqComponent,
        PlanesComponent,
        EcoemprendedoresComponent
    ]
})
export class ExamplesModule { }
