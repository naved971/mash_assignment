import React from 'react';
import { render } from '@testing-library/react-native';
import Text, { fontVariant } from '../Text';
import { mockTheme } from '../../config/testUtils';

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));

test('renders text with correct style based on variant', () => {
  const { getByText } = render(
    <Text variant={fontVariant.h1} color="red">
      Heading 1
    </Text>
  );

  const textElement = getByText('Heading 1');

  expect(textElement).toBeTruthy();

  // Check if the correct style is applied based on the variant
  expect(textElement).toHaveStyle({
    fontSize: 34,
    fontWeight: 'bold',
    color: 'red', 
  });

  
});
