import { createSlice } from "@reduxjs/toolkit";
export const scoreboardSlice=createSlice({
    name:'authuser',
    initialState:{
        listofusers :[]
        // socketconnection:null
    },
    reducers:{
        addusertolist:(state,action)=>{
            console.log("addinfg user  ",action.payload)
            const user=JSON.parse(action.payload);
            const res=state.listofusers.find(item=> item.email===user.email)
          if(!res)
          {
              state.listofusers.push(user)
          }
        },
        updateusertolist:(state,action)=>{
    //  console.log("type of ", typeof(action.payload))
         const index1=state.listofusers.findIndex(item=>item.email===action.payload.email)
         if(index1!==-1)
         {
            console.log("i am working not any other")
               const updatedArray = state.listofusers.map((obj, index) => {
    if (index === index1) {
      // Update the object with the unique email ID
      if(action.payload.gameloose)
      return {...obj,"gameloose":action.payload.gameloose}; 
    else {
       return {...obj, "gamewin":action.payload.gamewin}
    }
   
  } return obj});
   state.listofusers=updatedArray;
         }
         else{
            console.log("error in updating redux state")
         }
        },
        gettinglist:(state,action)=>{
        state.listofusers=action.payload
        }
    }
})
export const {addusertolist,updateusertolist,gettinglist} = scoreboardSlice.actions
export default scoreboardSlice.reducer