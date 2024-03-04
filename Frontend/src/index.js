import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Game from './Game';
import { SocketProvider } from './socketContext';
import store from './redux/store'
import { Provider } from 'react-redux';
import LiveScoreBoard from './ScoreBoard';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
         <SocketProvider>
    <Routes>
    <Route path="/" element={<App/>}/>
    <Route path="gamepage" element={<Game/>}/>
    <Route path="livescoreboard" element={<LiveScoreBoard/>}/>
    </Routes>
    </SocketProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
