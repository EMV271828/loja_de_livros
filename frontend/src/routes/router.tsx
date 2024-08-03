import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from "../pages/ErrorPage.tsx";
import Layout from "./Layout"
import HomePage from "../pages/HomePage.tsx";
import PaginaLogin from "../pages/PaginaLogin.tsx";
import PaginaCadastro from "../pages/PaginaCadastro.tsx";
import SignInLayout from "./SignInLayout.tsx";
import ListaDeLivrosPage from "../pages/ListaDeLivrosPage.tsx";
import PaginaAdmin from "../pages/PaginaAdmin.tsx";
import LivrosPorGenero from "../pages/LivrosPorGenero.tsx";
import CardsDeLivroPage from "../pages/CardsDeLivroPage.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import DetalhesLivroPage from "../pages/DetalhesLivroPage.tsx";
import EditarLivroPage from "../pages/EditarLivroPage.tsx";
import CarrinhoDeComprasPage from "../pages/CarrinhoDeComprasPage.tsx";
import LivroInformacaoPage from "../pages/LivroInformacaoPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: < ErrorPage/>,
        children: [

            {path: "", element: <HomePage/>},
            {path: "lista-de-livros-busca", element: <ListaDeLivrosPage/>},
        ]
    },
    {
        path: "/",
        element: <SignInLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <PrivateRoute/>,
                children: [
                    {path: "opcoes-de-admin", element: <PaginaAdmin/>},
                    {
                        path: "livros-por-genero",
                        element: <LivrosPorGenero/>,
                        children: [
                            {
                                path: ":slug?",
                                element: <CardsDeLivroPage/>
                            }
                        ]
                    },
                    {path: "/detalhes-livros-admin/:id", element: <DetalhesLivroPage/>},
                    {path: "/detalhes-livros-admin/:id/editar", element: <EditarLivroPage/>},
                    {path: "/minhas-compras", element: <CarrinhoDeComprasPage/>}
                ]
            },
            {path: "login", element: <PaginaLogin/>},
            {path: "cadastrar", element: <PaginaCadastro/>},
            {path: "/livro-informacao", element: <LivroInformacaoPage/>},
        ]
    },
]);
export default router;