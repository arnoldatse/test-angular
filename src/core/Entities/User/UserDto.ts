export default class UserDto {
  public readonly id: number;
  public readonly email: string;
  public readonly lastName: string;
  public readonly firstName: string;
  public readonly avatar: string;

  constructor(
    user:{
      id: number,
      email: string,
      lastName: string,
      firstName: string,
      avatar: string
    }
  ){
      this.id = user.id;
      this.email = user.email;
      this.lastName = user.lastName;
      this.firstName = user.firstName;
      this.avatar = user.avatar;
  }
}
