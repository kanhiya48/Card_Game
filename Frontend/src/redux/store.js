import {configureStore} from '@reduxjs/toolkit'
import authreducer from './auth';
import userreducer from './userDetails'
import Scoreboarddetails from './scoreboard'
export default configureStore({
    reducer :{
        auth:authreducer,
        user:userreducer,
        scoreboard : Scoreboarddetails
    }
})