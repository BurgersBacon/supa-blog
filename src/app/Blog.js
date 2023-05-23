import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import '@fortawesome/fontawesome-free/css/all.css';
import supaHax0rIcon from '../assets/images/l33t_supa_h4x0r_icon.svg'

const Blog = () => {
    const bannerRef = useRef(null)
    const postsRef = useRef(null)

    const [posts, setPosts] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [showLoading, setShowLoading] = useState(true);
    const [fetchingPosts, setFetchingPosts] = useState(true);

    const blogId = '3288277498033260410'
    const apiKey = 'AIzaSyAwo0hFxpZBlBSqjwxO3F29A0ICpVnnHG8'

    
    useEffect(() => {
        // if there is not posts, start event and first post load
        if (!posts.length) {
            const bannerContainer = bannerRef.current;
            const postsContainer = postsRef.current;
            bannerContainer.addEventListener("wheel", function(e){
                e.preventDefault();        
                postsContainer.scrollBy(e.deltaX, e.deltaY);
            })
    
            // get first 5 posts
            getPosts()
        }
    })

    // function handleTouchMove(event) {
    //     const distanceFromBottom = event.target.scrollHeight - (event.target.scrollTop + event.target.clientHeight);
    //     console.log(distanceFromBottom, event.target.scrollHeight , event.target.scrollTop, event.target.clientHeight)
    //     // setIsNearBottom(distanceFromBottom <= 90);
    // }

    function handleScroll(e) {
        console.log(e.target.scrollTop,e.target.clientHeight, e.target.scrollHeight)
        if (showLoading) {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            if (scrollTop + clientHeight >= scrollHeight - 80) {
                getPosts()
            }
        }
    }

    function getPosts() {
        if (fetchingPosts) {
            setFetchingPosts(false)
            fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=5${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.items)
                    if (!data.nextPageToken)
                        setShowLoading(false)
                    setPosts([...posts, ...data.items])
                    setNextPageToken(data.nextPageToken)
                    setFetchingPosts(true)
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className="page-container">
            <div id="banner" ref={bannerRef}>
                <svg width="200" height="200"
                    xmlns="http://www.w3.org/2000/svg">
                    <image href={supaHax0rIcon} height="200" width="200"/>
                </svg>
            </div>
            <div id="posts" ref={postsRef} onScroll={handleScroll}>
                {posts && posts.length > 0 && posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <span className="date">{moment(post.updated).format('Do MMMM YYYY')}</span>
                        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                    </div>
                ))}
                {showLoading && <div className="loading-posts"><i className="fas fa-spinner fa-pulse"></i></div>}
            </div>
        </div>
    )
}

export default Blog