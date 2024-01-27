import React from 'react';
import RegisterUser from '../index';
import { mockTheme, renderWithProviders } from '../../../config/testUtils';
import { fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native'
import * as Utils from '../../../config/utils';

const mockState = {
    userRegistration: {
        response: { status: "success" },
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

jest.mock('i18next', () => ({
    changeLanguage: jest.fn(),
    dir: jest.fn(),
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

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }: any) => children;
    return { KeyboardAwareScrollView };
});

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

 // Mock the functions from '../../config/utils'
jest.mock('../../../config/utils', () => ({
    setKeyStore: jest.fn(),
    getTheme: jest.fn(),  // Mock the getTheme function
    setLanguage : jest.fn()
}));

const mockedUtils = Utils as jest.Mocked<typeof Utils>;


test('renders RegisterUser component', async () => {

    const mockNavigation = {
        navigate: jest.fn(),
        dispatch: jest.fn(),
    };
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

    mockedUtils.setKeyStore.mockResolvedValue();

    // Render the component with mocked dependencies
    const { toJSON , getByTestId } = renderWithProviders(<RegisterUser/>);
    fireEvent.press(getByTestId('languageButton')); 
    fireEvent.press(getByTestId('selectContainer')); 
    fireEvent.press(getByTestId('languageListItem_0')); 
    fireEvent.press(getByTestId('countryListItem_0')); 


    const usernameInput = getByTestId('username');
    // Simulate user input in the username field
    fireEvent.changeText(usernameInput, 'testUsername');

    const passwordInput = getByTestId('password');
    // Simulate user input in the password field
    fireEvent.changeText(passwordInput, 'testUser@123');

    const firstNameInput = getByTestId('firstName');
    // Simulate user input in the firstName field
    fireEvent.changeText(firstNameInput, 'naved');

    const lastNameInput = getByTestId('lastName');
    // Simulate user input in the lastName field
    fireEvent.changeText(lastNameInput, 'khan');

    // Expect the component to match the snapshot
    expect(toJSON()).toMatchSnapshot();
});