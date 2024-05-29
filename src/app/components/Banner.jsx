import supaHax0rIcon from '../../assets/images/l33t_supa_h4x0r_icon.svg'
import './Banner.scss'

const Banner = (({ onClick }) => {
    return (
        <div id="banner" onClick={onClick}>
            <svg width="200" height="200"
                xmlns="http://www.w3.org/2000/svg">
                <image href={supaHax0rIcon} height="200" width="200"/>
            </svg>
        </div>
    )
})

export default Banner