import DetailsUserRepository from "src/core/useCases/DetailsUser/DetailsUserRepository";
import { environment } from "src/environments/environment";

export default class ListUsersAdapter implements DetailsUserRepository {
  async RestGetDetailsUser(userId: number): Promise<any>{
    const response = await fetch(`${environment.apiBaseUrl}/api/users/${userId}`)
  }
}
