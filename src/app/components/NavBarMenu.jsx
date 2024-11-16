import { useEffect, useRef, useState } from 'react';
import './NavBarMenu.scss'
import Link from './Link'

const NavBarMenu = (({ showMenu, onClick, onHeightMenuChange, onOpenLink, isMobile }) => {
    const menuRef = useRef(null);
    const [styles, setStyles] = useState({})
    const [selectedItem, setSelectedItem] = useState('home')

    const triggerSearch = ((tag, pageId = null) => {
        setSelectedItem(tag || pageId)
        if (tag === 'home')
            tag = null

        onClick(true, tag, pageId)
    })

    const updateStyles = () => {
        const clientHeight = menuRef?.current?.clientHeight;
        let transition
        if (isMobile)
            transition = 'margin-top 0.6s cubic-bezier(0.34, 1.3, 0.64, 1)'
        else
            transition = !showMenu ? 'margin-top .6s cubic-bezier(0.25, 0.6, 0.25, 1)' : 'margin-top 0.6s cubic-bezier(0.34, 1.3, 0.64, 1)'

        transition += ',opacity .5s ease-in-out'

        if (clientHeight) {
          setStyles({
            marginTop: showMenu ? 0 : ((clientHeight + 30) * -1),
            transition
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
                onClick={() => triggerSearch(null, '8664796053498369069')}
                className={selectedItem === '8664796053498369069' ? 'selected' : ''}
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
                href="https://x.com/supa_haxor"
                onClick={onOpenLink}
            />
            <Link 
                label="insta"
                href="https://instagram.com/supa_haxor"
                onClick={onOpenLink}
            />
            <Link 
                label="youtube"
                href="https://youtube.com/@supahaxor"
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
