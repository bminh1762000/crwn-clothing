import React from "react";

import {
  CartItemContainer,
  ItemDetailsContainer,
  ItemImage,
} from "./cart-item.styles";

const CartItem = ({
  item: {
    product: { imageUrl, price, name },
    quantity,
  },
}) => (
  <CartItemContainer>
    <ItemImage src={imageUrl} alt="item" />
    <ItemDetailsContainer>
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;
