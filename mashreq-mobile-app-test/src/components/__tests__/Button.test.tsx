import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';
import { mockTheme } from '../../config/testUtils';

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));

const mockOnPress = jest.fn();

describe('Button component', () => {
    it('renders correctly in enabled state', () => {
        const { getByText, getByTestId } = render(
            <Button onPress={mockOnPress} title="Click Me" disabled={false} testID="buttonContainer" />
        );

        const buttonContainer = getByTestId('buttonContainer');
        const buttonText = getByText('Click Me');

        // Assertions for enabled state
        expect(buttonContainer).toBeTruthy();
        expect(buttonText).toBeTruthy();

    });

    it('renders correctly in disabled state', () => {
        const { getByText, getByTestId } = render(
            <Button onPress={mockOnPress} title="Click Me" disabled={true} testID="buttonContainer"/>
        );

        const buttonContainer = getByTestId('buttonContainer');
        const buttonText = getByText('Click Me');

        // Assertions for disabled state
        expect(buttonContainer).toBeTruthy();
        expect(buttonText).toBeTruthy();

    });

    it('calls onPress function when clicked in enabled state', () => {
        const { getByTestId } = render(
            <Button onPress={mockOnPress} title="Click Me" disabled={false} testID="buttonContainer" />
        );

        const buttonContainer = getByTestId('buttonContainer');

        fireEvent.press(buttonContainer);

        // Check if onPress is called
        expect(mockOnPress).toHaveBeenCalled();
    });

});