import Item from "./item.ts";

interface Carrinho{
    id?: number,
    data: Date,
    itens: Array<Item>
}

export default Carrinho