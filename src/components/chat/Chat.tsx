import React, {Dispatch, FC, SetStateAction} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Dialogs from "components/dialogs/Dialogs";
import '../../App.css';
import {observer} from "mobx-react-lite";
import Button from "@mui/material/Button";
import {app} from "api/store/appStore";

type Props = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    handleOutLogin: () => void;
}

const Chat: FC<Props> = ({handleOutLogin, setOpenModal}) => {
    const {currentUser} = app

    const navigate = useNavigate()

    if(!currentUser){
        navigate("/")
    }

    return (
            <div className={"chat"}>
                <div className={"header"}>
                    <div className={"headerName"}>you: {currentUser.name}</div>
                    <Button onClick={() => {
                    setOpenModal(true)
                }} variant="contained" sx={{margin: "0 30px 0 0"}}>Создать
                    сообщения</Button>
                    <Button onClick={handleOutLogin} variant="outlined" sx={{
                        backgroundColor: '#6857ea',
                        color: "#000",
                    }}>Выйти</Button></div>
                <Routes>
                    <Route path={"/AnanimusChatFront/*"} element={<Navigate to={'/AnanimusChatFront/no-user'} />}/>
                    <Route path={'/AnanimusChatFront/no-user'} element={<div className={"noUser"}><h2>Пользователь не выбран</h2></div>}/>
                    <Route path={'/AnanimusChatFront/user/:id'} element={<Dialogs/>}/>
                </Routes>
            </div>
    );
};

export default observer(Chat);