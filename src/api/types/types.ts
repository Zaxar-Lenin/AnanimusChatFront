export type DialogsType = {
    name: string;
    message: string;
}

export type CurrentUSerType = {
    name: string;
    id: string;
}

export type MessageType = {
    id: string;
    fromSelf: boolean;
    message: string;
    topic: string;
    time: string;
    usersChat: string[];
    isText: boolean;
}

export type ResponseMessageType = {
    item: MessageType[]
}

export type ResponseUsers = {
    item: CurrentUSerType[]
}

export type RequestGetMessages = {
    from: string;
    to: string;
}

export type RequestAddMessages = {
    from: string;
    to: string;
    topic: string;
    message: string;
}
export type ResponseAddMessage = {
    newMessage: MessageType
}

export type ResponseUpdateIsText = {
    message: string
}