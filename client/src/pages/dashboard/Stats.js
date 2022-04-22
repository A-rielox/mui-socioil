import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import Loading from '../../components/Loading';
import PageBtnContainerBlogs from '../../components/PageBtnContainerBlogs';
import Blog from '../../components/Blog';
import styled from 'styled-components';

import { AnimatePresence } from 'framer-motion';
import DisplayedBlog from '../../components/modal/DisplayedBlog';

const Stats = () => {
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
      getBlogs({ news: true });
   }, [searchBlog, searchCategory, sort, pageBlogs]);

   if (isLoading) {
      return <Loading center />;
   }

   if (blogs.length === 0) {
      return (
         <Wrapper>
            <h2>No tenemos noticias 📰 ...</h2>
         </Wrapper>
      );
   }

   return (
      <Wrapper>
         <h5>
            tenemos {totalBlogs} noticia{blogs.length > 1 && 's'}{' '}
            {/* encontrada
            {blogs.length > 1 && 's'} */}
         </h5>

         <div className="recipes">
            {blogs.map(blog => {
               return (
                  <Blog
                     styledNews={true}
                     key={blog._id}
                     {...blog}
                     openModal={open}
                  />
               );
            })}
         </div>

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
               </>
            )}
         </AnimatePresence>
      </Wrapper>
   );
};

export default Stats;

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
