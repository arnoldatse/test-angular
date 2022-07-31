export default class User {
  private _id?: number;
  private _email: string;
  private _lastName: string;
  private _firstName: string;
  private _avatar: string;
  private _password?: string;

  constructor(
    user:{
      id?: number,
      email: string,
      lastName: string,
      firstName: string,
      avatar: string,
      password?: string
    }
  ){
      this._id = user.id;
      this._email = user.email;
      this._lastName = user.lastName;
      this._firstName = user.firstName;
      this._avatar = user.avatar;
      this._password = user.password;
  }

  public get id(): number{
    return this._id!
  }

  public set id(value: number){
    this._id = value;
  }

  public get email(): string{
    return this._email
  }

  public set email(value: string){
    this._email = value;
  }

  public get lastname(): string{
    return this._lastName!
  }

  public set lastname(value: string){
    this._lastName = value;
  }

  public get firstname(): string{
    return this._firstName!
  }

  public set firstname(value: string){
    this._firstName = value;
  }

  public get avatar(): string{
    return this._avatar
  }

  public set avatar(value: string){
    this._avatar = value;
  }

  public get password(): string{
    return this._password!
  }

  public set password(value: string){
    this._password = value;
  }
}
