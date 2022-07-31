import ListUsersRepository from "src/core/useCases/ListUsers/ListUsersRepository";
import { environment } from "src/environments/environment";

export default class ListUsersAdapter implements ListUsersRepository {
  async RestGetListUsers(page:number):Promise<any>{
    const response = await fetch(`${environment.apiBaseUrl}/users?page=${page}`)

    if(response.status==200){
      return Promise.resolve(response.json())
    }
    else{
      return Promise.reject(new Error('Echec'))
    }
  }
}
