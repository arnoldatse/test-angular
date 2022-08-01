import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidation, FieldValidations, FieldError } from 'src/core/useCases/FormValidation/FormValidation';
import { AuthService } from './../services/auth.service';
import RegisterUser from 'src/core/useCases/RegisterUser/RegisterUser';
import RegisterUserAdapter from 'src/datas/RegisterUserAdapter';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  })

  formError: FieldError = false;
  emailError: FieldError = false;
  passwordError: FieldError = false;
  passwordConfirmationError: FieldError = false;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.AuthService.Check()){
      this.router.navigate(['space/users'], {replaceUrl: true})
    }
  }

  async RegisterAction(){
    const formValidation = new FormValidation()
    const validationFields: FieldValidations = [
      {name: "email", value: this.userForm.value.email!, validators: ["required", "email"]},
      {name: "password", value: this.userForm.value.password!, validators: ["required", "strongPassword"]},
      {name: "passwordConfirmation", value: this.userForm.value.passwordConfirmation!, validators: ["required", {confirm: "password"}]},
    ]
    const validations = formValidation.Validations(validationFields)
    this.emailError = formValidation.GetFieldError('email')
    this.passwordError = formValidation.GetFieldError('password')
    this.passwordConfirmationError = formValidation.GetFieldError('passwordConfirmation')

    if(validations.valid){
      const registerUserAdapter = new RegisterUserAdapter();

      const registerUser = new RegisterUser(registerUserAdapter)

      await registerUser.Register(this.userForm.value.email!, this.userForm.value.password!)
      .then(response=>{
        this.AuthService.Authenticate(response.token)
        this.router.navigate(['space/users'], {replaceUrl: true})
      })
      .catch(error=>{
        this.formError = error.error
      })
    }
  }
}
