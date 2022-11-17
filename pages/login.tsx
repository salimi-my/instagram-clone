import React, { useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import DisclaimerModal from '../components/modal/DisclaimerModal';

export default function login({ providers }: any) {
  const [loggingIn, setLoggingIn] = useState(false);
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  return (
    <>
      <Head>
        <title>Instakilo</title>
        <meta name='title' content='Instakilo' />
        <meta
          name='description'
          content='This is NOT REAL INSTAGRAM! This site created for educational purposes only.'
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://instakilo.salimi.my/' />
        <meta property='og:title' content='Instakilo' />
        <meta
          property='og:description'
          content='This is NOT REAL INSTAGRAM! This site created for educational purposes only.'
        />
        <meta property='og:image' content='/instakilo.jpg' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://instakilo.salimi.my/' />
        <meta property='twitter:title' content='Instakilo' />
        <meta
          property='twitter:description'
          content='This is NOT REAL INSTAGRAM! This site created for educational purposes only.'
        />
        <meta property='twitter:image' content='/instakilo.jpg' />

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
      <div className='bg-[#fafafa] h-screen'>
        <main className='flex flex-row items-center justify-center w-full flex-shrink-0 flex-grow pb-8 h-[90%]'>
          <div className="hidden lg:block self-center bg-[url('/phone.png')] bg-[position:-46px_0] bg-[length:468px_634px] basis-[380px] h-[581px] mb-3 mr-8">
            <div className='flex flex-col flex-shrink-0 m-[27px_0_0_113px]'>
              <Image
                className='w-[250px] h-[539px] align-baseline'
                src='/ig-mocked.png'
                width={250}
                height={539}
                alt='phone mocked'
              />
            </div>
          </div>
          <div className='flex flex-col flex-grow justify-center max-w-[350px]'>
            <form className='items-center bg-white border border-[#dbdbdb] rounded-[1px] box-border flex flex-col flex-shrink-0 py-[10px] px-9 relative align-baseline'>
              <a className='my-10' href='/'>
                <p className='font-grandista text-4xl opacity-90'>Instakilo</p>
              </a>
              <input
                autoFocus
                className='text-xs w-full mb-2 rounded-[3px] border bg-[#fafafa] border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none hover:cursor-not-allowed'
                id='email'
                placeholder='Phone number, username, or email'
                type='email'
                disabled
              />
              <input
                autoFocus
                className='text-xs w-full mb-4 rounded-[3px] border bg-[#fafafa] border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none hover:cursor-not-allowed'
                id='password'
                placeholder='Password'
                type='password'
                disabled
              />
              {Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  type='button'
                  className='w-full flex justify-center text-sm text-center bg-[#0095f6] text-white py-[6px] rounded font-medium hover:opacity-80'
                  onClick={() => {
                    signIn(provider.id, { callbackUrl: '/' });
                    setLoggingIn(true);
                  }}
                >
                  {loggingIn && (
                    <div className='flex items-center justify-center'>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-4 w-4 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      <p className='text-sm'>Connecting...</p>
                    </div>
                  )}
                  {!loggingIn && <div>Login with {provider.name}</div>}
                </button>
              ))}
              <div className='flex justify-evenly space-x-2 w-64 mt-4'>
                <span className='bg-gray-300 h-px flex-grow t-2 relative top-2'></span>
                <span className='flex-none uppercase text-xs text-gray-400 font-semibold'>
                  or
                </span>
                <span className='bg-gray-300 h-px flex-grow t-2 relative top-2'></span>
              </div>
              <button
                className='mt-5 flex items-center cursor-not-allowed'
                disabled
              >
                <div className="bg-no-repeat mr-2 bg-[url('/icons-2.png')] bg-[position:-414px_-259px] h-4 w-4"></div>
                <span className='text-sm text-blue-900 font-semibold'>
                  Log in with Facebook
                </span>
              </button>
              <a
                className='text-xs text-blue-900 mt-5 cursor-pointer mb-2'
                aria-disabled
              >
                Forgot password?
              </a>
            </form>
            <div className='bg-white border border-gray-300 text-center py-4 w-full mt-3'>
              <span className='text-sm mr-1'>Don't have an account?</span>
              <a className='text-[#0095f6] text-sm font-semibold cursor-pointer'>
                Sign up
              </a>
            </div>
            <div className='mt-5 text-center'>
              <span className='text-sm'>Get the app</span>
              <div className='flex justify-center mt-5 space-x-2'>
                <Image
                  className='h-10 w-auto cursor-pointer'
                  src='/google-play.png'
                  width={134}
                  height={40}
                  alt='Get it on Google Play'
                />
                <Image
                  className='h-10 w-auto cursor-pointer'
                  src='/microsoft-store.png'
                  width={134}
                  height={40}
                  alt='Get it from Microsoft'
                />
              </div>
            </div>
          </div>
        </main>
        <footer className='flex justify-center w-full'>
          <div className='flex flex-col w-2/4'>
            <div className='flex flex-row flex-wrap flex-grow-0 flex-shrink-0 basis-auto justify-center'>
              <p className='text-xs text-gray-400 text-center'>
                Disclaimer: This site is not the real Instagram. Under no
                circumstance shall I have any liability to you for any loss or
                damage of any kind incurred as a result of the use of the site
                or reliance on any information provided on the site. Your use of
                the site and your reliance on any information on the site is
                solely at your own risk.
              </p>
            </div>
            <p className='text-sm text-gray-400 text-center mt-5'>
              Instagram Clone &copy; {year} Created by{' '}
              <a className='hover:underline' href='https://www.salimi.my'>
                Salimi
              </a>
            </p>
          </div>
        </footer>
      </div>
      <DisclaimerModal />
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
}
