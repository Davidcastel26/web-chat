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

export const SideBar = () => {
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
            <HStack as={Tab}>
                <Circle bg="red.500" w="20px" h="20px"/>
                <Text>Friend's Name</Text>
            </HStack>
            <HStack as={Tab}>
                <Circle bg="green.500" w="20px" h="20px"/>
                <Text>Friend's Name</Text>
            </HStack>
        </VStack>
    </VStack>
  )
}
