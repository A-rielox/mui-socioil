import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LogoutBtn = () => {
   const { logoutUser, user } = useAppContext();
   const [showLogout, setShowLogout] = useState(false);

   return (
      <Wrapper>
         <div
            className="btn-container"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
         >
            <motion.div
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 1.05 }}
               transition={{
                  type: 'spring',
                  stiffness: 950,
                  ease: 'easeInOut',
               }}
            >
               <button
                  className="btn"
                  // onClick={() => setShowLogout(!showLogout)}
               >
                  <FaUserCircle />
                  {user?.name}
                  <FaCaretDown />
               </button>
            </motion.div>

            <motion.div
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 1.05 }}
               transition={{
                  type: 'spring',
                  stiffness: 950,
                  ease: 'easeInOut',
               }}
               className={`dropdown ${showLogout ? 'show-dropdown' : null} `}
            >
               <button
                  onClick={logoutUser}
                  type="button"
                  className="dropdown-btn"
               >
                  logout
               </button>
            </motion.div>
         </div>
      </Wrapper>
   );
};

export default LogoutBtn;

const Wrapper = styled.nav`
   /* background: var(--white); */

   .btn-container {
      position: relative;
      padding-bottom: 7px;
      padding-top: 7px;
   }
   .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0 0.5rem;
      position: relative;
      box-shadow: var(--shadow-2);
   }

   .dropdown {
      position: absolute;
      margin-top: 10;
      top: 43px;
      left: 0;
      width: 100%;
      /* background: red; */
      background: var(--primary-100);
      box-shadow: var(--shadow-2);
      padding: 0.5rem;
      text-align: center;
      border-radius: var(--borderRadius);
      visibility: hidden;
   }

   .dropdown:hover {
      background-color: var(--primary-500);
      color: var(--white);
   }
   .dropdown:hover .dropdown-btn {
      color: var(--white);
   }

   .dropdown::before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid var(--primary-100);
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
   }

   .show-dropdown {
      visibility: visible;
   }
   .dropdown-btn {
      background: transparent;
      border-color: transparent;
      color: var(--primary-500);
      letter-spacing: var(--letterSpacing);
      text-transform: capitalize;
      cursor: pointer;
   }
`;
