import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function Profile() {
  const { data: session }: any = useSession();
  return (
    <div className='flex items-center justify-between mt-[50px]'>
      <div className='flex items-center space-x-4 cursor-pointer'>
        <Image
          className='rounded-full w-14 h-14 object-cover'
          src={session?.user?.image || ''}
          width={56}
          height={56}
          alt={session?.user?.name || ''}
        />
        <div className='flex flex-col items-start'>
          <p className='text-sm font-medium'>{session?.user?.username}</p>
          <p className='text-sm font-medium opacity-40'>
            {session?.user?.name}
          </p>
        </div>
      </div>
      <p className='text-xs font-semibold text-[#0095f6] cursor-pointer'>
        Switch
      </p>
    </div>
  );
}

export default Profile;
