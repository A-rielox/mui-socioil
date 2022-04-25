import { useAppContext } from '../context/appContext';
import { InputSimple, InputSelect } from '.';
import styled from 'styled-components';

// ---------------- MUI
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import SelectSingle from '../components/mui/SelectSingle';
import { ButtonLimpiar } from '../components/mui/Button';

const SearchContainer = () => {
   const {
      isLoading,
      categoryOptions,
      searchCategory,
      searchBlog,
      sort,
      sortOptions,
      changeStateValues,
      clearFilters,
   } = useAppContext();

   // SOLO CAMBIO LOS VALORES EN EL STATE, SE TIENEN Q BUSCAR EN EL BLOGSCONTAINER CON UN USEEFFECT CADA Q CAMBIE UNO DE ESTOS VALORES, VER RECIPESCONTAINER

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
      <Paper
         sx={{
            borderRadius: 'var(--borderRadius)',
            width: '100%',
            padding: '3rem 2rem 4rem',
            boxShadow: 'var(--shadow-2)',
         }}
      >
         <Container maxWidth="md">
            <h4>Búsqueda</h4>

            <Stack direction="column">
               <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mb: 2 }}
               >
                  <TextField
                     label="En el titulo"
                     placeholder="Que el título contenga..."
                     name="searchBlog"
                     value={searchBlog}
                     onChange={handleSearch}
                     sx={{ width: { xs: '100%', sm: '50%' } }}
                  />

                  <SelectSingle
                     title="Categoria"
                     name="searchCategory"
                     value={searchCategory}
                     changeValueInState={handleSearch}
                     selectOptions={['todas', ...categoryOptions]}
                     sx={{ width: { xs: '100%', sm: '50%' } }}
                  />
               </Stack>

               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Box mr={2} sx={{ width: '100%' }}>
                     <SelectSingle
                        title="Orden"
                        name="sort"
                        value={sort}
                        changeValueInState={handleSearch}
                        selectOptions={sortOptions}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />
                  </Box>
               </Stack>

               <Box
                  sx={{
                     mt: 2,
                     display: 'flex',
                     justifyContent: 'flex-end',
                  }}
               >
                  <ButtonLimpiar onClick={handleSubmit} />
               </Box>
            </Stack>
         </Container>
      </Paper>
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
   .form-input,
   .form-select,
   .btn-block {
      height: 35px;
   }
   .form-row {
      margin-bottom: 0;
   }
   .form-center {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 2rem;
      row-gap: 0.5rem;
   }
   h5 {
      font-weight: 700;
   }
   .btn-block {
      align-self: end;
      margin-top: 1rem;
   }
   @media (min-width: 768px) {
      .form-center {
         grid-template-columns: 1fr 1fr;
      }
   }
   @media (min-width: 992px) {
      .form-center {
         grid-template-columns: 1fr 1fr 1fr;
      }
      .btn-block {
         margin-top: 0;
      }
   }
`;
