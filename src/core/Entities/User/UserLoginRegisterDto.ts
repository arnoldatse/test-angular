export default class UserLoginRegisterDto {
  public readonly email: string;
  public readonly password: string | undefined;

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
