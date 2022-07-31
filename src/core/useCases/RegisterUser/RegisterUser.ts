import UserLoginRegisterDto from "src/core/Entities/User/UserLoginRegisterDto"
import RegisterUserRepository from "./RegisterUserRepository"

export default class RegisterUser{
  private _registerUserRepository:RegisterUserRepository;
  constructor(registerUserRepository: RegisterUserRepository){
    this._registerUserRepository = registerUserRepository
  }

  async Register(email:string, password:string){
    const user = new UserLoginRegisterDto({email, password})

    return await this._registerUserRepository.RestRegisterUser(user).then(response=>response).catch(error => error)
  }
}
