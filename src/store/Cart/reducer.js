
// Imi definesc un state initial si il export 
export const initialCartState = { products: []}

// Pas 2 - definesc reducer-ul si il export 
// NU MODIFIC niciodata direct parametrul state
export function cartReducer(state, action) {
    // Evaluez cu o instructiune de tip switch ce actiune primesc 
    switch(action.type) {
        case 'ADD_TO_CART': {
            // Aici o sa punem logica care imi trateaza produsul
            let updapedProducts;
            let newState;
            // Verific mai intai daca produsul exista deja in cos - in state-ul curent, adica in paremetrul state 
            const foundProduct = state.products.find((product) => { 
                return product.id === action.payload.id;
            })
            // Daca produsul exista in cos, ii maresc cantitatea cu 1
            if(foundProduct) {
                // Modific cant produsului fara a modifica array-ul initial - fol metoda map
                updapedProducts = state.products.map((product) => {
                    // Ma uit daca produsul iterat este cel pe care l-am primit ca payload, daca da atunci returnez un produs nou care sa contina toate proprietatile produsului iterat, dar o sa ii marim cantitatea cu 1
                    if (foundProduct.id === product.id){
                        return {
                            ...product,
                            quantity: product.quantity + 1
                        } 
                    } else {
                        // Daca nu este produsul cautat, atunci il returnez asa cum este - fara sa-l modific
                        return product;
                    }
                })
            } else {
                // Daca produsul nu exista, il adaug, fara sa modific array-ul existent de produse 
                const newProduct = {
                    ...action.payload,
                    // Pt ca e primul produs adaugat, cantitatea va fii 1
                    quantity: 1
                }
                updapedProducts = [...state.products, newProduct];
            }
            // Creez un nou state pe baza noilor produse din variabila updapedProducts
            newState = {
                products: updapedProducts
            }
            return newState;
        }
        case "REMOVE_FROM_CART": {
            // Pt a sterge un produs din cos, filtram din state-ul curent de product, produsul care id-ul primit pe payload 
            const filteredProducts = state.products.filter((product)=>{
                return product.id !== action.payload;
            })
            const newState = {
                products: filteredProducts
            }
            return newState;
        }
        // Nu uitam sa tratam si cazul default 
        default: {
            return state;
        } 
    }
}