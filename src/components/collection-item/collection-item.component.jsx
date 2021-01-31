import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { addItemStart } from "../../redux/cart/cart.actions";
import { selectTokenId } from "../../redux/user/user.selectors";

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  CollectionItemImage,
  PriceContainer,
  NameContainer,
  AddButton,
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem, token, history }) => {
  const { name, price, imageUrl, _id } = item;

  return (
    <CollectionItemContainer>
      <CollectionItemImage imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}$</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        onClick={() =>
          token
            ? addItem({ _id, token })
            : history.push("/signin")
        }
      >
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectTokenId,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItemStart(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CollectionItem));
