// import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { useAccountContext } from "./AccountContext";

const useAuth = () => {

    // const user = { loggedIn : false}
    const { user } = useAccountContext()

    return user && user.loggedIn

}

export const PrivateRoutes = () => {
    
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />

}