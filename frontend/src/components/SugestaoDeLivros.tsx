import buscaPorLivrosAleatorio from "../hooks/livros/BuscaPorLivrosAleatorio.tsx";
import CarregandoPagina from "./CarregandoPagina.tsx";
import Livro from "../interfaces/livro.ts";
// import livro_imagem from "../assets/livro_imagem.jpg";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import {cardListaLivroSize, imageLivro} from "../utils/CustomStyles.ts";
import {Link} from "react-router-dom";


const SugestaoDeLivros = () => {
    const {
        data: livros,
        isPending: livrosPending,
        error: errorBusca
    } = buscaPorLivrosAleatorio();

    if (livrosPending) return <CarregandoPagina/>;
    if (errorBusca) throw errorBusca;

    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    return (

        <Carousel responsive={responsive} showDots={true}>
            {livros.map((livro: Livro) => (
                <div className={"card border-0"} style={cardListaLivroSize} key={livro.id}>
                    <img src={livro.imagem} className="card-img-top" alt={livro.titulo} style={imageLivro}/>
                    <div className="card-body">
                        <Link to={`/livro-informacao`} state={livro}>
                            <h5 className="card-title">{livro.titulo}</h5>
                        </Link>
                        <p className="card-text fw-bold"
                           style={{color: "rgb(220, 53, 69)"}}>R$ {livro.preco.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        })}</p>
                        <p className="card-text">{`Por ${livro.autores.map((a) => a.nome).join(", ")}`}</p>
                    </div>
                </div>
            ))}
        </Carousel>

    )
}


export default SugestaoDeLivros;