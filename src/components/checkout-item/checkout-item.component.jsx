import React from 'react';
import {connect} from 'react-redux';
import {removeItem, addItem, clearItemFromCart} from '../../redux/cart/cart.actions';
import {CheckoutItemContainer, ItemImageContainer, TextContainer, QuantityContainer, RemoveButtonContainer} from './checkout-item.styles';

const CheckoutItem = ({cartItem, removeItem, addItem, clearItem}) =>{
    const { imageUrl, name, price, quantity } = cartItem;
    return (
        <CheckoutItemContainer>
            <ItemImageContainer>
                <img src={imageUrl} alt="items" />
            </ItemImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div onClick={() => removeItem(cartItem)}>
                    &#10094;
                </div>
                <span>{quantity}</span>
                <div onClick={() => addItem(cartItem)}>
                    &#10095;
                </div>
            </QuantityContainer>
            <TextContainer>${price}</TextContainer>
            <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
                &#10005;
            </RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = (dispatch) =>({
    removeItem : item => dispatch(removeItem(item)),
    addItem : item => dispatch(addItem(item)),
    clearItem : item => dispatch(clearItemFromCart(item))
})
export default connect(null,mapDispatchToProps)(CheckoutItem);