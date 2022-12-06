import * as React from 'react';
import {Dispatch, ReactElement, SetStateAction} from 'react';

import {Snackbar} from '@material-ui/core';
// @ts-ignore
import cross from 'api/common/image/cross.png'
import {TransitionProps} from '@mui/material/transitions';
import Fade from '@mui/material/Fade';
import {useNavigate} from "react-router-dom";
import uuid from 'react-uuid'


const DEFAULT_AUTO_HIDE_DURATION = 6000;

interface props {
    setOpenBar: Dispatch<SetStateAction<boolean>>;
    time: string;
    usersChat: string[];
    topic: string;
    autoHideDuration?: number;
    open: boolean;
}

const id = uuid()
export const MessageSnackBar = ({
                                    topic,
                                    time,
                                    setOpenBar,
                                    usersChat,
                                    open,
                                    autoHideDuration = DEFAULT_AUTO_HIDE_DURATION,
                                }: props): ReactElement => {
    const navigate = useNavigate()

    const [state, setState] = React.useState<{
        Transition: React.ComponentType<TransitionProps & {
            children: React.ReactElement<any, any>;
        }>;
    }>({
        Transition: Fade,
    });
    const handleClick =
        (
            Transition: React.ComponentType<TransitionProps & {
                children: React.ReactElement<any, any>;
            }>,
        ) =>
            () => {
                setState({
                    Transition,
                });
                setOpenBar(true)
            };

    const handleClose = () => {
        setOpenBar(false)
    };

    const onHandleTeleport = () => {
        navigate(`/user/${usersChat[1]}`)
    }
    const name = "sds"


    return (
        <Snackbar
            onClick={onHandleTeleport}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            // style={{backgroundColor: '#ffffff'}}
            open={open}
            onClose={handleClose}
            children={<div style={{
                position: 'relative',
                cursor: "pointer",
                backgroundColor: "#ffffff",
                color: "#000000",
                padding: "5px 0 5px 5px",
                display: "flex",
                minHeight: '70px',
                width: '250px',
                flexDirection: "column"
            }}>
                <div>{time}</div>
                <div>От: {name}</div>
                <div style={{width: '150px'}}>
                    Тема: {topic}
                </div>
                <div onClick={handleClose} style={{
                    position: "absolute",
                    top: '5px', right: '10px'
                }}><img style={{width: '20px', height: '20px',}} src={cross} alt=""/></div>
            </div>}
            // @ts-ignore
            TransitionComponent={state.Transition}
            key={id}
        />
    );
};