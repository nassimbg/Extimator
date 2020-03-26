import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {User} from "../../UserManagement/user";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth";


@Injectable()
export class AuthService {
  private user: Observable<User>;

  constructor(private af: AngularFireAuth) {
    this.user = af.authState.pipe(map(p => p == null ? null : new User(p.uid, p.displayName, p.photoURL)));
  }

  public loginWithGoogle(): Promise<any> {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public getUser() {
    return this.user;
  }

  public logOut() {
    return this.af.auth.signOut();
  }
}
