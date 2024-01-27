import React from 'react';
import { renderWithProviders } from '../../../config/testUtils'; 
import Dashboard from '../index';

test('renders Dashboard component', () => {
  const initialState = {
    userAuthentication: {
      response: {
        data: {
          username: 'testUsername',
          firstName: 'John',
          lastName: 'Doe',
          country: 'US',
        },
      },
    },
  };

  const { getByText } = renderWithProviders(<Dashboard />, { preloadedState: initialState });

  // Add your assertions based on the rendered content
  expect(getByText('testUsername')).toBeInTheDocument();
  expect(getByText('John Doe')).toBeInTheDocument();
  expect(getByText('US')).toBeInTheDocument();
});