import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Injectable} from "@angular/core";
import {User} from "./user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserManager {
  static userPath = '/USERS/';
  private itemsRef: AngularFireList<User>;

  constructor(private af: AngularFireDatabase) {
    this.itemsRef = this.af.list(UserManager.userPath);
  }

  registerUser(userData: User) {
    this.itemsRef.set(userData.id, userData);
  }

  findUser(userID: string): Observable<User> {
     return this.af.object<User>(UserManager.userPath + userID).valueChanges();
  }
}
