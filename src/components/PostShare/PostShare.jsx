import React, { useState, useRef ,useEffect} from "react";
import ProfileImage from "../../img/defaultProfile.png";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector,useDispatch } from 'react-redux';

const PostShare = () => {
  const [image, setImage] = useState(null);
   console.log(image)
  const imageRef = useRef();
  const [url,setUrl]=useState('');
  const [title,setTitle]=useState('');
  const state = useSelector((state)=>state.user.value);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
     
    }
  };
  useEffect(()=>{
  if(url){
  fetch("http://localhost:5000/createpost",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
       "Authorization" : "Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      title,
      img:url
    })
}).then(res=>res.json())
.then(data=>{
  if(data.error){
    alert(data.error)
  }
  else {
    alert("post seccssefuly");
    setImage(null);
    setTitle('');
  }
  }).catch(err=>console.log(err))
  }
  
  },[url])
  const uplodImg =()=>{
     const data = new FormData()
     data.append('file',image)
     data.append('upload_preset','media-clone')
     data.append('cloud_name','dyx1jeydm')
     fetch("https://api.cloudinary.com/v1_1/dyx1jeydm/image/upload",
                {
                method:"post",
                body: data
               }
                ).then(res=>res.json())
                .then(data=>setUrl(data.url))
                .catch(err=>console.log(err))
  }
  
 
  return (
    <div className="PostShare">
      <img src={state?.profilePic? state.profilePic:ProfileImage} alt="" />
      <div>
        <input type="text" placeholder="What's happening" 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button className="button ps-button" onClick={()=>uplodImg()}>Share</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      {image && (

        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={URL.createObjectURL(image)} alt="" />
        </div>

      )}


      </div>
    </div>
  );
};

export default PostShare;
