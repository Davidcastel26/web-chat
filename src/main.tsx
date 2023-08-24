import React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import { ColorModeScript } from "@chakra-ui/color-mode"
import theme from './theme.ts'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
