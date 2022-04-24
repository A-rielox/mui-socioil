import React from 'react';
import { useEffect } from 'react';

import { useAppContext } from '../../context/appContext';
import styled from 'styled-components';
import { Alert } from '../../components';

// MUI

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { ButtonEnviar, ButtonLimpiar } from '../../components/mui/Button';
import SelectMultiple from '../../components/mui/SelectMultiple';

// los valores los pongo en el global ( y no en la pura pag como en el register ) xq para editar y agregar receta voy a ocupar la misma pag ( y la diferencia en la pag la hago con el "isEditing" )
const AddRecipe = () => {
   useEffect(() => {
      // Anything in here is fired on component mount.
      return () => {
         // Anything in here is fired on component unmount.
         console.log('desmontado');
         clearValues();
      };
   }, []);

   const {
      isLoading,
      showAlert,
      displayAlert,
      title,
      desc,

      oilsOptions,
      changeStateValues,
      isEditing,
      editRecipe,
      clearValues,
      createRecipe,
      oil1,
      oil2,
      oil3,
      oil4,
      oil5,
      problem1,
      problem2,
      problem3,
   } = useAppContext();
   // PRIMERO CAMBIO TODO EN EL STATE ( LOS DATOS DE LA RECETA ), Y LUEGO LO MANDO

   const handleRecipeInput = e => {
      const name = e.target.name;
      const value = e.target.value;

      changeStateValues({ name, value });
   };

   // al picarle a editar ( en Recipe.js ) ==> se meten los valores de ese trabajo en el state y se manda a la pag de crear-recipe con estos valores pre-llenados, aqui se editan y se manda el patch a la DB

   const handleSubmit = e => {
      e.preventDefault();

      // LISTAS -- oils y problems
      let oilsList = [oil1, oil2, oil3, oil4, oil5];
      let problemsList = [problem1, problem2, problem3];

      oilsList = oilsList.filter(oil => oil.length > 1);

      problemsList = problemsList.filter(problem => problem.length > 1);

      // como sea lo pruebo en la API y en la DB
      // prettier-ignore
      if (!title || !desc || oilsList.length === 0 || problemsList.length === 0) {
         displayAlert();
         return;
      }

      if (isEditing) {
         editRecipe({ oilsList, problemsList });
         return;
      }

      // lo manda a crear con los valores q tiene en el state
      createRecipe({ oilsList, problemsList });

      // limpia campos tras crear receta
      clearValues();
   };

   return (
      <Box
         sx={{
            borderRadius: 'var(--borderRadius)',
            width: '100%',
            background: 'var(--white)',
            padding: '3rem 2rem 4rem',
            boxShadow: 'var(--shadow-2)',
         }}
      >
         <Paper
            component="form"
            sx={{
               margin: 0,
               borderRadius: 0,
               boxShadow: 'none',
               padding: 0,
               maxWidth: '100%',
               width: '100%',
            }}
         >
            <h3>{isEditing ? 'editar recetita' : 'añadir recetita'} </h3>

            {showAlert && <Alert />}

            <TextField
               label="Titulo"
               multiline
               fullWidth
               maxRows={2}
               name="title"
               value={title}
               onChange={handleRecipeInput}
               sx={{ mb: 2 }}
            />

            <TextField
               label="Descripción"
               multiline
               fullWidth
               maxRows={4}
               // rows={4} no se puede cuando hay maxRows
               name="desc"
               value={desc}
               onChange={handleRecipeInput}
               sx={{ mb: 2 }}
            />

            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               spacing={2}
               justifyContent="space-between"
               alignItems={{ xs: 'center', sm: 'flex-start' }}
            >
               {/* ACEITES */}
               <SelectMultiple />

               {/* PROBLEMS */}
               <TextField
                  label="Molestias"
                  placeholder="Separa las molestias con una coma (,)"
                  multiline
                  maxRows={4}
                  name="problem1"
                  value={problem1}
                  onChange={handleRecipeInput}
                  sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}
               />
            </Stack>

            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               spacing={2}
               justifyContent="flex-end"
               alignItems="flex-end"
               sx={{ mt: 2 }}
            >
               <ButtonEnviar />

               <ButtonLimpiar />
            </Stack>
         </Paper>
      </Box>
   );
};

export default AddRecipe;

const Wrapper = styled.section`
   h3 {
      margin-top: 0;
   }
   .form {
      margin: 0;
      border-radius: 0;
      box-shadow: none;
      padding: 0;
      max-width: 100%;
      width: 100%;
   }
`;
