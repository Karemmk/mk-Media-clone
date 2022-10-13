import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/defaultProfile.png";
import "./ProfileCard.css";
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';


const ProfileCard = () => {
  const navigate=useNavigate();
  const ProfilePage = false;
  const state = useSelector((state)=>state.user.value);
  return (
    <div className="ProfileCard" >
      <div className="ProfileImages">
        <img src={state?.coverPic? state.coverPic:Cover} alt="" />
        <img src={state?.profilePic? state.profilePic:Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>{state.firstname} {state.lastname}</span>
        <span>{state?.country? state.country : 'Add your country'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{state?.following? state.following.length : '0'}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{state?.followrs? state.followrs.length : '0'}</span>
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

export default ProfileCard;
