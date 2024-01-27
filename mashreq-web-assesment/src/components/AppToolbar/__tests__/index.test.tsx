import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppToolbar from '../index';

// Mock the react-i18next module
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

test('renders AppToolbar correctly', () => {
  render(<AppToolbar />);

  fireEvent.click(screen.getByRole('button', { name: 'Change language' }));

  // Check if the language button is rendered
  expect(screen.getByText('EN')).toBeInTheDocument();

});

