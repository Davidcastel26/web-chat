import { TabPanels, TabPanel } from "@chakra-ui/react"
import { VStack } from "@chakra-ui/layout"
// import { createContext, useState, useContext } from "react"




// export const FriendContext:Context<{ friendList: []; setFriendList: React.Dispatch<React.SetStateAction<[]>> }> = createContext({friendList:[], setFriendList:()=>{}})


export const Chat = () => {

    // const [friendList, setFriendList] = useState<[]>([])

  return (
    
        <VStack>
            <TabPanels>
                <TabPanel>Friend 1</TabPanel>
                <TabPanel>Friend 2</TabPanel>
            </TabPanels>
        </VStack>       
  )
}
