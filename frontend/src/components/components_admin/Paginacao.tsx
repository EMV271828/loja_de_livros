import useLivroTabelado from "../../utils/LivroTabelado.ts";
import CarregarLivrosPaginado from "../components_lista_de_livros/CarregarLivrosPaginado.tsx";


const Paginacao = () => {

    const pagina = useLivroTabelado(s => s.pagina);
    const tamanho = useLivroTabelado(s => s.tamanho);
    const titulo = useLivroTabelado(s => s.titulo);
    const setPagina = useLivroTabelado(s => s.setPagina);

    const tratarPaginacao = (pagina: number) => {
        setPagina(pagina);
    };

    const [, totalDePaginas] = CarregarLivrosPaginado(pagina, tamanho, titulo);

    const arrayDePaginas = []

    for (let i = 0; i < totalDePaginas; i++) {
        arrayDePaginas.push(
            <li key={i} className="page-item">
                <button
                    type={"button"}
                    onClick={() => tratarPaginacao(i)}
                    className={pagina === i ? "page-link active" : "page-link"}
                    // href="#"
                >
                    {i + 1}
                </button>
            </li>
        )
    }

    if (totalDePaginas < 2) return null

    return (
        <>
            <nav aria-label="Paginação">
                <ul className="pagination">
                    <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
                        <button type={"button"} onClick={() => tratarPaginacao(pagina - 1)} className="page-link">
                            Anterior
                        </button>
                    </li>
                    {arrayDePaginas}
                    <li className={pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"}>
                        <button type={"button"} onClick={() => tratarPaginacao(pagina + 1)} className="page-link">
                            Próxima
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Paginacao