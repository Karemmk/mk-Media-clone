import React from 'react'
import MyPosts from '../../components/MyPosts/MyPosts'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
const Profile = () => {
  return (
    <div className="Profile">
        <ProfileLeft/>

        <div className="Profile-center">
            <ProfileCard/>
            <MyPosts />
        </div>

        <RightSide/>
    </div>
  )
}

export default Profile