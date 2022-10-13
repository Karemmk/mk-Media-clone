import React ,{useEffect,useState}from 'react'
import './MyPosts.css'

import Post from '../Post/Post'

const MyPosts = () => {
const [PostsData,setPostsData]=useState([])
useEffect(()=>{
   fetch('http://localhost:5000/mypost',{
   headers:{
     "Authorization":"Bearer "+localStorage.getItem('jwt')
   }
   }).then(res=>res.json())
   .then(result=>{
     setPostsData(result.mypost)
   })
},[PostsData])
  return (
    <div className="Posts">
        {PostsData.map((post, id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default MyPosts