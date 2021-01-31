import styled from 'styled-components';

export const SignInContainer = styled.div`
   max-width: 400px;
   display: flex;
   flex-direction: column;

   h2{
      margin: 10px 0;
   }

   @media (max-width : 768px){
      margin-bottom : 50px;
   }
`;

export const ButtonsContainer = styled.div`
   display: flex;
   justify-content: space-between;
`;
