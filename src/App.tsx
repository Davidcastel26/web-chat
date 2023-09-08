import ToggleColorMode from "./components/ui/ToggleColorMode"
import { Views } from "./components/views"
import { AccountProvider } from "./hooks/AccountContext"
import { socket } from "./socket"

function App() {
  socket.connect()
  return (
    <AccountProvider>
     <ToggleColorMode />
     <Views />
    </AccountProvider>
  )
}

export default App
