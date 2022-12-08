import React, {useEffect, useRef} from 'react';
import '../../App.css';
import {app} from "api/store/appStore";
import {useNavigate} from 'react-router-dom';
import {observer} from "mobx-react-lite";

const ListUser = () => {
    const {users,currentUser} = app

    const navigate = useNavigate()

    const onHandleId = (id: string) => {
        navigate(`/user/${id}`)
    }

    return (
        <div  className={'listUsers'}>
            {users.map(m => m.name !== currentUser.name && <div key={m.id} className={"item"} onClick={() => {
                    onHandleId(m.id)
                }}>{m.name}</div>
            )}
        </div>
    );
};

export default observer(ListUser);