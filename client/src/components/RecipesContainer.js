import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import PageBtnContainer from './PageBtnContainer';
import styled from 'styled-components';

// MUI
import RecipeMui from './mui/RecipeMui';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const RecipesContainer = () => {
   // prettier-ignore
   const {
      getRecipes, recipes, isLoading, page, totalRecipes, search, searchOil,
      searchProblem, sort, numOfPages } = useAppContext();

   useEffect(() => {
      getRecipes(/* { onHold: false } */);
   }, [search, searchOil, searchProblem, sort, page]);

   if (isLoading) {
      return <Loading center />;
   }

   if (recipes.length === 0) {
      return (
         <Wrapper>
            <h2>No encontramos recetitas 😳 ...</h2>
         </Wrapper>
      );
   }

   return (
      <Container sx={{ my: 2 }} maxWidth="lg">
         <h5>
            {totalRecipes} receta{recipes.length > 1 && 's'} encontrada
            {recipes.length > 1 && 's'}
         </h5>

         <Box
            sx={{
               display: 'grid',
               gridTemplateColumns: {
                  sm: '1fr',
                  md: 'repeat(2, 1fr)',
               },
               gap: 4,
            }}
         >
            {recipes.map(recipe => {
               return <RecipeMui key={recipe._id} {...recipe} />;
            })}
         </Box>

         {numOfPages > 1 && <PageBtnContainer />}
      </Container>
   );
};

export default RecipesContainer;

const Wrapper = styled.section`
   margin-top: 4rem;

   h2 {
      text-transform: none;
   }
   /* 
   & > h5 {
      font-weight: 700;
   }
   .recipes {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 2rem;
   }
   @media (min-width: 1200px) {
      .recipes {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 1rem;
      }
   }

   .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      background: #0000008a;
      display: flex;
      align-items: center;
      justify-content: center;

      z-index: 100;
   }

   .modal {
      width: clamp(50%, 700px, 90%);
      height: min(50%, 300px);

      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      article {
         position: relative;
         -webkit-box-shadow: 9px 9px 22px 13px rgba(0, 0, 0, 0.43);
         box-shadow: 9px 9px 22px 13px rgba(0, 0, 0, 0.43);
      }
   } */
`;
