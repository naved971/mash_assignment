import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { setupStore } from '../redux/store'
import { render } from '@testing-library/react-native';


export const mockTheme = {
  // Your theme object goes here
  TextPrime: '#3d3d3d',
  ErrorTextAlert: '#cc0000',
  LightTextPrime: '#797979',
  SubtleHuePrimary: '#FFF3E0',
  LuminousPrimary: '#FFB74D',
  InactiveShade: '#D3D3D3',
  CoreChroma: "#FF9800",
  TextSecondary: "#ffffff"
};


export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
          <NavigationContainer>
            <ThemeProvider theme={mockTheme}>
              {children}
            </ThemeProvider>
          </NavigationContainer>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}



