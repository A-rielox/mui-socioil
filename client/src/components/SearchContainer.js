import { useAppContext } from '../context/appContext';
import { InputSimple, InputSelect } from '.';
import styled from 'styled-components';

// ---------------- MUI
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import SelectSingle from '../components/mui/SelectSingle';
import { ButtonLimpiar } from '../components/mui/Button';

const SearchContainer = () => {
   const {
      isLoading,
      list4Problems,
      oilsOptions,
      search,
      searchOil,
      searchProblem,
      sort,
      sortOptions,
      changeStateValues,
      clearFilters,
   } = useAppContext();

   // cada vez q cambia uno de estos valores en el context => se llama getRecipes()
   const handleSearch = e => {
      if (isLoading) return;
      const name = e.target.name;
      const value = e.target.value;
      // la fcn q cambia dinámicamente los valores en el state
      changeStateValues({ name, value });
   };

   const handleSubmit = e => {
      // e.preventDefault();
      clearFilters();
   };

   return (
      <Wrapper>
         <form className="form">
            <h4>Búsqueda</h4>

            {/* search position */}
            <div className="form-center">
               <Stack direction="column">
                  <Stack
                     direction={{ xs: 'column', sm: 'row' }}
                     spacing={2}
                     sx={{ mb: 2 }}
                  >
                     {/* titulo */}
                     <TextField
                        label="Titulo"
                        placeholder="Que el título contenga..."
                        name="search"
                        value={search}
                        onChange={handleSearch}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />

                     {/* aceite */}
                     <SelectSingle
                        title="Con aceitito"
                        name="searchOil"
                        value={searchOil}
                        changeValueInState={handleSearch}
                        selectOptions={['todos', ...oilsOptions]}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                     {/* problem */}
                     <TextField
                        label="Con problema"
                        name="searchProblem"
                        value={searchProblem}
                        onChange={handleSearch}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />

                     {/* sort */}
                     <SelectSingle
                        title="Orden"
                        name="sort"
                        value={sort}
                        changeValueInState={handleSearch}
                        selectOptions={sortOptions}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />
                  </Stack>
               </Stack>

               <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <ButtonLimpiar onClick={handleSubmit} />
               </Box>
            </div>
         </form>
      </Wrapper>
   );
};

export default SearchContainer;

const Wrapper = styled.section`
   .form {
      width: 100%;
      max-width: 100%;
      box-shadow: var(--shadow-2);

      /* del gral */
      margin: 0 auto;
      padding-top: 1rem;
   }

   /* .form-center {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 2rem;
      row-gap: 0.5rem;
   } */

   .form-input,
   .form-select,
   .btn-block {
      height: 35px;
   }
   h5 {
      font-weight: 700;
   }
   .btn-block {
      align-self: end;
      margin-top: 1rem;
   }
   @media (min-width: 768px) {
      /* .form-center {
         grid-template-columns: 1fr 1fr;
      } */
   }
   @media (min-width: 992px) {
      /* .form-center {
         grid-template-columns: 1fr 1fr 1fr;
      } */
      .btn-block {
         margin-top: 0;
      }
   }
`;
