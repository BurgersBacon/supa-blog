export const getConfig = () => {
    console.log('getConfig', process)
    return {
        blogId: process.env.REACT_APP_BLOGGER_ID || process.env.BLOGGER_ID,
        apiKey: process.env.REACT_APP_BLOGGER_API_KEY || process.env.BLOGGER_API_KEY,
    };
};