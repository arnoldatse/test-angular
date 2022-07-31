import UserLoginRegisterDto from 'src/core/Entities/User/UserLoginRegisterDto';

export default interface RegisterUserRepository{
  RestLoginUser: (user: UserLoginRegisterDto)=>Promise<any>
}
