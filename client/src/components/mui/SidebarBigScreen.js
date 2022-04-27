import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Tooltip from '@mui/material/Tooltip';

import links from '../../utils/links';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Logo from '../Logo';
import NavbarAvatar from './NavbarAvatar';

const drawerWidth = 200;

const openedMixin = theme => ({
   width: drawerWidth,
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: 'hidden',
});

const closedMixin = theme => ({
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: 'hidden',
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
   },
});

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: 'nowrap',
   boxSizing: 'border-box',
   ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
   }),
}));

export default function MiniDrawer() {
   let location = useLocation();
   const { showSidebar, toggleSidebar } = useAppContext();

   // toggleSidebar
   const theme = useTheme();
   // const [open, setOpen] = React.useState(true);

   const handleDrawerOpen = () => {
      toggleSidebar({ value: true });
   };

   const handleDrawerClose = () => {
      toggleSidebar({ value: false });
   };

   return (
      <Box sx={{ display: 'flex' }}>
         <AppBar position="fixed" open={showSidebar}>
            <Toolbar sx={{ backgroundColor: 'var(--primary-50)' }}>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     width: '100%',
                  }}
               >
                  <IconButton
                     // color="inherit"
                     aria-label="open drawer"
                     onClick={handleDrawerOpen}
                     edge="start"
                     sx={{
                        color: 'var(--primary-700)',
                        marginRight: 5,
                        ...(showSidebar && { display: 'none' }),
                     }}
                  >
                     <MenuIcon />
                  </IconButton>

                  <Box sx={{ width: '120px' }}>
                     <Logo />
                  </Box>

                  <NavbarAvatar />
               </Box>
            </Toolbar>
         </AppBar>

         <Drawer
            variant="permanent"
            open={
               showSidebar
            } /* sx={{ display: { xs: 'none', sm: 'block' } }} */
         >
            <DrawerHeader>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                     <ChevronRightIcon />
                  ) : (
                     <ChevronLeftIcon />
                  )}
               </IconButton>
            </DrawerHeader>

            <Divider />

            <List>
               {links.map(link => {
                  const { id, text, path, icon } = link;

                  return (
                     <NavLink
                        key={id}
                        to={path}
                        // className={({ isActive }) =>
                        //    isActive ? 'nav-link active' : 'nav-link'
                        // }
                        // onClick={toggleSidebar}
                     >
                        <ListItemButton
                           key={text}
                           sx={{
                              minHeight: 48,
                              justifyContent: showSidebar
                                 ? 'initial'
                                 : 'center',
                              px: 2.5,
                           }}
                           className={`${
                              path === location.pathname.substring(1)
                                 ? 'activeLink'
                                 : ''
                           }`}
                        >
                           <Tooltip title={text.toUpperCase()}>
                              <ListItemIcon
                                 sx={{
                                    minWidth: 0,
                                    mr: showSidebar ? 3 : 'auto',
                                    justifyContent: 'center',
                                 }}
                                 className={`${
                                    path === location.pathname.substring(1)
                                       ? 'activeLink'
                                       : ''
                                 }`}
                              >
                                 {icon}
                              </ListItemIcon>
                           </Tooltip>

                           <ListItemText
                              primary={text}
                              sx={{ opacity: showSidebar ? 1 : 0 }}
                              className={`${
                                 path === location.pathname.substring(1)
                                    ? 'activeLink'
                                    : ''
                              }`}
                           />
                        </ListItemButton>
                     </NavLink>
                  );
               })}
            </List>
         </Drawer>
      </Box>
   );
}
