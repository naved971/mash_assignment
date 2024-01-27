import React from 'react';
import Dashboard from '../index';
import { renderWithProviders, mockTheme } from '../../../config/testUtils';
import { fireEvent, waitFor } from '@testing-library/react-native';
import * as Utils from '../../../config/utils';
import { useNavigation } from '@react-navigation/native'

const mockState = {
    userRegistration: {
        response: {
            status: "success",
            data: {
                country: "Inda",
                firstName: "Naved",
                lastName: "Khan"
            }
        },
        loading: false,
        error: null,
    }
};

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));


jest.mock('react-i18next', () => ({
    // mock useTranslation hook 
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: jest.fn(),
                language: 'EN'
            }
        }
    }
}))

jest.mock('react-redux', () => {
    return {
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn().mockImplementation((selectorFn) => selectorFn(mockState)),
        useDispatch: () => jest.fn(),
    };
});

jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: ''
}))

// Mock the functions from '../../config/utils'
jest.mock('../../../config/utils', () => ({
    getKeyStore: jest.fn(),
    deleteKeyStore: jest.fn(),
    getTheme: jest.fn(),  // Mock the getTheme function
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

const mockedUtils = Utils as jest.Mocked<typeof Utils>;


test('test dashboard', async () => {


    const mockNavigation = {
        navigate: jest.fn(),
        dispatch: jest.fn(),
    };
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    
    const { toJSON, getByTestId } = renderWithProviders(<Dashboard />);

    mockedUtils.getKeyStore.mockResolvedValue('mockUsername');

    await waitFor(() => {
        expect(mockedUtils.getKeyStore).toHaveBeenCalledWith('username');
    });

    mockedUtils.deleteKeyStore.mockResolvedValue();


    fireEvent.press(getByTestId('logOut'));

    await waitFor(() => {
        expect(mockedUtils.deleteKeyStore).toHaveBeenCalledWith('username');
    });

    expect(toJSON()).toMatchSnapshot();
});