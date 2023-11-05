import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { firestore, storage } from '../../../services/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      await getDocs(collection(firestore, "posts"))
        .then(async (querySnapshot) => {
          const postData = querySnapshot.docs.map(async (doc) => {
            const postData = doc.data();
            const imageUrl = await getDownloadURL(ref(storage, `images/${doc.id}`)).catch((error) => console.log(error));
            return { ...postData, id: doc.id, imageUrl: imageUrl };
          });
          Promise.all(postData).then((data) => setData(data));
        });
    };
    fetchPostData();
  }, []);

  return (
    <div className="post-list">
      {data.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id} className='post-item'>
          <PostItem id={post.id} date={post.date} readMore={true} title={post.title} description={post.description} like={post.like} imageUrl={post.imageUrl} tags={post.tags} />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
