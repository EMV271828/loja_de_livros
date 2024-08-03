import { useMutation } from "@tanstack/react-query";
import Usuario from "../interfaces/usuario.ts";
import autenticacaoAPI from "./autenticacaoAPI.ts";

const EfetuarLogin = () => {
    const { login } = autenticacaoAPI();

    return useMutation({
        mutationFn: (usuario: Usuario) => login(usuario)
    });
};

export default EfetuarLogin;