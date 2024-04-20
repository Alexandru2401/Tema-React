export const initialThemeState = {
    // Setam initial tema pe light
    theme: 'light'
}

export function themeReducer(state, action) {
    switch(action.type) {
        case 'LIGHT': {
            //Returnez noul state 
            return {
                theme: 'light'
            }
        }
        case "DARK": {
            return {
                theme: 'dark'
            }
        }
        default: {
            return state;
        }
    }
}