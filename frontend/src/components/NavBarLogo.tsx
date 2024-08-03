import {Link, useLocation} from "react-router-dom";
import autenticacaoUsuario from "../utils/autenticacaoUsuario.ts";

const NavBarLogo = () => {

    const usuarioConta = autenticacaoUsuario((s) => s.usuarioLogado)
    const usuarioCarrinho = autenticacaoUsuario((s) => s.carrinho);
    const location = useLocation();

    return (
        <>
            <nav className="navbar navbar-dark bg-warning justify-content-center p-3 fixed-top">
                {/*imagem da livraria*/}
                <div className={"w-75"}>
                    <Link to={`/`} className="m-2" style={{textDecoration: "none"}}>
                        <i className="bi bi-book-half h1 text-black"></i>
                        Livraria
                    </Link>
                </div>

                {

                    (location.pathname.split("/")[1] === "livros-por-genero"  || location.pathname === "/livro-informacao") && (
                        usuarioConta.length > 0 && Object.keys(usuarioCarrinho).length !== 0 ?
                            <Link className={"btn btn-warning"} to={"/minhas-compras"}>
                                <i className="bi bi-cart"></i>
                                Minhas compras
                                <div>
                                    R$ {
                                    usuarioCarrinho.itens
                                        .reduce((total, item) =>
                                            total + item.quantidade * item.livro!.preco, 0)
                                        .toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true,
                                        })
                                }
                                </div>
                            </Link>
                            :
                            <Link className={"btn btn-warning"} to={"/minhas-compras"}>
                                <i className="bi bi-cart"></i>
                                Minhas compras
                            </Link>)
                }
            </nav>
        </>
    )
}

export default NavBarLogo