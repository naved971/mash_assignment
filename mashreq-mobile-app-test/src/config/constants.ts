export const USERNAME_KEY = 'username';


export enum Languages {
    en = 'en',
    ja = 'ja',
    nl = 'nl'
}
export enum GlobalErrors {
    NetworkError = "Network Error"
}

export enum APIStatus {
    Error = "error",
    Success = "success"
}

export enum Countries {
    UAE = "UAE",
    India = "India",
    Egypt = "Egypt",
    Saudia = "Saudia"
}

export const CountryImages: any = {
    [Countries.UAE]: require('../assets/UAE.png'),
    [Countries.India]: require('../assets/India.png'),
    [Countries.Egypt]: require('../assets/Egypt.png'),
    [Countries.Saudia]: require('../assets/Saudia.png'),
}

export const LanguagesImages: any = {
    [Languages.en]: require('../assets/en.png'),
    [Languages.ja]: require('../assets/ja.png'),
    [Languages.nl]: require('../assets/nl.png'),
}