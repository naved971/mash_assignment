import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Select from '../Select';
import { Text } from 'react-native';
import { mockTheme } from '../../config/testUtils';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: ''
}))

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));

test('renders Select component with correct content and handles onPress', () => {
  const mockOnPress = jest.fn();

  // Example left content (can be any React element)
  const exampleLeftContent = <Text testID="leftContent">Left Content</Text>;

  const { getByText, getByTestId } = render(
    <Select onPress={mockOnPress} label="Select Label" value="Selected Value" left={exampleLeftContent} testID='selectContainer' />
  );

  // Check if the label, value, and left content are rendered
  const labelElement = getByText('Select Label');
  const valueElement = getByText('Selected Value');
  const leftContentElement = getByTestId('leftContent');

  expect(labelElement).toBeTruthy();
  expect(valueElement).toBeTruthy();
  expect(leftContentElement).toBeTruthy();

  // Check if the component structure is correct
  const selectContainer = getByTestId('selectContainer');
  const iconContainer = getByTestId('iconContainer');

  expect(selectContainer).toContainElement(iconContainer);
  expect(selectContainer).toContainElement(leftContentElement);

  fireEvent.press(selectContainer);

  // Check if onPress function is called
  expect(mockOnPress).toHaveBeenCalled();
});
