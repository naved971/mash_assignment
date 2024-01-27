import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingOverlay from '../LoadingOverlay';
import { mockTheme } from '../../config/testUtils';

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => (mockTheme),
}));

test('renders LoadingOverlay', () => {
  const { getByTestId } = render(<LoadingOverlay />);
  const loader = getByTestId('LoadingOverlay');

  expect(loader).toBeTruthy();
});