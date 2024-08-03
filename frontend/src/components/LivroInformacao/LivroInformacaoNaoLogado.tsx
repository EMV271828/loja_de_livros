import Autor from "../../interfaces/autor.ts";
import dayjs from "dayjs";
import {useLocation, useNavigate} from "react-router-dom";

const LivroInformacaoNaoLogado = () => {

    const navigate = useNavigate();

    const {state} = useLocation()

    return (
        <>
            <div className={"fw-bold fs-3 mx-4 mt-3"}>Informações do Livro</div>
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
            <div className={"mt-3 p-5"}>
                <div className={"btn btn-warning w-100"} onClick={() => navigate(-1)}>Retornar
                </div>
            </div>
        </>
    )
}

export default LivroInformacaoNaoLogado;