import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../UserManagement/user";


@Injectable()
export class AuthService {
  private user: Observable<User>;

  constructor(private af: AngularFireAuth) {
    this.user = af.authState.map(p => p == null ? null : new User(p.uid, p.displayName, p.photoURL));
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
