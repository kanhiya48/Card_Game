// SocketContext.js
import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';
import { addusertolist, updateusertolist } from './redux/scoreboard';
import { useDispatch } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const dispatch=useDispatch();
    const SERVER_URL = 'http://localhost:5000';
const socketConnection = io(SERVER_URL);
  const socket =socketConnection;
    // Set up event listeners
    socketConnection.on('connect', () => {
      console.log('Connected to server');
    });
     
    socketConnection.on('newregister',(data)=>{
      console.log("here is new user",data)
      dispatch(addusertolist(data));
    })
    socketConnection.on('updatescore',(data)=>{
        console.log("updtingscore",data);
        dispatch(updateusertolist(data))
    })

    socketConnection.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
