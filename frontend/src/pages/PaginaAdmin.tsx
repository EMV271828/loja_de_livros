import TabelaDeLivros from "../components/components_admin/TabelaDeLivros.tsx";
import Paginacao from "../components/components_admin/Paginacao.tsx";
import CadastroDeLivrosForm from "../components/components_admin/CadastroDeLivrosForm.tsx";
import BuscaAdmin from "../components/components_admin/BuscaAdmin.tsx";


const PaginaAdmin = () => {

    return (
        <div className={"m-5 d-flex flex-column"}>
            <CadastroDeLivrosForm/>
            <h4>Lista de Livros</h4>
            <hr className={"mt-2 border-4 w-100"}/>
            <BuscaAdmin/>
            <TabelaDeLivros/>
            <Paginacao/>
        </div>

    )

}

export default PaginaAdmin