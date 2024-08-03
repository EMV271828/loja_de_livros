import {useQuery} from "@tanstack/react-query";
import queryAPICarrinho from "./queryAPICarrinho.tsx";



const BuscaCarrinhoPorIdDoUser = (id: number) =>{
    const {recuperarCarrinhoPorIdDoUsuario} = queryAPICarrinho();

    return useQuery({
        queryKey: ["carrinhos", id],
        queryFn: () => recuperarCarrinhoPorIdDoUsuario(id),
        staleTime: 10_000,
    })
}

export default BuscaCarrinhoPorIdDoUser;