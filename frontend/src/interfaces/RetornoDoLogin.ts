import tokenResponse from "./tokenResponse.ts";
import Carrinho from "./carrinho.ts";

interface RetornoDoLogin{
    tokenResponse: tokenResponse;
    usuarioId: number;
    carrinho: Carrinho;
}

export default RetornoDoLogin;