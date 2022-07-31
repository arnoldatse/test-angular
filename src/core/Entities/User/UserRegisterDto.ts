export default class UserRegisterDto {
  public email: string;
  public password: string | undefined;

  constructor(
    user:{
      email: string,
      password: string
    }
  ){
      this.email = user.email;
      this.password = user.password;
  }
}
