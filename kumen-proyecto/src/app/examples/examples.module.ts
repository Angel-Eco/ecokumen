import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFilterPipe } from './filter-pipe';
import { ClickOutsideDirective } from './dropdown.directive';
import { LetterBoldPipe } from './letter-bold.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { FaqComponent } from './faq/faq.component';
import { PlanesComponent } from './planes/planes.component';
import { EcoemprendedoresComponent } from './ecoemprendedores/ecoemprendedores.component';

import {AutocompleteLibModule} from 'angular-ng-autocomplete'
import { EcoemprendedorService } from '@app/services/ecoemprendedor.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AutocompleteLibModule            
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        FaqComponent,
        PlanesComponent,
        EcoemprendedoresComponent,
        SearchFilterPipe,
        ClickOutsideDirective,
        LetterBoldPipe
    ],
    providers: [
        EcoemprendedorService
    ]
})
export class ExamplesModule { }
