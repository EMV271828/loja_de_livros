import {useMutation, useQueryClient} from "@tanstack/react-query";
import CustomError from "../../utils/customError.ts";
import queryAPICarrinho from "./queryAPICarrinho.tsx";
import Item from "../../interfaces/item.ts";


const CriarItemDoCarrinho = (usuarioId: number) => {
    const {criarItemDoCarrinho} = queryAPICarrinho()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item: Item) => {

            const itemDTO = JSON.stringify(item)
            const idDoUsuario = usuarioId.toString()

            return criarItemDoCarrinho({data: {itemDTO, idDoUsuario}})
        },
        onSuccess: () => {

            return Promise.all([
                queryClient.invalidateQueries({queryKey: ["carrinhos", usuarioId], refetchType: "all"}),
                queryClient.invalidateQueries({queryKey: ["livros", "paginado"], refetchType: "all"}),
                queryClient.invalidateQueries({queryKey: ["livros", "genero", "paginado"], refetchType: "all"})
            ])
        },
        onError: (error: CustomError) => {
            return error
        }
    });
}

export default CriarItemDoCarrinho;