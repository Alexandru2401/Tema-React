// Actiunile pe care le indentific sunt: adaug si scot din cos
// Functia de addToCart trb sa aiba ca parametru si produsul - pt ca eu sa pot sa il trimit mai departe catre reducer (deoarece reducer-ul o sa imi modifice state-ul)
export function addToCart(product) {
    return {
        type: 'ADD_TO_CART',
        payload: product
    }
}

// Functia de removeFromCart are in schimb nev de un product id - pt ca trb ca in reducer sa indentific dupa id ce produs sa scot din cos
export function removeFromCart(productId){
    return {
        type: "REMOVE_FROM_CART",
        payload: productId
    }
}
