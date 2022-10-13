import "./App.css"
import {useEffect} from 'react';
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/UserProfile/UserProfile";
import {Routes,Route,Navigate,useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import {login} from './features/user'

function App() {
const navigate=useNavigate();
const dispatch=useDispatch();
useEffect(()=>{
const state = JSON.parse(localStorage.getItem('user'))
if(state){
dispatch(login(state));
navigate('/home');
}else{
navigate('/')
}
},[])
   return (
    <div className="App">
        <div className="blur" style={{top: '-18%', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
         <Routes>       
          <Route exact path='/' element={ <Auth/> }/>
          <Route path='/home' element={ <Home/> }/>
          <Route  exact path='/profile' element={<Profile/> }/>  
          <Route  path='/profile/:userid' element={<UserProfile/> }/>                  
         </Routes>
           </div> 
           )
        
   
  
}

export default App;
