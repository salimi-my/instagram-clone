import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker/locale/en_US';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Story from './Story';

function Stories() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fakers = [...Array(24)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar()
    }));

    setUsers(fakers);
  }, []);

  return (
    <div className='flex w-full bg-white border border-[#dbdbdb] rounded-md mt-[26px] px-4 pt-[18px] pb-4 pr-0'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        loop={false}
        slidesPerView='auto'
        slidesPerGroup={6}
        navigation={true}
        pagination={{ clickable: false }}
      >
        {users.map(({ id, username, avatar }: any) => {
          return (
            <SwiperSlide key={id}>
              <Story username={username} avatar={avatar} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Stories;
