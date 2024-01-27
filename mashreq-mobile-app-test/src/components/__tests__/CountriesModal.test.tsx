import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CountriesModal from '../CountriesModal';
import { mockTheme } from '../../config/testUtils';

jest.mock('react-i18next', () => ({
    // mock useTranslation hook 
    useTranslation: () => {
        return {
            t: (str: string) => str,
        }
    },
}))

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));

test('renders CountriesModal component', () => {
    const mockSetCountriesModalVisible = jest.fn();
    const mockOnCountrySelect = jest.fn();

    const { getByTestId } = render(
        <CountriesModal
            countriesModalVisible={true}
            setCountriesModalVisible={mockSetCountriesModalVisible}
            onCountrySelect={mockOnCountrySelect}
        />
    );

    // Simulate pressing a country in the list
    fireEvent.press(getByTestId('countryListItem_0')); 

    // Check if the onCountrySelect function is called
    expect(mockOnCountrySelect).toHaveBeenCalled();

});