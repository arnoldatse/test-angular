import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidation, FieldValidations, FieldError } from 'src/core/useCases/FormValidation/FormValidation';
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

  emailError: FieldError = false;
  passwordError: FieldError = false;
  passwordConfirmationError: FieldError = false;

  constructor() { }

  ngOnInit(): void {
  }

  RegisterAction(){
    const formValidation = new FormValidation()
    const validationFields: FieldValidations = [
      {name: "email", value: this.userForm.value.email!, validators: ["required", "email"]},
      {name: "password", value: this.userForm.value.password!, validators: ["required", "strongPassword"]},
      {name: "passwordConfirmation", value: this.userForm.value.passwordConfirmation!, validators: [{confirm: "password"}]},
    ]
    const validations = formValidation.validations(validationFields)
    this.emailError = formValidation.getFieldError('email')
    this.passwordError = formValidation.getFieldError('password')
    this.passwordConfirmationError = formValidation.getFieldError('passwordConfirmation')

    if(validations.valid){
      const registerUserAdapter = new RegisterUserAdapter();

      const registerUser = new RegisterUser(registerUserAdapter)
      const response = registerUser.Register(this.userForm.value.email!, this.userForm.value.password!)

      console.log('response page', response)
    }
  }

}
