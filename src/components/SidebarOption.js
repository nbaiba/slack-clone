 import React from 'react'
 import styled from 'styled-components'
 import { db } from "../firebase.js"
 import { useDispatch } from "react-redux"
 import { enterRoom } from "../features/features/appSlice"
 

 const SidebarOption = ({Icon, title, addChannelOption, id}) => {
    const dispatch = useDispatch()
    const addChannel = () => {
        const channelName = prompt("Please enter channel name")
        if (channelName){
            db.collection('rooms').add({
                name: channelName,
            })
        }
    }

    const selectChannel = () => {
        if(id){
            dispatch(enterRoom({
                roomId: id,
            }))
        }
    }

     return (
         <SidebarOptionContainer
            onClick = {addChannelOption ? addChannel : selectChannel}
         >
             { Icon && <Icon fontSize='small' style ={{padding: 10}}/>}
             { Icon ? (
                 <h3>{title}</h3>
                ):(
                    <SidebarOptionChannel>
                        <span>#</span>
                        <h3>{title}</h3>
                    </SidebarOptionChannel>
                )}
         </SidebarOptionContainer>
     )
 }
 
 export default SidebarOption

 const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;
    :hover{
        opacity: .8
    }

    > h3 {
        font-weight: 400;
    }

 `

 const SidebarOptionChannel = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-top: 2px;
    padding-left: 2px;
    font-size: small;
    >span{
        font-size: 20px;
        padding-right: 10px;
        padding-left: 8px;
    }
    > h3 {
        font-weight: 400;
    }
 `
 