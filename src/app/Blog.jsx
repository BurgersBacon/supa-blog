// dependencies
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Blog.scss'

// components
import Banner from './components/Banner'
import NavBarMenu from './components/NavBarMenu'
import Posts from './components/Posts'
import { useBlogMainLogic } from './hooks/useBlogMainLogic';

const Blog = () => {
    const {
        posts,
        showLoading,
        showMenu,
        postsRef,
        toggleMenu,
        updateHeightMenu,
        getPosts,
        setShowMenu,
        isMobile
    } = useBlogMainLogic();

    return (
        <div className="page-container">
            <div className="header-wrapper">
                <Banner 
                    onClick={toggleMenu}
                />
                <NavBarMenu 
                    onClick={getPosts}
                    onHeightMenuChange={updateHeightMenu}
                    showMenu={showMenu}
                    onOpenLink={() => setShowMenu(false)}
                    isMobile={isMobile} 
                />
            </div>
            <div ref={postsRef} id="posts">
                <Posts 
                    posts={posts}
                    showLoading={showLoading}
                />
            </div>
        </div>
    )
}

export default Blog