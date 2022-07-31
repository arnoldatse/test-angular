import ListUsersRepository from './ListUsersRepository';
export default class listUsers{
  private _page = 0;
  private _totalPages = 0;
  private _ListUsersRepository:ListUsersRepository;

  constructor(ListUsersRepository: ListUsersRepository){
    this._ListUsersRepository = ListUsersRepository
  }

  GetNextPageListUsers(){
    this._page++

    if(this._page == 1 || this.CanFetchNextPage()){
      this._ListUsersRepository.RestGetListUsers(this._page)
    }
  }

  CanFetchNextPage(){
    return this._page < this._totalPages
  }
}
