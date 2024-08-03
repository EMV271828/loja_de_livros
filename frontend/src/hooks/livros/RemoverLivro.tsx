import queryAPI from "../queryAPI.ts";
import Livro from "../../interfaces/livro.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import CustomError from "../../utils/customError.ts";

const RemoverLivro = () => {
    const {remover} = queryAPI<Livro>("/livros")
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => remover(id),
        onSuccess: () => Promise.all(
            [queryClient.invalidateQueries({queryKey: ["livros"], refetchType: "all"}),
                queryClient.invalidateQueries({queryKey: ["carrinhos"], refetchType: "all"}),]
        ),
        onError: (error: CustomError) => {
            return error
        }
    });
}

export default RemoverLivro;