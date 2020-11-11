import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../service/Auth.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Utils} from '../../utils/utils';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'log-in',
  styleUrls: ['./LogIn.component.scss'],
  templateUrl: './LogIn.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LogInComponent implements OnInit {
  socialLogIns: SocialLogIn[];
  signInForm: FormGroup;
  loginInvalid: boolean;
  loginInProgress: boolean;

  signUpForm: FormGroup;
  signUpInValid: boolean;
  emailType : SignInType;
  signUpErrorMessage: string;

  anonymousType : SignInType;
  signInAnonymousForm: FormGroup;

  avatars: any;

  isXSmallScreen: boolean;


  constructor(private authService: AuthService, private router: Router,  private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, private fb: FormBuilder) {
  }

  public login(signInType: SignInType) {
    this.loginInvalid = false;
    this.loginInProgress = true;
    let loginStatus;
    switch (signInType) {
      case SignInType.GOOGLE:
        loginStatus = this.authService
          .loginWithGoogle();
        break;
      case SignInType.FACEBOOK:
        loginStatus = this.authService
          .loginWithFacebook();
        break;
      case SignInType.GITHUB:
        loginStatus = this.authService
          .loginWithGitHub();
        break;
      case SignInType.EMAIL:
        loginStatus = this.logInWithEmail()
        break;
      case SignInType.ANONYMOUS:
        loginStatus = this.loginAnonymously();
        break;
      default:
        loginStatus = Promise.reject();
    }

    this.finalizeAndReroute(loginStatus);
  }

  ngOnInit(): void {
    this.avatars = [
      'female_0',
      'female_1',
      'female_2',
      'male_0',
      'male_1',
      'male_2',
      'male_3',
      'male_4',
      'male_5',
    ];

    this.socialLogIns = LogInComponent.createLogInTypes();

    this.registerLoginIcons(this.socialLogIns);

    this.isXSmallScreen = !Utils.isAtLeastSmallScreen();

    this.signInAnonymousForm = this.fb.group({
      username: ['', Validators.required],
      gender: new FormControl('male'),
      avatar: []
    });

    this.signInForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      email: ['', Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required],
      gender: new FormControl('male')
    });

    this.emailType = SignInType.EMAIL;
    this.anonymousType = SignInType.ANONYMOUS;
  }

  private static createLogInTypes() {
    const socialLogIns = [];
    socialLogIns.push(new SocialLogIn(SignInType.GOOGLE));
    socialLogIns.push(new SocialLogIn(SignInType.FACEBOOK));
    socialLogIns.push(new SocialLogIn(SignInType.GITHUB));

    return socialLogIns;
  }

  private registerLoginIcons(socialLogIns: SocialLogIn[]) {
    socialLogIns.forEach(login => this.matIconRegistry.addSvgIcon(login.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.createURL(login.name))));
  }

  createURL(name: string): string {
    return `/assets/images/logo/${name.toLowerCase()}-logo.svg`;
  }

  getFlexSizePerSocialLogin() {
    return Math.min(100 / this.socialLogIns.length, 33) - 2;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isXSmallScreen = event.target.innerWidth < Utils.getMinSmallScreenSize();
  }

  private loginAnonymously() {
    if (this.signInAnonymousForm.valid) {
      const username = this.signInAnonymousForm.get('username').value;
      const gender = this.signInAnonymousForm.get('gender').value;
      const photoURL = this.getAvatarPerGender(gender);

      return this.authService.signInAnonymously(username, photoURL);
    }

    return Promise.reject();
  }

  private logInWithEmail(): Promise<any> {
    if (this.signInForm.valid) {
      const username = this.signInForm.get('username').value;
      const password = this.signInForm.get('password').value;
      return this.authService.loginWithEmail(username, password)
        .catch(error => {
          this.loginInvalid = true;
          return Promise.reject();
        });
    } else {
      this.loginInvalid = true;
    }
    return Promise.reject();
  }

  signUpWithEmail() {
    this.signUpInValid = false;
    this.loginInProgress = true;

    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email').value;
      const username = this.signUpForm.get('username').value;
      const password = this.signUpForm.get('password').value;
      const gender = this.signUpForm.get('gender').value;
      const photoURL = this.getAvatarPerGender(gender);

      const p = this.authService.signUpWithEmail(email, password, username, photoURL)
        .catch(error => {
          this.signUpInValid = true;
          this.signUpErrorMessage = error.message;
          return Promise.reject();
        });

      this.finalizeAndReroute(p);
    }
  }

  private getAvatarPerGender(gender: any) {
    const avatarsPerGender = gender.toString().toLowerCase() === 'male' ? 6 : 3;
    const avatarNumber = LogInComponent.getRandomInt(avatarsPerGender - 1);
    return this.getAvatar(`${gender}_${avatarNumber}`);
  }

  getAvatar(avatarID: string) {
    return `assets/images/avatar/${avatarID}.svg`;
  }

  getAvatarPhoto(id: string) {
    return 'url(' + this.getAvatar(id) + ')'
  }

  getMaleAvatarPhoto() {
    return this.getAvatarPhoto('male_3');
  }

  getFemaleAvatarPhoto() {
    return this.getAvatarPhoto('female_2');
  }

  private static getRandomInt(max: number): number {
    return _.random(max);
  }

  private async finalizeAndReroute(p : Promise<any>) {
    await p.then((data) => this.router.navigate([this.authService.popRedirectUrl]))
      .catch(error => console.error(error.message));
    this.loginInProgress = false
  }
}

enum SignInType {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  EMAIL = 'EMAIL',
  ANONYMOUS = 'ANONYMOUS'
}

class SocialLogIn {
  name: string;
  signInType: SignInType;

  constructor(signInType: SignInType) {
    this.name = signInType.charAt(0).toUpperCase() + signInType.slice(1).toLowerCase();
    this.signInType = signInType;
  }
}
