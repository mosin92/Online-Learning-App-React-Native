import { darkTheme, lightTheme } from "../constants";


export const TOGGLE_THEME_SUCCESS = 'TOGGLE_THEME_SUCCESS'

export const TOGGLE_THEME_FAILURE = 'TOGGLE_THEME_FAILURE'

const ToggleSuccess = (selectTheme) => ({
    type: TOGGLE_THEME_SUCCESS,
    payload: { selectTheme }
})

const ToggleFailure = (error) => ({
    type: TOGGLE_THEME_FAILURE,
    payload: { error }
})

export const ToggleTheme = (themeType) => dispatch => {

    if (themeType === 'dark') {
        dispatch(ToggleSuccess(darkTheme))
    }
    else if (themeType === 'light') {
        dispatch(ToggleSuccess(lightTheme))
    }
    else {
        dispatch(ToggleFailure({ error: "Invalid" }))
    }
}