import { useEffect } from "react"
import { socket } from "../socket"
import { useAccountContext } from "./AccountContext"

const useSocketSetup = () => {

    const {setUser} = useAccountContext()

    useEffect(() => {
        socket.connect()
        socket.on("connect_error", () => {
            setUser({loggedIn: false})
        })
        return () => {
            socket.off("connect_error")
        }
    },[setUser])
}

export default useSocketSetup;