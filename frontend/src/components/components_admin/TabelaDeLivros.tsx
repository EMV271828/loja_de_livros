import dayjs from "dayjs";
// import imagem_livro from "../../assets/livro_imagem.jpg";
import {useState} from "react";
import useLivroTabelado from "../../utils/LivroTabelado.ts";
import RemoverLivro from "../../hooks/livros/RemoverLivro.tsx";
import Livro from "../../interfaces/livro.ts";
import CarregandoPagina from "../CarregandoPagina.tsx";
import CarregarLivrosPaginacaoOrdenada from "./CarregarLivrosPaginacaoOrdenada.tsx";
import {imageLivroTabela} from "../../utils/CustomStyles.ts";

const TabelaDeLivros = () => {

    const pagina = useLivroTabelado(s => s.pagina);
    const tamanho = useLivroTabelado(s => s.tamanho);
    const titulo = useLivroTabelado(s => s.titulo);
    const coluna = useLivroTabelado(s => s.coluna);
    const ordem = useLivroTabelado(s => s.ordem);
    const setPagina = useLivroTabelado(s => s.setPagina);
    const setColuna = useLivroTabelado(s => s.setColuna);
    const setOrdem = useLivroTabelado(s => s.setOrdem);
    const setLivroSelecionado = useLivroTabelado(s => s.setLivroSelecioando)
    const setRemocao = useLivroTabelado(s => s.setstatusRemocao);


    const [botaoState, setBotaoState] = useState(0);

    const conteudoBotao = (simbolo: string, titulo: string, id: number) => {
        if (botaoState === id && titulo === "Excluir") {
            return (
                <div className="spinner-border" role="status"></div>
            )
        }

        return (
            <div>
                <i className={simbolo}></i> {titulo}
            </div>
        )

    }

    const handleColunaSelecionada = (key: string) => {
        if (coluna === key && ordem === "asc") {
            setColuna(key)
            setOrdem("desc")
        } else {
            setColuna(key)
            setOrdem("asc")

        }
    }

    const headArrow = (key: string) => {
        if (key === coluna) {

            if (ordem === "desc") {
                return (
                    <div className={"col p-0 d-flex flex-column"}>
                        <i className="bi bi-caret-up-fill h-25 text-white"></i>
                        <i className="bi bi-caret-down-fill"></i>
                    </div>

                )
            } else {
                return (
                    <div className={"col p-0 d-flex flex-column"}>
                        <i className="bi bi-caret-up-fill h-25"></i>
                        <i className="bi bi-caret-down-fill text-white"></i>
                    </div>
                )
            }
        }

        return (
            <div className={"col p-0 d-flex flex-column"}>
                <i className="bi bi-caret-up-fill h-25"></i>
                <i className="bi bi-caret-down-fill"></i>
            </div>
        )
    }

    const {mutate: removerLivro} = RemoverLivro();

    const excluirLivro = (id: number) => {
        setBotaoState(id);
        setTimeout(()=>{
            scroll(0,0);
            setPagina(0);
            removerLivro(id,{
                onSuccess: () =>{
                    setRemocao(1);
                }, onError: () => {
                    setRemocao(-1);
                }
            });
            setBotaoState(0)
        },2000);
    }

    const [livros, , status] = CarregarLivrosPaginacaoOrdenada(pagina, tamanho, titulo, coluna, ordem)


    if (livros.length === 0 && status === 0) {
        return <CarregandoPagina/>
    }

    if (livros.length === 0 && titulo !== "") {
        return (
            <div className={"d-flex align-items-center"}>
                <div className={"fs-4 fw-bold"}>
                    Não há livros registrados com este título
                </div>
            </div>
        )
    }

    if (livros.length === 0) {
        return (
            <div className={"d-flex align-items-center"}>
                <div className={"fs-4 fw-bold"}>
                    Não há livros registrados
                </div>
            </div>
        )
    }

    return (
        <div>
            <table className={"table table-bordered table-hover"} >
                <thead>
                <tr>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("id")}>
                        <div className={"row"}>
                            <div className={"col p-0 m-0"}>
                                Id
                            </div>
                            {headArrow("id")}
                        </div>
                    </th>
                    <th className="align-middle text-center">
                        Imagem
                    </th>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("titulo")}
                    >
                        <div className={"row"}>
                            <div className={"col p-0 m-0"}>
                                Título
                            </div>
                            {headArrow("titulo")}
                        </div>
                    </th>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("genero")}>
                        <div className={"row p-0 m-0"}>
                            <div className={"col p-0 m-0"}>
                                Gênero
                            </div>
                            {headArrow("genero")}
                        </div>
                    </th>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("editora")}>
                        <div className={"row p-0 m-0"}>
                            <div className={"col p-0 m-0"}>
                                Editora
                            </div>
                            {headArrow("editora")}
                        </div>
                    </th>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("data")}>
                        <div className={"row p-0 m-0"}>
                            <div className={"col p-0 m-0 fs-6"}>
                                Data de cadastro
                            </div>
                            {headArrow("data")}
                        </div>
                    </th>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("paginas")}>
                        <div className={"row p-0 m-0"}>
                            <div className={"col p-0 m-0"}>
                                Páginas
                            </div>
                            {headArrow("paginas")}
                        </div>
                    </th>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("idioma")}>
                        <div className={"row p-0 m-0"}>
                            <div className={"col p-0 m-0"}>
                                Idioma
                            </div>
                            {headArrow("idioma")}
                        </div>
                    </th>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("quantidade")}>
                        <div className={"row p-0 m-0"}>
                            <div className={"col p-0 m-0"}>
                                Quantidade
                            </div>
                            {headArrow("quantidade")}
                        </div>
                    </th>
                    <th className="align-middle text-center" onClick={() => handleColunaSelecionada("preco")}>
                        <div className={"row p-0 m-0"}>
                            <div className={"col p-0 m-0"}>
                                Preço
                            </div>
                            {headArrow("preco")}
                        </div>
                    </th>
                    <th className="align-middle text-center">
                        Ação
                    </th>
                </tr>
                </thead>
                <tbody>
                {livros.map((livro: Livro) => (
                    <tr key={livro.id}>
                        <td width="3%" className="align-middle text-center">
                            {livro.id}
                        </td>
                        <td width="10%" className="align-middle text-center">
                            <img src={livro.imagem} width={90} alt={""} style={imageLivroTabela}/>
                        </td>
                        <td width="5%" className="align-middle text-center">
                            {livro.titulo}
                        </td>
                        <td width="5%" className="align-middle text-center">
                            {livro.genero.nome}
                        </td>
                        <td width="4%" className="align-middle text-center">
                            {livro.editora}
                        </td>
                        <td width="4%" className="align-middle text-center">
                            {dayjs(livro.data).format("DD/MM/YYYY")}
                        </td>
                        <td width="4%" className="align-middle text-center">
                            {livro.paginas}
                        </td>
                        <td width="4%" className="align-middle text-center">
                            {livro.idioma}
                        </td>
                        <td width="5%" className="align-middle text-center">
                            {livro.quantidade.toLocaleString("pt-BR", {
                                useGrouping: true,
                            })}
                        </td>
                        <td width="4%" className="align-middle text-center">
                            R$ {livro.preco.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        })}
                        </td>
                        <td width="10%" className="align-middle text-center">
                            <div className={"d-flex justify-content-center"}>
                                <button id={`${livro.id}`}
                                        className={`btn btn-danger mx-2 ${botaoState === livro.id! ? "disabled" : ""}`}
                                        onClick={() => excluirLivro(livro.id!)}

                                >
                                    {conteudoBotao("bi bi-trash-fill", "Excluir", livro.id!)}
                                </button>
                                <button
                                    id={`${livro.id}`}
                                    className={"btn btn-primary"}
                                    onClick={() => setLivroSelecionado(livro)}

                                >
                                    <div>
                                        {conteudoBotao("bi bi-pencil-fill", "Editar", livro.id!)}
                                    </div>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={7}></td>
                    <td className="align-middle text-center fw-bold">Total...</td>
                    <td className="align-middle text-center fw-bold" colSpan={2}>
                        R${" "}
                        {livros
                            .reduce((total, livro) => total + livro.quantidade * livro.preco, 0)
                            .toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                useGrouping: true,
                            })}
                    </td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default TabelaDeLivros;
