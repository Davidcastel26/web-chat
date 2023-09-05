import React, { 
    createContext,
    useState, 
    useContext,
    ReactNode, 
    // useEffect
 } from 'react'

interface FriendType{
user: string
connected: boolean
}

interface FriendContextType{
friendList: FriendType[]
setFriendList: (friendList: any  | null) => void 
}

const dataFriends: FriendType[] = [
    {
        user: "user",
        connected: false
    }
]

export const FriendContext = createContext<FriendContextType | [] | undefined>( undefined )

export const useFriendContext = () => {
const context = useContext(FriendContext)
if (context === undefined) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
}

// const FriendContextHere = useFriendContext() 
// export const FriendContext = createContext()
interface AccountProviderProps{
    children: ReactNode
}

export const FriendProvider:React.FC<AccountProviderProps> = ({children}) => {

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
