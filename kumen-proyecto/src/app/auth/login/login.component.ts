import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router: Router) {}

  //validamos con el if los usuarios admin(user.email) con acceso a la plataforma
  async onGoogleLogin() {
    try {
      const user = await this.authSvc.loginGoogle();      
      if (user) {
        this.checkUserIsVerified(user);
        console.log(user.displayName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //indicamos cual es el paso luego de verificar el usuario
  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);      
    } else if (user) {
      this.router.navigate(['/verification-email']);      
    } else {
      this.router.navigate(['/register']);      
    }
  }

}
