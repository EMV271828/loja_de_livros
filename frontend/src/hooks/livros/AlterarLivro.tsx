import { useMutation, useQueryClient } from "@tanstack/react-query";
import Livro from "../../interfaces/livro.ts";
import queryAPI from "../queryAPI.ts";
import CustomError from "../../utils/customError.ts";

const AlterarLivro = () => {
    const {alterar} = queryAPI<Livro>("/livros");

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (livro: Livro) => alterar(livro),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["livros"],
            }),
        onError: (error: CustomError)=>{
            return error;
        }
    });
};
export default AlterarLivro;
