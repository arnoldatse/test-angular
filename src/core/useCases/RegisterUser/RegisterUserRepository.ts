import UserLoginRegisterDto from 'src/core/Entities/User/UserLoginRegisterDto';

export default interface RegisterUserRepository{
  RestRegisterUser: (user: UserLoginRegisterDto)=>Promise<any>
}
