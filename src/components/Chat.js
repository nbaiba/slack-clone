import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import Message from './Message'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import { selectRoomId } from "../features/features/appSlice"
import { useSelector } from 'react-redux'
import { db } from "../firebase.js"
import { useCollection, useDocument } from "react-firebase-hooks/firestore"

const Chat = () => {
    // Allows to pull value from redux store, pull room ID from store
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
    )
    useEffect(()=>{
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [roomId, loading])
    
    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                <Header>
                    <HeaderLeft>
                        <h4><strong>#{roomDetails?.data().name}</strong></h4>
                        <StarBorderIcon/>
                    </HeaderLeft>
                    <HeaderRight>
                        <p>
                            <InfoIcon /> Details
                        </p>
                    </HeaderRight>
                </Header>
                <ChatMessages>
                    { roomMessages?.docs.map(doc => {
                        const {message, timestamp, user, userImage } = doc.data()
                        return (
                            <Message
                                key={doc.id}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userImage={userImage}
                            ></Message>
                        )
                    })}
                    <ChatBottom ref={chatRef} />
                </ChatMessages>

                <ChatInput
                    chatRef={chatRef} 
                    channelName={roomDetails?.data().name}
                    channelId={roomId}
                />
                
                </>
            )}
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    flex: .7;
    flex-grow: 1;
    margin-top: 60px;
    overflow-y: scroll;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }
`
const HeaderRight = styled.div`
    display: flex;
    > p{
        display: flex;
    }
    > p > .MuiSvgIcon-root {
        margin-right: 5px;
    }
`
const ChatMessages = styled.div`
`

const ChatBottom = styled.div`
    padding-bottom: 200px;
`

