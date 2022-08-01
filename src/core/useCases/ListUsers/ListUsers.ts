import UserApiResponse from 'src/core/api/UserApiResponse';
import UserDto from 'src/core/Entities/User/UserDto';
import ListUsersRepository from './ListUsersRepository';
export default class ListUsers{
  private _page = 0;
  private _totalPages = 0;
  private _listUsersRepository:ListUsersRepository;

  constructor(listUsersRepository: ListUsersRepository){
    this._listUsersRepository = listUsersRepository
  }

  async GetNextPageListUsers(): Promise<UserDto | false>{
    const fetchPage = this._page+1

    if(fetchPage == 1 || this.CanFetchNextPage()){
      return await this._listUsersRepository.RestGetListUsers(fetchPage)
        .then(response =>{
          this._page = response.page
          this._totalPages= response.total_pages

          const users = response.data as UserApiResponse[]
          return users.map(user => new UserDto({
            id: user.id,
            email: user.email,
            lastName: user.last_name,
            firstName: user.first_name,
            avatar: user.avatar
          }));
        })
        .catch(error => error)
    }
    else{
      return false
    }
  }

  CanFetchNextPage(){
    return this._page < this._totalPages
  }
}
