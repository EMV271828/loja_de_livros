import {Link} from "react-router-dom";

const PaginaCadastro = () =>{
    return(
        <>
            <div className="d-flex justify-content-center w-100 mt-5">
                <div className="d-flex w-25 p-5 flex-column border-1 rounded border border-secondary">
                    <h2 className="mb-3">
                        Criar Conta
                    </h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Seu Nome</label>
                        <input type="email" className="form-control m-2" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Seu nome e sobrenome"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Seu email ou número de
                            celular</label>
                        <input type="email" className="form-control m-2" id="exampleInputName"
                               aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Sua Senha</label>
                        <input type="password" className="form-control m-2" id="exampleInputSenha"
                               aria-describedby="emailHelp"
                               placeholder="Pelo menos seis caracteres"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Repita sua senha</label>
                        <input type="password" className="form-control m-2" id="exampleInputSenhaDeNovo"
                               aria-describedby="emailHelp"
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-warning m-2 w-100">Cadastrar</button>
                    </div>

                    <hr className="border-2"/>

                    <div>
                        Já tem uma conta?
                        <Link to={`/login`}>
                            Fazer login
                        </Link>
                    </div>

                </div>

            </div>
        </>
    )
}

export default PaginaCadastro

// TODO adicionar logica de cadastro
