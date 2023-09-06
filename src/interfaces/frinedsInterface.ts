// import {ReactNode} from 'react'

 export interface FriendType{
user: string
connected: boolean
}

export interface FriendProviderProps{
    children: JSX.Element | JSX.Element[]
    // children:ReactNode
}

export interface FriendContextType{
    friendList: FriendType[]
    setFriendList: (friendList: any) => void 
}