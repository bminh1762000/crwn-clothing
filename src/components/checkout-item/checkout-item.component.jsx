import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  removeItemStart,
  addItemStart,
  clearItemFromCartStart,
} from "../../redux/cart/cart.actions";
import {
  CheckoutItemContainer,
  ItemImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./checkout-item.styles";
import { selectTokenId } from "../../redux/user/user.selectors";

const CheckoutItem = ({ cartItem, removeItem, addItem, clearItem, token }) => {
  const {
    product: { imageUrl, name, price, _id },
    quantity,
  } = cartItem;
  return (
    <CheckoutItemContainer>
      <ItemImageContainer>
        <img src={imageUrl} alt="items" />
      </ItemImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => removeItem({ _id, token })}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => addItem({ _id, token })}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>${price}</TextContainer>
      <RemoveButtonContainer onClick={() => clearItem({ _id, token })}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectTokenId,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeItemStart(item)),
  addItem: (item) => dispatch(addItemStart(item)),
  clearItem: (item) => dispatch(clearItemFromCartStart(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
