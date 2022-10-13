import React ,{useState,useEffect}from 'react'
import Logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import ProfileImage from "../../img/defaultProfile.png";

const LogoSearch = () => {
const user = useSelector((state)=>state.user.value)
const navigate=useNavigate()
const [filteredData, setFilteredData] = useState([]);
const [data,setData]=useState([])
const [wordEntered, setWordEntered] = useState("");

useEffect(()=>{
   fetch('http://localhost:5000/alluser',{
   headers:{
     "Authorization":"Bearer "+localStorage.getItem('jwt')
   }
   }).then(res=>res.json())
   .then(result=>{
     //console.log(result)
     setData(result.users)
   })
},[data])

const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
    
      return value.firstname.sub(' ',value.lastname).toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  return (
   <div className="LogoSearch">
       
       <div className="Search">
          <img src={Logo} alt="" />
           <input type="text" placeholder='#Explore' value={wordEntered}
          onChange={handleFilter}/>
           <div className="s-icon">
               <UilSearch onClick={(e)=>{e.preventDefault(); if(filteredData[0]._id){ navigate(`/profile/${filteredData[0]._id}`) }}}/>
           </div>
        </div>
          {filteredData.map((value, key) => {
                    if(value._id!=user._id){
            return (
             <div className="dataResult" style={{display:'flex',cursor:'pointer', margin:'5px'}} onClick={()=>{navigate(`/profile/${value._id}`);setWordEntered('');setFilteredData([]);}}>
                <img style={{cursor:'pointer'}} src={value?.profilePic? value.profilePic : ProfileImage} alt="" className='followerImage' />
                <p style={{cursor:'pointer'}} >{value.firstname} {value.lastname} </p>
              
              </div>
            );
          }})
          }

   </div>
  )
}

export default LogoSearch