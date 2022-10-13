import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import InfoUserCard from '../InfoUserCard/InfoUserCard'
import LogoSearch from '../LogoSearch/LogoSearch'
const ProfileLeft = ({data}) => {
  return (
   <div className="ProfileSide">
      <div className='logoSearch'>
       <LogoSearch/>
      </div>
      
       {data? 
       <InfoUserCard user={data}/>
       :
       <InfoCard/>
       }
      
       <FollowersCard/>
   </div>
  )
}

export default ProfileLeft