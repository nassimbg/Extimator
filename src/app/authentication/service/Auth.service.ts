import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {User} from "../../UserManagement/user";
import {Observable} from "rxjs";
import {filter, map, tap} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {UserManager} from "../../UserManagement/UserManager.service";


@Injectable()
export class AuthService {
  private readonly user: Observable<User>;
  private _loggedIn: boolean;
  private _popRedirectUrl: string;

  constructor(private af: AngularFireAuth, private userManagerService: UserManager) {
    this.user = af.authState
      .pipe(
        map(p => p == null ? null : new User(p.uid, p.displayName, p.photoURL))
      );
    this._loggedIn = false;
    this.user
      .pipe(filter(user => user !== null))
      .subscribe(user => {
      this.userManagerService.registerUser(user);
      this._loggedIn = true;
    });
  }

  public loginWithGoogle(): Promise<any> {
    return this.logIn(new firebase.auth.GoogleAuthProvider());
  }

  public loginWithFacebook(): Promise<any> {
    return this.logIn(new firebase.auth.FacebookAuthProvider());
  }

  public loginWithTwitter(): Promise<any> {
    return this.logIn(new firebase.auth.TwitterAuthProvider());
  }

  public loginWithGitHub(): Promise<any> {
    let githubAuthProvider = new firebase.auth.GithubAuthProvider();
    // githubAuthProvider.addScope("read:email");
    return this.logIn(githubAuthProvider)
  }

  private logIn(provider: firebase.auth.AuthProvider): Promise<boolean | void> {
    return this.af.auth.signInWithPopup(provider)
      .then(user => this._loggedIn = true);
  }

  public logOut() {
    return this.af.auth.signOut()
      .then(voidz => this._loggedIn = false);
  }

  public get isLoggedIn() {
    return this._loggedIn;
  }

  public getUser() {
    return this.user;
  }

  get popRedirectUrl(): string {
    let currentRedirect = this._popRedirectUrl ? this._popRedirectUrl : '';
    this._popRedirectUrl = '';
    return currentRedirect;
  }

  set popRedirectUrl(value: string) {
    this._popRedirectUrl = value;
  }
}
