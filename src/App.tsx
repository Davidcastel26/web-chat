import ToggleColorMode from "./components/ui/ToggleColorMode"
import { Views } from "./components/views"
import { AccountProvider } from "./hooks/AccountContext"

function App() {

  return (
    <AccountProvider>
     <ToggleColorMode />
     <Views />
    </AccountProvider>
  )
}

export default App
