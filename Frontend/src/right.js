import React, { useState } from 'react'
import { Checkbox, Heading, Input, Labe, Login, Smalltext } from './sty'
import {useDispatch , useSelector} from 'react-redux'
import { userloginned , userlogout,setsocketconnection} from './redux/auth'
import {setusergame} from './redux/userDetails'
import { useNavigate } from "react-router-dom";

export const Right = () => {
  const navigate=useNavigate();
  const usertoken=useSelector(state=>state.auth.token);
  console.log("redux working "+ usertoken)
  const dispatch=useDispatch();
  const [email,setemail] =useState();
  const [username,setusername]=useState();
  const [password,setpassword]=useState();
  const [reg, setreg]=useState(false)
    const [isFocused, setIsFocused] = useState(false);
    const [passview,setpassview]=useState(false);

   const ctoken=useSelector(state=>state.auth.token)

   const userData = {
        email: email,
        password: password,
        username : username
    };
  const handleRegister=()=>{
    if(email===''||password===''||username==='')
    {
      alert("Input fields are empty")
      return
    }
   fetch('https://card-game-self-omega.vercel.app/register',{
    method : 'POST',
    headers :{
      'content-type':'application/json'
    },
    body : JSON.stringify(userData)
   })
   .then(response =>{
    if(response.ok){
      alert('user registered successfuly');
     
      
    }
    else{
    //  const data= response.json()
    
     alert("User with this email already exists")
  // throw new Error(JSON.stringify(data))
    }
   })
   .catch(error =>{
    console.error('error registering user :', error)
   })
   setpassword('');
   setemail('');
   setusername('');
  }
  const handleLogin=()=>{
      fetch('https://card-game-self-omega.vercel.app/login',{
    method : 'POST',
    headers :{
      'content-type':'application/json'
    },
    body : JSON.stringify(userData)
   })
   .then(response =>{
    if(response.ok){
      console.log('user loginned successfuly');
      return response.json()
      
    }
    else{
      alert("username or password incorrect")
      throw new Error('failed to login user')
    }
   }).then(async (data)=>{
   
    dispatch(setusergame({ "username":'',
        "curr":[],
        "deck":[],
        "diff":0,
        "gameloose":0,
        "gamewin":0,
      "gameover":false}))
    dispatch(userloginned(data.token))
    console.log("deck from server"+JSON.stringify(data))
    dispatch(setusergame(data));
    localStorage.setItem('token', data.token);
          
    // Store the socket connection in state
  

    navigate('gamepage')
  })
   .catch(error =>{
    console.error('error logging in user :', error)
   })
    setpassword('');
   setemail('');
   setusername('');
  }

  return (
     <div className='rightcss'>
      
    { reg ? <Heading>REGISTER</Heading> : <Heading>LOGIN</Heading>}
    <div>
    {reg ? <Labe>EMAIL ID</Labe> : <Labe>LOGIN ID</Labe>}  
      
      <Input value={email}onChange={(e)=>{setemail(e.target.value)}} bor="solid" placeholder={` ${reg ? 'Email Id' : 'Enter Login Id'}`}></Input>
      <br></br>
      <br></br>
      {  reg ? <><Labe>User Name</Labe><Input value={username} onChange={(e)=>{setusername(e.target.value)}} bor="solid" placeholder='User Name'></Input>
      <br></br>
      <br></br></>:''}
      <Labe>Password</Labe>
      <div className={`passinp ${isFocused ? 'focused' : ''}`}>
      <Input value={password} onChange={(e)=>{ setpassword(e.target.value)}} type={passview ? 'text':'password'} bor="none" onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)} placeholder='Enter Password'></Input>
      <span className='vec' onClick={()=>{
        setpassview(!passview);
      }}><img src='bi_eye-slash-fill.png' alt='no'></img></span>
      </div>
      <div className='sep'>
        <div className='sep'>
          
      <Checkbox type="checkbox"></Checkbox>
      <Smalltext color='#737B86'>RememberMe</Smalltext>
      </div>
      
      <Smalltext color=' #F78719;'>Change Password</Smalltext>
</div>
      <br></br>
  
      <Checkbox type="checkbox" ></Checkbox>
      <Smalltext color='#737B86' >Agree To <span>Terms and Conditions</span></Smalltext>
     <br></br>
     <br></br>
      <div className='cenbtn'>
       {reg ? <Login onClick={handleRegister}>Register</Login> :<Login onClick={handleLogin}>Login</Login>}
       </div>
        <div className='cenbtn'>
          {reg ? <button onClick={()=>{ setreg(false)}}>Login</button> : <Smalltext className='p-8' color ='#04072F'>Don't have an account? <button className='p-2 bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded' onClick={()=>{setreg(true)}}>Register Here</button></Smalltext>}
        </div>
    </div>
    
    </div>
  )
}
