import { Routes, Route } from 'react-router-dom'
import { Login } from './Login/login';
import { Sigup } from './Login/sigup';

export const Views = () => {
  return (
    <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/register" element={ <Sigup />} />
        <Route path="*" element={ <Login />} />
    </Routes>
  )
}
