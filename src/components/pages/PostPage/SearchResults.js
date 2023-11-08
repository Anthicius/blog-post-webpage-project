// SearchResults.js
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../../services/firebase/config';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [searchTermDataFetch, setSearchTermDataFetch] = useState([]);
  const location = useLocation();
  const searchTerm = location.pathname.split('/').pop();

  const searchHandler = async (searchTerm) => {
    const querySnapshot = await getDocs(collection(firestore, 'posts'));
    const data = [];
    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      const imageUrl = getDownloadURL(ref(storage, `images/${doc.id}`)).catch((error) =>
        console.log(error)
      );
      data.push({ ...postData, id: doc.id, imageUrl: imageUrl });
    });
    setSearchTermDataFetch(data);
  };

  useEffect(() => {
    if (searchTerm) {
      searchHandler(searchTerm);
    }
  }, [searchTerm]);


  const filteredData = searchTermDataFetch.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <PostItem
              id={post.id}
              date={post.date}
              title={post.title}
              description={post.description}
              like={post.like}
              imageUrl={post.imageUrl}
              tags={post.tags}
            />
          </Link>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
