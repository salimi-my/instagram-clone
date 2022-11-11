import React from 'react';
import Footer from './Footer';
import Posts from './Posts';
import Profile from './Profile';
import Stories from './Stories';
import Suggestions from './Suggestions';

function Feed({ ssrPosts }: any) {
  return (
    <div className='flex justify-between w-full max-w-[470px] md:max-w-[470px] md:ml-[72px] lg:max-w-[821px] lg:ml-[72px] xl:ml-[244px] 3xl:ml-[335px]'>
      <section className='w-full px-3 md:p-0 max-w-[470px]'>
        <Stories />
        <Posts ssrPosts={ssrPosts} />
      </section>

      <section className='hidden lg:flex lg:flex-col w-[319px]'>
        <Profile />
        <Suggestions />
        <Footer />
      </section>
    </div>
  );
}

export default Feed;
