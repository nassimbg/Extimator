import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Injectable} from "@angular/core";

@Injectable()
export class UserManager {
  private itemsRef: AngularFireList<any>;

  constructor(private af: AngularFireDatabase) {
    this.itemsRef = this.af.list('/USERS/');
  }

  registerUser(userData: any) {
    if (userData.additionalUserInfo.isNewUser) {
      this.itemsRef.set(userData.user.uid, userData.user.displayName);
    }
  }
}
