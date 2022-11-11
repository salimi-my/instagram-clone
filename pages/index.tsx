import { getSession, GetSessionParams } from 'next-auth/react';
import type { NextPage } from 'next';
import { Fragment } from 'react';
import Head from 'next/head';
import Feed from '../components/feed/Feed';
import Sidebar from '../components/sidebar/Sidebar';
import InputModal from '../components/modal/InputModal';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const Home: NextPage = ({ ssrPosts }: any) => {
  return (
    <Fragment>
      <Head>
        <title>Instakilo</title>
        <meta name='title' content='Instakilo' />
        <meta
          name='description'
          content='This is NOT REAL INSTAGRAM! This site created for educational purposes only.'
        />

        <meta name='robots' content='noindex, nofollow' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>

      <Sidebar />
      <main className='bg-[#fafafa] overflow-y-auto'>
        <div className='flex justify-center p-0 mx-0 min-h-[calc(100vh-55px)]'>
          <Feed ssrPosts={ssrPosts} />
        </div>
      </main>
      <InputModal />
    </Fragment>
  );
};

export default Home;

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  // Get the user
  const session = await getSession(context);

  const posts = await getDocs(
    query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
  );

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null
  }));

  if (session) {
    return {
      props: {
        session,
        ssrPosts: docs
      }
    };
  } else if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };
  }
}
