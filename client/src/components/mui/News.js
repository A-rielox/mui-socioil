import Loading from '../Loading';

import { FaCalendarAlt } from 'react-icons/fa';
import { BsArrowRightSquareFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import RecipeInfo from '../RecipeInfo';
import styled from 'styled-components';

const News = ({
   _id,
   title,
   desc,
   createdAt,
   createdBy,
   handleClose,

   openModal,
}) => {
   const { setEditBlog, deleteBlog, user } = useAppContext();

   if (!_id) {
      return <Loading center />;
   }

   // arreglo para nombre a desplegar red red pendiente cortar a 1er nombre red red

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   return (
      <Wrapper>
         <header>
            <div className="info">
               <h5>{title}</h5>
            </div>
         </header>

         <div className="content">
            <div
               className="content-center"
               dangerouslySetInnerHTML={{ __html: desc }}
            ></div>

            <footer>
               <div className="footer-user">
                  <div className="actions">
                     {(user._id === createdBy || user.role === 'admin') && (
                        <Link
                           to="/add-blog"
                           onClick={() => {
                              handleClose();
                              setEditBlog(_id);
                           }}
                           className="btn edit-btn"
                        >
                           editar
                        </Link>
                     )}
                     {(user._id === createdBy || user.role === 'admin') && (
                        <button
                           type="button"
                           className="btn delete-btn"
                           onClick={() => {
                              handleClose();
                              deleteBlog(_id);
                           }}
                        >
                           borrar
                        </button>
                     )}
                  </div>

                  <RecipeInfo icon={<FaCalendarAlt />} text={date} />
               </div>

               {user.role === 'admin' && (
                  <div className="footer-admin-wrapper">
                     <button
                        type="button"
                        className={`btn btn-edit`}
                        onClick={() => openModal(_id)}
                     >
                        Editar Admin
                        <span className="edit-success">👍</span>
                        <BsArrowRightSquareFill />
                     </button>
                  </div>
               )}
            </footer>
         </div>
      </Wrapper>
   );
};

export default News;

const Wrapper = styled.article`
   /* background: var(--white); */
   /* border-radius: var(--borderRadius); */
   /* display: grid; */
   /* grid-template-rows: 100px auto; */
   /* box-shadow: var(--shadow-2); */

   .content {
      padding: 1rem 1.5rem;
      display: grid;
      grid-template-rows: 1fr auto;
   }
   .content-center {
      border-bottom: 1px solid var(--grey-100);

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
      padding: 1rem;
      /* max-width: 80vw; */
   }

   @media (min-width: 992px) {
      padding: 2rem;
      /* max-width: 70vw; */
   }
   @media (min-width: 1120px) {
      padding: 1.5rem;
      /* max-width: 800px; */
   }

   header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--grey-100);
      display: grid;
      align-items: center;
      height: 100px;
      h5 {
         letter-spacing: 0;
      }
   }

   .info {
      h5 {
         margin-bottom: 0.25rem;
      }
   }
   .ulListProblem {
      margin: 0 20px;
      display: flex;
      justify-content: space-between;
      text-transform: capitalize;

      li {
         list-style-type: none;
         margin-top: 0.5rem;
         display: flex;
         align-items: center;
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
      display: flex;
      flex-direction: column;
   }

   .footer-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   .footer-admin-wrapper {
      display: flex;
      flex-direction: column;
   }
   .footer-admin {
      margin-top: 1rem;
      border-top: 1px solid var(--grey-100);
      padding-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 450px) {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;

         .checkboxcito {
            width: 120px;
            margin-top: 1rem;
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

   .btn-close {
      position: absolute;
      top: 20px;
      right: 20px;

      background-color: var(--red-light);

      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;

      &:hover {
         background-color: var(--white);
         color: var(--red-light);
         border: 3px solid var(--red-light);
      }
   }

   .btn-edit {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;

      position: relative;
      /*      👍           */
      .edit-success {
         display: none;
         position: absolute;
      }
      .ready {
         display: block;
         right: 20px;
      }
   }

   /* CHECKBOX */

   input[type='checkbox'] {
      display: none;
   }

   input[type='checkbox'] + label {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 20px;
      font: 14px/20px 'Open Sans', Arial, sans-serif;
      color: var(--textColor);
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
   }

   input[type='checkbox'] + label:last-child {
      margin-bottom: 0;
   }

   input[type='checkbox'] + label:before {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      border: 3px solid var(--primary-500);
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.6;
      -webkit-transition: all 0.12s, border-color 0.08s;
      transition: all 0.12s, border-color 0.08s;
   }

   input[type='checkbox']:checked + label:before {
      width: 10px;
      top: -5px;
      left: 5px;
      border-radius: 0;
      opacity: 1;
      border-top-color: transparent;
      border-left-color: transparent;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
   }
`;
