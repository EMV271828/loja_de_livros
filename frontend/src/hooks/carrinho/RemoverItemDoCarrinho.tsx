import {useMutation, useQueryClient} from "@tanstack/react-query";
import CustomError from "../../utils/customError.ts";
import queryAPICarrinho from "./queryAPICarrinho.tsx";


const RemoverItemDoCarrinho = (usuarioId: number) => {
    const {removerItemComUsuarioId} = queryAPICarrinho()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => removerItemComUsuarioId(id, {data: {usuarioId}}),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({queryKey: ["livros", "genero", "paginado"], refetchType: "all"}),
            queryClient.invalidateQueries({queryKey: ["livros", "paginado"], refetchType: "all"}),
            queryClient.invalidateQueries({queryKey: ["carrinhos", usuarioId], refetchType: "all"}),
        ])
        ,
        onError: (error: CustomError) => {
            return error
        }
    });
}

export default RemoverItemDoCarrinho;