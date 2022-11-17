import { selectedTheme } from "../constants";
import * as ThemeActionType from './ThemeAction'

const initialState = {
    appTheme: selectedTheme,
    error: null
}

const ThemeReducer = (state = initialState, action) => {

    switch (action.type) {
        case ThemeActionType.TOGGLE_THEME_SUCCESS:
            return {
                ...state,
                appTheme: action.payload.selectTheme
            }
        case ThemeActionType.TOGGLE_THEME_FAILURE:
            return {
                ...state,
                error: payload.error
            }
        default: return state
    }
}

export default ThemeReducer