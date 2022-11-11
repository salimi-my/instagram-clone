import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalAtom';
import Image from 'next/image';
import { db, storage } from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

export default function InputModal() {
  const { data: session }: any = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const [imageToPost, setImageToPost] = useState(null);
  const captionRef: any = useRef('');
  const filePickerRef: any = useRef(null);

  const uploadPost = async (e: any) => {
    e.preventDefault();

    if (!(captionRef.current.value.length > 0 && imageToPost)) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      avatar: session.user.image,
      timestamp: serverTimestamp()
    });

    const imageRef = ref(storage, `post/${docRef.id}`);

    await uploadString(imageRef, imageToPost, 'data_url').then(async () => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadURL
      });
    });

    setLoading(false);
    setCompleteLoading(true);
  };

  const buttonHandler = () => {
    if (captionRef.current.value.length > 0 && imageToPost) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  };

  const textHandler = (e: any) => {
    setTextCount(e.target.value.length);
    buttonHandler();
  };

  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setImageToPost(readerEvent.target.result);
    };

    buttonHandler();
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  const closeModal = () => {
    setOpen(false);
    removeImage();
    if (!loading && !completeLoading) captionRef.current.value = '';
    setTextCount(0);
    setLoading(false);
    setCompleteLoading(false);
    setButtonEnable(false);
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-60' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-6xl h-[80vh] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[750px] transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all'>
                  {(loading || completeLoading) && (
                    <div className='w-full h-full flex justify-center items-center'>
                      {loading && (
                        <Image
                          className='object-contain'
                          src='/loading.gif'
                          width={96}
                          height={96}
                          alt='loading'
                        />
                      )}
                      {completeLoading && (
                        <Image
                          className='object-contain'
                          src='/complete-loading.gif'
                          width={96}
                          height={96}
                          alt='loading'
                        />
                      )}
                    </div>
                  )}
                  {!loading && !completeLoading && (
                    <>
                      <Dialog.Title
                        as='h3'
                        className='flex items-center justify-between font-medium py-2 border-b border-[#dbdbdb]'
                      >
                        <p className='text-center flex-1'>Create new post</p>
                        <button
                          onClick={uploadPost}
                          className='text-[#0095f6] text-sm pr-4 disabled:opacity-50'
                          type='button'
                          disabled={!buttonEnable}
                        >
                          Share
                        </button>
                      </Dialog.Title>
                      <div className='grid md:grid-cols-6 relative h-full'>
                        <div className='relative md:col-span-4'>
                          {!imageToPost && (
                            <div className='flex justify-center items-center h-full'>
                              <div className='flex flex-col items-center -mt-20'>
                                <PlaceholderIcon />
                                <h2 className='text-[22px] font-light mt-3 mb-4'>
                                  Drag photos and videos here
                                </h2>
                                <button
                                  type='button'
                                  onClick={() => filePickerRef.current.click()}
                                  className='bg-[#0095f6] text-white text-sm font-medium rounded-[4px] px-3 py-1 hover:opacity-80'
                                >
                                  Select from computer
                                </button>
                              </div>
                            </div>
                          )}
                          {imageToPost && (
                            <Image
                              className='object-cover'
                              src={imageToPost}
                              fill
                              alt='post'
                            />
                          )}
                          <input
                            ref={filePickerRef}
                            onChange={addImageToPost}
                            type='file'
                            hidden
                          />
                        </div>
                        <div className='flex flex-col md:col-span-2'>
                          <div className='flex items-center space-x-3 my-4 mx-4'>
                            <Image
                              src={session?.user?.image || ''}
                              width={28}
                              height={28}
                              alt={session?.user?.name || ''}
                            />
                            <p className='text-base font-medium'>
                              {session?.user?.username}
                            </p>
                          </div>
                          <textarea
                            ref={captionRef}
                            className='mx-4 focus:outline-none placeholder-gray-400 resize-none'
                            placeholder='Write a caption...'
                            rows={6}
                            onChange={textHandler}
                            maxLength={2200}
                          />
                          <div className='flex items-center justify-between mx-4 mb-3'>
                            <EmojiIcon />
                            <p className='text-xs opacity-50 font-medium'>
                              <span>{textCount}</span>/2,200
                            </p>
                          </div>
                          <div className='border-b border-[#dbdbdb]'></div>
                          <div className='flex items-center justify-between mx-4 my-3'>
                            <p className='opacity-50'>Add location</p>
                            <LocationIcon />
                          </div>
                          <div className='border-b border-[#dbdbdb]'></div>
                          <div className='flex items-center justify-between mx-4 my-3'>
                            <p className='text-base'>Accessibility</p>
                            <CaretIcon />
                          </div>
                          <div className='border-b border-[#dbdbdb]'></div>
                          <div className='flex items-center justify-between mx-4 my-3'>
                            <p className='text-base'>Advance settings</p>
                            <CaretIcon />
                          </div>
                          <div className='border-b border-[#dbdbdb]'></div>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function EmojiIcon() {
  return (
    <svg
      aria-label='Emoji'
      className='block relative cursor-pointer'
      color='#8e8e8e'
      fill='#8e8e8e'
      height='20'
      role='img'
      viewBox='0 0 24 24'
      width='20'
    >
      <path d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z'></path>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-label='Add location'
      className='block relative'
      color='#8e8e8e'
      fill='#8e8e8e'
      height='16'
      role='img'
      viewBox='0 0 24 24'
      width='16'
    >
      <path d='M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z'></path>
    </svg>
  );
}

function CaretIcon() {
  return (
    <svg
      aria-label='Down chevron icon'
      className='block relative rotate-180 cursor-pointer'
      color='#262626'
      fill='#262626'
      height='16'
      role='img'
      viewBox='0 0 24 24'
      width='16'
    >
      <path d='M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z'></path>
    </svg>
  );
}

function PlaceholderIcon() {
  return (
    <svg
      aria-label='Icon to represent media such as images or videos'
      className='block relative'
      color='#262626'
      fill='#262626'
      height='77'
      role='img'
      viewBox='0 0 97.6 77.3'
      width='96'
    >
      <path
        d='M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z'
        fill='currentColor'
      ></path>
      <path
        d='M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z'
        fill='currentColor'
      ></path>
      <path
        d='M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z'
        fill='currentColor'
      ></path>
    </svg>
  );
}
