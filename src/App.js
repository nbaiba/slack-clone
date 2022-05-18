import React from 'react';
import './App.css';
import styled from 'styled-components'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import  Spinner from 'react-spinkit'

function App() {
  const [user, loading] = useAuthState(auth)
  if(loading){
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src='https://www.thinkdigital.travel/wp-content/uploads/2018/04/slack-1-logo-png-transparent.png' alt='' />
          <Spinner name="ball-clip-rotate-multiple" color="purple" fadeIn='none' />
        </AppLoadingContents>
      </AppLoading>
    )
  }
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <Header />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/" exact>
                <Chat />
              </Route>
            </Switch>
          </AppBody>
          </>
        )}
        
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;

`
const AppLoading = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`

const AppLoadingContents = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
   > img {
      object-fit: contain;
      height: 100px;
      margin-bottom: 40px;
    }
`