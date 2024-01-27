import { Countries } from "./constants";

export const base = {
    BackgroundCore: "#ffffff",
    LightBackgroundCore: "#f7f7f7",
    SecondaryBackdrop: "#3d3d3d",
    LightSecondaryBackdrop: "#797979",
    TextPrime: "#3d3d3d",
    LightTextPrime: "#797979",
    TextSecondary: "#ffffff",
    TextBackgroundPrime: "#ffffff",
    TextBackgroundSecondary: "#3d3d3d",
    InactiveShade: '#D3D3D3',
    ErrorTextAlert: '#cc0000'
};

const defaultPalettes =  {
    SubtleHuePrimary: "#E0F2F1",
    LuminousPrimary: "#4DB6AC",
    CoreChroma: "#009688",
    VibrantCore: "#00695C",
    ForegroundPrime: "#FFFFFF"
}

export const themePalettes = {
    [Countries.UAE]: {
        SubtleHuePrimary: "#FFDAB9",
        LuminousPrimary: "#FFA07A",
        CoreChroma: "#FF4500",
        VibrantCore: "#FF8C00",
        ForegroundPrime: "#FFFFFF"
    },
    [Countries.India]: {
        SubtleHuePrimary: "#FFE5B4",
        LuminousPrimary: "#FFFFFF",
        CoreChroma: "#138808",
        VibrantCore: "#FF4500",
        ForegroundPrime: "#000000"
    },
    [Countries.Egypt]: {
        SubtleHuePrimary: "#E6E6E6",
        LuminousPrimary: "#FFFFFF",
        CoreChroma: "#C8102E",
        VibrantCore: "#000000",
        ForegroundPrime: "#C8102E"
    },
    [Countries.Saudia]: {
        SubtleHuePrimary: "#DFF0D8",
        LuminousPrimary: "#FFFFFF",
        CoreChroma: "#008033",
        VibrantCore: "#154734",
        ForegroundPrime: "#000000"
    },
    default:defaultPalettes
};