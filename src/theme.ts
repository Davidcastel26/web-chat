import { extendTheme } from '@chakra-ui/react'

const theme: Object = {
    config:{
        initialColorMod: "dark",
        useSystemColorMode: true,
    },
    styles:{
        golbal:{
            body:{
                margin: 0, 
                "font-family":
                    "-apple-svstem, BlInKMacsvstemFont, 'Segoe UI', 'Roboto','Oxygen', 'Ubuntu','Cantarell', 'Fira Sans','Droid Sans','Helvetica','Neue', sans-serif",
                "-webkit-font-smoothing": "antialiased", 
                "-moz-osx-font-smootning": "grayscale",
            },
            code:{
                "font -family":
                    "source-code-pro, Menlo, Monaco, Consolas, 'Courier New' , monospace",
            }
        }
    }
}

export default extendTheme(theme)