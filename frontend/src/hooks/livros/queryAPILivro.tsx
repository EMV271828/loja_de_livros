import axios, {AxiosRequestConfig} from "axios";
import customError from "../../utils/customError.ts";
import Livro from "../../interfaces/livro.ts";
import CustomError from "../../utils/customError.ts";

const queryAPILivro = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080"
    });

    const recuperarLivrosPorSlugDoGenero = (slug?: string) => axiosInstance
        .get<Livro[]>("livros" + (slug ? "/slugLivro/" + slug : ""))
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                throw new customError(
                    error.response.data.message,
                    error.response.data.errorCode);
                // significa servidor respondeu
            } else if (error.request) {
                throw error;
                // significa que o servidor não respondeu
            } else {
                throw error;
                // erro desconhecido
            }
        })

    const recuperarLivrosPaginadosPorSlugDoGenero = (config: AxiosRequestConfig) =>
        axiosInstance
            .get<ResultadoPaginado<Livro>>("livros" + "/genero/paginacao", config)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    throw new CustomError(error.response.data.message, error.response.data.errorCode);
                    // significa servidor respondeu
                } else if (error.request) {
                    throw error;
                    // significa que o servidor não respondeu
                } else {
                    throw error;
                    // erro desconhecido
                }
            });

    const recuperarLivrosAleatorio = () => axiosInstance
        .get<Livro[]>("livros" + "/aleatorio")
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                throw new CustomError(error.response.data.message, error.response.data.errorCode);
                // significa servidor respondeu
            } else if (error.request) {
                throw error;
                // significa que o servidor não respondeu
            } else {
                throw error;
                // erro desconhecido
            }
        });

    return {recuperarLivrosPorSlugDoGenero, recuperarLivrosPaginadosPorSlugDoGenero, recuperarLivrosAleatorio}
}

export default queryAPILivro;