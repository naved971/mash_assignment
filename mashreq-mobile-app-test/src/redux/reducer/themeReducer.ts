import * as Actions from '../actions/themeActions'
import { getTheme } from '../../config/utils'

const initialState = { theme: getTheme()}

const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.CHANGE_APP_THEME:
      return {
        ...state,
        theme: getTheme(action.payload)
      };
    default:
      return state;
  }
};

export default themeReducer;