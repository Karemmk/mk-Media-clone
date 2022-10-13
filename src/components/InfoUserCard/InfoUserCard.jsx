import React, { useState } from "react";
import "./InfoCard.css";



const InfoUserCard = ({user}) => {
 
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>{user?.firstname} Info</h4>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{user?.status? user.status : 'Emty'}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{user?.livesIn? user.livesIn : 'Emty'}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{user?.workAt? user.workAt : 'Emty'}</span>
      </div>

    
    </div>
  );
};

export default InfoUserCard;
