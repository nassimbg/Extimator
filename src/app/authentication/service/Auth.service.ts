import {Injectable} from '@angular/core';
import * as firebase from "firebase/app";
import {User} from "../../UserManagement/user";
import {Observable} from "rxjs";
import {filter, map, tap} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth";
import {UserManager} from "../../UserManagement/UserManager.service";


@Injectable()
export class AuthService {
  private readonly user: Observable<User>;
  private _loggedIn: boolean;
  private _popRedirectUrl: string;

  constructor(private af: AngularFireAuth, private userManagerService: UserManager) {
    this.user = af.user
      .pipe(
        map(p => p == null ? null : AuthService.createUser(p))
      );
    this._loggedIn = false;
    this.getUser()
      .pipe(filter(user => user !== null))
      .subscribe(user => {
        this.userManagerService.registerUser(user);
        this._loggedIn = true;
      });
  }

  private static createUser(user: firebase.User) {
    return new User(user.uid, user.displayName, user.photoURL);
  }

  public loginWithGoogle(): Promise<any> {
    return this.logIn(new firebase.auth.GoogleAuthProvider());
  }

  public loginWithFacebook(): Promise<any> {
    return this.logIn(new firebase.auth.FacebookAuthProvider());
  }

  public loginWithGitHub(): Promise<any> {
    const githubAuthProvider = new firebase.auth.GithubAuthProvider();
    return this.logIn(githubAuthProvider);
  }

  private logIn(provider: firebase.auth.AuthProvider): Promise<boolean | void> {
    return this.af.auth.signInWithPopup(provider)
      .then(user => this._loggedIn = true);
  }

  public loginWithEmail(email: string, password: string): Promise<any> {
    return this.af.auth.signInWithEmailAndPassword(email, password)
      .then(user => this._loggedIn = true);
  }

  public signUpWithEmail(email: string, password: string, username: string, photoUrl: string): Promise<any> {
    return this.updateProfileAndLogIn(this.af.auth.createUserWithEmailAndPassword(email, password), username, photoUrl);
  }

  signInAnonymously(username: string, photoUrl: string) {
    return this.updateProfileAndLogIn(this.af.auth.signInAnonymously(), username, photoUrl);
  }

  private updateProfileAndLogIn(p : Promise<firebase.auth.UserCredential>, username: string, photoUrl: string) {
  return p.then(user => this.updateProfileDetails(user, username, photoUrl))
      .then(user => this.af.auth.updateCurrentUser(user))
      .then(user => this._loggedIn = true)
  }

  private async updateProfileDetails(user: firebase.auth.UserCredential, username: string, photoUrl: string): Promise<firebase.User> {
    await user.user.updateProfile({displayName: username, photoURL: photoUrl});
    return user.user;
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
    const currentRedirect = this._popRedirectUrl ? this._popRedirectUrl : '';
    this._popRedirectUrl = '';
    return currentRedirect;
  }

  set addRedirectUrl(value: string) {
    this._popRedirectUrl = value;
  }
}
