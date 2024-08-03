import Livro from "../../interfaces/livro.ts";
// import livro_imagem from "../../assets/livro_imagem.jpg";
import Item from "../../interfaces/item.ts";
import Carrinho from "../../interfaces/carrinho.ts";
import autenticacaoUsuario from "../../utils/autenticacaoUsuario.ts";
import {cardListaLivroSize, imageLivro} from "../../utils/CustomStyles.ts";


const ListaDeLivros = (props: {
    livros: Livro[],
    carrinho?: Carrinho,
    refs?: React.MutableRefObject<HTMLInputElement[]>,
    alterarValor?: (index: number, livro: Livro, operator: number) => void,
    adicionarItemAoCarrinho?: (livro: Livro) => void
}) => {

    const listaDeLivros = [];
    const usuario = autenticacaoUsuario(s => s.usuarioLogado);


    for (let i = 0; i < props.livros.length; i++) {
        listaDeLivros.push(
            <div className={"card border-0 m-4"} style={cardListaLivroSize}>
                <img src={props.livros[i].imagem} className="card-img-top" alt={props.livros[i].titulo}
                     style={imageLivro}/>
                <div className="card-body">
                    <h5 className="card-title">{props.livros[i].titulo}</h5>
                    <p className="card-text fw-bold"
                       style={{color: "rgb(220, 53, 69)"}}>R$ {props.livros[i].preco}</p>
                    <p className="card-text">{`Por ${props.livros[i].autores.map((a) => a.nome).join(", ")}`}</p>
                </div>

                {usuario.length > 0 &&
                    <div className="card-footer border-0 p-0">
                        {
                            Object.keys(props.carrinho!).length !== 0 && props.livros[i].itens !== undefined
                            && props.livros[i].itens!.length > 0 ?
                                <div className="container">
                                    <div className="row">
                                        <div className="col col-lg-4 btn btn-sm
                                                    btn-warning border border-dark fw-bold"
                                             onClick={() => props.alterarValor!(i, props.livros[i], -1)}
                                        >
                                            -
                                        </div>
                                        <div
                                            className="col btn btn-sm btn-warning rounded-0 text-center"
                                            ref={(ref: HTMLDivElement) =>
                                                props.refs!.current[i] = ref as HTMLInputElement}
                                        >
                                            {props.livros[i].itens?.filter((item: Item) =>
                                                item.carrinhoId === props.carrinho!.id)[0].quantidade}
                                        </div>
                                        <div className="col col-lg-4 btn btn-sm btn-warning border
                                                         border-dark fw-bold"
                                             onClick={() => props.alterarValor!(i, props.livros[i], +1)}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                :
                                <input type="button"
                                       className="btn btn-warning    btn-sm w-100"
                                       value="Comprar"
                                       onClick={() => props.adicionarItemAoCarrinho!(props.livros[i])}
                                />
                        }
                    </div>
                }
            </div>
        )

    }

    return (
        <>
            <div className={"fw-bold fs-3 mt-5 mx-3"}>
                Resultados
            </div>
            {/* lista de items */}
            <div className={"d-flex justify-content-center mx-5 px-5"}>
                {listaDeLivros}
            </div>
        </>
    )
}

export default ListaDeLivros