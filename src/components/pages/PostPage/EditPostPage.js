import React, { useState, useEffect } from "react";
import "./EditPostPage.css";
import { useParams } from "react-router-dom";
import { firestore, storage } from "../../../services/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPostPage = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editTags, setEditTags] = useState("");
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const docRef = doc(firestore, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() };
          setData(postData);
          setEditTitle(postData.title);
          setEditDescription(postData.description);
          setEditTags(postData.tags);
          getDownloadURL(ref(storage, `images/${docSnap.id}`))
            .then((url) => {
              setEditImage(url);
            })
            .catch((error) => {
              console.error("Error getting download URL: ", error);
            });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post data: ", error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleTagChange = (e) => {
    const tagValue = e.target.value;
    setEditTags(tagValue.split(",").map((tag) => tag.trim()));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    toast.success("Post updated!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const postRef = doc(firestore, "posts", id);
    const updatedPostData = {
      title: editTitle,
      description: editDescription,
      tags: editTags,
    };

    try {
      await updateDoc(postRef, updatedPostData);
      if (editImage) {
        const imageRef = ref(storage, `images/${id}`);
        await uploadBytes(imageRef, editImage);
      }
      console.log("Document successfully updated!");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <div>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <form className="create-post-form" onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            className="input-field"
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            required
            className="textarea-field"
          />
          <label htmlFor="image">Change Image</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="input-field"
          />
          <label htmlFor="tags">Edit Tags</label>
          <input
            id="tags"
            type="text"
            value={editTags}
            onChange={handleTagChange}
            required
            className="input-field"
          />
          <button className="submit-button">Confirm</button>
          <ToastContainer />
        </form>
      )}
    </div>
  );
};

export default EditPostPage;
