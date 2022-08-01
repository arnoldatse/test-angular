import UserLoginRegisterDto from "src/core/Entities/User/UserLoginRegisterDto";
import LoginUserRepository from "src/core/useCases/LoginUser/LoginUserRepository"
import { environment } from "src/environments/environment";

export default class LoginUserAdapter implements LoginUserRepository {
  async RestLoginUser(user: UserLoginRegisterDto): Promise<any>{
    const response = await fetch(`${environment.apiBaseUrl}/login`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body:JSON.stringify({
        email: user.email,
        password: user.password
      })
    })

    if(response.status == 200){
      return Promise.resolve(response.json())
    }
    else if(response.status == 400){
      var errorContent = ''
      await response.json().then(error=>{
        errorContent = error.error
      })
      return Promise.reject(errorContent)
    }
    else{
      return Promise.reject(new Error('Echec de connexion'))
    }
  };
}
