import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/defaultProfile.png";
import "./ProfileCard.css";
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';


const ProfileUserCard = ({data}) => {
  const navigate=useNavigate();
  const ProfilePage = false;
  
  return (
    <div className="ProfileCard" >
      <div className="ProfileImages">
        <img src={data?.coverPic? data.coverPic:Cover} alt="" />
        <img src={data?.profilePic? data.profilePic:Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>{data.firstname} {data.lastname}</span>
        <span>{data?.country? data.country : ''}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{data?.following? data.following.length : '0'}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{data?.followrs? data.followrs.length : '0'}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" :<span onClick={()=>navigate('/profile')}>My Profile</span>}
    </div>
  );
};

export default ProfileUserCard;
