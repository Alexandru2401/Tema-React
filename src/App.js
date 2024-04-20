import React, { useReducer } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style.css';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Products } from './pages/Products';
import { Product } from './pages/Product';
import { Header } from './components/Header';
import { initialThemeState, themeReducer } from './store/Theme/Reducer';
import { ThemeContext } from './store/Theme/Context';
import { cartReducer, initialCartState } from './store/Cart/reducer';
import { CartContext } from './store/Cart/context';
import { favouriteReducer } from './store/Favorites/reducer';
import { initialFavouriteProduct } from './store/Favorites/reducer';
import { FavouriteContext } from './store/Favorites/context'; 
import { Favorites } from './pages/Favorites';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/products',
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  }, 
  {
    path: '/favorites',
    element: (
      <>
        <Header/>
        <Favorites/>
      </>
    )
  }
]);

export default function App() {
  // Initializez reducer-ul pt tema
  // La useState foloseam [state, setState] , acum folosim dispatch in loc de setState 
  const [themeState, themeDispatch] = useReducer(themeReducer, initialThemeState);

  // Initializez reducer-ul pt cosul de cumparaturi 
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  //Initializez reducerul pt Favourite 
  const [favouriteState, favouriteDispatch] = useReducer(favouriteReducer, initialFavouriteProduct);
//  Creez constanta care imi va tine valoarea care imi va pasa mai departe catre ThemeContext.Provider
  const themeContextValue = {
    themeState,
    themeDispatch
  }

  // Creez valoarea pe care am sa o pasez mai departe catre CartContext.Provider
  const CartContextValue = {
    state,
    dispatch
  }

  const favouriteContextValue = {
    favouriteState,
    favouriteDispatch
  }

return (
    // Fac disponibil catre toate aplicatia mea state-urile globale: state-ul pt tema + state-ul global de cart
    
    <FavouriteContext.Provider value={favouriteContextValue}>
      <CartContext.Provider value={CartContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="App primary">
            <RouterProvider router={router} />
          </div>
        </ThemeContext.Provider>
      </CartContext.Provider>
    </FavouriteContext.Provider>
  );
}
