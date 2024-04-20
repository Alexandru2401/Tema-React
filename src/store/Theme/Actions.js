// In fisierul action.js vom crea actiunile pt tema aplicatiei - le creeam ca niste niste functii care o sa faca return la un obiect cu cheia type + valoarea acesteia

export function setThemeLight () {
    return {
        // Valoare cheii se scrie cu litere mari
        type: 'LIGHT'
    }
}

export function setThemeDark () {
    return {
        type:"DARK"
    }
}