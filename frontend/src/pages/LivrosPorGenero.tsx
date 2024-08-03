import {NavLink, Outlet} from "react-router-dom";

const LivrosPorGenero = () => {
    return (
        <>
            <div className={"d-flex mt-3"}>
                <div className={"mx-5 mt-3 w-25"}>
                    <h5>Gêneros</h5>
                    <div className="nav flex-column nav-pills">
                        <NavLink aria-current="page" className="nav-link" to="/livros-por-genero/" end>
                            Todos
                        </NavLink>
                        <NavLink aria-current="page" className="nav-link" to="ação">
                            Ação
                        </NavLink>
                        <NavLink aria-current="page" className="nav-link" to="terror">
                            Terror
                        </NavLink>
                        <NavLink aria-current="page" className="nav-link" to="fantasia">
                            Fantasia
                        </NavLink>
                    </div>
                </div>
                <div className={"mx-3 w-100"}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default LivrosPorGenero;


// TODO melhorar a cara desta pagina