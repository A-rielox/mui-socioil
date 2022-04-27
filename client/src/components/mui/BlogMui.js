import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import { Link } from 'react-router-dom';

import headerTitle from './recipe/headerTitle';
import headerSubtitle from './recipe/headerSubtitle';
import PrevParagraph from './PrevParagraph';

import {
   ButtonUser,
   ButtonLevel,
   ButtonEdit,
   ButtonDelete,
} from './ButtonsUser';

const ExpandMore = styled(props => {
   const { expand, ...other } = props;
   return <IconButton {...other} />;
})(({ theme, expand }) => ({
   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
   }),
}));

export default function BlogMui({
   _id,
   title,
   desc,
   category,
   createdAt,
   createdBy,
   openModal,
   onHold,
   styledNews,
}) {
   const { setEditBlog, deleteBlog, user, authFetch } = useAppContext();
   const [blogUser, setBlogUser] = useState(null);

   useEffect(() => {
      const fetchUser = async () => {
         const {
            data: { queryUser },
         } = await authFetch.get(`/auth/getUser?userId=${createdBy}`);

         setBlogUser(queryUser);
      };

      fetchUser();
   }, [_id]);

   const [expanded, setExpanded] = useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   if (!blogUser) {
      return <Loading center />;
   }

   // arreglo para class del color del nivel
   let colorLevel = blogUser.level.split(' ');
   colorLevel = colorLevel[colorLevel.length - 1];

   // arreglo del string del nivel
   const newStr = blogUser.level.split(' ');
   let levelToDisplay = [];
   for (let i = 0; i < 3; i++) {
      if (i === 0) {
         levelToDisplay.push(newStr[i]);
      } else if (i === 1) {
         if (newStr[i]) {
            levelToDisplay.push(` ${newStr[i][0]}.`);
         }
      } else if (i === 2) {
         if (newStr[i]) {
            levelToDisplay.push(` ${newStr[i][0]}.`);
         }
      }
   }
   levelToDisplay = levelToDisplay.join('');

   // arreglo para nombre a desplegar red red pendiente cortar a 1er nombre red red

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   const cardHeaderStyles = {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--primary-700)',
      color: 'var(--grey-50)',
      width: '80%',
      marginX: 'auto',
      marginTop: '-50px',
      borderRadius: 'var(--borderRadius)',
      '& .MuiCardHeader-subheader': {
         color: 'var(--grey-100)',
      },
   };

   return (
      <Card
         sx={{
            maxWidth: 900,
            overflow: 'visible',
            marginTop: '50px',
            backgroundColor: 'var(--primary-50)',
            height: 'min-content',
            mx: { sm: 'auto' }, // xel grid 1 columna en sm
         }}
         onClick={() => openModal(_id)}
         // onClick={() => console.log('click click')}
      >
         <CardHeader
            title={title}
            subheader={`# ${category}`}
            sx={cardHeaderStyles}
         />

         <CardContent>
            <div
               className="content-center"
               dangerouslySetInnerHTML={{ __html: desc }}
            ></div>
         </CardContent>

         <CardActions disableSpacing>
            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               spacing={2}
               justifyContent="flex-start"
               alignItems="flex-end"
               sx={{ mt: 2, flexGrow: 1 }}
            >
               <ButtonUser user={blogUser.name} />

               <ButtonLevel
                  colorLevel={colorLevel}
                  levelToDisplay={levelToDisplay}
               />
            </Stack>
         </CardActions>
      </Card>
   );
}
