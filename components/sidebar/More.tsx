import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { signOut } from 'next-auth/react';

export default function More() {
  return (
    <div className='justify-end'>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='flex items-center cursor-pointer my-3 px-3 pb-2 group focus:outline-none focus-visible:outline-none'>
            <MenuIcon />
            <p className='hidden xl:inline-flex text-base font-normal pl-4'>
              More
            </p>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='-top-2 transform -translate-y-full absolute left-0 w-[238px] origin-top-left bg-white divide-y divide-gray-[#fafafa] rounded-sm shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none focus-visible:outline-none'>
            <div className='p-0'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#fafafa] ' : ''
                    } group text-inherit flex justify-between w-full items-center rounded-t-sm px-4 py-[10px] text-sm`}
                  >
                    <p className='text-base font-normal'>Settings</p>
                    <SettingsIcon />
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='p-0'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#fafafa] ' : ''
                    } group text-inherit flex justify-between w-full items-center rounded-t-sm px-4 py-[10px] text-sm`}
                  >
                    <p className='text-base font-normal'>Saved</p>
                    <SavedIcon />
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='p-0'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#fafafa] ' : ''
                    } group text-inherit flex justify-between w-full items-center rounded-t-sm px-4 py-[10px] text-sm`}
                  >
                    <p className='text-base font-normal'>Report a problem</p>
                    <ReportIcon />
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='p-0'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#fafafa] ' : ''
                    } group text-inherit flex justify-between w-full items-center rounded-t-sm px-4 py-[8px] text-sm border-t-[5px] border-gray-[#fafafa]`}
                  >
                    <p className='text-base font-normal'>Switch accounts</p>
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='p-0'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#fafafa] ' : ''
                    } group text-inherit flex justify-between w-full items-center rounded-t-sm px-4 py-[10px] text-sm`}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut({
                        callbackUrl: '/login'
                      });
                    }}
                  >
                    <p className='text-base font-normal'>Log out</p>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg
      aria-label='Settings'
      className='block relative'
      color='#262626'
      fill='#262626'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <circle
        cx='12'
        cy='12'
        fill='none'
        r='8.635'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      ></circle>
      <path
        d='M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096'
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
      ></path>
    </svg>
  );
}

function SavedIcon() {
  return (
    <svg
      aria-label='Saved'
      className='block relative'
      color='#262626'
      fill='#262626'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <polygon
        fill='none'
        points='20 21 12 13.44 4 21 4 3 20 3 20 21'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      ></polygon>
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg
      aria-label='Report a problem'
      className='block relative'
      color='#262626'
      fill='#262626'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <path d='M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z'></path>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-label='Settings'
      className='hidden md:block relative group-hover:scale-[1.05] ease-in-out duration-200'
      color='#262626'
      fill='#262626'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='3'
        x2='21'
        y1='4'
        y2='4'
      ></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='3'
        x2='21'
        y1='12'
        y2='12'
      ></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='3'
        x2='21'
        y1='20'
        y2='20'
      ></line>
    </svg>
  );
}
