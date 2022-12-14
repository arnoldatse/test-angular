import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpaceComponent } from './space/space.component';

const routes: Routes = [
  {path: '', redirectTo:'/auth', pathMatch:'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'space', component: SpaceComponent, children: [
    {path: 'users', component: ListUsersComponent},
    {path: 'users/details/:id', component: DetailsUserComponent}
  ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthComponent,
    ListUsersComponent,
    DetailsUserComponent,
    NotFoundComponent,
    SpaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
