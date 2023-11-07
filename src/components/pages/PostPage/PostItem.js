import React from 'react';
import './PostItem.css';

const PostItem = ({ id, date, title, description, like, tags, imageUrl }) => {

  return (
    <div className="container" key={id}>
      <div className="post">
        <div className="header_post">
          <img src={imageUrl} alt="" />
        </div>

        <div className="body_post">
          <div className="post_content">
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>

            <div className="container_infos">
              <div className="postedBy">
                <span>Date:</span>
                <p className="date">{date}</p>
              </div>

              <div className="container_tags">
                <span>tags</span>
                <div className="tags">
                  <ul>
                    {tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
