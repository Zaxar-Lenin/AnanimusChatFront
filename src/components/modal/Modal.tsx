import React, {ChangeEvent, FC, useState} from 'react';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import {app} from "api/store/appStore";
import Box from '@mui/material/Box';
import '../../App.css';
import {Socket} from 'socket.io-client';
import Button from "@mui/material/Button";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {observer} from "mobx-react-lite";
import {Time} from "api/common/func";

type Props = {
    open: boolean;
    handleModalClose: () => void;
    socket: Socket<any, any>;
}

const style = {
    display: 'flex',
    flexDirection: "column",
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const ModalCustom: FC<Props> = ({open, handleModalClose, socket}) => {
    const {currentUser, users,addMessage,messages,setMessages} = app

    const [message, setMessage] = useState<string>('')
    const [topic, setTopic] = useState<string>('')
    const [idChat, setIdChat] = useState<string>('')

    const onHandlerChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const onHandlerSubmit = () => {
        addMessage({
            to: idChat,
            from: currentUser.id,
            message, topic
        })
        if(idChat) {
            socket.emit("add-message", {
                msg: message,
                topic,
                to: idChat,
                from: currentUser.id
            })
        }

        setMessages([...messages,{
            fromSelf: true,
            message,
            topic,
            time: Time(),
            usersChat: [currentUser.id,idChat],
        }])
        setTopic('')
        setMessage('')
    }
    const changeHandleMenuItem = (e: SelectChangeEvent) => {
        setIdChat(e.target.value)
    }

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            sx={{color: "#000"}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={'modalHeader'}>
                    <div>Ваше имя: {currentUser.name}</div>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <InputLabel
                            id="demo-simple-select-standard-label">
                            Кому:
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={idChat}
                            onChange={changeHandleMenuItem}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {users.map(m => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <TextField value={topic}
                           onChange={(e) => {
                               setTopic(e.currentTarget.value)
                           }}
                           id="filled-basic" label="Тема" variant="filled"/>
                <TextField
                    label="Тело сообщения"
                    multiline
                    variant="filled"
                    value={message}
                    onChange={onHandlerChangeMessage}
                />
                <Button variant="contained" onClick={onHandlerSubmit}>Отправить</Button>
            </Box>
        </Modal>
    );
};

export default observer(ModalCustom);