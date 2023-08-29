import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/login';
import Signup from './pages/signup';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContextProvider } from './context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
      <ChakraProvider value={null}>
        <BrowserRouter>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          
        </BrowserRouter>  
      </ChakraProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals