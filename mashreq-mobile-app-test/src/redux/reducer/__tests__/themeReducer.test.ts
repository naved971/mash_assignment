import themeReducer from '../themeReducer';
import * as Actions from '../../actions/themeActions';
import { getTheme } from '../../../config/utils';
import { Countries } from '../../../config/constants';

describe('themeReducer', () => {
  it('should return the initial state', () => {
    const initialState = { theme: getTheme() };
    const state = themeReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle CHANGE_APP_THEME', () => {
    const initialState = { theme: getTheme(Countries.India) };
    const action = Actions.changeAppTheme(Countries.Saudia);
    const state = themeReducer(initialState, action);
    const expectedState = { theme: getTheme(Countries.Saudia) };
    expect(state).toEqual(expectedState);
  });
});