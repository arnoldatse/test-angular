import { createFeatureSelector, createSelector } from "@ngrx/store";
import Auth from "../models/auth.model";

export const selectAuth = createSelector(
  createFeatureSelector('auth'),
  (auth: Auth)=>auth.token
)
