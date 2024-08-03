import {create} from "zustand";
import {persist} from "zustand/middleware";
import Carrinho from "../interfaces/carrinho.ts";
import retornoDoLogin from "../interfaces/RetornoDoLogin.ts";

interface Usuario {
    usuarioLogado: string;
    tentouLogar: boolean;
    carrinho: Carrinho;

    setUsuarioLogOut: () => void;
    setUsuarioLogado: (conta: string, infoLogin: retornoDoLogin) => void;
    setCarrinho: (carrinho: Carrinho) => void;
    setTentouLogar: (valor: boolean) => void;
}

const autenticacaoUsuario = create(persist<Usuario>((set) => ({
    usuarioLogado: "",
    tentouLogar: false,
    carrinho: {} as Carrinho,

    setUsuarioLogado: (conta: string, infoLogin: retornoDoLogin) => {
        localStorage.setItem("session", JSON.stringify({
                token: infoLogin.tokenResponse.token,
                conta: conta,
                usuarioId: infoLogin.usuarioId,
            }
        ))
        set(() => ({usuarioLogado: conta}))
        set(() => ({carrinho: infoLogin.carrinho || {} as Carrinho}))
    },

    setUsuarioLogOut: () => {
        set(() => ({usuarioLogado: ""}))
        set(() => ({carrinho: {} as Carrinho}))
        localStorage.clear();
    },

    setCarrinho: (carrinho: Carrinho) => set(() => ({carrinho: carrinho})),

    setTentouLogar: (log: boolean) => set(() => ({tentouLogar: log})),


}), {name: "userSession"}));

export default autenticacaoUsuario