import React from 'react'
import './PostItem.css'

const PostItem = ({id,date, readMore, title, description,like, tags, imageUrl}) => {
  
  return (
<div class="container">
    <div class="post">
        <div class="header_post">
            <img src={imageUrl} alt=""/>
        </div>

        <div class="body_post">
            <div class="post_content">
          
                <h1 className='title'>{title}</h1>
                <p className='description'>{description}</p>

                <div class="container_infos">
                    <div class="postedBy">
                        <span>Date:</span>
                        <p className='date'>{date}</p>
                    </div>

                    <div class="container_tags">
                        <span>tags</span>
                        <div class="tags">
                            <ul>
                            {tags.map((tag)=>(
                              <li>{tag}</li>
                            ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}



export default PostItem