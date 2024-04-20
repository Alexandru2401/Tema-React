import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../store/Theme/Context';
import { setThemeDark, setThemeLight } from '../store/Theme/Actions';
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import { FavouriteContext } from '../store/Favorites/context';
import { addToFavourites } from '../store/Favorites/actions';

export function Home() {
  // Fiindca doar vom modifica state-ul global de cart, avem nev doar de dispatch
  const {dispatch} = useContext(CartContext);
  // Cerem 4 produse de la API si actualizam state-ul.
  const [products, setProducts] = useState([]);

  const {favouriteDispatch} = useContext(FavouriteContext);
  // Vom accesa si modifica stateul global de tema => avem nevoie de themeState si themeDispatch
  const {themeState, themeDispatch} = useContext(ThemeContext);  
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=4')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);
  // Acum ca am acces la acest state, extrag val temei
  const {theme} = themeState;

  // Definesc funct care imi modifica state-ul global

  function handleThemeChange() {
    // Primul lucru e sa tin intr-o constanta ce imi returneaza una din actiunile definite in action.js
    let actionResult;
    if (theme==="light"){
      // Declansez schimbarea state-ului global pe tema
      actionResult = setThemeDark();
      themeDispatch(actionResult)
    } else if (theme==="dark"){
      // Declansez cealalta actiune care imi seteaza tema pe light
      actionResult = setThemeLight();
      themeDispatch(actionResult)
    }
  }

  function handleAddToCart(product) {
    // Pas 1: apelez actiunea (definite in store/Cart/action.js)
    const actionResult = addToCart(product);
    // Trimit rez actiunii catre reducer 
    dispatch(actionResult);
  }

  function handleAddToFavourite(product){
    const favouriteAction = addToFavourites(product);
    favouriteDispatch(favouriteAction);
  }
  // Afisam pe ecran produsele venite de la API.
  return (
    <div className={theme === 'light'? 'bg-white' : 'bg-dark'}>
      <div className="d-flex flex-column align-items-center">
        {/* Adaug un buton care o sa-mi modifice tema */}
        <Button variant='primary' className='mt-3' onClick={handleThemeChange}>Change theme</Button>
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              {/* Fiecare card are link-ul corespunzator catre pagina de produs. */}
              {/* Functia encodeURI transforma caracterele care nu sunt acceptate in url. */}
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button variant="success" onClick={()=>{
                handleAddToCart({
                  id: product.dealID,
                  image: product.thumb,
                  name: product.title,
                  price: product.salePrice
                })
              }}>Adaugă în coș</Button>
              <Button variant='primary' className='mt-3' 
              onClick={()=>{
                handleAddToFavourite({
                  id: product.dealID,
                  image: product.thumb,
                  name:product.title,
                  price: product.salePrice
                })
              }}>Adauga la favorite</Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele</Link>
     
    </div>
  );
}
