import {Outlet} from "react-router-dom";
import "../index.css"
import NavBarLogo from "../components/NavBarLogo.tsx";


const SignInLayout = () => {

    return (
        <>
            <NavBarLogo/>
            <Outlet/>
        </>
    )
}

export default SignInLayout;