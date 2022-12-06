import React, {useEffect, useRef} from 'react';
import {app} from "api/store/appStore";
import '../../App.css';
import Message from "components/message/Message";
import { useParams } from 'react-router-dom';
import {observer} from "mobx-react-lite";
import uuid from "react-uuid"


const Dialogs = () => {
    const {messages,setIdCurrentChat, getMessages,currentUser,idCurrentChat} = app
    const { id } = useParams()
    useEffect(() => {
        id && setIdCurrentChat(id)
        getMessages()
    },[id, messages])

    const scrollRef = useRef<null | HTMLDivElement>(null)

    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    },[messages])


    return (
        <div  className={'dialogs'}>
            <div style={{height: "70px"}}> </div>
            {messages.map(m => <Message ref={scrollRef} key={uuid()} {...m}/>)}
        </div>
    );
};

export default observer(Dialogs);