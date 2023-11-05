import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore, storage } from "../../../services/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import "./PostPage.css";

const PostPage = () => {
  const [post, setPost] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      const docRef = doc(firestore, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
        getDownloadURL(ref(storage, `images/${docSnap.id}`))
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("No such document!");
      }
    };

    fetchPostData();
  }, [id]);

  return (
    <div className="container">
      <div className="post-image">
        <img src={imageUrl} alt="Post" />
      </div>
      <div className="post-details">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>
        <div className="post-meta">
          <p className="post-date">Date: {post.date}</p>
          <p className="post-like">Likes: {post.like}</p>
        </div>
        <div className="post-tags">
          Tags:
          {post.tags &&
            post.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
