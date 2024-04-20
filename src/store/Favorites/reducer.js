export const initialFavouriteProduct = {products: []};

export function favouriteReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_FAVOURITES': {
            let favoriteProducts;
            let newState;
            // Verific daca produsul este deja adaugat la favorite
            const existingFavouriteProduct = state.products.find((product)=>{
                return product.id === action.payload.id;
            }) 
            if (existingFavouriteProduct) {
                return product;
            } else {
                const newFavouriteProduct = {
                    ...action.payload,
                    quantity: 1
                }
                favoriteProducts = [...state.products, newFavouriteProduct]
            }
            newState = {
                products: favoriteProducts 
            }
            return newState;
        }
        case 'REMOVE_FROM_FAVOURITES': {
            const filteredFavouriteProducts = state.products.filter((product)=>{
                 return product.id !== action.payload;
            })
            const newState = {
                products: filteredFavouriteProducts
            }
            return newState;
       }
       default: {
        return state;
       }
    }
}