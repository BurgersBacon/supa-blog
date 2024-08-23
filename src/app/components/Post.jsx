import moment from 'moment';
import parse from 'html-react-parser';

import MusicButton from '../components/MusicButton'
import './Post.scss'

const Post = (({ post }) => {
    const replaceLinks = (htmlString) => {
        const options = {
            replace: (domNode) => {
                if (domNode.name === 'a' && domNode.attribs && (domNode.attribs.href.includes('youtube.com') || domNode.attribs.href.includes('youtu.be') || domNode.attribs.href.includes('spotify.com'))) {
                    return (
                        <MusicButton href={domNode.attribs.href}/>
                    );
                }
            },
        };
        return parse(htmlString, options);
    };

    return (
        <div id={post.id} className={`post ${post.labels && post.labels && post.labels.includes('scripture') ? 'scripture' : ''}`} key={post.id}>
            {post.title &&
                <h2>{post.title}</h2> 
            }
            <span className="date">{moment(post.updated).format('Do MMMM YYYY')}</span>
            <div
                className="post-content" 
            >
                    {replaceLinks(post.content)}
                </div>
        </div>
    )
})

export default Post