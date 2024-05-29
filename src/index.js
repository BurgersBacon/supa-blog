import React from 'react';
import ReactDOM from 'react-dom';
import './styles/fonts.scss';
import './styles/blog.scss';
import Blog from './app/Blog';

const App = () => {
  return <Blog></Blog>
}

ReactDOM.render(
  <App></App>,
  document.querySelector('#supa-blog')
)