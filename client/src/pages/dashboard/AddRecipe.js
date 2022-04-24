import React from 'react';
import { useEffect } from 'react';

import { useAppContext } from '../../context/appContext';
import styled from 'styled-components';
import { InputSimple, Alert, InputSelect } from '../../components';

// MUI
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
//
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

// ================
import InputSimpleMui from '../../components/mui/InputSimpleMui';
import { ButtonEnviar, ButtonLimpiar } from '../../components/mui/Button';

// los valores los pongo en el global ( y no en la pura pag como en el register ) xq para editar y agregar receta voy a ocupar la misma pag ( y la diferencia en la pag la hago con el "isEditing" )
const AddRecipe = () => {
   // red red PRUEBA red red
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

   //mui
   const [personName, setPersonName] = React.useState([]);
   const handleChangeOils = event => {
      const {
         target: { value },
      } = event;
      setPersonName(
         // On autofill we get a stringified value.
         typeof value === 'string' ? value.split(',') : value
      );
   };
   const ITEM_HEIGHT = 48;
   const ITEM_PADDING_TOP = 8;
   const MenuProps = {
      PaperProps: {
         style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
         },
      },
   };
   //problems
   const [valueProblem, setValueProblem] = React.useState('');

   const handleChangeProblem = event => {
      setValueProblem(event.target.value);
   };

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
      <Wrapper>
         <form className="form">
            <h3>{isEditing ? 'editar recetita' : 'añadir recetita'} </h3>

            {showAlert && <Alert />}

            <InputSimpleMui
               label="Titulo"
               multiline
               fullWidth
               maxRows={2}
               name="title"
               value={title}
               onChange={handleRecipeInput}
            />

            <InputSimpleMui
               label="Descripción"
               multiline
               fullWidth
               maxRows={4}
               rows={4}
               name="desc"
               value={desc}
               onChange={handleRecipeInput}
            />

            {/* ACEITES */}
            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               spacing={2}
               justifyContent="space-between"
               // alignItems="center"
               alignItems={{ xs: 'center', sm: 'flex-start' }}
            >
               <FormControl
                  id="multiline-oils"
                  sx={{
                     flex: 1,
                     width: { xs: '100%', sm: 'auto' },
                     // '& fieldset > legend': { width: '60px' },
                  }}
                  label="aceititos"
               >
                  <InputLabel id="oils-input">Aceititos</InputLabel>
                  <Select
                     labelId="oils-input"
                     id="multiple-oils"
                     multiple
                     value={personName}
                     onChange={handleChangeOils}
                     input={
                        <OutlinedInput
                           color="secondary"
                           id="select-multiple-oils"
                           label="Chip"
                        />
                     }
                     renderValue={selected => (
                        <Box
                           sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 0.5,
                           }}
                        >
                           {selected.map(value => (
                              <Chip key={value} label={value} />
                           ))}
                        </Box>
                     )}
                     MenuProps={MenuProps}
                  >
                     {oilsOptions.map(name => (
                        <MenuItem
                           key={name}
                           value={name}
                           // style={getStyles(name, personName, theme)}
                        >
                           {name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>

               {/* PROBLEMS */}

               <InputSimpleMui
                  label="Molestias"
                  placeholder="Separa las molestias con una coma (,)"
                  multiline
                  maxRows={4}
                  // name={'xxxx'}
                  value={valueProblem}
                  onChange={handleChangeProblem}
                  sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}
               />
            </Stack>

            <Stack
               direction="column"
               justifyContent="flex-start"
               alignItems="flex-end"
               spacing={2}
               sx={{ mt: 2 }}
            >
               <ButtonEnviar />

               <ButtonLimpiar />
            </Stack>
         </form>
      </Wrapper>
   );
};

export default AddRecipe;

const Wrapper = styled.section`
   border-radius: var(--borderRadius);
   width: 100%;
   background: var(--white);
   padding: 3rem 2rem 4rem;
   box-shadow: var(--shadow-2);

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
