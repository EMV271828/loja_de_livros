import AutoresQuery from "../../hooks/livros/AutoresQuery.tsx";

const CarregarAutores = () => {

    const {
        data: autores,
        isPending: carregandoAutores,
        error: errorAutores
    } = AutoresQuery();

    if (carregandoAutores) {
        return [{id: 0, nome: "carregando...", descricao: ""}]
    }

    if (errorAutores) throw errorAutores;

    return autores;
}

export default CarregarAutores;