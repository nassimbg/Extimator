export class User {

  public id: string;
  public name: string;
  public photoURL: string;

  constructor(id: string, name: string, photoURL: string) {
    this.id = id;
    this.name = name;
    this.photoURL = photoURL;
  }
}
