import React from 'react'
import QuoraBox from './QuoraBox'
import './css/Feed.css'
import Post from './Post'
import axios from 'axios'
import { useEffect } from 'react'

function Feed() {
  const [posts, setPosts] = React.useState([]);
  useEffect (() => {
    axios.get('/api/questions').then((res) => {
      console.log(res.data.reverse());
      setPosts(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [])
  return (
    <div className='feed'>
      <QuoraBox />
      {
        posts.map((post, index) => (<Post key = {index} post = {post} />))
      }         
    </div>
  )
}

export default Feed