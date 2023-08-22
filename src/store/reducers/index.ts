import { combineReducers, Reducer } from "redux";
import usersReducer, { userStateType } from './users'

export type reducersType = {
  users: Reducer<userStateType>;
};

const reducers: reducersType = {
  users: usersReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer