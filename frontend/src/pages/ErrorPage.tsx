import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import warning from "../assets/warning.jpg";
import NavBar from "../components/components_home_page/NavBar.tsx";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <>
            <NavBar/>
            <div className="container mt-3 d-flex flex-column align-items-center">
                <div>
                    <img src={warning} alt={""}/>
                </div>
                <div className={"text-center"}>
                    <h1>
                        {isRouteErrorResponse(error) ? "Página requisitada inválida." :
                            error instanceof Error ? error.message : "Erro desconhecido"}
                    </h1>
                </div>
            </div>
        </>
    )
}

export default ErrorPage