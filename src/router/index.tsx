import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider  } from "react-router-dom";
import App from "../App";
import {Login} from '@pages'

export default function Router(){
    const root = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route index element={<Login/>}/>
                <Route path="/main" element={<h1>Home</h1>}/>
            </Route>
        )
    )
    
    return <RouterProvider router={root} />
}