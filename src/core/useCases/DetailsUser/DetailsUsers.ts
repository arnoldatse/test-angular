import DetailsUserRepository from './DetailsUserRepository';
export default class listUsers{
  private _DetailsUserRepository:DetailsUserRepository;
  private _userId: number = 0;

  constructor(DetailsUserRepository: DetailsUserRepository, userId: number){
    this._DetailsUserRepository = DetailsUserRepository
  }

  GetDetailsUser(){
    this._DetailsUserRepository.RestGetDetailsUser(this._userId)
  }
}
