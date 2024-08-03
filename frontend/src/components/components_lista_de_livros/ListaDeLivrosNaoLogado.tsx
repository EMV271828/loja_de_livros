import useLivroBusca from "../../utils/LivroBusca.ts";
import LivroQueryPaginado from "../../hooks/livros/LivroQueryPaginado.tsx";
import CarregandoPagina from "../CarregandoPagina.tsx";
import ListaDeLivros from "./ListaDeLivros.tsx";
import PaginacaoDeBusca from "./PaginacaoDeBusca.tsx";

const ListaDeLivrosNaoLogado = () => {

    const pagina = useLivroBusca(s => s.pagina);
    const tamanho = useLivroBusca(s => s.tamanho);
    const titulo = useLivroBusca(s => s.titulo)

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
                <ListaDeLivros livros={resultadoPaginado.livros}/>
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

export default ListaDeLivrosNaoLogado;