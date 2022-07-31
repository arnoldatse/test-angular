import { createAction, props } from '@ngrx/store';
import Auth from '../models/auth.model';

export const AuthAction = createAction('Auth', props<Auth>())

