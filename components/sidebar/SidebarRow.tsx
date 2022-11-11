import Image from 'next/image';
import React from 'react';

function SidebarRow({ src, path, title, active }: any) {
  return (
    <div className='flex items-center cursor-pointer my-3 px-3 py-[14px] group'>
      {src && (
        <Image
          className='hidden md:block relative group-hover:scale-[1.05] ease-in-out duration-200 rounded-full'
          src={src}
          width={24}
          height={24}
          alt={title}
        />
      )}
      {path && (
        <svg
          aria-label='Home'
          className='hidden md:block relative group-hover:scale-[1.05] ease-in-out duration-200'
          color='#262626'
          fill='#262626'
          height='24'
          role='img'
          viewBox='0 0 24 24'
          width='24'
        >
          {path}
        </svg>
      )}
      {active && (
        <p className='hidden xl:inline-flex text-base font-semibold pl-4'>
          {title}
        </p>
      )}
      {!active && (
        <p className='hidden xl:inline-flex text-base font-normal pl-4'>
          {title}
        </p>
      )}
    </div>
  );
}

export default SidebarRow;
