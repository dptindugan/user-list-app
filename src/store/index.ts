import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
