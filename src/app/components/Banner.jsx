import supaHax0rIcon from '../../assets/images/Untitled_Artwork 2.gif'
import './Banner.scss'

const Banner = (({ onClick }) => {
    return (
        <div id="banner" onClick={onClick}>
            <div className="cover-background"></div>
            <svg width="200" height="200"
                xmlns="http://www.w3.org/2000/svg">
                <image href={supaHax0rIcon} height="200" width="200"/>
            </svg>
        </div>
    )
})

export default Banner