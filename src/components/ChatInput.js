import React, { useRef } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { db, auth } from "../firebase.js"
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth'

const ChatInput = (props) => {
    const [user] = useAuthState(auth)
    const inputRef = useRef(null)
    const sendMessage = e => {
        e.preventDefault();
        if(!props.channelId){
            return false
        }
        db.collection('rooms').doc(props.channelId).collection('messages').add({
            message: inputRef.current.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL
        })
        props.chatRef.current.scrollIntoView({
            behavior: 'smooth',
        })

        inputRef.current.value = ""
    }
    
    return (
        <ChatInputContainer>
            <form>
                <input placeholder={`Message ${props.channelName}`} ref={inputRef}/>
                <Button hidden type="submit" onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;
    >form {
        position: relative;
        display: flex;
        justify-content: center;
    }
    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 6px;
        padding: 20px;
        outline: none;
    }
    > form > button {
        display: none;
    }

`
