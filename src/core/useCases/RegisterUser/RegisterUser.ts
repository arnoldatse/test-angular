import UserRegisterDto from "src/core/Entities/User/UserRegisterDto"
import RegisterUserRepository from "./RegisterUserRepository"

export default class RegisterUser{
  private _RegisterUserRepository:RegisterUserRepository;
  constructor(RegisterUserRepository: RegisterUserRepository){
    this._RegisterUserRepository = RegisterUserRepository
  }

  async Register(email:string, password:string){
    const user = new UserRegisterDto({email, password})

    await this._RegisterUserRepository.RestRegisterUser(user)
  }
}
