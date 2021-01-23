import { Link } from "gatsby"
import React from "react";
import {MenuItem, StyledHeader} from '../styles/components';

const Header = () => (
  <StyledHeader >
    <Link to='/'>
      <img src='https://i.postimg.cc/6q3pg48v/Logo.png' alt='logo de platzi swag'/>
    </Link>
    <nav>
      <ul>
        <MenuItem margin>
          <Link to='/'>Productos</Link>
        </MenuItem>
        <MenuItem margin>
          <a href='https://platzi.com'>Platzi</a>
        </MenuItem>
        <MenuItem>
          <Link to='/cart'>
            <span>
              <img src='https://i.postimg.cc/L6wpMxLt/cart.png' alt='cart logo' />
            </span>
          </Link>
        </MenuItem>
      </ul>
    </nav>
  </StyledHeader>
)

export default Header
