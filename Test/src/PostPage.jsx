import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectAllPosts, selectCurrentPostIndex, setCurrentPostIndex } from './postSlice';

const PostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const currentPostIndex = useSelector(selectCurrentPostIndex);
  const currentPost = posts[currentPostIndex];

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleNextPost = () => {
    dispatch(setCurrentPostIndex(currentPostIndex + 1));
  };

  const handlePrevPost = () => {
    dispatch(setCurrentPostIndex(currentPostIndex - 1));
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{currentPost.title}</h1>
      <p>{currentPost.body}</p>
      <button onClick={handlePrevPost} disabled={currentPostIndex === 0}>Previous</button>
      <button onClick={handleNextPost} disabled={currentPostIndex === posts.length - 1}>Next</button>
    </div>
  );
};

export default PostPage;
