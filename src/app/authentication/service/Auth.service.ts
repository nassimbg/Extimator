import * as firebase from 'firebase/app';
import {
  AngularFireAuth
} from 'angularfire2/auth';
import {
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  
  constructor(private af: AngularFireAuth) {
    this.user = af.authState;
  }

  loginWithGoogle(): firebase.Promise < any > {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  getUser() {
    return this.user;
  }

  logOut() {
    return this.af.auth.signOut();
  }
}
