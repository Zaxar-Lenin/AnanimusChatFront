import React, {useEffect, useRef} from 'react';
import {app} from "api/store/appStore";
import '../../App.css';
import Message from "components/message/Message";
import {useParams} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import uuid from "react-uuid"


const Dialogs = () => {
    const {messages, isScroll, setIdCurrentChat, getMessages, currentUser, idCurrentChat} = app
    const {id} = useParams()

    useEffect(() => {
        id && setIdCurrentChat(id)
        getMessages()
    }, [id])

    const scrollRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (isScroll) {
            const lastItem = scrollRef.current?.children[scrollRef.current?.children.length - 1]
            if (lastItem) lastItem.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])


    return (
        <div className={'dialogs'} ref={scrollRef}>
            {messages.map(m => <Message key={uuid()} {...m}/>)}
        </div>
    );
};

export default observer(Dialogs);