import { useEffect, useRef, useState } from 'react';
import './NavBarMenu.scss'
import Link from './Link'

const NavBarMenu = (({ showMenu, onClick, onHeightMenuChange, onOpenLink }) => {
    const menuRef = useRef(null);
    const [styles, setStyles] = useState({})
    const [selectedItem, setSelectedItem] = useState('home')

    const triggerSearch = ((tag) => {
        setSelectedItem(tag)
        if (tag === 'home')
            tag = null

        onClick(true, tag)
    })

    const updateStyles = () => {
        const clientHeight = menuRef?.current?.clientHeight;
        if (clientHeight) {
          setStyles({
            marginTop: showMenu ? 0 : ((clientHeight + 30) * -1)
          });
          onHeightMenuChange(clientHeight + 30)
        }
    };

    useEffect(() => {
        updateStyles(); // Initial style calculation
    
        const handleResize = () => {
          updateStyles(); // Update styles on window resize
        };
    
        window.addEventListener('resize', handleResize);

        window.onload = () => {
            updateStyles();
        };
    
        return () => {
          window.removeEventListener('resize', handleResize); // Cleanup on unmount
        };
      }, [showMenu]); 

    return (
        <div 
            className={`menu ${showMenu ? 'opened' : ''}`}
            ref={menuRef}
            style={styles}
        >
            <div 
                onClick={() => triggerSearch('home')}
                className={selectedItem === 'home' ? 'selected' : ''}
            >
                    home
            </div>
            <div 
                onClick={() => triggerSearch('about')}
                className={selectedItem === 'about' ? 'selected' : ''}
            >
                    about
            </div>
            <div 
                onClick={() => triggerSearch('scripture')}
                className={selectedItem === 'scripture' ? 'selected' : ''}
            >
                    tags
            </div>
            
            <Link 
                label="X"
                href="https://twitter.com/supa_haxor"
                onClick={onOpenLink}
            />
            <Link 
                label="insta"
                href="https://instagram.com/supa_haxor"
                onClick={onOpenLink}
            />
            <Link 
                label="youtube"
                href="https://www.youtube.com/@supahaxor"
                onClick={onOpenLink}
            />
            <Link 
                label="github"
                href="https://github.com/BurgersBacon/supa-blog"
                onClick={onOpenLink}
            />                
        </div>
    )
})

export default NavBarMenu