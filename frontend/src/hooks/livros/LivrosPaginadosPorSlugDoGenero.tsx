import {useInfiniteQuery} from "@tanstack/react-query";
import Livro from "../../interfaces/livro.ts";
import queryAPILivro from "./queryAPILivro.tsx";

interface QueryString {
    tamanho: number;
    slug?: string;
}

const useLivrosPaginadosPorSlugDoGenero = (query: QueryString) => {
    const {recuperarLivrosPaginadosPorSlugDoGenero} = queryAPILivro();

    return useInfiniteQuery<ResultadoPaginado<Livro>>({
        queryKey: ["livros", "genero", "paginado", query],
        queryFn: ({pageParam}) =>
            recuperarLivrosPaginadosPorSlugDoGenero({
                params: {
                    pagina: pageParam,
                    ...query,
                },
            }),
        initialPageParam: 0,
        staleTime: 10_000,
        getNextPageParam: (lastPage,) => {
            return lastPage.paginaAtual < lastPage.totalDePaginas - 1
                ? lastPage.paginaAtual + 1
                : undefined;
        },
    });
};
export default useLivrosPaginadosPorSlugDoGenero;
