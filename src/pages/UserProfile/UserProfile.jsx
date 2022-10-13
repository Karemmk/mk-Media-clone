import React,{useState,useEffect} from 'react'
import UserPosts from '../../components/UserPosts/UserPosts'
import ProfileUserCard from '../../components/ProfileUserCard.jsx/ProfileUserCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
import {useParams} from 'react-router-dom'

const UserProfile = () => {
const {userid}=useParams()
const [PostsData,setPostsData]=useState([])
const [UserData,setUserData]=useState({})

useEffect(()=>{
   fetch(`http://localhost:5000/user/${userid}`,{
   headers:{
     "Authorization":"Bearer "+localStorage.getItem('jwt')
   }
   }).then(res=>res.json())
   .then(result=>{
    console.log(result.user.followrs)
     setPostsData(result.posts)
     setUserData(result.user)
   })
},[userid,UserData.followrs,UserData.following])
  return (
    <div className="Profile">
        <ProfileLeft data={UserData}/>
        
        <div className="Profile-center">
          <ProfileUserCard data={UserData}/>
          <UserPosts data={PostsData}/>
        </div>

        <RightSide/>
    </div>
  )
}

export default UserProfile