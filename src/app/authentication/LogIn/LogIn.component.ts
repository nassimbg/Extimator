import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../service/Auth.service';
import {UserManager} from "../../UserManagement/UserManager.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Utils} from "../../utils/utils";

@Component({
  selector: 'log-in',
  styleUrls: ['./LogIn.component.scss'],
  templateUrl: './LogIn.component.html',
})
export class LogInComponent implements OnInit {
  public error: Error;
  socialLogIns: SocialLogIn[];
  public fullScreen: boolean;

  constructor(private authService: AuthService, private router: Router,  private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
  }

  public login(signInType: SignInType) {
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
      case SignInType.TWITTER:
        loginStatus = this.authService
          .loginWithTwitter();
        break;
      case SignInType.GITHUB:
        loginStatus = this.authService
          .loginWithGitHub();
        break;
      default:
        loginStatus = Promise.reject();
    }

    loginStatus
      .then((data) => this.router.navigate([this.authService.popRedirectUrl]))
      .catch((error) => (this.error = error));
  }

  ngOnInit(): void {
    this.socialLogIns = LogInComponent.createLogInTypes();

    this.registerLoginIcons(this.socialLogIns);

    this.fullScreen = !Utils.isAtLeastSmallScreen();
  }

  private static createLogInTypes() {
    let socialLogIns = [];
    socialLogIns.push(new SocialLogIn(SignInType.GOOGLE));
    socialLogIns.push(new SocialLogIn(SignInType.FACEBOOK));
    socialLogIns.push(new SocialLogIn(SignInType.GITHUB));
    //todo activate when twitter validation creation of app
    // socialLogIns.push(new SocialLogIn(SignInType.TWITTER));

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
    return Math.min(100/this.socialLogIns.length, 33) - 2;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.fullScreen = event.target.innerWidth < Utils.getMinSmallScreenSize();
  }
}

enum SignInType {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  TWITTER = "TWITTER",
  GITHUB = "GITHUB"
}

class SocialLogIn {
  name: string;
  signInType: SignInType;

  constructor(signInType: SignInType) {
    this.name = signInType.charAt(0).toUpperCase() + signInType.slice(1).toLowerCase();
    this.signInType = signInType;
  }
}
