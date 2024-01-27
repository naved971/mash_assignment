import { renderHook, act } from '@testing-library/react';
import useForm from '../useForm';

// Mock validations (you can customize these for your specific tests)
const mockValidations = [
  (values : any) => (values.username ? null : { username: 'Username is required' }),
  (values: any) => (values.password ? null : { password: 'Password is required' }),
];

test('useForm hook works correctly', () => {
  const initialState = {
    username: '',
    password: '',
  };

  // Render the hook
  const { result } = renderHook(() => useForm(initialState, mockValidations));

  // Initial state check
  expect(result.current.values).toEqual(initialState);
  expect(result.current.isValid).toBe(false);
  expect(result.current.errors).toEqual({
    username: 'Username is required',
    password: 'Password is required',
  });
  expect(result.current.touched).toEqual({});

  // Simulate a change in the form
  act(() => {
    result.current.changeHandler({ target: { name: 'username', value: 'john_doe' } });
  });

  // Check the updated state
  expect(result.current.values.username).toBe('john_doe');
  expect(result.current.isValid).toBe(false);
  expect(result.current.errors).toEqual({ password: 'Password is required' });
  expect(result.current.touched).toEqual({ username: true });


});