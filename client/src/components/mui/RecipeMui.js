import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';

import headerTitle from './recipe/headerTitle';
import headerSubtitle from './recipe/headerSubtitle';

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

export default function RecipeReviewCard({
   _id,
   oilsList,
   problemsList,
   title,
   desc,
   createdAt,
   createdBy,
   openModal,
   onHold,
}) {
   const { user, authFetch } = useAppContext();
   const [recipeUser, setRecipeUser] = useState(null);
   useEffect(() => {
      const fetchUser = async () => {
         const {
            data: { queryUser },
         } = await authFetch.get(`/auth/getUser?userId=${createdBy}`);

         setRecipeUser(queryUser);
      };

      fetchUser();
   }, [_id]);

   const [expanded, setExpanded] = useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   if (!recipeUser) {
      return <Loading center />;
   }

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
            maxWidth: 600,
            overflow: 'visible',
            marginTop: '50px',
            backgroundColor: 'var(--primary-50)',
            height: 'min-content',
            mx: { sm: 'auto' }, // xel grid 1 columna en sm
         }}
      >
         <CardHeader
            avatar={
               <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
               </Avatar>
            }
            // title={recipeUser.name}
            title={headerTitle(oilsList)}
            // subheader={date}
            subheader={headerSubtitle(problemsList)}
            // alt={title}
            sx={cardHeaderStyles}
         />

         <CardContent>
            <Typography variant="body2" color="text.secondary">
               This impressive paella is a perfect party dish and a fun meal to
               cook together with your guests. Add 1 cup of frozen peas along
               with the mussels, if you like.
            </Typography>
         </CardContent>

         <CardActions disableSpacing>
            <Checkbox
               /* {...label} */ icon={<FavoriteBorder />}
               checkedIcon={<Favorite sx={{ color: 'red' }} />}
            />

            <IconButton aria-label="share">
               <ShareIcon />
            </IconButton>

            <ExpandMore
               expand={expanded}
               onClick={handleExpandClick}
               aria-expanded={expanded}
               aria-label="show more"
            >
               <ExpandMoreIcon />
            </ExpandMore>
         </CardActions>

         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
               <Typography paragraph>Method:</Typography>
               <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
               </Typography>
            </CardContent>
         </Collapse>
      </Card>
   );
}
