import React, {FC} from 'react';
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
    isText: boolean;
    id: string;
}

const Message: FC<Props> = ({
                                usersChat,
                                message,
                                topic,
                                time,
                                id,
                                isText,
                            }) => {
    const {currentUser, users, updateIsTextInMessage} = app

    const userChat = users.find(m => m.id === usersChat[0])

    const currentNameMessage = () => {
        if (userChat) {
            return usersChat[0] === currentUser.id ? currentUser.name : userChat.name
        }
        return currentUser.name
    }

    return (
        <div
            style={usersChat[0] === currentUser.id ? {alignSelf: "flex-end"} : {}} className={"message"}>
            <div className={"msHeader"}>
                <div className={"data"}>Время: {time}</div>
                {userChat && <div
                    className={"data"}>Отправитель: {currentNameMessage()}</div>}
            </div>
            <div className={"topic"}>
                <div>Тема: {topic}</div>
                {isText
                    ?
                    <div className={"imgC"} onClick={() => {
                        updateIsTextInMessage({isText: false, id})
                        console.log('false')
                    }}><img src={top} alt=""/></div>
                    :

                    <div className={"imgC"} onClick={() => {
                        updateIsTextInMessage({isText: true, id})
                        console.log('true')
                    }}><img src={bottom} alt=""/></div>
                }</div>
            <div className={"ms"}>{isText && message}</div>
        </div>
    );
};

export default observer(Message);