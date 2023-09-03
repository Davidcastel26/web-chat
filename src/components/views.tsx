import { Routes, Route } from 'react-router-dom'
import { Login } from './Login/login';
import { Sigup } from './Login/sigup';
import { PrivateRoutes } from '../hooks/PrivateRoutes';
import { Text } from '@chakra-ui/react';
import { useAccountContext } from '../hooks/AccountContext';
import { Home } from './home/Home';

export const Views = () => {

  const { user } = useAccountContext()

  return user.loggedIn === null ? (
    <Text> Loading...</Text>
    ) : (
    <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/register" element={ <Sigup />} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/home" element={ <Home />} />
        </Route>
        <Route path="*" element={ <Login />} />
    </Routes>
  )
}
