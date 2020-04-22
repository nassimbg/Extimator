import {Injectable} from "@angular/core";
import {User} from "./user";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Observable} from "rxjs";

@Injectable()
export class UserManager {
  static userPath = '/USERS/';
  private itemsRef: AngularFireList<User>;

  //todo this could be removed and maybe use firebase auth service rather than saving in firebase
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
