// dependencies
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

// components
import Banner from './components/Banner'
import NavBarMenu from './components/NavBarMenu'
import Posts from './components/Posts'

const Blog = () => {
    // state variables
    const [posts, setPosts] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [showLoading, setShowLoading] = useState(true);
    const [fetchingPosts, setFetchingPosts] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [blogTag, setBlogTag] = useState(null);
    const [menuHeight, setMenuHeight] = useState(null);

    const blogId = '3288277498033260410'
    const apiKey = 'AIzaSyAwo0hFxpZBlBSqjwxO3F29A0ICpVnnHG8'

    // menu methods
    function toggleMenu() {
        setShowMenu(!showMenu)
    }
    function updateHeightMenu(height) {
        setMenuHeight(height)
    }

    // gets posts from blogger API
    function getPosts(newSearch, tag) {
        let labelQuery
        let token = nextPageToken
        if (newSearch){
            token = ''
            setNextPageToken('')
            setPosts(() => [])
            setBlogTag(tag)

            labelQuery = tag ? `&labels=${tag}` : ''
        }
        else
            labelQuery = blogTag ? `&labels=${blogTag}` : ''

        setFetchingPosts(true)
        fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=5${labelQuery}${token ? `&pageToken=${token}` : ''}`)
            .then(response => response.json())
            .then(data => {
                // this hides the loading icon when there are no more posts to load
                if (data.items)
                    setPosts(prevPosts => [...prevPosts, ...data.items])

                setNextPageToken(data.nextPageToken)
                setShowLoading(data.nextPageToken && true)

                if(newSearch)
                    setShowMenu(false)

                setTimeout(() => {
                    setFetchingPosts(false)
                }, 500)
            })
            .catch(error => console.error(error));
    }

    // checks scroll event (and loads next 5 posts when at the bottom)
    function handleScroll(e) {
        let target = e.target.documentElement ? e.target.documentElement : e.target
        const { scrollTop, clientHeight, scrollHeight } = target;

        if (menuHeight && scrollTop > menuHeight)
            setShowMenu(false)

        if (showLoading && !fetchingPosts && scrollTop + clientHeight >= scrollHeight - 80)
            getPosts()
    }

    useEffect(() => {
        const onScroll = event => handleScroll(event);

        // creates event whenever one of these [posts, nextPageToken, showLoading, fetchingPosts] gets updated.
        // then, the return cleans the events in the browser.
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, [handleScroll, posts, nextPageToken, showLoading, fetchingPosts, blogTag, menuHeight]);
    
    // this useEffect gets triggered just once (when the page loads)
    useEffect(() => {
        // // if there is not posts, start event and first post load
        if (!posts.length && !fetchingPosts) { 
            // get first 5 posts
            getPosts()
        }
    }, [])

    return (
        <div className="page-container">
            <Banner 
                onClick={toggleMenu}
            />
            <NavBarMenu 
                onClick={getPosts}
                onHeightMenuChange={updateHeightMenu}
                showMenu={showMenu}
                onOpenLink={() => setShowMenu(false)}
            />
            <Posts 
                posts={posts}
                showLoading={showLoading}
            />
        </div>
    )
}

export default Blog