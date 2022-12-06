import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import ListUser from "components/listUser/ListUser";
import Chat from "components/chat/Chat";
import Button from "@mui/material/Button";
import {app} from "api/store/appStore";
import {observer} from "mobx-react-lite";
import AlertSnackbars from "components/snakBar/VarianSankBars";
import {useNavigate} from "react-router-dom";

type Props = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const Main: FC<Props> = ({setOpenModal}) => {
    const {getUsers, users, removeUser, currentUser} = app

    const navigate = useNavigate()

    useEffect(() => {
        getUsers()
    }, [])

    const handleOutLogin = () => {
        removeUser(currentUser.id)
        navigate("/")
        localStorage.removeItem('currentUser')
    }

    return (
        <div className={"main"}>
            <ListUser/>
            <Chat handleOutLogin={handleOutLogin} setOpenModal={setOpenModal}/>
            <AlertSnackbars/>
        </div>
    );
};

export default observer(Main);