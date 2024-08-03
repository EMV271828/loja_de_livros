import livro from "./livro.ts";

interface Item{
    id?: number,
    quantidade: number,
    livro?: livro,
    carrinhoId?: number,
    livroId?: number
}

export default Item;