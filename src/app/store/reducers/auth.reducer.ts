import Auth from '../models/auth.model';
import { createReducer, on } from '@ngrx/store';
import { AuthAction } from '../actions/auth.action';

export const initialState: Auth = {token:false}

export const AuthReducer = createReducer(initialState, on(AuthAction, (state, auth)=> auth))
