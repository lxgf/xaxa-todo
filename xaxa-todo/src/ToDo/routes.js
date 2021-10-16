import {LOGIN_ROUTE} from "./utils/consts";
import {HOME_ROUTE} from "./utils/consts";
import {Main} from "./components/main";
import {Login} from "./components/login";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const privateRoutes = [
    {
        path: HOME_ROUTE,
        Component: Main
    }
]