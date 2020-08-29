import styled from 'styled-components';


export const CheckoutItemContainer = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   padding: 20px 0;
   border-bottom: 1px solid grey;
   min-height: 100px;
   font-size: 20px;
`;

export const ItemImageContainer = styled.div`
   width: 23%;
   padding-right: 20px;

   img{
      width: 100%;
      height: 100%;
  }
`;

export const TextContainer = styled.span`
  width: 23%;
`;

export const QuantityContainer = styled(TextContainer)`
  display: flex;

  span {
    margin: 0 10px;
  }

  div {
    cursor: pointer;
  }
`;

export const RemoveButtonContainer = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
