import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from 'interfaces/index';

export type userStateType = {
  users: UserInterface[];
  initialUsers: UserInterface[];
  error: null | string;
};

export const usersInitialState: userStateType = {
  users: [],
  initialUsers: [],
  error: null,
};

const users = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {
    setUsers(state, { payload }) {
      state.users = payload;
      state.initialUsers = payload;
    },
    deleteUser(state, { payload }) {
      const newUserList = state.users.filter(({ id }) => id !== payload);
      state.users = newUserList;
      state.initialUsers = newUserList;
    },
    filterUser(state, { payload }) {
      if (payload === '') {
        state.users = state.initialUsers;
        return;
      }
      const escapeSpecialChar = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      };

      const stateUsers = state.initialUsers;
      const filteredUser = stateUsers.filter(({ address, ...userData }) => {
        const userDataString = `${escapeSpecialChar(
          userData.name
        )}|${escapeSpecialChar(userData.email)}|${escapeSpecialChar(
          userData.phone
        )}`;
        const userAddressString = `${escapeSpecialChar(
          address.city
        )}|${escapeSpecialChar(address.suite)}|${escapeSpecialChar(
          address.street
        )}|${escapeSpecialChar(address.zipcode)}`;
        console.log('userDataString', userDataString);

        const pattern = new RegExp(
          `\\b(?:${userDataString}|${userAddressString})\\b`,
          'gi'
        );

        const hasMatch = pattern.test(payload);
        return hasMatch;
      });

      state.users = filteredUser;
    },
    handleError(state) {
      state.error = 'There was a problem fetching users list';
    },
  },
});

export const { handleError, setUsers, deleteUser, filterUser } = users.actions;
export default users.reducer;

export const fetchUsers = () => async (dispatch: any) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: UserInterface[] = await res.json();

    dispatch(setUsers(users));
  } catch (error) {
    console.error(error);
    dispatch(handleError());
  }
};
