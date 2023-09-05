import { Grid,
        GridItem,
        Tabs } from "@chakra-ui/react"
import { SideBar } from "./sidebar"
import { Chat } from './chat';
// import { useState } from "react"
// import { useState, createContext, useContext } from "react"
// import { }
import { FriendProvider } from "../../hooks/FriendsContext";

export const Home = () => {

  return (
    
    <FriendProvider>
    <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan={3} borderRight="1px solid gray">
            <SideBar />
        </GridItem>
        <GridItem colSpan={7}>
            <Chat />
        </GridItem>
    </Grid>
    </FriendProvider>
  )
}
