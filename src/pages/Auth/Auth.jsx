import React,{useState} from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../features/user'

const Auth = () => {
const dispatch = useDispatch();
const navigate= useNavigate();
const [render,setRender]= useState(false);
const [username,setUsername]=useState('');
const [firstname,setFirstname]=useState('');
const [lastname,setLastname]=useState('');
const [password,setPassword]=useState('')
const postData =()=>{
  fetch("http://localhost:5000/signup",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username,
      firstname,
      lastname,
      password
    })
}).then(res=>res.json())
.then(data=>{
  if(data.error){
    alert(data.error)
  }
  else {
    alert(data.message);
    setRender(true);
    rest()
  }
}).catch(err=>console.log(err))
}
const PostData =()=>{
  fetch("http://localhost:5000/signin",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username,
      password
    })
}).then(res=>res.json())
.then(data=>{
  if(data.error){
    alert(data.error)
  }
  else {
    localStorage.setItem('jwt',data.token);
    localStorage.setItem('user',JSON.stringify(data.user))
    dispatch(login(data.user));
    alert("Login seccssefuly");
    navigate('/home')
    setRender(false);
    rest();
  }
}).catch(err=>console.log(err))
}
const rest= ()=>{
setFirstname('');
    setLastname('');
    setUsername('');
    setPassword('');
}

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Mk Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div className="a-right">
              <form className="infoForm authForm">
      {render?
      <>
          <h3>Log In</h3>
  
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
  
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
  
          <div>
              <span 
             onClick={(e)=>{
            e.preventDefault();
            setRender(!render);
            rest();
            }}
              style={{ fontSize: "12px" ,cursor:'pointer'}}>
                Don't have an account Sign up
              </span>
            <button className="button infoButton"
            onClick={(e)=>{e.preventDefault();
        PostData();}}>Login</button>
          </div>
       
    </>
  :  
  <>
  <h3>Sign up</h3>
     
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            value={firstname}
            onChange={(e)=>setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            value={lastname}
            onChange={(e)=>setLastname(e.target.value)}
          />
        </div>
    
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
     
        </div>

        <div>
            <span 
            onClick={(e)=>{
            e.preventDefault();
            setRender(!render);
            rest();
            }}
            style={{fontSize: '12px',cursor:'pointer'}} > Already have an account. Login!</span>
        </div>
        <button className="button infoButton" 
        onClick={(e)=>{e.preventDefault();
        postData();}}
        >Signup</button>
     </>
    }
</form>
    </div>
     </div>
);
}


export default Auth;
