import './App.css';
import logo from './threeline.svg'
import ManagePosts from './pages/manageposts';
import SinglePost from './pages/singlepost';
import Login from './pages/login'
import Signup from './pages/signup'
import Posts from './pages/posts'
import React,{useContext, useEffect, useState} from 'react';
import { Route, Routes ,useNavigate} from 'react-router';
import { Link } from 'react-router-dom';
import { Box, Heading, Container, Button,Image} from '@chakra-ui/react'
import { UserContext } from './context';
import { UserContextProvider } from './context';
import Home from './pages/Home';
function App() {
  const blogx=require('./blogx.png')
  const google=require('./google.png')
  const linkedin=require('./linkedin.png')
  const git=require('./git.png')
  const threeline=require('./threeline.svg')
  const nav=useNavigate()
  const {user,changeuser}=useContext(UserContext)
  useEffect(()=>{
      const res=fetch('https://mernblogtwo.onrender.com/')
    
  },[])
  useEffect(()=>{
    console.log('running use')
    
    fetch('https://mernblogtwo.onrender.com/posts',{
      credentials:'include'
    }).then(res=>{
      res.json().then(userinfo=>{
        changeuser(userinfo.exist)
      })
    }).catch((e)=>{})
  },[])
  const home=()=>{
    nav('/1')
  }
  const signup=()=>{
    if(!user)
      nav('/signup')
    else{
      nav('/posts/create')
    }
}
const logout=()=>{
  fetch('https://mernblogtwo.onrender.com/logout',{
    method:'Post',
    credentials:'include'
  })
  changeuser(null)
}
const login=()=>{
    if(!user)
    nav('/login')
    else{
      logout()
    }
  }
  return (
    
    <Container  minW={"100%"} p={0} flexDir={'column'} display={'flex'}>
          <Container boxShadow={'base'}  minW={"100%"} p={5} display={'flex'} justifyContent={'space-between'} >
            <Box onClick={home}>
            <Image src={blogx} height={'50px'}/>
            </Box>
            <Box display={'flex'} gap={4}>
        
              {user?<Button variant={'solid'} p={1} onClick={()=>{nav('/posts/manage')}}> <img src={logo}></img></Button>:null}
              <Button borderRadius={50} colorScheme='pink' onClick={signup}>{user?"Create Post":"Sign up"}</Button>
              <Button borderRadius={50} colorScheme={!user?'blackAlpha':'red'} onClick={login}>{user?"Log Out":'Log in'}</Button>
            </Box>
          </Container>
          
          <Container p={10} minWidth={'100%'}>
            <Routes>
              <Route path='/:page' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/posts/create' element={<Posts/>}/>
              <Route path='/posts/:id' element={<SinglePost/>}/>
              <Route path='/posts/manage' element={<ManagePosts/>}/>
              <Route path="*" element={<div>error</div>}/>
            </Routes>
          </Container>
          <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 BlogX. All rights reserved.</p>
        <div className="social-icons">
          <a href="mailto:121001pratham@gmail.com" className="social-icon">
            <i className="fab fa-facebook-f"><Image maxBlockSize={'20px'} src={google}/></i>
          </a>
          <a href="https://www.linkedin.com/in/pratham-singh-328a5b285/" className="social-icon">
            <i className="fab fa-twitter"><Image maxBlockSize={'20px'} src={linkedin}/></i>
          </a>
          <a href="https://github.com/PrathamSingh2002?tab=repositories" className="social-icon">
            <i className="fab fa-instagram"><Image maxBlockSize={'20px'} src={git}/></i>
          </a>
        </div>
      </div>
    </footer>
        </Container>
      
  );
}

export default App;
