import { Component, OnInit } from '@angular/core';
import UserDto from 'src/core/Entities/User/UserDto';
import ListUsers from 'src/core/useCases/ListUsers/ListUsers';
import ListUsersAdapter from 'src/datas/ListUsersAdapter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: UserDto[]
  listUsersUseCase: ListUsers
  canFetchNextPage: boolean

  constructor(private router: Router) {
    this.users = []
    this.canFetchNextPage = true

    const listUsersAdapter = new ListUsersAdapter();
    this.listUsersUseCase = new ListUsers(listUsersAdapter)
  }

  ngOnInit(): void {
    this.GetNextPageUsers()
  }

  async GetNextPageUsers(){
      await this.listUsersUseCase.GetNextPageListUsers().then(users =>{
        if(users){
          this.users = this.users.concat(users)
        }
      })


      this.canFetchNextPage = this.listUsersUseCase.CanFetchNextPage()
  }

  NavigateToUserDetails(userId: number){
    this.router.navigate(['space/users/details', userId])
  }
}
