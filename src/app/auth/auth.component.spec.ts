import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should alert required fields', ()=>{
    //alert required fields
    component.LoginAction()

    expect(component.emailError).toMatch('Ce champ est obligatoir')
    expect(component.passwordError).toMatch('Ce champ est obligatoir')
  })

  it('it should alert required valid email and password', ()=>{
    //alert required fields
    component.userForm.setValue({email: 'test.com', password: 'aaaaaa'})
    component.LoginAction()

    expect(component.emailError).toMatch('Ce champ doit contenir une adresse email valide')
    expect(component.passwordError).toMatch('Le mot de passe doit contenir minnimum 8 lettres, inclure une lettre majuscule, une lettre miniscule et un chiffre')
  })

  it('it should login', ()=>{
    component.userForm.setValue({email: 'test@mail.com', password: 'Paaaaa253652'})
    component.LoginAction()

    expect(component.emailError).toEqual(false)
    expect(component.passwordError).toEqual(false)
  })
});
