import React, { useEffect } from 'react';
import Card from 'components/shared/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from 'store/reducers/users';
import { UserInterface } from 'interfaces/index';
import Header from 'components/layouts/Header';
import Button from 'components/shared/Button';

const Homepage: React.FC = () => {
  const dispatch: any = useDispatch();
  const { users } = useSelector((state: any) => state.users);

  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(fetchUsers());
    };

    fetchUserData();
  }, [dispatch]);

  const onDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <Header />
      <div className='max-sm:p-4 md:p-12'>
        <div className='inline-flex flex-row flex-wrap gap-4'>
          {users.map((userInfo: UserInterface) => (
            <div
              className='max-sm:full-width md:width-360'
              key={userInfo.id}
              data-testid='user-card'
            >
              <Card {...userInfo}>
                <Button
                  className='filled btn-danger'
                  label='Delete'
                  data-testid={userInfo.id}
                  onClick={() => onDelete(userInfo.id)}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
