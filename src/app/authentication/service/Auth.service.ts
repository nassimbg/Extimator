import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;

  constructor(private af: AngularFireAuth) {
    this.user = af.authState;
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
