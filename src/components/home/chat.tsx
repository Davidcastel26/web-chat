import { TabPanels, TabPanel } from "@chakra-ui/react"
import { VStack } from "@chakra-ui/layout"
import { createContext, useState, Context } from "react"


interface FriendContextType{
    friendList: []
    setFriendList: (friendList: any | []) => void 
}

// export const FriendContext:Context<{ friendList: []; setFriendList: React.Dispatch<React.SetStateAction<[]>> }> = createContext({friendList:[], setFriendList:()=>{}})
export const FriendContext = createContext<FriendContextType | undefined>(undefined)

export const Chat = () => {

    const [friendList, setFriendList] = useState<[]>([])

    // const contextValue = FriendContextType = {
    //     friendList,
    //     setFriendList
    // }

  return (
    <FriendContext.Provider value={{friendList, setFriendList}}>
        <VStack>
            <TabPanels>
                <TabPanel>Friend 1</TabPanel>
                <TabPanel>Friend 2</TabPanel>
            </TabPanels>
        </VStack>   
    </FriendContext.Provider>
    
  )
}
