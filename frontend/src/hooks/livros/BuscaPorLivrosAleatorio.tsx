import {useQuery} from "@tanstack/react-query";
import queryAPILivro from "./queryAPILivro.tsx";

const BuscaPorLivrosAleatorio = () =>{
    const {recuperarLivrosAleatorio} = queryAPILivro();

    return useQuery({
        queryKey: ["livros"],
        queryFn: () => recuperarLivrosAleatorio(),
        staleTime: 10_000,
    })
}

export default BuscaPorLivrosAleatorio;