import { TabPanels, TabPanel } from "@chakra-ui/react"
import { VStack } from "@chakra-ui/layout"
// import { useFriendContext, FriendContext } from "../../hooks/FriendsContext"
import { useContext } from "react"
import { FriendContext } from "../../Context/FriendsContext"
// import { useFriendContext } from "../../hooks/useFriendCo"


// export const FriendContext:Context<{ friendList: []; setFriendList: React.Dispatch<React.SetStateAction<[]>> }> = createContext({friendList:[], setFriendList:()=>{}})


export const Chat = () => {

    // const [friendList, setFriendList] = useState<[]>([])
    // const {friendList, setFriendList} = useFriendContext()
    const {friendList} = useContext(FriendContext)

  return  friendList.length > 0 ? (
        <VStack>
            <TabPanels>
                <TabPanel>Friend 1</TabPanel>
                <TabPanel>Friend 2</TabPanel>
            </TabPanels>
        </VStack>       
  ): (
    <VStack 
        justify="center" 
        pt="5rem" 
        w='100%'
        fontSize="lg" 
        textAlign="center"
    >
        <TabPanels>
            <TabPanel>No Friends ☹️ add friend to start chatting </TabPanel>
        </TabPanels>
    </VStack> 
  )
}
