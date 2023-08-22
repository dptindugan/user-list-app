import React from 'react';
import Input from 'components/shared/Input/';
import { useDispatch } from 'react-redux';
import { filterUser } from 'store/reducers/users';
import './header.css';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const onSearchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterUser(e.target.value));
  };

  return (
    <div className='header sm:pl-4 md:pl-16'>
      <Input name='search' label='Search User' onChange={onSearchHandle} data-testid="search-input" />
    </div>
  );
};

export default Header;
