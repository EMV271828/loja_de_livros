import autenticacaoUsuario from "../utils/autenticacaoUsuario.ts";
import ListaDeLivrosNaoLogado from "../components/components_lista_de_livros/ListaDeLivrosNaoLogado.tsx";
import ListaDeLivrosLogado from "../components/components_lista_de_livros/ListaDeLivrosLogado.tsx";

const ListaDeLivrosPage = () => {

    const usuario = autenticacaoUsuario(s => s.usuarioLogado);

    if (usuario.length > 0) {
        return <ListaDeLivrosLogado/>
    }

    return <ListaDeLivrosNaoLogado/>

}

export default ListaDeLivrosPage
