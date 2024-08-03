import Autor from "../../interfaces/autor.ts";
// import livro_imagem from "../../assets/livro_imagem.jpg";
import {ReactNode} from "react";
import {Link} from "react-router-dom";
import Livro from "../../interfaces/livro.ts";

interface Props {
    id?: number;
    titulo: string;
    imagem: string;
    preco: string;
    autores: Autor[];
    dados: Livro;
    footer: ReactNode
}
const CardLivro = ({id, titulo, imagem, preco, autores, dados, footer}: Props) =>{

    return(
        <div className={"card h-100 border-0"}>
            <img src={imagem} className="card-img-top" alt={titulo} height={180}/>
            <div className="card-body">
                <Link to={`/detalhes-livros-admin/${id}`} state={dados}>
                    <h5 className="card-title">{titulo}</h5>
                </Link>
                <p className="card-text fw-bold" style={{color: "rgb(220, 53, 69)"}}>R$ {preco}</p>
                <p className="card-text">{`Por ${autores.map((a) => a.nome).join(", ")}`}</p>
            </div>
            <div className="card-footer border-0 p-0">{footer}</div>
        </div>
    )
}

export default CardLivro
