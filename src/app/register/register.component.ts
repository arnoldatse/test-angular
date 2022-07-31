import { Component, OnInit } from '@angular/core';
import { selectAuth } from './../store/selectors/auth.selector';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormValidation, FieldValidations, FieldError } from 'src/core/useCases/FormValidation/FormValidation';
import RegisterUser from 'src/core/useCases/RegisterUser/RegisterUser';
import RegisterUserAdapter from 'src/datas/RegisterUserAdapter';
import { AuthAction } from '../store/actions/auth.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  auth: Observable<string|false>;

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  })

  emailError: FieldError = false;
  passwordError: FieldError = false;
  passwordConfirmationError: FieldError = false;

  constructor(private store: Store, private router: Router) {
    this.auth = store.select(selectAuth)
    console.log(this.auth)
  }

  ngOnInit(): void {
  }

  async RegisterAction(){
    const formValidation = new FormValidation()
    const validationFields: FieldValidations = [
      {name: "email", value: this.userForm.value.email!, validators: ["required", "email"]},
      {name: "password", value: this.userForm.value.password!, validators: ["required", "strongPassword"]},
      {name: "passwordConfirmation", value: this.userForm.value.passwordConfirmation!, validators: [{confirm: "password"}]},
    ]
    const validations = formValidation.Validations(validationFields)
    this.emailError = formValidation.GetFieldError('email')
    this.passwordError = formValidation.GetFieldError('password')
    this.passwordConfirmationError = formValidation.GetFieldError('passwordConfirmation')

    if(validations.valid){
      const registerUserAdapter = new RegisterUserAdapter();

      const registerUser = new RegisterUser(registerUserAdapter)
      try{
        const response = await registerUser.Register(this.userForm.value.email!, this.userForm.value.password!)
        this.store.dispatch(AuthAction({token: response.token}))
        this.router.navigate(['users'], {replaceUrl: true})
      }
      catch(error){
        alert(error)
      }
    }
  }
}
