import { Navigate } from 'react-router-dom'
import UserContext from "./UserContext.jsx";
import {useContext} from "react";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext)
    if (!user) {
        return <Navigate to="/" />
    }

    return children;
}

export default PrivateRoute