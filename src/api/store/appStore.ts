import {makeAutoObservable, runInAction} from "mobx"
import {
    CurrentUSerType,
    MessageType,
    RequestAddMessages,
    ResponseAddMessage, ResponseMessageType, ResponseUpdateIsText,
    ResponseUsers
} from "api/types/types";
import {instance} from "api/common/instance";
import {apiAuth, apiMessage, Routers} from "api/common/Routes";
import {Nullable} from "components/snakBar/VarianSankBars";
import {AxiosError} from "axios";
import {Socket} from "socket.io-client";

class AppStore {
    isAuth = true

    idCurrentChat = ''

    isScroll: boolean = true

    errorMessage: Nullable<string> = null;

    messagesReceived: Nullable<string> = 'assdsdfd';

    successMessage: Nullable<string> = null;

    currentUser = {} as CurrentUSerType;

    messages = [] as MessageType[]

    users = [] as CurrentUSerType[]

    constructor() {
        makeAutoObservable(this)
    }


    setCurrentUser = (data: CurrentUSerType) => {
        this.currentUser = data
    }

    updateIsTextInMessage = async (params: { id: string; isText: boolean; }) => {
        this.setMessages(this.messages.map(m => m.id === params.id ? {...m, isText: params.isText} : m))
        this.setIsScroll(false)
    }

    setUsers = (data: CurrentUSerType[]) => {
        this.users = data
    }

    updateIsAuth = (data: boolean) => {
        this.isAuth = data
    }

    setIsScroll = (data: boolean) => {
        this.isScroll = data
    }

    setIdCurrentChat = (id: string) => {
        this.idCurrentChat = id
    }

    setMessages = (msg: MessageType[]) => {
        this.messages = msg
    }

    login = async (name: string) => {
        try {
            const {data} = await instance.post<CurrentUSerType>(apiAuth + Routers.LogIn, {name})
            runInAction(() => {
                this.setCurrentUser(data)
                this.isAuth = false
            })
            localStorage.setItem('currentUser', JSON.stringify(data))

        } catch (e) {
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof AxiosError) {
                errorMessage = e.response && e.response.data.message;
            }
            this.isAuth = true
            this.setErrorMessage(errorMessage)
            console.log(e)
        }
    }

    getUsers = async () => {
        const {data} = await instance.get<ResponseUsers>(apiAuth + Routers.Users)
        runInAction(() => {
            this.setUsers(data.item)
        })
    }

    getMessages = async () => {
        const {data} = await instance.get<ResponseMessageType>(apiMessage + Routers.Messages + `/${this.currentUser.id}/${this.idCurrentChat}`
        )
        console.log(this.idCurrentChat, this.currentUser.id)
        runInAction(() => {
            this.setMessages(data.item)
        })
    }

    addMessage = async (params: { paramsRequest: RequestAddMessages, socket: Socket<any, any> }) => {
        const {socket, paramsRequest} = params
        try {
            const {data} = await instance.post<ResponseAddMessage>(apiMessage + Routers.addMessage, paramsRequest)
            if (data.newMessage) {
                socket.emit("add-message", {
                    message: data.newMessage
                })
            }
            this.setMessages([...this.messages, data.newMessage])
            this.setIsScroll(true)
            this.setSuccessMessage("Successful")
        } catch (e) {
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof AxiosError) {
                errorMessage = e.response && e.response.data.message;
            }
            this.setErrorMessage(errorMessage)
            console.log(e)
        }
    }

    setErrorMessage = (message: Nullable<string>) => {
        this.errorMessage = message;
    };

    setSuccessMessage = (message: Nullable<string>) => {
        this.successMessage = message;
    };

    setMessagesReceived = (message: Nullable<string>) => {
        this.messagesReceived = message;
    };


}

export const app = new AppStore()