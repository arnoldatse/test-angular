import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthReducer } from './store/reducers/auth.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { StoreModule } from '@ngrx/store';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo:'/auth', pathMatch:'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'users', component: ListUsersComponent},
  {path: 'users/details/:id', component: DetailsUserComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthComponent,
    ListUsersComponent,
    DetailsUserComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    StoreModule.forRoot({
      auth: AuthReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
