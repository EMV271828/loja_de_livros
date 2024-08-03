import {useQuery} from "@tanstack/react-query";
import queryAPI from "../queryAPI.ts";
import Livro from "../../interfaces/livro.ts";

interface QueryLivro {
    pagina: number;
    tamanho: number;
    titulo: string;
    coluna: string;
    ordem: string;
}

const LivroQueryPaginadoOrdenado = (query: QueryLivro) => {

    const { queryLivroPaginadoOrdenado } = queryAPI<Livro>("/livros");

    return useQuery({
            queryKey: ["livros", "paginacaoOrdenada", query],
            queryFn: () =>
                queryLivroPaginadoOrdenado(
                    {
                        params: {...query}
                    }
                )
            , staleTime: 10_000,
        }
    );
};

export default LivroQueryPaginadoOrdenado