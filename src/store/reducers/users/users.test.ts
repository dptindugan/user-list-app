import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import usersReducer, {
  setUsers,
  deleteUser,
  handleError,
  fetchUsers,
  filterUser,
} from './';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockUsers = [
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

describe('users slice', () => {
  it('should handle setUsers', () => {
    const initialState = { users: [], initialUsers: [], error: null };
    const newState = usersReducer(initialState, setUsers(mockUsers));
    expect(newState.users).toHaveLength(2);
    expect(newState.users[0].name).toBe('User 1');
  });

  it('should handle deleteUser', () => {
    const initialState = {
      users: mockUsers,
      initialUsers: mockUsers,
      error: null,
    };
    const newState = usersReducer(initialState, deleteUser(1));
    expect(newState.users).toHaveLength(1);
  });

  it('should update error message', () => {
    const initialState = { users: [], initialUsers: [], error: null };
    const newState = usersReducer(initialState, handleError());

    expect(newState.error).toBe('There was a problem fetching users list');
  });

  it('should dispatch fetchUsers', async () => {
    const store = mockStore({
      users: { users: [], initialUsers: [], error: null },
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUsers),
      })
    ) as any;

    await store.dispatch(fetchUsers() as any);

    const actions = store.getActions();
    expect(actions).toEqual([setUsers(mockUsers)]);
  });
});

describe('Filter users', () => {
  it('should filter user state based on keyword', () => {
    const initialState = {
      users: mockUsers,
      initialUsers: mockUsers,
      error: null,
    };

    const searchKeyword = 'Hoeger Mall';

    const newState = usersReducer(initialState, filterUser(searchKeyword));
    expect(newState.users).toHaveLength(1);
    expect(newState.users[0].address.street).toEqual(searchKeyword);
  });

  it('should return all user if search_keyword is empty', () => {
    const initialState = {
      users: mockUsers,
      initialUsers: mockUsers,
      error: null,
    };

    const search_keyword = '';

    const newState = usersReducer(initialState, filterUser(search_keyword));
    expect(newState.users).toHaveLength(2);
  });
});
