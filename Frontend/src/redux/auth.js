import {createSlice} from '@reduxjs/toolkit'

export const authSlice=createSlice({
    name:'authuser',
    initialState:{
        token :''
        // socketconnection:null
    },
    reducers:{
        userloginned:(state,action)=>{
            state.token=action.payload
        },
        userlogout:(state)=>{
       state.token='';
       localStorage.removeItem('token');
        }
    }
})
export const {userloginned,userlogout,setsocketconnection}=authSlice.actions
export default authSlice.reducer