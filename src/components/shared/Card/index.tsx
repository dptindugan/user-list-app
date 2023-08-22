import React from 'react';
import { UserInterface } from 'interfaces/index';


export type CardType = {
  name: UserInterface['name'];
  email: UserInterface['email'];
  phone: UserInterface['phone'];
  address: UserInterface['address'];
  children: React.ReactNode;
};

const Card: React.FC<CardType> = ({ name, email, phone, address, children }) => {
  return (
    <div className='card'>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone Number:</strong> {phone}
      </p>
      <p>
        <strong>Address:</strong> {address.street} {address.suite}{' '}
        {address.zipcode}, {address.city}
      </p>
      {children}
    </div>
  );
};

export default Card;
