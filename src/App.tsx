import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './App.css';
import {io} from 'socket.io-client'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalCustom from "components/modal/Modal";
import {app} from "api/store/appStore";
import Main from "components/main/Main";
import {observer} from "mobx-react-lite";
import AlertSnackbars from "components/snakBar/VarianSankBars";
import {MessageSnackBar} from "components/snakBar/MessageSnackBar";


const socketIO = io('https://ananimuschatserver-production.up.railway.app/')
// const socketIO = io('http://localhost:5050')


function App() {

    const {setCurrentUser, currentUser, login, isAuth, setMessages, updateIsAuth, messages, setUsers, users} = app

    const [name, setName] = useState<string>('')
    const [newMsg, setNewMsg] = useState({
        id: '',
        topic: '',
        time: '',
        usersChat: ['', ''],
    })
    const [openModal, setOpenModal] = useState(false)
    const [openBar, setOpenBar] = useState(false)


    const socket = useRef(socketIO)

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            const data = localStorage.getItem("currentUser")
            if (data) {
                setCurrentUser(JSON.parse(data))
                updateIsAuth(false)
            }
        }
    }, [])

    useEffect(() => {
        socket.current.on("connect", () => {
            console.log('Connect')
        })

        if (currentUser.id) {
            socket.current.emit("add-user", {
                id: currentUser.id,
                name: currentUser.name,
            })
        }


    }, [currentUser])


    socket.current.on("update-users", (data) => {
        console.log("udate")
        console.log(data)
        setUsers([...users, data])
    })

    socket.current.on("msg-recieve", (msg) => {
        console.log("sdsdsdds")
        setMessages([...messages, msg])
        setNewMsg({
            id: msg.id,
            topic: msg.topic,
            time: msg.time,
            usersChat: msg.usersChat,
        })
        setOpenBar(true)
    })

    const handleModalClose = () => {
        setOpenModal(false)
    }
    const onHandlerChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onHandleInLog = async () => {
        await login(name)
        setName('')

    }


    return (
        <>
            {isAuth
                ?
                (
                    <div className="App">
                        <div className={"logIn"}>
                            <div style={{
                                height: "300px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}><h3>Для входа введите свое имя</h3>
                                <TextField value={name} onChange={onHandlerChangeName}/>
                                <Button variant="contained" onClick={onHandleInLog}>Войти</Button></div>
                        </div>
                        <AlertSnackbars/>
                    </div>
                )
                :
                (
                    <Main setOpenModal={setOpenModal}/>
                )}
            <ModalCustom open={openModal} handleModalClose={handleModalClose} socket={socket.current}/>
            <MessageSnackBar {...newMsg} setOpenBar={setOpenBar} open={openBar}/>
        </>
    )
}

export default observer(App);