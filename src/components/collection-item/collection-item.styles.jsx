import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const CollectionItemContainer = styled.div`
   position: relative;
   width: 22vw;
   display: flex;
   flex-direction: column;
   height: 350px;
   align-items: center;
   margin-top: 20px;

    &:hover{
      button{
        display: block;
        opacity: 0.85;
      }

      .image{
        opacity: 0.8;
      }
    }
`;

export const AddButton = styled(CustomButton)`
   display: none;
   position: absolute;
   top: 255px;
   width: 80%;
   opacity: 0.6;
`;

export const CollectionItemImage = styled.div`
   width: 100%;
   height: 95%;
   background-size: cover;
   background-position: center;
   margin-bottom: 5px;
`;

export const CollectionFooterContainer = styled.div`
   width: 100%;
   height: 5%;
   display: flex;
   justify-content: space-between;
   font-size: 18px;
`;

export const NameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const PriceContainer = styled.span`
  width: 10%;
  text-align: right;
`;
 