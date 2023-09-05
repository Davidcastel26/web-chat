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
import { FriendContext, useFriendContext } from "../../hooks/FriendsContext"
import { useContext } from "react"
// import { useContext } from "react"
// import { useFriendContext } from "./chat"



export const SideBar = () => {

    // const {  } = useFriendContext() 
    const {set} = useContext(FriendContext)
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
            {/* <HStack as={Tab}>
                <Circle bg="red.500" size="20px"/>
                 <SkeletonCircle size='10' /> 
                <Text>Friend's Name</Text>
            </HStack>
            <HStack as={Tab}>
                <Circle bg="green.500" size="20px"/>
                <Text>Friend's Name</Text>
            </HStack> */}
            {
                // friendList.map()
                // friend[user].map()
            }
        </VStack>
    </VStack>
  )
}
