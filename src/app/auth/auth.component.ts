import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidation, FieldValidations, FieldError } from 'src/core/useCases/FormValidation/FormValidation';
import { AuthService } from './../services/auth.service';
import LoginUserAdapter from 'src/datas/LoginUserAdapter';
import LoginUser from 'src/core/useCases/LoginUser/LoginUser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  formError: FieldError = false;
  emailError: FieldError = false;
  passwordError: FieldError = false;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.AuthService.Check()){
      this.router.navigate(['space/users'], {replaceUrl: true})
    }
  }

  OnChangeField(field: 'email'|'password'){
    switch(field){
      case 'email':
        this.emailError = false;
        break;
      case 'password':
        this.passwordError = false;
        break;
    }
  }

  async LoginAction(){
    this.formError = false

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

      await registerUser.Login(this.userForm.value.email!, this.userForm.value.password!)
      .then(response=>{
        this.AuthService.Authenticate(response.token)
        this.router.navigate(['space/users'], {replaceUrl: true})
      })
      .catch(error=>{
        this.formError = error
      })
    }
  }

}
