import CustomError from "../utils/customError.ts";
import axios from "axios";
import Usuario from "../interfaces/usuario.ts";
import RetornoDoLogin from "../interfaces/RetornoDoLogin.ts";

const useAPIAutenticacao = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080"
    });

    // Envia um Usuario com conta e senha e recebe de volta um Token
    const login = (usuario: Usuario) =>
        axiosInstance
            .post<RetornoDoLogin>("/autenticacao" + "/login", usuario)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro

                    if (error.response.data.errorCode === 422) {
                        throw new CustomError(
                            error.response.data.message,
                            error.response.data.errorCode,
                            Object.values(error.response.data.map)
                        );
                    }

                    // console.log("Vai instanciar um CustomError (message, errorCode)",
                    // error.response.data.message,
                    // error.response.data.errorCode);

                    throw new CustomError(error.response.data.message, error.response.data.errorCode);
                } else if (error.request) {
                    // significa que a requisição foi enviada mas o servidor não respondeu
                    throw error;
                } else {
                    // erro desconhecido
                    throw error;
                }
            });

    return { login };
};

export default useAPIAutenticacao;