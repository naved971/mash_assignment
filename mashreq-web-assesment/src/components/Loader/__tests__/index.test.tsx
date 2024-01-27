import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../index';

test('Loader renders when visible is true', () => {
  const props = {
    visible: true,
  };

  // Act
  render(<Loader {...props} />);

  // Assert
  const loaderElement = screen.getByTestId('loader');
  expect(loaderElement).toBeInTheDocument();
});

test('Loader does not render when visible is false', () => {
  const props = {
    visible: false,
  };

  // Act
  render(<Loader {...props} />);

  // Assert
  const loaderElement = screen.queryByTestId('loader');
  expect(loaderElement).not.toBeInTheDocument();
});