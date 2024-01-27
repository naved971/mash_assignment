import {Dispatch, SetStateAction, createContext} from 'react'
import { Theme } from '@mui/material'
import { AppThemeOptions } from './ThemeOptions'
import { createTheme } from '@mui/material/styles'
import { Countries } from '../config/constants'

// Theme helper methods

export interface AppTheme {
  name: string,
  theme: Theme
}


export interface CountryTheme {
  country?:Countries | string
}


export interface AppThemeProps {
  appTheme: AppTheme
  setAppTheme: Dispatch<SetStateAction<AppTheme>> | (() => {}),
}

export interface CountryThemeProps {
  country: CountryTheme
  setCountry: Dispatch<SetStateAction<CountryTheme>> | (() => {})
}


export const AppThemeContext = createContext<AppThemeProps>(
  {} as AppThemeProps
)

export const CountryThemeContext = createContext<CountryThemeProps>(
  {} as CountryThemeProps
)

const theme = createTheme(
  {palette: AppThemeOptions[4].palette}
)

export const defaultAppTheme = {
  name: AppThemeOptions[4].name,
  theme: theme,
}

export const defaultCountry ={
  country: ""
}
