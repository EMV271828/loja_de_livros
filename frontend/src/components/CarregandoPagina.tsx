import {spinnerBorderSize} from "../utils/CustomStyles.ts";

const CarregandoPagina = () =>{
    return (
        <div className={"d-flex flex-column align-items-center mt-5"}>
            <div className="spinner-border" role="status" style={spinnerBorderSize}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <h4>Carregando...</h4>
        </div>
    )
}

export default CarregandoPagina

