// import autenticacaoUsuario from "../utils/autenticacaoUsuario.ts";
import Item from "../interfaces/item.ts";
// import imagem_livro from "../assets/livro_imagem.jpg";
import {useEffect, useRef} from "react";
import buscaCarrinhoPorIdDoUser from "../hooks/carrinho/BuscaCarrinhoPorIdDoUser.tsx";
import CarregandoPagina from "./CarregandoPagina.tsx";
import AlterarItemDoCarrinho from "../hooks/carrinho/AlterarItemDoCarrinho.tsx";
import RemoverItemDoCarrinho from "../hooks/carrinho/RemoverItemDoCarrinho.tsx";
import item from "../interfaces/item.ts";
import autenticacaoUsuario from "../utils/autenticacaoUsuario.ts";
import Carrinho from "../interfaces/carrinho.ts";
import {Link} from "react-router-dom";

const TabelaDeCompras = () => {

    const refs: React.MutableRefObject<HTMLInputElement[]> = useRef([]);

    const {mutate: alterarItem} =
        AlterarItemDoCarrinho(JSON.parse(localStorage.getItem("session")!)["usuarioId"]);

    const {mutate: removerItem} =
        RemoverItemDoCarrinho(JSON.parse(localStorage.getItem("session")!)["usuarioId"]);

    const setCarrinho = autenticacaoUsuario((s)=> s.setCarrinho)


    const remocaoDeItem = (itemSelecionado: item) => {
        removerItem(itemSelecionado.id!)
    }

    const {
        data: resultadoCarrinho,
        isPending: carregandoCarrinho,
        error: erroCarrinho
    } = buscaCarrinhoPorIdDoUser(JSON.parse(localStorage.getItem("session")!)["usuarioId"])

    useEffect(() => {
        setCarrinho(resultadoCarrinho || {} as Carrinho)
    }, [remocaoDeItem,alterarItem]);


    if (carregandoCarrinho) return <CarregandoPagina/>

    if (erroCarrinho) throw erroCarrinho;

    if (!resultadoCarrinho) {
        return (
            <div>
                <div className={"m-5"}>
                    <div className={"fs-5 fw-bold"}>
                        Adicione compras através da opção Livros por Gênero ou buscando por um livro.
                    </div>
                </div>
            </div>
        )
    }

    const alterarValor = (index: number, itemSelecionado: Item) => {

        if (parseInt(refs.current[index]!.value) === 0) {
            removerItem(itemSelecionado.id!)

        } else if (parseInt(refs.current[index]!.value) <= resultadoCarrinho.itens[index].livro!.quantidade) {
            itemSelecionado.quantidade = parseInt(refs.current[index]!.value);
            alterarItem(itemSelecionado);

        } else {
            refs.current[index]!.value = resultadoCarrinho.itens[index].livro!.quantidade.toString()
        }

    }

    return (
        <>
            <table className={"table table-bordered table-hover"}>
                <thead>
                <tr>
                    <th className="align-middle text-center">
                        Nome do Livro
                    </th>
                    <th className="align-middle text-center">
                        Imagem
                    </th>
                    <th className="align-middle text-center">
                        Quantidade
                    </th>
                    <th className="align-middle text-center">
                        Preço
                    </th>
                    <th className="align-middle text-center">
                        Ação
                    </th>
                </tr>
                </thead>
                <tbody>
                {resultadoCarrinho.itens.map((item: Item, index: number) => {
                        return (<tr key={item.id}>
                            <td width="10%" className="align-middle text-center">
                                <Link to={`/livro-informacao`} state={item.livro}>
                                    <h5 className="card-title">{item.livro!.titulo}</h5>
                                </Link>
                            </td>
                            <td width="10%" className="align-middle text-center">
                                <img src={item.livro!.imagem} width={90} alt={""}/>
                            </td>
                            <td width="10%" className="align-middle text-center">
                                <input defaultValue={item.quantidade}
                                       ref={(ref: HTMLInputElement) => refs.current[index] = ref}
                                       className={"w-25 form"} type={"number"}
                                       step={"1"}
                                       onKeyDown={(event) => {
                                           event.preventDefault();
                                       }}
                                       max={item.livro!.quantidade}
                                       min={"0"}
                                       onChange={() => {
                                           alterarValor(index, item)
                                       }}
                                />
                            </td>
                            <td width="10%" className="align-middle text-center">
                                R$ {item.livro!.preco.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                useGrouping: true,
                            })}
                            </td>
                            <td width="10%" className="align-middle text-center">
                                <div className={"btn btn-danger"}
                                     onClick={() => remocaoDeItem(item)}
                                >
                                    <i className={"bi bi-trash-fill"}></i>
                                    Remover
                                </div>
                            </td>
                        </tr>)
                    }
                )}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={3}></td>
                    <td className="align-middle text-center fw-bold">Total do Carrinho...</td>
                    <td className="align-middle text-center fw-bold" colSpan={3}>
                        R${" "}
                        {resultadoCarrinho.itens
                            .reduce((total, item) => total + item.quantidade * item.livro!.preco, 0)
                            .toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                useGrouping: true,
                            })}
                    </td>
                </tr>
                </tfoot>
            </table>

            <div className={"d-flex justify-content-center"}>
                <div className={"btn mt-5 btn-warning w-75"}>Fechar Compra</div>
            </div>


        </>
    )
}

export default TabelaDeCompras;