import axios, {AxiosRequestConfig} from "axios";
import CustomError from "../utils/customError.ts";

const queryAPI = <T>(endpoint: string) => {

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080"
    })

    const recuperar = () => axiosInstance
        .get<T[]>(endpoint)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                throw new CustomError(
                    error.response.data.message, error.response.data.errorCode);
                // significa servidor respondeu
            } else if (error.request) {
                throw error;
                // significa que o servidor não respondeu
            } else {
                throw error;
                // erro desconhecido
            }
        })

    const remover = (id: number) => axiosInstance
        .delete<T>(endpoint + "/" + id)
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

    const queryLivroPaginado = (config: AxiosRequestConfig) => axiosInstance
        .get<ResultadoPaginado<T>>(endpoint + "/paginado", config)
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

    const queryLivroPaginadoOrdenado = (config: AxiosRequestConfig) => axiosInstance
        .get<ResultadoPaginado<T>>(endpoint + "/paginacaoOrdenada", config)
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

    const cadastrar = (obj: T) => axiosInstance
        .post<T>(endpoint, obj)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                if (error.response.data.errorCode === 422) {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode,
                        Object.values(error.response.data.map));
                }
                else {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode);
                }
            }
            else if(error.request) {
                throw error;
            }
            else {
                throw error;
            }
        })

    const alterar = (obj: T) => axiosInstance
        .put<T>(endpoint, obj)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                // significa servidor respondeu
                if (error.response.data.errorCode === 422) {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode,
                        Object.values(error.response.data.map));
                }
                else {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode);
                }
            }
            else if(error.request) {
                throw error;
                // significa que o servidor não respondeu
            }
            else {
                throw error;
                // erro desconhecido
            }
        })

    return {remover, queryLivroPaginado, cadastrar, recuperar, alterar, queryLivroPaginadoOrdenado}
}

export default queryAPI