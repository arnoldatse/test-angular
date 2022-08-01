import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  /**
   * Authenticate my user
   * @param token
   */
  Authenticate(token: string){
    sessionStorage.setItem('token', token)
  }

  /**
   * Check if user is authenticate
   * @returns
   */
  Check(): boolean{
    return sessionStorage.getItem('token') ? true : false
  }

  /**
   * Disconnect user
   */
  Logout(){
    sessionStorage.removeItem('token')
  }
}
