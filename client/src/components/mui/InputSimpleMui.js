import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const InputSimpleMui = styled(TextField)(() => ({
   marginBottom: '8px',
   '.MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--primary-200)',
      borderWidth: '2px',
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--primary-50)',
      borderWidth: '2px',
   },
   '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--primary-500)',
      borderWidth: '2px',
   },
   '& .MuiInputLabel-shrink': {
      color: 'var(--primary-500)',
      fontWeight: 'bold',
   },
}));

export default InputSimpleMui;

/* FAIL

const InputSimpleMui = ({
   value,
   onChange,
   name,
   label,
   multiline,
   fullWidth,
   maxRows,
   placeholder,
   rows,
}) => {
   const textFieldStyles = {
      mb: 2,
      '.MuiOutlinedInput-notchedOutline': {
         borderColor: 'var(--primary-200)',
         borderWidth: '2px',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
         borderColor: 'var(--primary-50)',
         borderWidth: '2px',
      },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
         borderColor: 'var(--primary-500)',
         borderWidth: '2px',
      },
      '& .MuiInputLabel-shrink': {
         color: 'var(--primary-500)',
         fontWeight: 'bold',
      },
   };

   return (
      <TextField
          // id="outlined-multiline-flexible"
         label={label}
         placeholder={placeholder}
         multiline={multiline}
         fullWidth={fullWidth}
         maxRows={maxRows}
         rows={rows}
         name={name}
         value={value}
         onChange={onChange}
         sx={textFieldStyles}
      />
   );
};


*/

/*

<TextField
   id="outlined-multiline-flexible"
   label="Titulo"
   multiline
   fullWidth={false}
   maxRows={2}
   name="title"
   value={title}
   onChange={handleRecipeInput}
   sx={{
      mb: 2,
      '.Mui-focused .MuiOutlinedInput-notchedOutline': {
         borderColor: 'var(--primary-500)',
         borderWidth: '2px',
      },
      '& .MuiInputLabel-shrink': {
         color: 'var(--primary-500)',
         fontWeight: 'bold',
      },
   }}
/>

<TextField
id="outlined-multiline-description"
label="Descripcion"
multiline
fullWidth
rows={4}
maxRows={4}
name="desc"
value={desc}
onChange={handleRecipeInput}
sx={{
   mb: 2,
   // '.MuiOutlinedInput-notchedOutline': {
   //    borderColor: '#d711d7',
   //    borderWidth: '8px',
   // },
   // '.Mui-focused .MuiOutlinedInput-notchedOutline': {
   //    borderColor: '#77d711',
   //    borderWidth: '8px',
   // },
   // '&:hover .MuiOutlinedInput-notchedOutline': {
   //    borderColor: '#1ee8f2',
   //    borderWidth: '8px',
   // },
}}
/>
*/
