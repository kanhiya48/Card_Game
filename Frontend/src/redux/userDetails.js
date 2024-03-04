import {createSlice} from '@reduxjs/toolkit'
import { UseSelector, useSelector } from 'react-redux';

export const userSlice=createSlice({
    name:'userdetail',
    initialState:{
        username:'',
        curr:[],
        deck:[],
        diff:0,
        gameloose:0,
        gamewin:0,
        gameover:false,
        message:''
    },
    reducers:{
      
        setusergame:(state,action)=>{
           const {username,deck,curr,diff,message,gameover}=action.payload
            // console.log("in reducer sending data to server"+JSON.stringify(action.payload))
            const token=localStorage.getItem('token');
          
   
            state.username=action.payload.username
         state.curr=action.payload.curr
         state.deck=action.payload.deck;
         state.diff=action.payload.diff;
         state.message=action.payload.message;
         state.gameover=action.payload.gameover;
         if(action.payload.gameloose)
         {
            console.log("gameloooooooose"+action.payload.gameloose)
            state.gameloose=action.payload.gameloose+state.gameloose;
         }
         if(action.payload.gamewin)
         {
            state.gamewin=action.payload.gamewin+state.gamewin
         }
     if (action.payload.s) {
        if (action.payload.gameloose !== undefined) {
          console.log("in game loose");
          const gameloose = state.gameloose; // Increment gameloose
        //   state.gameloose=gameloose
          console.log("gameloose: " + gameloose);
          action.payload.s.current.emit("message", JSON.stringify({ deck, curr, token, diff, gameloose,message,gameover }));
        } else if (action.payload.gamewin !== undefined) {
          console.log("in game win");
          const gamewin = state.gamewin ; // Increment gamewin
        //   state.gamewin=gamewin
          action.payload.s.current.emit("message", JSON.stringify({ deck, curr, token, diff, gamewin,message,gameover }));
        } else {
          console.log("not working: " + action.payload.gameloose);
          action.payload.s.current.emit("message", JSON.stringify({ deck, curr, token, diff,message,gameover }));
        }
      }
    

        },
       
       clearusergame:(state)=>{
        state.currarray=[]
        state.deck=[]
         state.username=''
         state.diff=0
         state.gameloose=0
         state.gamewin=0
         state.gameover=false
         state.message=''
       }
    }
})
export default userSlice.reducer;
export const {setusergame,clearusergame} = userSlice.actions;