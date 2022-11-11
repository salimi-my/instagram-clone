import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import Image from 'next/image';
import { db } from '../../firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import Comment from './Comment';

function Post({ id, username, avatar, image, caption, timestamp }: any) {
  const { data: session }: any = useSession();
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const commentRef: any = useRef(null);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session.user.uid) !== -1
      ),
    [likes, session]
  );

  const buttonHandler = (e: any) => {
    if (e.target.value.length > 0) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  };

  const sendComment = async (e: any) => {
    e.preventDefault();

    if (!commentRef.current.value.trim()) return;

    const commentToSend = commentRef.current.value;
    commentRef.current.value = '';

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      avatar: session.user.image,
      timestamp: serverTimestamp()
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username
      });
    }
  };

  return (
    <div className='flex flex-col w-full bg-white border border-[#dbdbdb] rounded-md my-[15px]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center cursor-pointer m-2'>
          <div className='bg-gradient-to-tr from-yellow-400 to bg-fuchsia-600 p-[2px] rounded-full mr-2'>
            <div className='bg-white p-[2px] rounded-full'>
              <Image
                className='h-8 w-8 rounded-full'
                src={avatar}
                width={32}
                height={32}
                alt={username}
              />
            </div>
          </div>
          <p className='text-sm font-medium'>{username.toLowerCase()}</p>
        </div>
        <DotIcon />
      </div>
      <Image
        className='w-full min-h-[400px] object-cover'
        src={image}
        width={470}
        height={470}
        alt={username}
      />
      <div className='flex justify-between items-center mt-1 px-3 pb-[6px]'>
        <div className='flex items-center'>
          <button onClick={likePost} type='button'>
            {!hasLiked && (
              <LikeIcon css='block m-2 ml-0 hover:opacity-50 cursor-pointer' />
            )}
            {hasLiked && (
              <HasLikeIcon css='block m-2 ml-0 hover:opacity-50 cursor-pointer' />
            )}
          </button>
          <CommentIcon css='block m-2 hover:opacity-50 cursor-pointer' />
          <ShareIcon css='block m-2 hover:opacity-50 cursor-pointer' />
        </div>
        <SaveIcon css='block m-2 mr-0 hover:opacity-50 cursor-pointer' />
      </div>
      {likes.length > 0 && (
        <p className='text-sm font-medium px-3 mb-2'>
          <span>{likes.length}</span> Likes
        </p>
      )}
      <p className='text-sm px-3 line-clamp-2 mb-2'>
        <span className='font-medium mr-1'>{username}</span>
        {caption}
      </p>
      {comments.length > 0 && (
        <button
          onClick={() => {
            setShowComment(!showComment);
          }}
          type='button'
          className='text-left text-sm font-medium px-3 mb-2 opacity-50 cursor-pointer'
        >
          {!showComment && (
            <span>
              View all <span>{comments.length}</span> comments
            </span>
          )}
          {showComment && <span>Hide all comments</span>}
        </button>
      )}

      {showComment &&
        comments.length > 0 &&
        comments.map((comment: any) => (
          <Comment
            key={comment.id}
            username={comment.username}
            comment={comment.comment}
          />
        ))}

      {timestamp ? (
        <p className='text-[10px] font-medium px-3 mb-3 opacity-50'>
          <Moment className='uppercase' fromNow ago>
            {timestamp?.toDate()}
          </Moment>{' '}
          AGO
        </p>
      ) : (
        <p className='text-[10px] font-medium px-3 mb-3 opacity-50'>
          LOADING...
        </p>
      )}

      <form className='flex items-center pl-3 pr-4 py-3 border-t border-[#efefef]'>
        <EmojiIcon css='block mr-2 cursor-pointer' />
        <textarea
          ref={commentRef}
          onChange={buttonHandler}
          placeholder='Add a comment...'
          className='border-none flex-1 focus:ring-0 outline-none text-sm resize-none scrollbar-hide'
          rows={1}
        />
        <button
          onClick={sendComment}
          className='text-sm font-semibold text-[#0095f6] disabled:opacity-30'
          disabled={!buttonEnable}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;

function DotIcon() {
  return (
    <svg
      aria-label='More options'
      className='block mr-3 cursor-pointer'
      color='#262626'
      fill='#262626'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <circle cx='12' cy='12' r='1.5'></circle>
      <circle cx='6' cy='12' r='1.5'></circle>
      <circle cx='18' cy='12' r='1.5'></circle>
    </svg>
  );
}

function LikeIcon({ css }: any) {
  return (
    <svg
      aria-label='Like'
      className={css}
      color='#262626'
      fill='#262626'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <path d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z'></path>
    </svg>
  );
}

function HasLikeIcon({ css }: any) {
  return (
    <svg
      aria-label='Unlike'
      className={css}
      color='#ed4956'
      fill='#ed4956'
      height='24'
      role='img'
      viewBox='0 0 48 48'
      width='24'
    >
      <path d='M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
    </svg>
  );
}

function CommentIcon({ css }: any) {
  return (
    <svg
      aria-label='Comment'
      className={css}
      color='#262626'
      fill='#262626'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <path
        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
      ></path>
    </svg>
  );
}

function ShareIcon({ css }: any) {
  return (
    <svg
      aria-label='Share Post'
      className={css}
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
        strokeLinejoin='round'
        strokeWidth='2'
        x1='22'
        x2='9.218'
        y1='3'
        y2='10.083'
      ></line>
      <polygon
        fill='none'
        points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
      ></polygon>
    </svg>
  );
}

function SaveIcon({ css }: any) {
  return (
    <svg
      aria-label='Save'
      className={css}
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

function EmojiIcon({ css }: any) {
  return (
    <svg
      aria-label='Emoji'
      className={css}
      color='#262626'
      fill='#262626'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <path d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z'></path>
    </svg>
  );
}
