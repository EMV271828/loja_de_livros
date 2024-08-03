import Livro from "../../interfaces/livro.ts";
import queryAPI from "../queryAPI.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import CustomError from "../../utils/customError.ts";


const CadastrarLivro = () => {
    const {cadastrar} = queryAPI<Livro>("/livros");

    const queryClient = useQueryClient();


    return useMutation(
        {
            mutationFn: (livro: Livro) => cadastrar(livro),
            onSuccess: () => queryClient.invalidateQueries(
                {
                    queryKey: ["livros"]
                }
            ), onError: (error: CustomError) => {
                return error
            }
        }
    );
}

export default CadastrarLivro;