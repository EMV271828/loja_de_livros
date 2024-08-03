import {useParams} from "react-router-dom";
import Card from "../components/components_slug/CardLivro.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import useLivrosPaginadosPorSlugDoGenero from "../hooks/livros/LivrosPaginadosPorSlugDoGenero.tsx";
import autenticacaoUsuario from "../utils/autenticacaoUsuario.ts";
import Livro from "../interfaces/livro.ts";
import {useEffect, useRef} from "react";
import AlterarItemDoCarrinho from "../hooks/carrinho/AlterarItemDoCarrinho.tsx";
import RemoverItemDoCarrinho from "../hooks/carrinho/RemoverItemDoCarrinho.tsx";
import criarItemDoCarrinho from "../hooks/carrinho/CriarItemDoCarrinho.tsx";
import Item from "../interfaces/item.ts";
import buscaCarrinhoPorIdDoUser from "../hooks/carrinho/BuscaCarrinhoPorIdDoUser.tsx";
import Carrinho from "../interfaces/carrinho.ts";


const CardsDeLivroPage = () => {
    const {slug} = useParams();
    const tamanho = 42;

    const refs: React.MutableRefObject<HTMLInputElement[]> = useRef([]);

    const carrinhoUsuario = autenticacaoUsuario((s) => s.carrinho);
    const setCarrinhoUsuario = autenticacaoUsuario((s) => s.setCarrinho);

    const {mutate: alterarItem} =
        AlterarItemDoCarrinho(JSON.parse(localStorage.getItem("session")!)["usuarioId"]);

    const {mutate: removerItem} =
        RemoverItemDoCarrinho(JSON.parse(localStorage.getItem("session")!)["usuarioId"]);

    const {mutate: criarItem} =
        criarItemDoCarrinho(JSON.parse(localStorage.getItem("session")!)["usuarioId"]);

    const {
        data: resultadoCarrinho,
        error: erroCarrinho
    } = buscaCarrinhoPorIdDoUser(JSON.parse(localStorage.getItem("session")!)["usuarioId"])

    if (erroCarrinho) throw erroCarrinho;

    useEffect(() => {
        setCarrinhoUsuario(resultadoCarrinho || {} as Carrinho);
    }, [alterarItem, removerItem, criarItem, setCarrinhoUsuario, resultadoCarrinho]);

    const {
        data,
        isPending: carregandoLivros,
        error: errorlivros,
        hasNextPage,
        fetchNextPage
    } = useLivrosPaginadosPorSlugDoGenero({tamanho, slug});

    if (carregandoLivros) return <h6>Carregando...</h6>;
    if (errorlivros) throw errorlivros;

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

    return (
        <>
            <InfiniteScroll
                dataLength={data.pages.reduce((total, page) => total + page.livros.length, 0)}
                hasMore={hasNextPage}
                className={"px-5 mx-4 mt-3"}
                next={() => fetchNextPage()}
                loader={<h6>Carregando...</h6>
                }>

                <h5>{slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Livros"}</h5>
                <div className="row mb-3">
                    {data.pages.map((page) =>
                        page.livros.map((livro, index) => (
                            <div key={livro.id} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                                <Card
                                    id={livro.id}
                                    titulo={livro.titulo}
                                    imagem={"/" + livro.imagem}
                                    preco={livro.preco.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                        useGrouping: true,
                                    })}
                                    autores={livro.autores}
                                    dados={livro}
                                    footer={
                                        Object.keys(carrinhoUsuario).length !== 0 && livro.itens !== undefined &&
                                        livro.itens.length > 0 ?
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col col-lg-4 btn btn-sm
                                                    btn-warning border border-dark fw-bold"
                                                         onClick={() => alterarValor(index, livro, -1)}
                                                    >
                                                        -
                                                    </div>
                                                    <div
                                                        className="col btn btn-sm btn-warning rounded-0 text-center"
                                                        ref={(ref: HTMLDivElement) =>
                                                            refs.current[index] = ref as HTMLInputElement}
                                                    >
                                                        {livro.itens?.filter((item: Item) =>
                                                            item.carrinhoId === carrinhoUsuario.id)[0].quantidade}
                                                    </div>
                                                    <div className="col col-lg-4 btn btn-sm btn-warning border
                                                         border-dark fw-bold"
                                                         onClick={() => alterarValor(index, livro, +1)}
                                                    >
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <input type="button"
                                                   className="btn btn-warning    btn-sm w-100"
                                                   value="Comprar"
                                                   onClick={() => adicionarItemAoCarrinho(livro)}
                                            />
                                    }
                                />
                            </div>
                        ))
                    )}
                </div>
            </InfiniteScroll>
        </>
    );
}

export default CardsDeLivroPage;
