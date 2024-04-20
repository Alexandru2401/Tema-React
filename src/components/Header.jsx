import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../store/Cart/context';

export function Header() {
  const {state} = useContext(CartContext);
  return (
    <header>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          <Link to="/cart">Coș {state.products.length}</Link>
          <Link to="/favorites" className='p-3'>Produse Favorite</Link>
        </div>
      </div>
    </header>
  );
}
