import TabelaDeCompras from "../components/TabelaDeCompras.tsx";

const CarrinhoDeComprasPage = () => {

    return (
        <>
            <div className={"mt-5 p-3"}>
                <h4>Minhas Compras</h4>
                <hr className={"mt-2 border-4 w-100"}/>
                <TabelaDeCompras/>
            </div>

        </>
    )
}

export default CarrinhoDeComprasPage;