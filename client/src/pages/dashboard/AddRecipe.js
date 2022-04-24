import React, { useState, useEffect } from 'react';

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
      oilsList,
      problemsList,
      molestias,
   } = useAppContext();
   // PRIMERO CAMBIO TODO EN EL STATE ( LOS DATOS DE LA RECETA ), Y LUEGO LO MANDO

   useEffect(() => {
      let tempProblemsList = molestias.split(',');
      tempProblemsList = tempProblemsList.map(problem => problem.trim());
      changeStateValues({ name: 'problemsList', value: tempProblemsList });
   }, [molestias]);

   const handleRecipeInput = e => {
      const name = e.target.name;
      const value = e.target.value;

      changeStateValues({ name, value });
   };

   // al picarle a editar ( en Recipe.js ) ==> se meten los valores de ese trabajo en el state y se manda a la pag de crear-recipe con estos valores pre-llenados, aqui se editan y se manda el patch a la DB

   const handleSubmit = e => {
      e.preventDefault();

      // prettier-ignore
      if (!title || !desc || oilsList.length === 0 || problemsList.length === 0) {
         displayAlert();
         return;
      }

      // if (isEditing) {
      // editRecipe({ oilsList, problemsList });
      // return;
      // }

      // lo manda a crear con los valores q tiene en el state
      createRecipe();

      // limpia campos tras crear receta
      // clearValues();
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
               <SelectMultiple
                  initValue={oilsList}
                  changeStateValues={changeStateValues}
               />

               {/* PROBLEMS */}
               <TextField
                  label="Molestias"
                  placeholder="Separa las molestias con una coma (,)"
                  multiline
                  maxRows={4}
                  name="molestias"
                  value={molestias}
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
               <ButtonEnviar handleSubmit={handleSubmit} />

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
