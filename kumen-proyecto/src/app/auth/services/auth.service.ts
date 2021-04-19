import { User } from '../../shared/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
//import { RoleValidator } from '../helpers/roleValidator';
import { RoleValidator } from '@auth/helpers/roleValidator';

import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService extends RoleValidator {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async loginGoogle(): Promise<User> {
        
    
    try {     
      const { user } = await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );      
      this.updateUserData(user);
      return user;      
    } catch (error) {
      console.log(error);
    }

    /*
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user));
      */
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  //VALIDACION DE ROLES
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  isUserAdmin(userUid) {
    return this.afs.doc<User>(`users/${userUid}`).valueChanges();
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );    
    if(user.email =='angelespinoza.pucv@gmail.com' 
    || user.email =='tania.nunez.e@gmail.com' 
    || user.email =='violeta.a.o.p@gmail.com'){
      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
        roles: 'ADMIN',
      };            
      //return user
      return userRef.set(data, { merge: true });
    };

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: 'EDITOR',
    };

    return userRef.set(data, { merge: true });
  }
}
