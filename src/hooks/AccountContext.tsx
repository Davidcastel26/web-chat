
import React, { 
         createContext,
         useState, 
         useContext,
         ReactNode, 
         useEffect } from 'react'
import { useNavigate } from 'react-router'
// const { createContext } = require('react')

interface User {
    loggedIn: boolean
    user: string
}

interface AccountContextType {
    // data:{
        user: User
        setUser: (user: any | null) => void
    // }
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccountContext = () => {
    const context = useContext(AccountContext)
    if (context === undefined) {
        throw new Error('useAccountContext must be used within an AccountProvider');
      }
      return context;
}

interface AccountProviderProps{
    children: ReactNode
}

export const AccountProvider: React.FC<AccountProviderProps>= ({children}) => {

    const [user, setUser] =useState<  any| null >({loggedIn: null})
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('http://localhost:8080/auth/login',{
            method: 'GET',
            credentials: "include",

        }).catch( err => {
            console.log(err)
            setUser({loggedIn: false})
            return;

        }).then(r => {

            if(!r || r.ok || r.status >= 400 ){
                setUser({loggedIn: false})
                return;
            }
            return r.json()

        }).then( (data:any) => { 
            if(!data){
                setUser({loggedIn: false})
                return;
            }
            console.log(data);
            setUser({...data})
            navigate('/home')
        })
    },[])

    const contextValue: AccountContextType = {
        user,
        setUser
    }

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    )
}

// export const AccountContext = createContext()

// export const UserContext = ({childre}: any | object | string) => {

//     const [user, setUser] = useState({loggedIn: null})

//     return (
//         <AccountContext.Provider value={{ user, setUser}}>
//             {childre}
//         </AccountContext.Provider>
//     )

// }