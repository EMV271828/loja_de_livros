import LivroQueryPaginado from "../../hooks/livros/LivroQueryPaginado.tsx";
import Livro from "../../interfaces/livro.ts";


const CarregarLivrosPaginado = (pagina: number, tamanho: number,
                                titulo: string): [Livro [], number, number] => {

    const {
        data: resultadoPaginado,
        isPending: carregandoLivros,
        error: errorLivros
    } = LivroQueryPaginado({pagina, tamanho, titulo});


    if (carregandoLivros) {
        return [[] as Livro[], 0, 0]
    }

    if (errorLivros) throw errorLivros;

    return [resultadoPaginado.livros, resultadoPaginado.totalDePaginas, 1]
}

export default CarregarLivrosPaginado

//TODO fazer com que a mensagem do erro seja enviada