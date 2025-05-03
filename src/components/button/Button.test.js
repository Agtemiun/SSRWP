jest.mock('react-router-dom');
jest.mock('react-markdown', () => (props) => <>{props.children}</>);

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import { MemoryRouter } from 'react-router-dom';

describe('Button', () => {
  const mockData = {
    Index: 1,
    LabIndex: 2,
    Name: 'Test Button',
    Description: 'Some description',
    Route: '/test'
  };

  test('renders button', () => {
    render(
      <MemoryRouter>
        <Button data={mockData} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('handles click', () => {
    const onClick = jest.fn();
    render(
      <MemoryRouter>
        <Button data={mockData} onClick={onClick} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
