import {
	Component
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ChangeDetectorRef } from "@angular/core";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AngularFireAuth]
})


export class AppComponent {
	LOGIN = "login";
	LOGOUT = "logout";
	loginButton: string;

	constructor(public afAuth: AngularFireAuth, public changeDetectorRef: ChangeDetectorRef) {
		this.loginButton = this.LOGIN;
	}

	signIn() {
		if (!this.afAuth.auth.currentUser) {
			this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => this.loginLabel(this.LOGOUT));
		} else {
			this.afAuth.auth.signOut().then(() => this.loginLabel(this.LOGIN));
		}
	}

	loginLabel(label: string) {
		this.loginButton = label;
		this.changeDetectorRef.detectChanges();
	}
}


