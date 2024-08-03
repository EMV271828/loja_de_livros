import axios, {AxiosRequestConfig} from "axios";
import Carrinho from "../../interfaces/carrinho.ts";
import customError from "../../utils/customError.ts";
import CustomError from "../../utils/customError.ts";
import Item from "../../interfaces/item.ts";

const queryAPICarrinho = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080"
    });

    const recuperarCarrinhoPorIdDoUsuario = (id: number) => axiosInstance
        .get<Carrinho>("carrinhos/" + id)
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


    const removerItemComUsuarioId = (id: number, config: AxiosRequestConfig) => axiosInstance
        .delete<Item>("itens" + "/" + id, config)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                throw new CustomError(error.response.data.message, error.response.data.errorCode)
                // significa servidor respondeu
            } else if (error.request) {
                throw error;
                // significa que o servidor não respondeu
            } else {
                throw error;
                // erro desconhecido
            }
        })

    const criarItemDoCarrinho = (config: AxiosRequestConfig) => axiosInstance
        .post<Item>("itens", config)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                throw new CustomError(error.response.data.message, error.response.data.errorCode)
                // significa servidor respondeu
            } else if (error.request) {
                throw error;
                // significa que o servidor não respondeu
            } else {
                throw error;
                // erro desconhecido
            }
        })


    return {recuperarCarrinhoPorIdDoUsuario, removerItemComUsuarioId, criarItemDoCarrinho}
}

export default queryAPICarrinho;