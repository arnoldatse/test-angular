import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should alert required fields', ()=>{
    //alert required fields
    component.RegisterAction()

    expect(component.emailError).toMatch('Ce champ est obligatoir')
    expect(component.passwordError).toMatch('Ce champ est obligatoir')
    expect(component.passwordConfirmationError).toMatch('Ce champ est obligatoir')
  })

  it('it should alert required valid email,  password and password confirmation', ()=>{
    //alert required fields
    component.userForm.setValue({email: 'test.com', password: 'aaaaaa', passwordConfirmation: 'bbbbbbb'})
    component.RegisterAction()

    expect(component.emailError).toMatch('Ce champ doit contenir une adresse email valide')
    expect(component.passwordError).toMatch('Le mot de passe doit contenir minnimum 8 lettres, inclure une lettre majuscule, une lettre miniscule et un chiffre')
    expect(component.passwordConfirmationError).toMatch('La confirmation est incorrecte')
  })

  it('it should register', ()=>{
    component.userForm.setValue({email: 'test@mail.com', password: 'Paaaaa253652', passwordConfirmation: 'Paaaaa253652'})
    component.RegisterAction()

    expect(component.emailError).toEqual(false)
    expect(component.passwordError).toEqual(false)
    expect(component.passwordConfirmationError).toEqual(false)
  })
});
