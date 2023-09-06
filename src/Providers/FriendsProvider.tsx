import { useState } from "react"
import { FriendContextType, FriendProviderProps } from "../interfaces/frinedsInterface"
import { FriendContext, dataFriends } from "../Context/FriendsContext"

export const FriendProvider = ({children}: FriendProviderProps) => {

    const [friendList, setFriendList ] = useState<FriendContextType>()

    const contextValue: FriendContextType = {
        friendList: friendList?.friendList || dataFriends,
        setFriendList   
    }

    return (
        <FriendContext.Provider value={contextValue}>
            {children}
        </FriendContext.Provider>
    )
}