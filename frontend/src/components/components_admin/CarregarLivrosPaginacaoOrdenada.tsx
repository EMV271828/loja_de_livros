import LivroQueryPaginadoOrdenado from "../../hooks/livros/LivroQueryPaginadoOrdenado.tsx";
import Livro from "../../interfaces/livro.ts";

const CarregarLivrosPanginacaoOrdenada = (pagina: number, tamanho: number,
                                          titulo: string, coluna: string, ordem: string): [Livro [], number, number] => {

    const {
        data: resultadoPaginado,
        isPending: carregandoLivros,
        error: errorLivros
    } = LivroQueryPaginadoOrdenado({pagina, tamanho, titulo, coluna, ordem});


    if (carregandoLivros) {
        return [[] as Livro[], 0, 0]
    }

    if (errorLivros) throw errorLivros;

    return [resultadoPaginado.livros, resultadoPaginado.totalDePaginas, 1]
}

export default CarregarLivrosPanginacaoOrdenada
