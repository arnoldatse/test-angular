import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import UserDto from 'src/core/Entities/User/UserDto';
import DetailsUsers from 'src/core/useCases/DetailsUser/DetailsUser';
import DetailsUserAdapter from 'src/datas/DetailsUserAdapter';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  userId: number|undefined
  user: UserDto = new UserDto({id:0, email:'', lastName:'', firstName:'', avatar:''})

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.GetDetailsUser()
  }

  async GetDetailsUser(){
    const detailsUserAdapter = new DetailsUserAdapter
    const detailsUser = new DetailsUsers(detailsUserAdapter, this.userId!)

    try{
      this.user = await detailsUser.GetDetailsUser()
    }
    catch(error){
      alert(error)
    }
  }

  NavigateToUsersList(){
    this.router.navigate(['space/users'])
  }

}
