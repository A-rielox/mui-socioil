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
      //    side navbar
      MuiListItemIcon: {
         styleOverrides: {
            root: {
               color: 'var(--primary-500)',
               fontSize: '1.5rem',
               '&.activeLink': {
                  color: 'var(--primary-700)',
               },
            },
         },
      },
      MuiListItemText: {
         styleOverrides: {
            root: {
               '& span': {
                  color: 'var(--textColor)',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
               },
               '&.activeLink span': {
                  color: 'var(--primary-700)',
               },
            },
         },
      },
      MuiListItemButton: {
         styleOverrides: {
            root: {
               '&.activeLink': {
                  backgroundColor: 'var(--primary-100)',
               },
               '&:hover': {
                  backgroundColor: 'var(--primary-700)',

                  '& .MuiListItemIcon-root': {
                     color: 'white',
                  },
                  '& .MuiListItemText-root span': {
                     color: 'white',
                  },
               },
            },
         },
      },
   },
});
