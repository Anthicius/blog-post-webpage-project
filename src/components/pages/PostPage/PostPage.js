import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore, storage, auth } from "../../../services/firebase/config";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import EditIcon from "../../../assets/images/edit-icon.png";
import DeleteIcon from "../../../assets/images/delete-icon.png";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import "./PostPage.css";

const PostPage = () => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();




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

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    fetchPostData();

    return () => unsubscribe();
  }, [id]);

  const deleteHandler = async () => {
    try {
      const postRef = doc(firestore, "posts", id);
      await deleteDoc(postRef);
      console.log("Document successfully deleted!");
      navigate("/") 
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const options = {
    title: 'Confirm to delete',
    message: 'Do you want to delete this post?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => deleteHandler()
      },
      {
        label: 'No',
        onClick: () => ""
      }
    ],
    childrenElement: () => <div />,
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name"
  };
  


  return (
    <div className="container">
      <div className="post-image">
        <img src={imageUrl} alt="Post" />
      </div>
      <div className="post-details">
        <div className="post-title-container">
          <h2 className="post-title">{post.title}</h2>
          {user && (<div className="post-icons">
            <img onClick={()=>confirmAlert(options)} src={DeleteIcon} alt="Delete" className="post-delete-icon" />
            <Link to={`/post/${id}/edit`}>
              <img src={EditIcon} alt="Edit" className="post-edit-icon" />
            </Link>
          </div>)}
        </div>
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
