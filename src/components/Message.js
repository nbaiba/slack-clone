import React from 'react'
import styled from 'styled-components'

const Message = (props) => {
    return (
        <MessageContainer>
            <img src={props.userImage} alt=''/>
            <MessageInfo>
                <h4>
                    {props.user}
                    <span>
                        {new Date(props.timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                <p>{props.message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        height: 50px;
        border-radius: 8px;
    }
`
const MessageInfo = styled.div`
    padding-left: 10px;

    > h4 > span {
        color: gray;
        font-weight: 300;
        font-size: 10px;
        margin-left: 4px;

    }
`
