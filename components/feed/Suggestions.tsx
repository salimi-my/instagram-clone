import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker/locale/en_US';
import Image from 'next/image';

function Suggestions() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fakers = [...Array(5)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      firstname: faker.name.firstName()
    }));

    setUsers(fakers);
  }, []);
  return (
    <div className='flex flex-col items-start mt-4'>
      <div className='w-full flex justify-between'>
        <p className='text-sm font-semibold opacity-50 flex-1'>
          Suggestions For You
        </p>
        <p className='text-xs font-medium cursor-pointer'>See All</p>
      </div>
      <div className='w-full flex flex-col space-y-2 mt-3'>
        {users.map(({ id, username, avatar, firstname }: any) => (
          <div key={id} className='flex justify-between items-center'>
            <div className='flex items-center space-x-3 cursor-pointer'>
              <Image
                className='rounded-full w-8 h-8 object-cover'
                src={avatar}
                width={32}
                height={32}
                alt={username}
              />
              <div className='flex flex-col items-start'>
                <p className='text-sm font-medium'>{username.toLowerCase()}</p>
                <p className='text-sm font-medium opacity-40'>
                  Followed by {firstname.toLowerCase()}
                </p>
              </div>
            </div>
            <p className='text-xs font-semibold text-[#0095f6] cursor-pointer'>
              Follow
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
