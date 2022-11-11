import React from 'react';
import Image from 'next/image';

function Story({ username, avatar }: any) {
  return (
    <div className='flex flex-col items-center space-y-1 cursor-pointer'>
      <div className='bg-gradient-to-tr from-yellow-400 to bg-fuchsia-600 p-[2px] rounded-full'>
        <div className='bg-white p-[2px] rounded-full'>
          <Image
            className='h-14 w-14 rounded-full'
            src={avatar}
            width={56}
            height={56}
            alt={username}
          />
        </div>
      </div>
      <p className='max-w-[58px] truncate text-xs'>{username.toLowerCase()}</p>
    </div>
  );
}

export default Story;
