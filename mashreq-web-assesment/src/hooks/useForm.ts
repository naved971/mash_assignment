import { useState } from 'react';

// hook to provide validation support
const useForm = (initialState: any = {}, validations: any[] =[]) => {

    const validate = (validations: any[], values: any) => {
        const errors = validations
            .map(validation => validation(values))
            .filter(validation => typeof validation === 'object');
        return { isValid: errors.length === 0, errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}) };
    }

    const { isValid: initialIsValid, errors: initialErrors } = validate(validations, initialState);


    const [values, setValues] = useState<any>(initialState);
    const [errors, setErrors] = useState<any>(initialErrors);
    const [isValid, setValid] = useState<boolean>(initialIsValid);
    const [touched, setTouched] = useState<any>({});


    const changeHandler = (event: any, otherFields? : any ) => {
        let newValues = { ...values, [event.target.name]: event.target.value, ...otherFields };
        let { isValid, errors } = validate(validations, newValues);
        setValues(newValues);
        setValid(isValid);
        setErrors(errors);
        setTouched({ ...touched, [event.target.name]: true });
    };

    return { values, changeHandler, isValid, errors, touched, setValues , setValid, setErrors};
}

export default useForm;