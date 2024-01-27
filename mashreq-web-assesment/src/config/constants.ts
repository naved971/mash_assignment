import IndianFlagImage from '../assets/India.png'
import UaeFlagImage from '../assets/UAE.png'
import EgyptFlagImage from '../assets/Egypt.png'
import SaudiaFlagImage from '../assets/Saudia.png';
import CountryImage from '../assets/countries.png';
import enImage from '../assets/en.png'
import jaImage from '../assets/ja.png'
import nlImage from '../assets/nl.png'

export enum Languages {
    en = 'en',
    ja = 'ja',
    nl = 'nl'
}

// I have made Countries enum and images list separately because enum is getting used at multiple places, don't want to take images in every import

export enum Countries {
    UAE = "UAE",
    India = "India",
    Egypt = "Egypt",
    Saudia = "Saudia"
}

export enum APIStatus {
    Error = "error",
    Success = "success",
}

export const CountryImages: any = {
    [Countries.India]: IndianFlagImage,
    [Countries.Saudia]: SaudiaFlagImage,
    [Countries.Egypt]: EgyptFlagImage,
    [Countries.UAE]: UaeFlagImage,
}

export const LanguagesImages: any = {
    [Languages.en]: enImage,
    [Languages.ja]: jaImage,
    [Languages.nl]: nlImage,
}

export const DefaultValues:any = {
    CountryImage
}
