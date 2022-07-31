import DetailsUserRepository from "src/core/useCases/DetailsUser/DetailsUserRepository";
import { environment } from "src/environments/environment";

export default class DetailsUserAdapter implements DetailsUserRepository {
  async RestGetDetailsUser(userId: number): Promise<any>{
    const response = await fetch(`${environment.apiBaseUrl}/users/${userId}`)

    if(response.status==200){
      return Promise.resolve(response.json())
    }
    else{
      return Promise.reject(new Error('Echec'))
    }
  }
}
