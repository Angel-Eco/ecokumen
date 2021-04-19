import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { FaqComponent } from './examples/faq/faq.component';
import { PlanesComponent } from './examples/planes/planes.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { EcoemprendedoresComponent } from './examples/ecoemprendedores/ecoemprendedores.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'faq',          component: FaqComponent },
    { path: 'planes',          component: PlanesComponent },
    { path: 'ecoemprendedores',          component: EcoemprendedoresComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    {
      path: 'login',
      loadChildren: () =>
        import('./auth/login/login.module').then((m) => m.LoginModule),
    },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
