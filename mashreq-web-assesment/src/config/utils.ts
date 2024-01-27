import i18n from 'i18next'
import { AxiosError, AxiosResponse } from 'axios';

//Change language for app
export const setLanguage = async (languageKey: string) => {
    i18n.changeLanguage(languageKey)
};

//handle axios error
export const handleAxiosErrorMessage = (error: AxiosError) => {
    const axiosError = error as AxiosError;
    const response: AxiosResponse<any> | undefined = axiosError.response;
    const errorMessage = response?.data?.message || "Network Error";
    
    return errorMessage;
  }
  