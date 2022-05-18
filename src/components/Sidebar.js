import React from 'react'
import SidebarOption from './SidebarOption'
import styled from 'styled-components'
import { db } from "../firebase.js"
import { useCollection } from "react-firebase-hooks/firestore"
import EditIcon from '@material-ui/icons/Edit';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CircularProgress from '@material-ui/core/CircularProgress';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { auth } from "../firebase.js"
import { useAuthState } from 'react-firebase-hooks/auth'



const Sidebar = () => {
    const [user] = useAuthState(auth)
    const [channels, loading, error] = useCollection(db.collection('rooms'))
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>{(user.displayName).toUpperCase()}</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        Baiba Baiba
                    </h3>
                </SidebarInfo>
                <EditIcon />
            </SidebarHeader>
            <SidebarOption Icon={InsertCommentIcon} title="Threads" />
            <SidebarOption Icon={InboxIcon} title="Mentions &amp; reactions" />
            <SidebarOption Icon={DraftsIcon} title="Saved&nbsp;items" />
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
            <SidebarOption Icon={PeopleAltIcon} title="People &amp; user groups" />
            <SidebarOption Icon={AppsIcon} title="Apps" />
            <SidebarOption Icon={FileCopyIcon} title="File browser" />
            <SidebarOption Icon={ExpandLessIcon} title="Show less" />

            < hr />

            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />

            < hr />

            <SidebarOption Icon={AddIcon} addChannelOption title="Add channel" />
            {loading ? <Progress/> : channels?.docs.map(channel => (
                 <SidebarOption key={channel.id} id={channel.id} title={channel.data().name} />
            ))}
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`
const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    align-items: center;
    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 50%;
        margin: 0 auto;
    }
`

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }
    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center; 
    }
    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 3px;
        color: green;
    }
`
const Progress = styled(CircularProgress)`
    margin: 10px 35%;
    > svg{
        color: white;
    }
`