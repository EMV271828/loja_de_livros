import {useQuery} from "@tanstack/react-query";
import queryAPILivro from "./queryAPILivro.tsx";

const LivrosPorSlugDoGenero = (slug?: string) =>{
    const {recuperarLivrosPorSlugDoGenero} = queryAPILivro();

    return useQuery({
        queryKey: slug ? ["generos", "slugGenero", slug] : ["generos"],
        queryFn: () => recuperarLivrosPorSlugDoGenero(slug),
        staleTime: 10_000,
    })
}

export default LivrosPorSlugDoGenero;