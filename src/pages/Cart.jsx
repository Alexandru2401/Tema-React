import React, { useContext } from 'react';
import { CartContext } from '../store/Cart/context';
import { Button } from 'react-bootstrap';
import { removeFromCart } from '../store/Cart/actions'

export function Cart() {
// Extrag state-ul global de cart si functia care imi modifica state-ul de cart
  const {state, dispatch} = useContext(CartContext)
function handleProductRemove(productId){
  // Pas 1: apelez actiunea (definita in store/cart/actions.js) cu id-ul produsului primit ca parametru 
  const actionResult = removeFromCart(productId);
  // console.log(actionResult)
  dispatch(actionResult);
}
  return (
    <div className='mx-2'>
        {/* Afisam continutul state-ului global de cart */}
        {state.products.length === 0 ? (
          <p>Nu sunt produse in cos</p>
        ) : (
          state.products.map((product)=>{
            const totalProductPrice = product.price * product.quantity;
            return (
              <div key={product.id} className='my-3'>
                <div className='d-flex align-items-center justify-content-between'>
                  <img src={product.image} alt="" />
                  <strong>{product.name}</strong>
                  <p>
                    Pret: {product.price} x Cantitate: {product.quantity} = {totalProductPrice}
                  </p>
                </div>
                <Button variant='danger' onClick={()=>{handleProductRemove(product.id)}}>Remove</Button>
              </div>
            )
          })
        )
        }
    </div>
  );
}
