import { ChatIcon } from "@chakra-ui/icons"
import { Divider, 
        HStack, 
        Heading, 
        VStack,
        Text } from "@chakra-ui/layout"
import { Button, 
        Circle,
        Tab, 
        TabList } from "@chakra-ui/react"
// import { FriendContext,useFriendContext } from "../../hooks/FriendsContext"
import { useContext } from "react"
import { FriendContext } from "../../Context/FriendsContext"
// import { useContext } from "react"
// import { useFriendContext } from "./chat"



export const SideBar = () => {

    // const {  } = useFriendContext() 
    const {friendList, setFriendList} = useContext(FriendContext)
    // const {friendList, setFriendList} = useFriendContext()
   return (
    <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
            <Heading size="md"> Add Friend</Heading>
            <Button>
                <ChatIcon />

            </Button>
        </HStack>
        <Divider />
        <VStack as={TabList}>
            {
                // friendList.map()
                friendList.map((friend) => (
                    
                    <HStack key={friend.user} as={Tab}>
                        <Circle bg={friend.connected ? "green.500" : "red.500"} size="20px"/>
                        <Text>{friend.user}</Text>
                    </HStack>
                    
                ))
            }
        </VStack>
    </VStack>
  )
}
