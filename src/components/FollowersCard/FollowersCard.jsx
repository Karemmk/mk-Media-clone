import React,{useState,useEffect} from 'react'
import './FollowersCard.css'
import ProfileImage from "../../img/defaultProfile.png";
import {useSelector,useDispatch} from 'react-redux'
import {login} from '../../features/user'
import {useNavigate} from 'react-router-dom'

const FollowersCard = () => {
const navigate=useNavigate()
const dispatch=useDispatch();
const user = useSelector((state)=>state.user.value)
const [followers,setFollowers]=useState([]);
useEffect(()=>{

 fetch('http://localhost:5000/alluser',{
   headers:{
     "Authorization":"Bearer "+localStorage.getItem('jwt')
   }
   }).then(res=>res.json())
   .then(result=>{
     //console.log(result)
     setFollowers(result.users)
   })

},[user.following])

const follow = (id)=>{

  fetch('http://localhost:5000/follow',{
  method:'put',
  headers:{
    "Content-Type":"application/json",
    "Authorization": "Bearer "+localStorage.getItem('jwt')
  },
  body:JSON.stringify({followId:id})
  }).then(res=>res.json())
   .then(result=> {dispatch(login(result))})
  .catch(err=>{console.log(err)})
  
}

const unfollow = (id)=>{

  fetch('http://localhost:5000/unfollow',{
  method:'put',
  headers:{
    "Content-Type":"application/json",
    "Authorization": "Bearer "+localStorage.getItem('jwt')
  },
body:JSON.stringify({unfollowId:id})
  }).then(res=>res.json())
   .then(result=> {dispatch(login(result))})
  .catch(err=>{console.log(err)})
  
}
const handlFollow=(e,follower)=>{
 e.preventDefault()
if( follower.followrs.includes(user._id)){
 unfollow(follower._id)
 }else{follow(follower._id)}

}


  return (
    <div className="FollowersCard">
        <h3>Who is following you</h3>

        {followers.map((follower, id)=>{
          if(follower._id!=user._id){
            return(
                <div className="follower">
                    <div style={{cursor:'pointer'}} onClick={()=>navigate(`/profile/${follower._id}`)}>
                        <img src={follower?.profilePic? follower.profilePic : ProfileImage} alt="" className='followerImage' />
                        <div className="name">
                            <span>{follower.firstname}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className={follower.followrs.includes(user._id)? 'unfoll-button fc-button':'button fc-button'} onClick={(e)=>handlFollow(e,follower)} >
                       {follower.followrs.includes(user._id)? 'Unfollow' :'Follow'}
                    </button>
                </div>
            )
      } })}
    </div>
  )
}

export default FollowersCard