import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '.'; // Import your component

describe('Button Component', () => {
  test('renders with text', () => {
    render(<Button label='Click me' />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with class', () => {
    render(<Button label='Click me' className='btn-danger' />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass('btn-danger');
  })

  // Add more test cases as needed
});
