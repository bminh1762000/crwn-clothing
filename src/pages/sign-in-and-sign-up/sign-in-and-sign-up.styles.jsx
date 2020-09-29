import styled from 'styled-components';

export const SignInAndUpContainer = styled.div`
   max-width: 900px;
   display: flex;
   justify-content: space-between;
   margin: 30px auto;

   @media (max-width : 768px) {
      flex-direction : column;
      justify-content : center;
      align-items : center;
   }
`;