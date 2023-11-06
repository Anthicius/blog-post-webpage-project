import React, { useState } from "react";
import { collection, addDoc  } from "firebase/firestore";
import {ref, uploadBytes} from "firebase/storage";
import { storage, firestore } from "../../../services/firebase/config";
import { useNavigate } from "react-router-dom";
import "./CreatePostPage.css"

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleTagChange = (e) => {
    const tagValue = e.target.value;
    setTags(tagValue.split(",").map((tag) => tag.trim()));
  };

  const submitHandler = async (e) => {
    e.preventDefault();


    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const newPostData = {
      title: title,
      description: description,
      date:new Date().toLocaleString("en-US", options),
      like: 1,
      tags: tags,
    };

    try {
      const docRef = await addDoc(collection(firestore, "posts"), newPostData);
      console.log("Document written with ID: ", docRef.id);
      const imageRef = ref(storage, `images/${docRef.id}`)
      uploadBytes(imageRef, image).then(()=>{
          console.log("Image uploaded")
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setTitle("");
    setDescription("");
    setTags([]);
    setImage(null)

    navigate("/")
  };

  return (
    <form onSubmit={submitHandler} className="create-post-form">
    <label htmlFor="title">Title</label>
    <input
      id="title"
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className="input-field"
    />
    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className="textarea-field"
    />
    <label htmlFor="tags">Tags (separated by commas)</label>
    <input
      id="tags"
      type="text"
      value={tags}
      onChange={handleTagChange}
      className="input-field"
    />
    <label htmlFor="image">Upload Image</label>
    <input
      id="image"
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
      className="input-field"
    />
    <button className="submit-button">Submit</button>
  </form>
);
};

export default CreatePostPage;
