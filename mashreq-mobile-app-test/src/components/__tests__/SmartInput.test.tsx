import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SmartInput from '../SmartInput';
import { mockTheme } from '../../config/testUtils';

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));


test('renders SmartInput component', () => {
  const mockOnChangeText = jest.fn();

  const { getByPlaceholderText, getByTestId } = render(
    <SmartInput
      placeholder="First Name"
      onChangeText={mockOnChangeText}
    />
  );

  
  const textInput = getByPlaceholderText('First Name');

  fireEvent.changeText(textInput, 'Hello, Naved!');

  // Check if the onChangeText function is called with the correct text
  expect(mockOnChangeText).toHaveBeenCalledWith('Hello, Naved!');


});