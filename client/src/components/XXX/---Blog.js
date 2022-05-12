import { useEffect, useState } from 'react';
import Loading from '../Loading';

import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import RecipeInfo from '../RecipeInfo';
import styled from 'styled-components';

const Blog = ({
   _id,
   title,
   desc,
   category,
   createdAt,
   createdBy,
   openModal,
   onHold,
   styledNews,
}) => {
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

   return (
      <Wrapper styledNews={styledNews} onClick={() => openModal(_id)}>
         <header>
            <h5>{title}</h5>

            <ul className="ulListProblem">
               <li># {category}</li>
            </ul>
         </header>

         <div className="content">
            {/* <div
               className="content-center"
               dangerouslySetInnerHTML={{ __html: desc }}
            ></div> */}

            {onHold ? (
               <div className="onHoldWrapper">
                  <span className="onHold">
                     <button type="button" className="btn edit-btn">
                        próximamente <br /> 🧘
                     </button>
                  </span>
               </div>
            ) : (
               <div
                  className="content-center"
                  dangerouslySetInnerHTML={{ __html: desc }}
               ></div>
            )}

            <footer>
               <div className="actions">
                  <button type="button" className={`btn btn-user`}>
                     {blogUser.name}
                  </button>

                  <button type="button" className={`btn status ${colorLevel}`}>
                     {levelToDisplay}
                  </button>
               </div>

               <RecipeInfo icon={<FaCalendarAlt />} text={date} />
            </footer>
         </div>
      </Wrapper>
   );
};

export default Blog;

const Wrapper = styled.article`
   background: var(--white);

   display: flex;
   flex-direction: column;

   //${props => (props.styledNews ? 'none' : 'flex')}
   /* border-radius: 20px; */
   border-radius: ${props =>
      props.styledNews ? 'var(--borderRadius)' : '20px'};
   -webkit-box-shadow: 5px 5px 15px 5px rgba(120, 126, 203, 0.56);
   box-shadow: 5px 5px 15px 5px rgba(120, 126, 203, 0.56);

   margin-left: auto;
   margin-right: auto;

   width: 95%;

   .content {
      padding: 1rem 1.5rem;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .onHoldWrapper {
         min-height: 200px;
         height: 100%;
         position: relative;
      }
      .onHold {
         position: absolute;
         top: 50%;
         right: 50%;
         transform: translate(50%, -50%);

         .edit-btn {
            opacity: 0.6;
            height: auto;
            font-size: 2rem;
         }
      }
   }
   .content-center {
      max-height: 700px;
      overflow: hidden;

      p {
         margin-bottom: 0.5rem;
         max-width: 40em;
         color: #6e7785;
      }

      ul {
         list-style-type: disc;
         margin-top: 0;
         padding-top: 0;
         padding-bottom: 0.5rem;
         padding-left: 2rem;
      }
   }

   .content-center > p > img {
      max-width: 100% !important;
      height: auto !important;
   }

   @media (min-width: 700px) {
      header {
         padding: 1rem;
      }
      .content {
         padding: 1rem;

         // red red red
         margin-top: -1.5rem;
      }
      .content-center,
      footer {
         padding: 1.5rem;
      }
   }

   @media (min-width: 992px) {
      header {
         padding: 2rem;
      }
      .content {
         padding: 2rem;

         padding-bottom: 0.5rem;
      }
      footer {
         padding-left: 0;
         padding-right: 0;
         padding-bottom: 0.5rem;
      }
   }

   header {
      padding: 2rem 1.5rem;
      border-bottom: 1px solid var(--grey-100);
      display: grid;
      align-items: center;

      height: 150px;

      //${props => (props.styledNews ? 'none' : 'flex')}
      /* background: linear-gradient(
         90deg,
         rgba(120, 126, 203, 0.9202226056438201) 0%,
         rgba(207, 201, 220, 0.8529957148875176) 50%
      ); */
      background: ${props =>
         props.styledNews
            ? 'linear-gradient(90deg,rgba(84, 84, 91, 0.92) 0%,rgba(87, 85, 91, 0.556) 50%)'
            : 'linear-gradient(90deg,rgba(120, 126, 203, 0.9202226056438201) 0%,rgba(207, 201, 220, 0.529957148875176) 50%)'};

      //var(--borderRadius)
      border-top-left-radius: ${props =>
         props.styledNews ? 'var(--borderRadius)' : '20px'};
      /* border-top-left-radius: 20px; */
      border-top-right-radius: ${props =>
         props.styledNews ? 'var(--borderRadius)' : '20px'};
      /* border-top-right-radius: 20px; */

      h5 {
         letter-spacing: 0;
         margin-bottom: 0.25rem;
         font-weight: bold;
         /* font-size: 1.6rem; */
         font-size: ${props => (props.styledNews ? '2.2rem' : '1.6rem')};

         text-align: ${props => (props.styledNews ? 'center' : null)};

         text-shadow: ${props =>
            props.styledNews ? '4px 4px 0 var(--primary-500)' : null};

         color: ${props => (props.styledNews ? '#e0dfdc' : 'inherit')};
      }
   }

   .ulListProblem {
      margin: 0 20px;
      /* display: flex; */
      display: ${props => (props.styledNews ? 'none' : 'flex')};
      justify-content: space-between;
      text-transform: capitalize;

      li {
         list-style-type: none;
         margin-top: 0.5rem;
         display: flex;
         align-items: center;
      }
   }

   /* 
   distribuidor silver
   star		#b500ff
   senior star	#c900c9
   executive	#d70000
   silver		#a10000
   gold		#f3ff00
   platinum	#00f900
   diamond		#058210
   crown diamond	#3f15d0
   r.c. diamond	#6500a3
   */

   .distribuidor {
      background: rgba(191, 191, 191, 0.3);
      color: var(--textColor);
   }

   .estrella {
      background: rgba(181, 0, 255, 0.3);
      color: var(--textColor);
   }
   .mayor {
      background: rgba(201, 0, 201, 0.3);
      color: var(--textColor);
   }
   .ejecutivo {
      color: var(--textColor);
      background: rgba(215, 0, 0, 0.3);
   }
   .plata {
      color: var(--textColor);
      background: rgba(161, 0, 0, 0.3);
   }
   .oro {
      color: var(--textColor);
      background: rgba(243, 255, 0, 0.3);
   }
   .platino {
      color: var(--textColor);
      background: rgba(0, 249, 0, 0.3);
   }
   .diamante {
      color: var(--textColor);
      background: rgba(5, 130, 16, 0.3);
   }
   .corona {
      color: var(--textColor);
      background: rgba(63, 21, 208, 0.3);
   }
   .real {
      color: var(--textColor);
      background: rgba(101, 0, 163, 0.3);
   }

   .status {
      border-radius: var(--borderRadius);
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      text-align: center;
      width: auto;
      height: 30px;
      font-size: 0.8rem;

      margin-left: 0.5rem;
   }

   .actions {
      .btn-user {
         font-size: 0.8rem;
         font-weight: bold;
      }
   }

   footer {
      margin-top: 1rem;
      padding-top: 1rem;
      display: flex;
      align-items: center;

      flex-direction: column;
      .actions {
         align-self: start;
      }

      border-top: 1px solid var(--grey-100);
      @media (max-width: 576px) {
         .actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;

            .status {
               margin-left: 0;
            }
         }
      }
   }
   .edit-btn,
   .delete-btn {
      letter-spacing: var(--letterSpacing);
      cursor: pointer;
      height: 30px;
      font-size: 0.8rem;
   }
   .edit-btn {
      color: var(--green-dark);
      background: var(--green-light);
      margin-right: 0.5rem;
   }
   .delete-btn {
      color: var(--red-dark);
      background: var(--red-light);
   }
   &:hover .actions {
      visibility: visible;
   }
`;
