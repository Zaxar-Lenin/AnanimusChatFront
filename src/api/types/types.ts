export type DialogsType = {
    name: string;
    message: string;
}

export type CurrentUSerType = {
    name: string;
    id: string;
}

export type MessageType = {
    fromSelf: boolean;
    message: string;
    topic:string;
    time: string;
    usersChat: string[];
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
    topic:string;
    message:string;
}
export type ResponseAddMessage = {
   message:string;
}