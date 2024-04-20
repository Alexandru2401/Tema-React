import React, { useContext } from "react";
import { FavouriteContext } from "../store/Favorites/context";
import { Button } from "react-bootstrap";
import { removeFromFavourites } from "../store/Favorites/actions";

export function Favorites() {
    const {favouriteState, favouriteDispatch} = useContext(FavouriteContext);
    function handleFavouriteRemove(productId){
        const favouriteAction = removeFromFavourites(productId);
        favouriteDispatch(favouriteAction);
    }
    return (
        <div className="mx-2">
            { favouriteState.products.length === 0 ? (
                <p>Nu ai produse favorite</p>
            ) : (
                favouriteState.products.map((product)=>{
                return (
                    <div key={product.id} className='my-3'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <img src={product.image} alt="" />
                            <strong>{product.name}</strong>
                            <p>
                            Pret: {product.price}
                            </p>
                        </div>
                        <Button variant='danger' className="mt-3" onClick={()=>{handleFavouriteRemove(product.id)}}>Sterge de la favorite</Button>
                    </div>
                    )
                })
            ) 
            }
           
        </div>
    )
}