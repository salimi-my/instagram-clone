import React, { useEffect, useState } from 'react';
import Post from './Post';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function Posts({ ssrPosts }: any) {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot: any) => {
          setPosts(
            snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
          );
        }
      ),
    []
  );

  return (
    <>
      {posts
        ? posts.map((post: any) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              avatar={post.avatar}
              image={post.image}
              caption={post.caption}
              timestamp={post.timestamp}
            />
          ))
        : ssrPosts.map((post: any) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              avatar={post.avatar}
              image={post.image}
              caption={post.caption}
              timestamp={post.timestamp}
            />
          ))}
    </>
  );
}

export default Posts;
