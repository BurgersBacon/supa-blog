import { useRef } from 'react';
import './NavBarMenu.scss'
import Link from './Link'

const NavBarMenu = (({ showMenu, onClick }) => {
    const menuRef = useRef(null);

    const triggerSearch = ((tag) => {
        onClick(true, tag)
    })

    return (
        <div 
            className={`menu ${showMenu ? 'opened' : ''}`}
            ref={menuRef}
        >
            <div onClick={() => triggerSearch(null)}>home</div>
            <div onClick={() => triggerSearch('about')}>about</div>
            <div onClick={() => triggerSearch('scripture')}>tags</div>
            
            <Link 
                label="X"
                href="https://twitter.com/supa_haxor"
            />
            <Link 
                label="insta"
                href="https://instagram.com/supa_haxor"
            />
            <Link 
                label="youtube"
                href="https://www.youtube.com/@supahaxor"
            />
            <Link 
                label="github"
                href="https://github.com/BurgersBacon/supa-blog"
            />                
        </div>
    )
})

export default NavBarMenu