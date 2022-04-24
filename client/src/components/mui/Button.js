import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export const ButtonEnviar = () => {
   return (
      <Button
         variant="contained"
         startIcon={<SendIcon />}
         sx={{
            width: { xs: '100%', sm: '25%' },
            bgcolor: 'var(--primary-500)',
            '&:hover': {
               bgcolor: 'var(--primary-100)',
               color: 'var(--primary-700)',
            },
         }}
         onClick={() => {
            console.log('xxxxxxxxxx');
         }}
      >
         enviar
      </Button>
   );
};

export const ButtonLimpiar = () => {
   return (
      <Button
         variant="contained"
         startIcon={<CleaningServicesIcon />}
         sx={{
            width: { xs: '100%', sm: '25%' },
            bgcolor: 'var(--primary-700)',
            '&:hover': {
               backgroundColor: 'var(--primary-100)',
               color: 'var(--primary-700)',
            },
         }}
      >
         limpiar
      </Button>
   );
};
