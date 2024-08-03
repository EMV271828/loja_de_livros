import {Navigate, useLocation} from "react-router-dom";
import autenticacaoUsuario from "../utils/autenticacaoUsuario.ts";
import Layout from "./Layout.tsx";
import SignInLayout from "./SignInLayout.tsx";


const PrivateRoute = () => {
    const usuarioLogado = autenticacaoUsuario((u) => u.usuarioLogado)
    const location = useLocation()

    if (usuarioLogado.length === 0) {
        return <Navigate to="/login" state={{from: location.pathname}}/>
    }

    if (location.pathname === "/opcoes-de-admin"
        || location.pathname.split("/")[1] === "livros-por-genero"
        || location.pathname.split("/")[1] === "detalhes-livros-admin"
    )
        return <SignInLayout/>

    return <Layout/>
}

export default PrivateRoute;