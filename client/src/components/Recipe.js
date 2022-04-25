import { useEffect, useState } from 'react';
import Loading from './Loading';

import { FaCalendarAlt } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { BsFillDropletFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import moment from 'moment';
import RecipeInfo from './RecipeInfo';
import styled from 'styled-components';

const Recipe = ({
   _id,
   oilsList,
   problemsList,
   title,
   desc,
   createdAt,
   createdBy,
   openModal,
   onHold,
}) => {
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

   if (!recipeUser) {
      return <Loading center />;
   }

   // arreglo para class del color del nivel
   let colorLevel = recipeUser.level.split(' ');
   colorLevel = colorLevel[colorLevel.length - 1];

   // arreglo del string del nivel
   const newStr = recipeUser.level.split(' ');
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
      <Wrapper onClick={() => openModal(_id)}>
         <section className="left">
            <ul className="ulListOil">
               {oilsList.map((oil, index) => {
                  return (
                     <li key={index}>
                        <BsFillDropletFill className="icon" />
                        {oil}
                     </li>
                  );
               })}
            </ul>

            <ul className="ulListProblem">
               {problemsList.map((problem, index) => {
                  return (
                     <li key={index}>
                        <ImCross className="icon" />
                        {problem}
                     </li>
                  );
               })}
            </ul>
         </section>

         <div className="content">
            <header>
               <h5>{title}</h5>
            </header>

            <div className="content-center">
               {onHold && (
                  <span className="onHold">
                     <button type="button" className="btn edit-btn">
                        próximamente <br /> 🧘
                     </button>
                  </span>
               )}

               {!onHold && <p className="desc">{desc}</p>}
            </div>

            <footer>
               <div className="actions">
                  <button type="button" className={`btn btn-user`}>
                     {recipeUser.name}
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

export default Recipe;

/* @media (min-width: 576px) {
      }
      @media (min-width: 992px) {
         
      }
      @media (min-width: 1120px) {
      } */

const Wrapper = styled.article`
   background: var(--white);
   border-radius: 20px;

   -webkit-box-shadow: 5px 5px 15px 5px rgba(120, 126, 203, 0.56);
   box-shadow: 5px 5px 15px 5px rgba(120, 126, 203, 0.56);

   display: flex;

   @media (max-width: 576px) {
      flex-direction: column;
   }

   .left {
      width: 50%;
      flex: 3;
      padding-top: 0.7rem;
      padding-bottom: 0.7rem;
      padding-left: 0.3rem;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      background: linear-gradient(
         0deg,
         rgba(120, 126, 203, 0.9202226056438201) 0%,
         rgba(207, 201, 220, 0.8529957148875176) 50%
      );

      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;

      @media (max-width: 576px) {
         width: 100%;

         border-top-left-radius: 20px;
         border-bottom-left-radius: 0;
         border-top-right-radius: 20px;
         border-bottom-right-radius: 0;
      }
   }

   header {
      padding: 1rem 0;
      border-bottom: 1px solid var(--grey-100);
      display: grid;
      align-items: center;
      height: content-height;
      h5 {
         letter-spacing: 0;
         margin-bottom: 0.25rem;
         font-weight: bold;
         font-size: 1.6rem;
      }
   }

   .ulListOil {
      margin: 0 20px;
      text-transform: capitalize;

      border-bottom: 2px solid var(--grey-text);
      font-size: var(--small-text);

      li {
         list-style-type: none;
         margin-top: 0.5rem;
         display: flex;
         align-items: center;

         &:last-child {
            padding-bottom: 1.5rem;

            @media (max-width: 576px) {
               padding-bottom: 0;
            }
         }

         @media (max-width: 576px) {
            &:not(:first-child) {
               margin-left: 0.5rem;
            }
         }
      }

      .icon {
         font-size: 0.7rem;
         margin-right: 0.5rem;
         color: #dfb33b;

         @media (max-width: 576px) {
            margin-right: 0.2rem;
         }
      }

      @media (max-width: 576px) {
         display: flex;
         flex-wrap: wrap;
         width: 90%;
         justify-content: center;
      }
   }

   .ulListProblem {
      margin: 0 20px;
      text-transform: capitalize;
      font-size: var(--small-text);

      li {
         list-style-type: none;
         margin-top: 0.5rem;
         display: flex;
         align-items: center;

         &:first-child {
            padding-top: 0.5rem;

            @media (max-width: 576px) {
               padding-top: 0;
            }
         }

         &:last-child {
            padding-bottom: 0.5rem;

            @media (max-width: 576px) {
               padding-bottom: 0;
            }
         }

         @media (max-width: 576px) {
            &:not(:first-child) {
               margin-left: 0.5rem;
            }
         }
      }

      .icon {
         font-size: 0.7rem;
         margin-right: 0.5rem;
         color: var(--red-dark);

         @media (max-width: 576px) {
            margin-right: 0.2rem;
         }
      }

      @media (max-width: 576px) {
         display: flex;
         flex-wrap: wrap;
         width: 90%;
         justify-content: center;
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

   .content {
      padding: 1rem 1.5rem;
      display: grid;
      grid-template-rows: auto 1fr auto;

      flex: 7;
   }
   .content-center {
      max-height: 200px;
      min-height: 100px;
      overflow: hidden;

      position: relative;
      .onHold {
         position: absolute;
         top: 55%;
         right: 50%;
         transform: translate(50%, -50%);

         .edit-btn {
            opacity: 0.6;
            height: auto;
            font-size: 2rem;
         }
      }
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

   @media (min-width: 700px) {
      footer {
         padding: 1.5rem;
         padding-top: 0.5rem;
      }
   }

   @media (min-width: 992px) {
      footer {
         padding-left: 0;
         padding-right: 0;
         padding-bottom: 0.5rem;
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
