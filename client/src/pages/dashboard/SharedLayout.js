import { useAppContext } from '../../context/appContext';
import { Outlet } from 'react-router-dom';

import SidebarBigMui from '../../components/mui/SidebarBigScreen';
import SidebarSmallMui from '../../components/mui/SidebarSmallMui';
import Box from '@mui/material/Box';

const SharedLayout = () => {
   const { user } = useAppContext();

   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: { xs: 'column', eighthundred: 'row' },
         }}
      >
         <Box sx={{ display: { xs: 'none', eighthundred: 'block' } }}>
            <SidebarBigMui />
         </Box>
         <Box sx={{ display: { xs: 'block', eighthundred: 'none' } }}>
            <SidebarSmallMui />
         </Box>

         <Box sx={{ flexGrow: 1, mt: 8 }}>
            <Outlet />
         </Box>
      </Box>
   );
};

export default SharedLayout;

// const Wrapper = styled.section`
//    .dashboard {
//       display: grid;
//       grid-template-columns: 1fr;
//    }
//    .dashboard-page {
//       width: 90vw;
//       margin: 0 auto;
//       padding: 2rem 0;
//    }
//    @media (min-width: 992px) {
//       .dashboard {
//          grid-template-columns: auto 1fr;
//       }
//       .dashboard-page {
//          width: 90%;
//       }
//    }
// `;
