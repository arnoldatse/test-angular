import DetailsUserRepository from './DetailsUserRepository';
import UserApiResponse from 'src/core/api/UserApiResponse';
import UserDto from 'src/core/Entities/User/UserDto';

export default class DetailsUsers{
  private _detailsUserRepository:DetailsUserRepository;
  private _userId: number = 0;

  constructor(detailsUserRepository: DetailsUserRepository, userId: number){
    this._detailsUserRepository = detailsUserRepository
    this._userId = userId
  }

  async GetDetailsUser(): Promise<UserDto>{
    return await this._detailsUserRepository.RestGetDetailsUser(this._userId)
      .then(response =>{
        const user = response.data as UserApiResponse
        return new UserDto({
          id: user.id,
          email: user.email,
          lastName: user.last_name,
          firstName: user.first_name,
          avatar: user.avatar
        })
      })
      .catch(error => error)
  }
}
