import { Navigate } from "react-router-dom";
import {isAunthenticated} from "@token-service"
import {ProtectedRouterProps} from "@interface"

const Index = ({element}:ProtectedRouterProps)=>{
    return isAunthenticated() ? <Navigate to="/main" /> : element
}

export default Index