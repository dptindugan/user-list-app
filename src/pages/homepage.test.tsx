import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Homepage from './';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  userStateType,
  deleteUser,
  filterUser
} from 'store/reducers/users';
import { UserInterface } from 'interfaces/index';
const mockStore = configureStore<{ users: userStateType }>([thunk]);

const mockUsers: UserInterface[] = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@email.com',
    phone: '+6301875',
    address: {
      street: 'Skiles Walks',
      suite: 'Suite 351',
      city: 'Roscoeview',
      zipcode: '33263',
      geo: {
        lat: '-31.8129',
        lng: '62.5342',
      },
    },
  },
  {
    id: 2,
    name: 'User 2',
    email: 'user2@email.com',
    phone: '092225522',
    address: {
      street: 'Hoeger Mall',
      suite: 'Apt. 692',
      city: 'South Elvis',
      zipcode: '53919-4257',
      geo: {
        lat: '29.4572',
        lng: '-164.2990',
      },
    },
  },
];

describe('Homepage Component', () => {
  it('renders user cards', () => {
    const initialState = {
      users: {
        users: mockUsers,
        initialUsers: mockUsers,
        error: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    const userCards = screen.getAllByTestId('user-card');
    expect(userCards).toHaveLength(2);
  });
  it('deletes a user on button click', async () => {
    const initialState = {
      users: {
        users: mockUsers,
        initialUsers: mockUsers,
        error: null,
      },
    };

    const store = mockStore(initialState);
    const mockDeleteUser = jest.spyOn(store, 'dispatch');
    mockDeleteUser.mockImplementation();

    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    const deleteButton = screen.getByTestId(mockUsers[0].id);
    fireEvent.click(deleteButton);
    store.dispatch(deleteUser(1));

    expect(mockDeleteUser).toHaveBeenCalledWith(deleteUser(1));
  });
  it('Search a user base on the search field', () => {
    const initialState = {
      users: {
        users: mockUsers,
        initialUsers: mockUsers,
        error: null,
      },
    };

    const store = mockStore(initialState);
    const mockDispatch = jest.fn();
    jest.spyOn(store, 'dispatch').mockImplementation(mockDispatch);

    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'user2@email.com' } });

    expect(mockDispatch).toHaveBeenCalledWith(filterUser('user2@email.com'));
  });
});
