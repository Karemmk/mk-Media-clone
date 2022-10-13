import React ,{useEffect,useState}from 'react'
import './MyPosts.css'

import Post from '../Post/Post'

const UserPosts = ({data}) => {

  return (
    <div className="Posts">
        {data.map((post, id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default UserPosts