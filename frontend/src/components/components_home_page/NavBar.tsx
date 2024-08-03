import {Link} from "react-router-dom";
import SearchBar from "../components_lista_de_livros/SearchBar.tsx";
import DropDownItem from "./dropDownItem.tsx";
import LoginModal from "../components_login/LoginModal.tsx";
import { useState} from "react";
import autenticacaoUsuario from "../../utils/autenticacaoUsuario.ts";
import LogOutModal from "../components_login/LogOutModal.tsx";

const NavBar = () => {

    const usuarioConta = autenticacaoUsuario((s) => s.usuarioLogado)
    const usuarioCarrinho = autenticacaoUsuario((s) => s.carrinho);

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    return (
        <>
            {/*modal baseado na conexao de conta do usuario*/}
            {
                usuarioConta.length === 0 ?
                    <LoginModal openModal={openModal} closeModal={handleClose}/> :
                    <LogOutModal openModal={openModal} closeModal={handleClose}/>
            }

            {/*navBar*/}
            <nav className="navbar navbar-dark bg-warning justify-content-center d-flex p-3 fixed-top">
                {/*imagem da livraria*/}
                <Link to={`/`} className="m-2" style={{textDecoration: "none"}}>
                    <i className="bi bi-book-half h2 text-black"></i>
                    Livraria
                </Link>

                {/*dropdown */}
                <div className="dropdown">
                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-list"></i>
                        Opções
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <DropDownItem title="Novidades" link="novidades" index={0}/>
                        <DropDownItem title="Livros Mais Vendidos" link="livros-mais-vendidos" index={1}/>
                        <DropDownItem title="Livros por Gênero" link="livros-por-genero" index={2}/>
                    </ul>
                </div>

                {/*busca*/}
                <div className="input-group w-50 m-2">
                    <SearchBar/>
                </div>

                {/*Outras opcoes da barra*/}

                <div className="m-2">

                    {
                        usuarioConta.length > 0 ?
                            <div className={"btn btn-warning"} onClick={handleOpen}>
                                <i className="bi bi-person-circle"></i>
                                {`${usuarioConta}`}
                            </div>
                            : <div className="btn btn-warning" onClick={handleOpen}>
                                <i className="bi bi-box-arrow-in-right"></i>
                                Login
                            </div>
                    }

                    {

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
                            </Link>
                    }

                    {/* opcoes de admin - registrar, deletar, atualizar livros  */}

                    {
                        usuarioConta === "admin" &&

                        <Link className={"btn btn-warning"} to={"/opcoes-de-admin"}>
                            <i className="bi bi-person-fill-lock"></i>
                            Ações de Administrador
                        </Link>
                    }
                </div>
            </nav>
        </>
    )
}

export default NavBar



