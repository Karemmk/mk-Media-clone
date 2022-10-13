import { Modal, useMantineTheme } from "@mantine/core";
import {useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../features/user'

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const dispatch=useDispatch();
  const [firstname,setFirstname]=useState('');
  const [lastname,setLastname]=useState('');
  const [workAt,setWorkAt]=useState('');
  const [livesIn,setLivesIn]=useState('');
  const [country,setCountry]=useState('');
  const [status,setStatus]=useState('');
  const [profilepic,setProfilepic]=useState(null)
  const [proUrl,setProUrl]=useState('')
  console.log(profilepic)
  const [coverpic,setCoverpic]=useState(null)
  const [coverUrl,setCoverUrl]=useState('')

  
useEffect(()=>{
if(proUrl && coverUrl){
  fetch("http://localhost:5000/updateinfo",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      firstname,
      lastname,
      workAt,
      livesIn,
      country,
      status,
      profilePic:proUrl,
      coverPic:coverUrl
    })
}).then(res=>res.json())
.then(data=>{
  if(data.error){
    alert(data.error)
  }
  else {
     localStorage.setItem('user',JSON.stringify(data))
    dispatch(login(data));
    reset();
    alert("Upload seccssefuly");
  }
}).catch(err=>console.log(err))
}
},[proUrl,coverUrl])
const upProPic =()=>{
     const data = new FormData()
     data.append('file',profilepic)
     data.append('upload_preset','profile-pic')
     data.append('cloud_name','dyx1jeydm')
     fetch("https://api.cloudinary.com/v1_1/dyx1jeydm/image/upload",
                {
                method:"post",
                body: data
               }
                ).then(res=>res.json())
                .then(data=>setProUrl(data.url))
                .catch(err=>console.log(err))
  }
const upCoverPic =()=>{
     const data = new FormData()
     data.append('file',coverpic)
     data.append('upload_preset','cover-pic')
     data.append('cloud_name','dyx1jeydm')
     fetch("https://api.cloudinary.com/v1_1/dyx1jeydm/image/upload",
                {
                method:"post",
                body: data
               }
                ).then(res=>res.json())
                .then(data=>setCoverUrl(data.url))
                .catch(err=>console.log(err))
  }
  const reset=()=>{
    setFirstname('')
    setLastname('')
    setWorkAt('')
    setLivesIn('')
    setCountry('')
    setStatus('')
    setProfilepic(null)
    setCoverpic(null)
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="FirstName"
            placeholder="First Name"
             value={firstname}
            onChange={(e)=>setFirstname(e.target.value)}
          />

          <input
            type="text"
            className="infoInput"
            name="LastName"
            placeholder="Last Name"
             value={lastname}
            onChange={(e)=>setLastname(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAT"
            placeholder="Works at"
             value={workAt}
            onChange={(e)=>setWorkAt(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIN"
            placeholder="LIves in"
             value={livesIn}
            onChange={(e)=>setLivesIn(e.target.value)}
          />

          <input
            type="text"
            className="infoInput"
            name="Country"
            placeholder="Country"
             value={country}
            onChange={(e)=>setCountry(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
             value={status}
            onChange={(e)=>setStatus(e.target.value)}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileImg' onChange={(e)=>setProfilepic(e.target.files[0])}/>
            Cover Image
            <input type="file" name="coverImg" onChange={(e)=>setCoverpic(e.target.files[0])}/>
        </div>

        <button 
        onClick={(e)=>{
        e.preventDefault();
        upProPic();
        upCoverPic()}}
        className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
