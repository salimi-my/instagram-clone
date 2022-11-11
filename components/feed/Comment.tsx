import React from 'react';

function Comment({ username, comment }: any) {
  return (
    <p className='text-sm px-3 line-clamp-2 mb-2'>
      <span className='font-medium mr-1'>{username}</span>
      {comment}
    </p>
  );
}

export default Comment;
