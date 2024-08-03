import {useLocation, useNavigate} from "react-router-dom";
import Autor from "../../interfaces/autor.ts";
import dayjs from "dayjs";
import autenticacaoUsuario from "../../utils/autenticacaoUsuario.ts";
import buscaCarrinhoPorIdDoUser from "../../hooks/carrinho/BuscaCarrinhoPorIdDoUser.tsx";
import AlterarItemDoCarrinho from "../../hooks/carrinho/AlterarItemDoCarrinho.tsx";
import RemoverItemDoCarrinho from "../../hooks/carrinho/RemoverItemDoCarrinho.tsx";
import criarItemDoCarrinho from "../../hooks/carrinho/CriarItemDoCarrinho.tsx";
import {useEffect, useRef} from "react";
import Carrinho from "../../interfaces/carrinho.ts";
import Livro from "../../interfaces/livro.ts";
import Item from "../../interfaces/item.ts";

const LivroInformacaoLogado = () => {

    const refs = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const {state} = useLocation()

    const carrinhoUsuario = autenticacaoUsuario((s) => s.carrinho);
    const setCarrinhoUsuario = autenticacaoUsuario((s) => s.setCarrinho);

    const {
        data: resultadoCarrinho,
        error: erroCarrinho
    } = buscaCarrinhoPorIdDoUser(JSON.parse(localStorage.getItem("session")!)["usuarioId"])

    if (erroCarrinho) throw erroCarrinho;

    const {mutate: alterarItem} =
        AlterarItemDoCarrinho(JSON.parse(localStorage.getItem("session")!)["usuarioId"]);

    const {mutate: removerItem} =
        RemoverItemDoCarrinho(JSON.parse(localStorage.getItem("session")!)["usuarioId"]);

    const {mutate: criarItem} =
        criarItemDoCarrinho(JSON.parse(localStorage.getItem("session")!)["usuarioId"]);

    useEffect(() => {
        setCarrinhoUsuario(resultadoCarrinho || {} as Carrinho);
    }, [alterarItem, removerItem, criarItem, setCarrinhoUsuario, resultadoCarrinho]);

    const alterarValor = (livro: Livro, operator: number) => {

        const item = livro.itens!.filter((item) =>
            item.carrinhoId === carrinhoUsuario.id)[0]


        if (parseInt(refs.current.value) === 1 && operator === -1) {
            item.quantidade = parseInt(refs.current.value) + operator
            removerItem(item.id!)

        } else if (parseInt(refs.current.value) <= livro.quantidade) {
            item.quantidade = parseInt(refs.current.value) + operator
            alterarItem(item)

        } else {
            refs.current.value = livro.quantidade.toString()
        }


    }

    const adicionarItemAoCarrinho = (livro: Livro) => {
        const item = {quantidade: 1, livroId: livro.id, carrinhoId: carrinhoUsuario?.id} as Item
        criarItem(item)
    }

    return (
        <>
            <div className={"fw-bold fs-3 mx-4 mt-3"}>Informações do Livro</div>
            <hr className={"border-4 w-100"}/>
            <div className={"d-flex"}>
                <div className={"mx-3"}>
                    <img src={"/" + state.imagem} alt={state.titulo} width={350} height={350}/>
                </div>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Título</div>
                        <div className={"col-9 fs-5"}>{state.titulo}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Gênero</div>
                        <div className={"col-9 fs-5"}>{state.genero.nome}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Preço</div>
                        <div className={"col-9 fs-5"}>R$ {state.preco.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        })}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Páginas</div>
                        <div className={"col-9 fs-5"}>{state.paginas}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Quantidade</div>
                        <div className={"col-9 fs-5"}>{state.quantidade}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Disponível?</div>
                        <div className={"col-9 fs-5"}>{state.disponivel ? "Sim" : "Não"}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Autores</div>
                        <div className={"col-9 fs-5"}>
                            Por {state.autores.map((autor: Autor) => autor.nome).join(", ")}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Data de cadastro</div>
                        <div className={"col-9 fs-5"}>{dayjs(state.data).format("DD/MM/YYYY")}</div>
                    </div>
                </div>
            </div>
            <div className={"d-flex mt-3 p-5 justify-content-center"}>
                <div className="btn btn-warning w-25 mx-2">
                    {
                        Object.keys(carrinhoUsuario!).length !== 0 && state.itens !== undefined
                        && state.itens!.length > 0 ?
                            <div className="container">
                                <div className="row">
                                    <div className="col col-lg-4 btn btn-sm
                                                    btn-warning border border-dark fw-bold"
                                         onClick={() => alterarValor!(state, -1)}
                                    >
                                        -
                                    </div>
                                    <div
                                        className="col btn btn-sm btn-warning rounded-0 text-center"
                                        ref={(r) => refs.current!.value = r!.innerText.toString()}
                                    >
                                        {state.itens?.filter((item: Item) =>
                                            item.carrinhoId === carrinhoUsuario!.id)[0].quantidade}
                                    </div>
                                    <div className="col col-lg-4 btn btn-sm btn-warning border
                                                         border-dark fw-bold"
                                         onClick={() => alterarValor!(state, +1)}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                            :
                            <input type="button"
                                   className="btn btn-warning btn-sm w-100"
                                   value="Comprar"
                                   onClick={() => adicionarItemAoCarrinho!(state)}
                            />
                    }
                </div>
                <div className={"btn btn-warning w-25"} onClick={() => navigate(-1)}>
                    Retornar
                </div>
            </div>
        </>
    )
}

export default LivroInformacaoLogado;