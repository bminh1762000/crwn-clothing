import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import {selectorCartItems} from '../../redux/cart/cart.selectors';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import { selectCartItemsCount} from '../../redux/cart/cart.selectors';

import { CartDropdownContainer, CartItemsContainer, CartDropdownButton, NotifyContainer } from './cart-dropdown.styles';

const CartDropdown = ( { cartItems, history, toggleCartHidden, count }) => (
  <CartDropdownContainer >
    <CartItemsContainer>
      {count ? (cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))) :
      (<NotifyContainer>Cart is empty</NotifyContainer>)
    }
      
    </CartItemsContainer>
    <CartDropdownButton onClick={() => {
        history.push('/checkout');
        toggleCartHidden();
    }
    }>
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems : selectorCartItems,
  count : selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden : () => dispatch(toggleCartHidden())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CartDropdown));
