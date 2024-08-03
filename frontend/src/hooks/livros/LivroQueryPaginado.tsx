import {useQuery} from "@tanstack/react-query";
import queryAPI from "../queryAPI.ts";
import Livro from "../../interfaces/livro.ts";

interface QueryLivro {
    pagina: number;
    tamanho: number;
    titulo: string;
}

const LivroQueryPaginado = (query: QueryLivro) => {

    const { queryLivroPaginado } = queryAPI<Livro>("/livros");

    return useQuery({
            queryKey: ["livros", "paginado", query],
            queryFn: () =>
                queryLivroPaginado(
                    {
                        params: {...query}
                    }
                )
            , staleTime: 10_000,
        }
    );
};

export default LivroQueryPaginado