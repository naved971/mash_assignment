import { renderHook, act } from '@testing-library/react-native';
import useForm from '../useForm';

test('useForm hook works correctly', () => {
    const initialState = { username: '', password: '' };

    // Mock validation function for testing
    const mockValidation = jest.fn((values) => {
        const errors: any = {};
        if (!values.username) {
            errors.username = 'Username is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    });

    const { result } = renderHook(() => useForm(initialState, [mockValidation]));

    // Initial state
    expect(result.current.values).toEqual(initialState);
    expect(result.current.errors).toEqual({
        "password": "Password is required",
        "username": "Username is required",

    });
    expect(result.current.isValid).toBe(false);
    expect(result.current.touched).toEqual({});

    // Update values using changeHandler
    act(() => {
        result.current.changeHandler({ name: 'username', value: 'testuser' });
    });

    // After updating username
    expect(result.current.values.username).toBe('testuser');
    expect(result.current.touched.username).toBe(true);

    // Validate and check errors and validity
    expect(result.current.errors).toEqual({ "password": "Password is required" });
    expect(result.current.isValid).toBe(false);

    // Update values and trigger validation with an invalid password
    act(() => {
        result.current.changeHandler({ name: 'password', value: '' });
    });

    // After updating password
    expect(result.current.values.password).toBe('');
    expect(result.current.touched.password).toBe(true);

    // Validate and check errors and validity
    expect(result.current.errors).toEqual({ password: 'Password is required' });
    expect(result.current.isValid).toBe(false);

    act(() => {
        result.current.changeHandler({ name: 'password', value: 'test1234@' });
    });

    // After updating password again
    expect(result.current.values.password).toBe('test1234@');
    expect(result.current.touched.password).toBe(true);

    // check errors 
    expect(result.current.errors).toEqual({});
});