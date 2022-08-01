import UserLoginRegisterDto from "src/core/Entities/User/UserLoginRegisterDto"
import LoginUserRepository from "./LoginUserRepository"

export default class RegisterUser{
  private _loginUserRepository:LoginUserRepository;
  constructor(loginUserRepository: LoginUserRepository){
    this._loginUserRepository = loginUserRepository
  }

  async Login(email:string, password:string){
    const user = new UserLoginRegisterDto({email, password})

    return await this._loginUserRepository.RestLoginUser(user)
  }
}
