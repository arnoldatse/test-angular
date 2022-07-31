export default class UserListDto {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  avatar: string;

  constructor(
    user:{
      id: number,
      email: string,
      lastName: string,
      firstName: string,
      avatar: string,
      password: string
    }
  ){
      this.id = user.id;
      this.email = user.email;
      this.lastName = user.lastName;
      this.firstName = user.firstName;
      this.avatar = user.avatar;
  }
}
