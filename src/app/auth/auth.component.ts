import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { selectAuth } from './../store/selectors/auth.selector';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormValidation, FieldValidations, FieldError } from 'src/core/useCases/FormValidation/FormValidation';
import { AuthAction } from '../store/actions/auth.action';
import { Observable } from 'rxjs';
import LoginUserAdapter from 'src/datas/LoginUserAdapter';
import LoginUser from 'src/core/useCases/LoginUser/LoginUser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  auth: Observable<string|false>;

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  emailError: FieldError = false;
  passwordError: FieldError = false;

  constructor(private store: Store, private router: Router) {
    this.auth = store.select(selectAuth)
  }

  ngOnInit(): void {
  }

  async LoginAction(){
    const formValidation = new FormValidation()
    const validationFields: FieldValidations = [
      {name: "email", value: this.userForm.value.email!, validators: ["required", "email"]},
      {name: "password", value: this.userForm.value.password!, validators: ["required", "strongPassword"]},
    ]
    const validations = formValidation.Validations(validationFields)
    this.emailError = formValidation.GetFieldError('email')
    this.passwordError = formValidation.GetFieldError('password')

    if(validations.valid){
      const registerUserAdapter = new LoginUserAdapter();
      const registerUser = new LoginUser(registerUserAdapter)

      try{
        const response = await registerUser.Login(this.userForm.value.email!, this.userForm.value.password!)
        this.store.dispatch(AuthAction({token: response.token}))
        this.router.navigate(['users'], {replaceUrl: true})
      }
      catch(error){
        alert(error)
      }
    }
  }

}
