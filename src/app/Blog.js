import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import supaHax0rIcon from '../assets/images/l33t_supa_h4x0r_icon.svg'

const Blog = () => {
    const bannerRef = useRef(null)
    const postsRef = useRef(null)
    const [posts, setPosts] = useState([]);

    
    useEffect(() => {
        const bannerContainer = bannerRef.current;
        const postsContainer = postsRef.current;
        bannerContainer.addEventListener("wheel", function(e){
            e.preventDefault();        
            postsContainer.scrollBy(e.deltaX, e.deltaY);
        })

        let blogId = '3288277498033260410'
        let apiKey = 'AIzaSyAwo0hFxpZBlBSqjwxO3F29A0ICpVnnHG8'

        fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=100`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPosts(data.items)
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <div className="page-container">
            <div id="banner" ref={bannerRef}>
                <svg width="200" height="200"
                    xmlns="http://www.w3.org/2000/svg">
                    <image href={supaHax0rIcon} height="200" width="200"/>
                </svg>
            </div>
            <div id="posts" ref={postsRef}>
                {posts && posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        {/* <span className="date">16th January 2021</span> */}
                        <span className="date">{moment(post.updated).format('Do MMMM YYYY')}</span>
                        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blog