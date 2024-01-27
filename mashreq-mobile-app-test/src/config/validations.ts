import { RegEx } from './RegEx'


const isRequired = (value: any) => {
    return value != null && value.trim().length > 0;
}

const validateUsernameBasedOnCountry = (value: any, country?: string) => {
    let pattern = new RegExp(RegEx['USERNAME']);
    if(country){
        pattern = new RegExp(RegEx[`USERNAME_${country.toUpperCase()}`])
    }
    return pattern.test(value)
}

const validatePassword = (value: any) => {
    let pattern = new RegExp(RegEx['PASSWORD']);
    return pattern.test(value)
}

const validateNames = (value: any) => {
    let pattern = new RegExp(RegEx['ALPHABETS_ONLY_2CHARS']);
    return pattern.test(value)
}

export const validationsLoginForm = (props: any) =>{
    const { country, t } = props;
    return (
        [
            ({ username }: any) => isRequired(username) || { username: t('validations.usernameRequired')},
            ({ username }: any) => validateUsernameBasedOnCountry(username, country) || { username: t('validations.usernameValid') },
            ({ password }: any) => isRequired(password) || { password: t('validations.passwordRequired')},
            ({ password }: any) => validatePassword(password) || { password: t('validations.passwordValid') },
            ({ firstName }: any) => isRequired(firstName) || { firstName: t('validations.firstNameRequired')},
            ({ firstName }: any) => validateNames(firstName) || { firstName: t('validations.firstNameValid') },
            ({ lastName }: any) => isRequired(lastName) || { lastName: t('validations.lastNameRequired')},
            ({ lastName }: any) => validateNames(lastName) || { lastName: t('validations.lastNameValid') },
        ]
    )
}
