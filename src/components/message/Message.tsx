import React, {FC, MutableRefObject, useState} from 'react';
// @ts-ignore
import top from 'api/common/image/up-arrow.png'
// @ts-ignore
import bottom from 'api/common/image/arrow-down.png'
import {observer} from "mobx-react-lite";
import {app} from "api/store/appStore";

type Props = {
    fromSelf: boolean;
    message: string;
    topic: string;
    time: string;
    usersChat: string[];
    ref:MutableRefObject<HTMLDivElement | null>;
}

const Message: FC<Props> = ({
                                usersChat,
                                fromSelf,
                                message,
                                topic,
                                time,
                                ref
                            }) => {
    const {currentUser, users} = app

    const userChat = users.find(m => m.id === usersChat[0])

    console.log(userChat)

    const [isText, setIsText] = useState(false)
    return (
        <div ref={ref} style={usersChat[0] === currentUser.id ? {alignSelf: "flex-end"} : {}} className={"message"}>
            <div className={"msHeader"}>
                <div className={"data"}>Время: {time}</div>
                {userChat && <div
                    className={"data"}>Отправитель: {usersChat[0] === currentUser.id ? currentUser.name : userChat.name}</div>}
            </div>
            <div className={"topic"}>
                <div>Тема: {topic}</div>
                {isText
                    ?
                    <div className={"imgC"} onClick={() => {
                        setIsText(false)
                    }}><img src={top} alt=""/></div>
                    :

                    <div className={"imgC"} onClick={() => {
                        setIsText(true)
                    }}><img src={bottom} alt=""/></div>
                }</div>
            <div className={"ms"}>{isText && message}</div>
        </div>
    );
};

export default observer(Message);