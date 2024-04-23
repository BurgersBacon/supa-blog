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
    const [fetchingPosts, setFetchingPosts] = useState(false);

    const fetchingPostsRef = useRef(showLoading);
    const nextPageTokenRef = useRef(nextPageToken);

    const blogId = '3288277498033260410'
    const apiKey = 'AIzaSyAwo0hFxpZBlBSqjwxO3F29A0ICpVnnHG8'

    useEffect(() => {
        fetchingPostsRef.current = fetchingPosts;
        nextPageTokenRef.current = nextPageToken;
        postsRef.current = posts;

      }, [fetchingPosts, nextPageToken, posts]);
    
    useEffect(() => {
        // if there is not posts, start event and first post load
        if (!posts.length && !fetchingPosts) {
            const bannerContainer = bannerRef.current;
            const postsContainer = postsRef.current;
            bannerContainer.addEventListener("wheel", function(e){
                e.preventDefault();        
                postsContainer.scrollBy(e.deltaX, e.deltaY);
            })

            window.addEventListener("scroll", handleScroll);
            document.getElementById('posts').addEventListener("scroll", handleScroll);
    
            // get first 5 posts
            getPosts()
        }
    })

    function handleScroll(e) {
        let target = e.target.documentElement ? e.target.documentElement : e.target
        const { scrollTop, clientHeight, scrollHeight } = target;
        if (!fetchingPostsRef.current && scrollTop + clientHeight >= scrollHeight - 80) {
            getPosts()
        }
    }

    function getPosts() {
        setFetchingPosts(true)
        fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=5${nextPageTokenRef.current ? `&pageToken=${nextPageTokenRef.current}` : ''}`)
            .then(response => response.json())
            .then(data => {
                if (!data.nextPageToken)
                    setShowLoading(false)
                setPosts([...postsRef.current, ...data.items])
                setNextPageToken(data.nextPageToken)
                setTimeout(() => {
                    setFetchingPosts(false)
                }, 500)
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="page-container">
            <div id="banner" ref={bannerRef}>
                <svg width="200" height="200"
                    xmlns="http://www.w3.org/2000/svg">
                    <image href={supaHax0rIcon} height="200" width="200"/>
                </svg>
            </div>
            <div id="posts" ref={postsRef}>
                {posts && posts.length > 0 && posts.map((post) => (
                    <div className={`post ${post.labels && post.labels && post.labels.includes('scripture') ? 'scripture' : ''}`} key={post.id}>
                        <h2>{post.title} PEZ</h2>
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