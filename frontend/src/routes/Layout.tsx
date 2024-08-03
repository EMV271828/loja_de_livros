import {Outlet} from "react-router-dom";
import "../index.css"
import NavBar from "../components/components_home_page/NavBar.tsx";

const Layout = () => {

    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}

export default Layout;