import UserLoginRegisterDto from "src/core/Entities/User/UserLoginRegisterDto";
import RegisterUserRepository from "src/core/useCases/RegisterUser/RegisterUserRepository"
import { environment } from "src/environments/environment";

export default class RegisterUserAdapter implements RegisterUserRepository {
  async RestRegisterUser(user: UserLoginRegisterDto): Promise<any>{
    const response = await fetch(`${environment.apiBaseUrl}/register`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body:JSON.stringify({
        email: user.email,
        password: user.password
      })
    })

    if(response.status==200){
      return Promise.resolve(response.json())
    }
    else{
      return Promise.reject(new Error('Echec'))
    }
  };
}
