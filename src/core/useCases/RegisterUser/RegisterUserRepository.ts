import UserRegisterDto from 'src/core/Entities/User/UserRegisterDto';

export default interface RegisterUserRepository{
  RestRegisterUser: (user: UserRegisterDto)=>Promise<any>
}
