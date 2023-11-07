import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../../services/firebase/config';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [searchTermDataFetch, setSearchTermDataFetch] = useState([]);
  const location = useLocation();
  const searchTerm = location.pathname.split('/').pop();

  const searchHandler = async (searchTerm) => {
    const titleQuery = query(collection(firestore, 'posts'), where('title', '==', searchTerm));
    const descriptionQuery = query(collection(firestore, 'posts'), where('description', '==', searchTerm));

    const titleQuerySnapshot = await getDocs(titleQuery);
    const descriptionQuerySnapshot = await getDocs(descriptionQuery);

    const titlePromises = titleQuerySnapshot.docs.map(async (doc) => {
      const postData = doc.data();
      const imageUrl = await getDownloadURL(ref(storage, `images/${doc.id}`)).catch((error) =>
        console.log(error)
      );
      return { ...postData, id: doc.id, imageUrl: imageUrl };
    });

    const descriptionPromises = descriptionQuerySnapshot.docs.map(async (doc) => {
      const postData = doc.data();
      const imageUrl = await getDownloadURL(ref(storage, `images/${doc.id}`)).catch((error) =>
        console.log(error)
      );
      return { ...postData, id: doc.id, imageUrl: imageUrl };
    });

    const titleData = await Promise.all(titlePromises);
    const descriptionData = await Promise.all(descriptionPromises);

    const combinedData = titleData.concat(descriptionData);

    setSearchTermDataFetch(combinedData);
  };

  useEffect(() => {
    if (searchTerm) {
      searchHandler(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div>
      {searchTermDataFetch && searchTermDataFetch.length > 0 ? (
        searchTermDataFetch.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            date={post.date}
            title={post.title}
            description={post.description}
            like={post.like}
            imageUrl={post.imageUrl}
            tags={post.tags}
          />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
