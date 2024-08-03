import {useLocation, useNavigate} from "react-router-dom";
import Autor from "../interfaces/autor.ts";
import RemoverLivro from "../hooks/livros/RemoverLivro.tsx";
import {useState} from "react";
import dayjs from "dayjs";
import LivroEdicaoGenero from "../utils/LivroEdicaoGenero.tsx";

const DetalhesLivroPage = () => {

    const {state} = useLocation();

    const navigate = useNavigate();

    const [processoRemocao, setProcessoRemocao] = useState(0);

    const [sucessoRemocao, setSucessoRemocao] = useState(0);

    const {mutate: removerLivro, error: erroRemoverLivro} = RemoverLivro();

    const setLivroSelecionado = LivroEdicaoGenero((s) => s.setLivroSelecionado);

    const conteudoBotaoRemover = () => {
        if (processoRemocao === 1) return <div className="spinner-border" role="status"></div>
        return "Remover"
    }

    const irParaEdicaoDeLivro = () => {
        setLivroSelecionado(state);
        navigate(`/detalhes-livros-admin/${state.id}/editar`)
    }

    const remocaoDeLivro = (id: number) => {
        setProcessoRemocao(1);
        setTimeout(() => {
            removerLivro(id, {
                onSuccess: () => {
                    setSucessoRemocao(1)
                    setProcessoRemocao(-1)
                }, onError: () => {
                    setSucessoRemocao(-1)
                    setProcessoRemocao(-1)
                }
            })
        }, 2000)
    }

    return (
        <>
            {
                sucessoRemocao === 1 &&
                <div className={"alert alert-success d-flex justify-content-between"} role={"alert"}>
                    <div className={"fw-bold"}>
                        Remoção feita com sucesso!
                    </div>
                    <div>
                        <button className={"btn-close"} onClick={() => setSucessoRemocao(0)}></button>
                    </div>
                </div>
            }
            {
                sucessoRemocao === -1 &&
                <div className={"alert alert-danger d-flex justify-content-between"} role={"alert"}>
                    {erroRemoverLivro &&
                        <div className={"fw-bold"}>
                            {erroRemoverLivro.message !== undefined ?
                                `Houve um problema na remoção! ${erroRemoverLivro.message}. ` : ""}
                            {erroRemoverLivro.errorCode !== undefined ?
                                `Código do erro: ${erroRemoverLivro.errorCode}` : ""}
                        </div>
                    }
                    <div>
                        <button className={"btn-close"} onClick={() => setSucessoRemocao(0)}></button>
                    </div>
                </div>
            }
            <div className={"fw-bold fs-3 mx-4 mt-3"}>Detalhes do Livro</div>
            <hr className={"border-4 w-100"}/>
            <div className={"d-flex"}>
                <div className={"mx-3"}>
                    <img src={"/" + state.imagem} alt={state.titulo} width={350} height={350}/>
                </div>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Título</div>
                        <div className={"col-9 fs-5"}>{state.titulo}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Gênero</div>
                        <div className={"col-9 fs-5"}>{state.genero.nome}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Preço</div>
                        <div className={"col-9 fs-5"}>R$ {state.preco.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        })}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Páginas</div>
                        <div className={"col-9 fs-5"}>{state.paginas}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Quantidade</div>
                        <div className={"col-9 fs-5"}>{state.quantidade}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Disponível?</div>
                        <div className={"col-9 fs-5"}>{state.disponivel ? "Sim" : "Não"}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Autores</div>
                        <div className={"col-9 fs-5"}>
                            Por {state.autores.map((autor: Autor) => autor.nome).join(", ")}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col fw-bold fs-5 mb-3"}>Data de cadastro</div>
                        <div className={"col-9 fs-5"}>{dayjs(state.data).format("DD/MM/YYYY")}</div>
                    </div>
                </div>
            </div>
            <div className={"d-flex mt-3"}>
                <div className={`btn btn-primary w-25 mx-5 ${processoRemocao !== -1 ? "" : "disabled"}`}
                     onClick={() => irParaEdicaoDeLivro()}>
                    Editar
                </div>
                <div className={`btn btn-danger w-25 ${processoRemocao !== -1 ? "" : "disabled"}`}
                     onClick={() => remocaoDeLivro(state.id)}>
                    {conteudoBotaoRemover()}
                </div>
            </div>
            <div className={"mt-3 p-5"}>
                <div className={"btn btn-warning w-100"} onClick={() => navigate("/livros-por-genero")}>Retornar
                </div>
            </div>
        </>
    )
}

export default DetalhesLivroPage;