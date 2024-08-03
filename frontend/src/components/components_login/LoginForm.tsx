import {z} from "zod";
import {useLocation, useNavigate} from "react-router-dom";
import autenticacaoUsuario from "../../utils/autenticacaoUsuario.ts";
import EfetuarLogin from "../../hooks/EfetuarLogin.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import Usuario from "../../interfaces/usuario.ts";
import RetornoDoLogin from "../../interfaces/RetornoDoLogin.ts";

const schema = z.object({
    conta: z.string().min(1, {message: "A conta deve ser informada."}),
    senha: z.string().min(1, {message: "A senha deve ser informada."}),
});

type FormLogin = z.infer<typeof schema>;


const LoginForm = () => {
    const setUsuarioLogado = autenticacaoUsuario((s) => s.setUsuarioLogado);
    const setTentouLogar = autenticacaoUsuario((s) => s.setTentouLogar);
    const tentouLogar = autenticacaoUsuario((s) => s.tentouLogar);

    const location = useLocation();
    const navigate = useNavigate();

    const {mutate: efetuarLogin} = EfetuarLogin();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormLogin>({resolver: zodResolver(schema)});

    const onSubmit = ({conta, senha}: FormLogin) => {

        const usuario: Usuario = {conta, senha};

        efetuarLogin(usuario, {
            onSuccess: (retornoDoLogin: RetornoDoLogin) => {
                setUsuarioLogado(conta, retornoDoLogin);

                if (location.state && location.state.from) {
                    navigate(location.state.from);
                } else {
                    navigate("/");
                }
            },
            onError: () => {
                setTentouLogar(true);
            },
        });
    };

    return (
        <>
            {tentouLogar &&
                <div className={"alert alert-danger d-flex justify-content-between"} role={"alert"}>
                    <div className={"fw-bold"}>
                        Login Inválido!
                    </div>
                    <div>
                        <button className={"btn-close"} onClick={() => setTentouLogar(false)}></button>
                    </div>
                </div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-center w-100 mt-5">
                    <div className="d-flex w-25 p-5 flex-column border-1 rounded border border-secondary">
                        <h2 className="mb-3">
                            Fazer Login
                        </h2>

                        <div className="mb-3">
                            <label htmlFor="InputEmail1" className="form-label fw-bold">Seu nome de usuário</label>
                            <input
                                {...register("conta")}
                                type="text"
                                placeholder="Digite seu nome de usuário"
                                className={`form-control m-2 ${
                                    errors.conta
                                        ? "form-control form-control-sm is-invalid"
                                        : "form-control form-control-sm"
                                }`}

                            />
                            <div className="invalid-feedback">{errors.conta?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Sua Senha</label>
                            <input {...register("senha")}
                                   type="password"
                                   className={`form-control m-2
                                   ${
                                       errors.conta
                                           ? "form-control form-control-sm is-invalid"
                                           : "form-control form-control-sm"
                                   }`}
                                   placeholder="Digite sua senha"/>
                            <div className="invalid-feedback">{errors.senha?.message}</div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-warning m-2 w-100">Conectar</button>
                        </div>

                        <hr className="border-2"/>

                    </div>

                </div>
            </form>
        </>
    )


}

export default LoginForm;