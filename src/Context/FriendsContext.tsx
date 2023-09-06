import { createContext } from "react"
import { FriendContextType, 
        FriendType } from "../interfaces/frinedsInterface"


export const dataFriends: FriendType[] = [
    {
        user: "David",
        connected: true
    },
    {
        user: "Juanito",
        connected: false
    }
]

export const FriendContext = createContext<FriendContextType >( {} as FriendContextType )

