// import autenticacaoUsuario from "../utils/autenticacaoUsuario.ts";
// import LivroInformacaoLogado from "../components/LivroInformacao/LivroInformacaoLogado.tsx";
import LivroInformacaoNaoLogado from "../components/LivroInformacao/LivroInformacaoNaoLogado.tsx";

const LivroInformacaoPage = () => {
    // const usuario = autenticacaoUsuario(s => s.usuarioLogado);

    // if (usuario.length > 0) return <LivroInformacaoLogado/>

    return <LivroInformacaoNaoLogado/>
}

export default LivroInformacaoPage;