import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux'
import { setupStore, AppStore } from '../redux/store'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import i18n from '../config/i18n'
import { I18nextProvider } from 'react-i18next'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<any>
  store?: AppStore
}

const mockTheme = createTheme({
  palette: {
    primary: {
      main: '#ff9800',
    },
  },
});

//Render providers for testing
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in.
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
        <ThemeProvider theme={mockTheme}>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              {children}
            </I18nextProvider>
          </Provider>
        </ThemeProvider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
