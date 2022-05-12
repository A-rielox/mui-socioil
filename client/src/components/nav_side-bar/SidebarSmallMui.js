import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import MyFab from './MyFab';
import LogoutBtn from '../buttons/LogoutBtn';

function HideOnScroll(props) {
   const { children, window } = props;
   // Note that you normally won't need to set the window ref as useScrollTrigger
   // will default to window.
   // This is only being set here because the demo is in an iframe.
   const trigger = useScrollTrigger({
      target: window ? window() : undefined,
   });

   return (
      <Slide appear={false} direction="down" in={!trigger}>
         {children}
      </Slide>
   );
}

const StyledFab = styled(Fab)({
   position: 'absolute',
   zIndex: 10000,
   top: 0,
   left: 0,
   backgroundColor: 'var(--primary-50)',
   color: 'var(--primary-500)',
   boxShadow: 'none',
});

export default function SidebarSmallMui(props) {
   return (
      <>
         <HideOnScroll {...props}>
            <AppBar sx={{ backgroundColor: 'var(--primary-50)' }}>
               <Toolbar>
                  {/* <Typography variant="h6" component="div">
                     Scroll to hide App bar
                  </Typography> */}
                  <LogoutBtn />

                  <MyFab />
               </Toolbar>
            </AppBar>
         </HideOnScroll>
      </>
   );
}
