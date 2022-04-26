import React from 'react';

// import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const NavbarAvatar = () => {
   const [anchorElUser, setAnchorElUser] = React.useState(null);

   const handleOpenUserMenu = event => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   return (
      <Box sx={{ flexGrow: 0 }}>
         <Tooltip title="Log out">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               <Avatar
                  alt="Remy Sharp"
                  src="https://lh3.googleusercontent.com/3jcj8mOD2Kv2iTQkj_XqDxgeEr5ozrryOIQ_D1z0QsmxhRMSA-OOAIYh395IaU0Sl3d-V6_Jn5dtlQafaOlrRFTSTXmVMQ9fX6oHi9xQLFB_ix_5-u9d4oNjDtYjKvYZWrUY9Sd_12WlVGSkueIo2EPZ70DODvh_FgebMROc7ZedFFE4zcdljxb6z7PriK2kOgPSjR0NQNmpi6HByTx6uBBkPM8fNYt6EDjpgBXUKAGQ_Lt15gGZRQwR5gY6tO_-kpgtkauoQxwm3wKVEdTU4KMaEK6KPNhOGLNG08L-_E4la6EbuWN5TUUqQ3EKtH_96Mkb-SpguVMgfXKn9ZdT9-9XOo7UnXZA1lEV28exVrTKhnHJPVYAyYg6G2QjBVQEAYXYhCHTU6jfmp3UnqoG3mZP_6tk3CiKo1lJPVCjSj93gu9Egp-ajETq0E1mtGhOIyCBhKa-64TsEuPndGkmvg2mT8pw1uNTKeB4r2O97oRklNcpyvZveQiu30HoxM_0IRbQpIKZiliKxiaApp8mAEAEC2unYo1HcoUbLifHupAHLTbhu_fRF-qTjLpSLxwJUN8A8mhPmmZARIs9CF2Mxp2bpyGqIjrIRmGQYiewxwG1FIl3n92WOokQICTCe9V-ah4usG-ES05crAaUQLHIhV4KuAs3q0K1FSV3OF5Agq9XlF4IwyYYOZRvtDpKg7KBwYUqHpqVmLLiaZl03td41BH-J3vK14t4M9qcUFNcG4hE2FpSI3l0MtXl1Q1YXQ=w547-h972-no?authuser=0"
                  sx={{ width: 56, height: 56 }}
               />
            </IconButton>
         </Tooltip>

         <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
         >
            <MenuItem /* key={setting} */ onClick={handleCloseUserMenu}>
               <Typography textAlign="center">Log out</Typography>
            </MenuItem>
         </Menu>
      </Box>
   );
};

export default NavbarAvatar;
