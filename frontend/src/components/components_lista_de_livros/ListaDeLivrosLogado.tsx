import {useEffect, useRef} from "react";
import useLivroBusca from "../../utils/LivroBusca.ts";
import autenticacaoUsuario from "../../utils/autenticacaoUsuario.ts";
import buscaCarrinhoPorIdDoUser from "../../hooks/carrinho/BuscaCarrinhoPorIdDoUser.tsx";
import AlterarItemDoCarrinho from "../../hooks/carrinho/AlterarItemDoCarrinho.tsx";
import RemoverItemDoCarrinho from "../../hooks/carrinho/RemoverItemDoCarrinho.tsx";
import criarItemDoCarrinho from "../../hooks/carrinho/CriarItemDoCarrinho.tsx";
import Carrinho from "../../interfaces/carrinho.ts";
import Livro from "../../interfaces/livro.ts";
import Item from "../../interfaces/item.ts";
import LivroQueryPaginado from "../../hooks/livros/LivroQueryPaginado.tsx";
import CarregandoPagina from "../CarregandoPagina.tsx";
import ListaDeLivros from "./ListaDeLivros.tsx";
import PaginacaoDeBusca from "./PaginacaoDeBusca.tsx";

const ListaDeLivrosLogado = () => {
    const refs: React.MutableRefObject<HTMLInputElement[]> = useRef([]);

    const pagina = useLivroBusca(s => s.pagina);
    const tamanho = useLivroBusca(s => s.tamanho);
    const titulo = useLivroBusca(s => s.titulo)

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

    const alterarValor = (index: number, livro: Livro, operator: number) => {

        const item = livro.itens!.filter((item) =>
            item.carrinhoId === carrinhoUsuario.id)[0]

        if (parseInt(refs.current[index].innerText) === 1 && operator === -1) {
            item.quantidade = parseInt(refs.current[index].innerText) + operator
            removerItem(item.id!)

        } else if (parseInt(refs.current[index].innerText) <= livro.quantidade) {
            item.quantidade = parseInt(refs.current[index].innerText) + operator
            alterarItem(item)

        } else {
            refs.current[index].innerText = livro.quantidade.toString()
        }

    }

    const adicionarItemAoCarrinho = (livro: Livro) => {
        const item = {quantidade: 1, livroId: livro.id, carrinhoId: carrinhoUsuario?.id} as Item
        criarItem(item)
    }

    const {
        data: resultadoPaginado,
        isPending: carregandoLivros,
        error: errorLivros
    } = LivroQueryPaginado({pagina, tamanho, titulo});

    if (carregandoLivros) return (<CarregandoPagina/>);

    if (errorLivros) throw errorLivros;

    if (resultadoPaginado.livros.length !== 0 && titulo.length > 0) {
        return (
            <>

                <ListaDeLivros
                    livros={resultadoPaginado.livros}
                    carrinho={resultadoCarrinho || {} as Carrinho}
                    refs={refs}
                    alterarValor={alterarValor}
                    adicionarItemAoCarrinho={adicionarItemAoCarrinho}
                />
                <div className={"mt-5 d-flex justify-content-center"}>
                    <PaginacaoDeBusca/>
                </div>

            </>

        )
    }

    return (
        <>
            <div className={"d-flex  flex-column m-5"}>
                <div className={"fs-4 fw-bold"}>
                    Nenhum resultado para {titulo}
                </div>
                <div className={"fs-5"}>
                    Verifique a ortografia ou utilize outro termo para busca.
                </div>
            </div>
        </>
    )
}

export default ListaDeLivrosLogado;

