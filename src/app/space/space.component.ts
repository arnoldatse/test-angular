import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(!this.AuthService.Check()){
      this.router.navigate(['auth'], {replaceUrl: true})
    }
  }

  Logout(){
    this.AuthService.Logout()
    this.router.navigate(['auth'], {replaceUrl: true})
  }

}
