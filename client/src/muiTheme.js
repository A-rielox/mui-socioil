import { createTheme } from '@mui/material/styles';

export const dashboardTheme = createTheme({
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               padding: '1rem 1.25rem',
               // '&.MuiButton-contained': {
               //    backgroundColor: 'purple',
               //    '&:hover': {
               //       backgroundColor: 'red',
               //    },
               // },
               // '&.MuiButton-outlined': {
               //    color: '#fff',
               //    borderColor: 'rgba(255, 255, 255, 0.7)',
               //    '&:hover': {
               //       backgroundColor: 'rgba(0, 0, 0, 0.04)',
               //    },
               // },
            },
         },
      },
      MuiSvgIcon: {
         styleOverrides: {
            root: {
               fontSize: '1.7rem',
            },
         },
      },
      MuiOutlinedInput: {
         styleOverrides: {
            root: {
               '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--primary-200)',
                  borderWidth: '2px',
               },
               '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--primary-50)',
                  borderWidth: '4px',
               },
               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--primary-500)',
                  borderWidth: '2px',
               },
            },
         },
      },
      MuiInputLabel: {
         styleOverrides: {
            root: {
               '&.MuiInputLabel-shrink': {
                  color: 'var(--primary-500)',
                  fontWeight: 'bold',
               },
            },
         },
      },
   },
});
