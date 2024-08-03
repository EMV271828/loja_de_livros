import Autor from "./autor.ts"
import Genero from "./genero.ts";
import Item from "./item.ts";


interface Livro {
    id?: number,
    titulo: string,
    imagem: string,
    genero: Genero,
    preco: number,
    data: Date,
    paginas: number,
    editora: string,
    idioma: string,
    quantidade: number,
    disponivel: boolean,
    itens?: Array<Item>,
    autores: Array<Autor>
}

export default Livro