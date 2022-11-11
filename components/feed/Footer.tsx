import React from 'react';

function Footer() {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  return (
    <footer className='mt-8'>
      <nav className='flex flex-col max-w-full'>
        <ul className='block flex-grow list-none text-xs font-medium opacity-25'>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              About
            </a>
            <span className='text-[9px] mx-[2px]'>&bull;</span>
          </li>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              Help
            </a>
            <span className='text-[9px] mx-[2px]'>&bull;</span>
          </li>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              Press
            </a>
            <span className='text-[9px] mx-[2px]'>&bull;</span>
          </li>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              API
            </a>
            <span className='text-[9px] mx-[2px]'>&bull;</span>
          </li>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              Jobs
            </a>
            <span className='text-[9px] mx-[2px]'>&bull;</span>
          </li>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              Privacy
            </a>
            <span className='text-[9px] mx-[2px]'>&bull;</span>
          </li>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              Terms
            </a>
            <span className='text-[9px] mx-[2px]'>&bull;</span>
          </li>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              Location
            </a>
            <span className='text-[9px] mx-[2px]'>&bull;</span>
          </li>
          <li className='inline-block'>
            <a href='#' className='hover:underline'>
              Language
            </a>
          </li>
        </ul>

        <p className='mt-4 text-xs font-medium opacity-25'>
          &copy; {year} INSTAKILO BY{' '}
          <a className='hover:underline' href='https://www.salimi.my'>
            SALIMI
          </a>
        </p>
      </nav>
    </footer>
  );
}

export default Footer;
