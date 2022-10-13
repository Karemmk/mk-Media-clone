import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../../features/user';
import {useNavigate} from 'react-router-dom';

const InfoCard = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user = useSelector((state)=>state.user.value)
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{user?.status? user.status : 'Add your relationship'}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{user?.livesIn? user.livesIn : 'Where you lives'}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{user?.workAt? user.workAt : 'Add your work'}</span>
      </div>

      <button className="button logout-button"
      onClick={()=>{localStorage.clear();
      dispatch(logout());
      navigate('/')}}
      >Logout</button>
    </div>
  );
};

export default InfoCard;
