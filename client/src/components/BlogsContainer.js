import { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import PageBtnContainerBlogs from './PageBtnContainerBlogs';
import Blog from './Blog';
import styled from 'styled-components';

import { AnimatePresence } from 'framer-motion';
import DisplayedBlog from './modal/DisplayedBlog';

// MUI
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import BlogMui from './mui/BlogMui';

const BlogsContainer = () => {
   const {
      getBlogs,
      blogs,
      isLoading,
      pageBlogs,
      totalBlogs,

      searchBlog,
      searchCategory,
      sort,
      numOfBlogPages,
   } = useAppContext();

   // ♏♏♏♏
   const [modalOpen, setModalOpen] = useState(false);
   const [blogOpened, setBlogOpened] = useState('');
   const close = () => setModalOpen(false);
   const open = blogId => {
      setModalOpen(true);

      const blogSelected = blogs.filter(blog => blog._id === blogId);

      setBlogOpened(blogSelected[0]);
   };

   useEffect(() => {
      getBlogs({ news: false });
   }, [searchBlog, searchCategory, sort, pageBlogs]);

   if (isLoading) {
      return <Loading center />;
   }

   if (blogs.length === 0) {
      return (
         <Wrapper>
            <h2>No encontramos blogs 😳 ...</h2>
         </Wrapper>
      );
   }

   return (
      <Container sx={{ my: 2 }} maxWidth="lg">
         <Wrapper>
            <h5>
               {totalBlogs} blog{blogs.length > 1 && 's'} encontrado
               {blogs.length > 1 && 's'}
            </h5>

            <Box
               sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                     sm: '1fr',
                     // md: 'repeat(2, 1fr)',
                  },
                  gap: 4,
               }}
            >
               {blogs.map(blog => {
                  return <BlogMui key={blog._id} {...blog} openModal={open} />;
               })}
            </Box>

            {numOfBlogPages > 1 && <PageBtnContainerBlogs />}

            {/* ♏♏♏♏                      👇 */}
            <AnimatePresence>
               {modalOpen && blogOpened && (
                  // <ModalBlog <----------- QUITAR
                  //    modalOpen={modalOpen}
                  //    handleClose={close}
                  //    blogOpened={blogOpened}
                  // />
                  <>
                     <DisplayedBlog
                        {...blogOpened}
                        modalOpen={modalOpen}
                        handleClose={close}
                     />
                     {/* <button onClick={close}>Close</button> */}
                  </>
               )}
            </AnimatePresence>
         </Wrapper>
      </Container>
   );
};

export default BlogsContainer;

const Wrapper = styled.section`
   margin-top: 4rem;

   h2 {
      text-transform: none;
   }
   & > h5 {
      font-weight: 700;
   }
   .recipes {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 2rem;
   }
   @media (min-width: 992px) {
      .recipes {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 1rem;
      }
   }

   .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      background: #0000008a;
      display: flex;
      align-items: center;
      justify-content: center;

      z-index: 100;
   }
`;
