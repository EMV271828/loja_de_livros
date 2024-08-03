import {useMutation, useQueryClient} from "@tanstack/react-query";
import queryAPI from "../queryAPI.ts";
import CustomError from "../../utils/customError.ts";
import Item from "../../interfaces/item.ts";

const AlterarItemDoCarrinho = (id: number) => {
    const {alterar} = queryAPI<Item>("/itens");

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item: Item) => alterar(item),
        onSuccess: () => {
            return Promise.all([
                    queryClient.invalidateQueries({queryKey: ["livros", "genero", "paginado"], refetchType: "all"}),
                    queryClient.invalidateQueries({queryKey: ["livros", "paginado"], refetchType: "all"}),
                    queryClient.invalidateQueries({queryKey: ["carrinhos", id], refetchType: "all"})
                ]
            )
        },
        onError: (error: CustomError) => {
            return error;
        }
    });
};
export default AlterarItemDoCarrinho;
