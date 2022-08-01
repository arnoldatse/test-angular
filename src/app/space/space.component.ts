import { Component, OnInit } from '@angular/core';
import { AuthAction } from '../store/actions/auth.action';
import { selectAuth } from './../store/selectors/auth.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { initialState } from '../store/reducers/auth.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {

  auth: Observable<string|false>;

  constructor(private store: Store, private router: Router) {
    this.auth = store.select(selectAuth)
  }

  ngOnInit(): void {
  }

  Logout(){
    this.store.dispatch(AuthAction(initialState))
    this.router.navigate(['auth'], {replaceUrl: true})
  }

}
