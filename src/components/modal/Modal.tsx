import React, {FC} from 'react';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import {app} from "api/store/appStore";
import Box from '@mui/material/Box';
import '../../App.css';
import {Socket} from 'socket.io-client';
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {observer} from "mobx-react-lite";
import {Controller, useForm} from "react-hook-form";

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
    const {currentUser, users, addMessage} = app


    const {handleSubmit, control, reset, formState: {errors}} = useForm<{
        message: string;
        topic: string;
        idChat: string;
    }>({
        defaultValues: {
            message: '',
            topic: '',
            idChat: '',
        },

    });
    const onHandlerSubmit = handleSubmit((data) => {
        addMessage({
            paramsRequest: {
                to: data.idChat,
                from: currentUser.id,
                message: data.message,
                topic: data.topic
            },
            socket,

        })
        handleModalClose()
        reset()
    })

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            sx={{color: "#000"}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={onHandlerSubmit}>
                <Box sx={style}>
                    <div className={'modalHeader'}>
                        <div>Ваше имя: {currentUser.name}</div>
                        <Controller
                            control={control}
                            name="idChat"
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label">
                                        Кому:
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        {...field}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {users.map(m => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>
                    {errors.idChat && <p className={"error"}>выберите участника чата</p>}
                    <Controller
                        control={control}
                        rules={{required: true}}
                        name="topic"
                        render={({field}) => (
                            <TextField {...field}
                                       id="filled-basic" label="Тема" variant="filled"/>
                        )}
                    />
                    {errors.topic && <p className={"error"}>Введите тему сообщения</p>}
                    <Controller
                        control={control}
                        rules={{required: true}}
                        name="message"
                        render={({field}) => (
                            <TextField
                                label="Тело сообщения"
                                multiline
                                variant="filled"
                                {...field}
                            />
                        )}
                    />
                    {errors.message && <p className={"error"}>Введите сообщение</p>}
                    <Button type={"submit"} variant="contained" onClick={onHandlerSubmit}>Отправить</Button>
                </Box>
            </form>
        </Modal>
    );
};

export default observer(ModalCustom);