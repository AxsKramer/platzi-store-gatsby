import React from 'react';
import {SEO} from '../components';
import {Button, Purchase} from '../styles/components';
import {Link} from 'gatsby';

const Gracias = () => {
  return (
    <>
      <SEO title='Comprar exitosa' />
      <Purchase>
        <h2>Compra Exitosa</h2>
        <p>Espero que disfrutes tu swag</p>
        <p>Nunca pares de aprender!</p>
        <span role='img' aria-label='emoji'>🍣</span>
        <Link to='/'>
          <Button>Volver al catálogo</Button>
        </Link>
      </Purchase>
    </>
  )
}

export default Gracias
