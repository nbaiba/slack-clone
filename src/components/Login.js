import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { auth, provider } from '../firebase';

const Login = () => {

    const signIn = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src='https://www.thinkdigital.travel/wp-content/uploads/2018/04/slack-1-logo-png-transparent.png' alt='' />
                <h1>Sign in</h1>
                <Button type="submit" onClick={signIn}>Google</Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login


const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`
const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 1px 4px 2px rgba(0,0,0,0.28);
    > img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }
    > button {
        margin-top: 30px;
        text-transform: inherit !important;
        background-color: #0a8d48;
        color: white;
        padding: 10px 20px;
        :hover {
            color: black
        }
    }
`