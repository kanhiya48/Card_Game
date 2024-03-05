import React, { useEffect, useRef, useState,useContext } from 'react'
import Card from './Card';
import {useDispatch,useSelector} from 'react-redux'
import { userlogout } from './redux/auth';
import { setusergame,clearusergame } from './redux/userDetails';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { addusertolist } from './redux/scoreboard';

import { useSocket } from './socketContext';
const Game = () =>{
    const contextValue = useSocket();
const navigate=useNavigate();
useEffect(()=>{
  const token=localStorage.getItem('token');
  if(token)
  {
     try {
    const response =  fetch('/subsequentlogin', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(response =>{
      if(!response.ok){throw new Error('Network response was not ok');}
      else{
        return response.json();
      }
    }).then(data =>{dispatch(clearusergame())
   dispatch(setusergame(data))})

    

    
    
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }


  }
},[])




var mutabledeck=[];
var mutablecurr=[];

const gamedeck=useSelector(state=>state.user.deck);
const gameusername=useSelector(state=>state.user.username);
const gamecurr=useSelector(state=>state.user.curr)
const message=useSelector(state=>state.user.message)
const gameOver=useSelector(state=>state.user.gameover)
const usergameloosed=useSelector(state=> state.user.gameloose)
const usergamewinned=useSelector(state=> state.user.gamewin)
const username=useSelector(state=>state.user.username)
mutabledeck=[...gamedeck];
if(gamecurr)
mutablecurr=[...gamecurr];
console.log(gamedeck)
const dispatch=useDispatch();
const logouthandler=()=>{
  dispatch(userlogout());
  dispatch(clearusergame());
  navigate('/')
}

//  const [deck, setDeck] = useState(['😼', '🙅‍♂️', '🔀', '💣', '😼']); // Initial deck with 5 cards (can be shuffled)
  // const [gameOver, setGameOver] = useState(false);
  const sock=useRef();
  sock.current=contextValue
  // const [message, setMessage] = useState('');
  const [curr,setcurr]=useState([]);
  const [diff,setdiff]=useState(0);
  function shuffleArray(array1) {
    const array=[...array1]
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
return array;
}
const restart=()=>{
  const a=['😼', '🙅‍♂️', '🔀', '💣', '😼'];
  const x=shuffleArray(a);
  dispatch(setusergame({"username":gameusername,"deck":x,"curr":[],"diff":0,"message":"","gameover":false}));
  setdiff(0)
  setcurr([]);
  
}








//   useEffect(()=>{
// const a=shuffleArray(gamedeck);
// dispatch(setusergame({"username":gameusername,"deck":a,"curr":gamecurr}));

//   },[])
  const drawCard = () => {
    if (gamedeck.length === 0) {

      // setGameOver(true);
      // setMessage('Congratulations! You have drawn all cards.');
       dispatch(setusergame({"username":gameusername,"deck":mutabledeck,"curr":mutablecurr,"gamewin":1,"s":sock, "diff": diff,"message":"Congratulations! You have drawn all cards.","gameover":true}))
      return;
    }

    const drawnCard = mutabledeck.pop(); // Remove the last card from the deck
    mutablecurr.push(drawnCard);
    console.log("sock.current"+contextValue)
      dispatch(setusergame({"username":gameusername,"deck":mutabledeck,"curr":mutablecurr,"s":sock, "diff": diff}))
  //  socketConnection.emit("message","gameusername");
   
    switch (drawnCard) {
      case '😼':
        // setMessage('You drew a cat card. Meow!');
           dispatch(setusergame({"username":gameusername,"deck":mutabledeck,"curr":mutablecurr,"s":sock, "diff": diff,"message":"You drew a cat card. Meow!","gameover":false}))

        break;
      case '🙅‍♂️':
        // setMessage('You got bomb! diffuser');
           dispatch(setusergame({"username":gameusername,"deck":mutabledeck,"curr":mutablecurr,"s":sock, "diff": diff+1,"message":"You got bomb! diffuser","gameover":false}))

        setdiff(diff+1);
      
        break;
      case '🔀':
        // setMessage('Shuffling the deck and starting game again');
        const x=['😼', '🙅‍♂️', '🔀', '💣', '😼']
      // Reset the deck
        const a=shuffleArray(x)
        dispatch(setusergame({"username":gameusername,"deck":a,"curr":[],"diff":0,"s":sock,"message":"Shuffling the deck and starting game again","gameover":false}))

        console.log("shuffle",a)
        setdiff(0);
        break;
      case '💣':
        if(diff===1){
        // setMessage('used diffuser card')
        dispatch(setusergame({"username":gameusername,"deck":mutabledeck,"curr":mutablecurr,"diff":0,"s":sock,"message":"used diffuser card","gameover":false}))
        setdiff(0);
        }
        else{
          const x=['😼', '🙅‍♂️', '🔀', '💣', '😼']
          // dispatch(setusergame({"username":gameusername,"deck":x,"curr":[],"diff":0,"gameloose":1,"s":sock}))
        // setGameOver(true);
        console.log("in looose")
        dispatch(setusergame({"username":gameusername,"deck":mutabledeck,"curr":mutablecurr,"s":sock,"diff":diff,"gameloose":1,"message":"BOOM! You drew an exploding kitten. Game Over!","gameover":true}))
        // setMessage('BOOM! You drew an exploding kitten. Game Over!');
        }
        break;
      default:
        // setMessage('You drew a mysterious card.');
    }
  };

  return (
        <div className="h-screen flex flex-col justify-between bg-gray-200">
      <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        <div>
          <h1 className="text-2xl">Card Game</h1>
          <div>{username}</div>
          
        </div>
        <div>
          <button onClick={logouthandler} className="text-sm bg-red-500 hover:bg-red-600 px-4 mb-2 ml-4 py-2 rounded-lg">Logout</button>
          <button onClick={()=>{navigate('/livescoreboard')}} className="ml-4 text-sm bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">Live Score Board</button>
        </div>
      </div>
      <div className="p-4 text-center text-gray-600">
        <p className="mb-2">Games Lost: {usergameloosed}</p>
        <p>Games Won: {usergamewinned}</p>
      </div>
      <div className="flex-grow flex flex-col items-center  px-4">
        <h2 className="text-3xl font-bold mb-4">Card Deck</h2>
        {gamedeck && (
          <p className="text-xl mb-2">{gamedeck.length} Cards Remaining</p>
        )}
        {!gameOver ? (
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-lg mb-4" onClick={drawCard}>
            Draw Card
          </button>
        ) : (
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-lg mb-4" onClick={restart}>
            Restart Game
          </button>
        )}
        {message && (
          <p className="text-lg">{message}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {gamecurr.map((item, index) => (
          <Card key={index} type={item} />
        ))}
      </div>
    </div>
  );}

export default Game