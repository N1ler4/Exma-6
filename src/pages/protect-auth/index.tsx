import { Navigate } from "react-router-dom";
import {isAunthenticated} from "@token-service"
import {ProtectedRouterProps} from "@interface"

const Index = ({element}:ProtectedRouterProps)=>{
    return isAunthenticated() ? element : <Navigate to="/" />
}

export default Index