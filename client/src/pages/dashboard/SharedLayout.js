import { useAppContext } from '../../context/appContext';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { SidebarSmallScreen, SidebarBigScreen, Navbar } from '../../components';

import SidebarBigMui from '../../components/mui/SidebarBigScreen';
import Box from '@mui/material/Box';

const SharedLayout = () => {
   const { user } = useAppContext();

   return (
      <Box sx={{ display: 'flex' }}>
         <SidebarBigMui />

         <Box sx={{ flexGrow: 1, mt: 8 }}>
            <Outlet />
         </Box>
      </Box>
   );
};
// el <Outlet /> es para q se rendericen las pags nesteadas

export default SharedLayout;

const Wrapper = styled.section`
   .dashboard {
      display: grid;
      grid-template-columns: 1fr;
   }
   .dashboard-page {
      width: 90vw;
      margin: 0 auto;
      padding: 2rem 0;
   }
   @media (min-width: 992px) {
      .dashboard {
         grid-template-columns: auto 1fr;
      }
      .dashboard-page {
         width: 90%;
      }
   }
`;
