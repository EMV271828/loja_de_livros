import autenticacaoUsuario from "../../utils/autenticacaoUsuario.ts";
import EfetuarLogin from "../../hooks/EfetuarLogin.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Usuario from "../../interfaces/usuario.ts";
import {z} from "zod";
import RetornoDoLogin from "../../interfaces/RetornoDoLogin.ts";

const schema = z.object({
    conta: z.string().min(1, {message: "A conta deve ser informada."}),
    senha: z.string().min(1, {message: "A senha deve ser informada."}),
});

type FormLogin = z.infer<typeof schema>;


const LoginFormModal = (props: { closeModal: () => void }) => {

    const setUsuarioLogado = autenticacaoUsuario((s) => s.setUsuarioLogado);
    const setTentouLogar = autenticacaoUsuario((s) => s.setTentouLogar);
    const tentouLogar = autenticacaoUsuario((s) => s.tentouLogar);

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
                props.closeModal()
                setUsuarioLogado(conta, retornoDoLogin);
            },
            onError: () => {
                setTentouLogar(true);
            },
        });
    };


    return (
        <div className={"w-100 mx-auto"}>

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
                <input id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       {...register("conta")}
                       type="text"
                       placeholder="Digite seu nome"
                       className={`form-control ${
                           errors.conta
                               ? "form-control mb-1 is-invalid"
                               : "form-control mb-2 "
                       }`}
                />
                <div className="invalid-feedback">{errors.conta?.message}</div>

                <input aria-describedby="emailHelp"
                       {...register("senha")}
                       type="password"
                       className={`form-control ${
                           errors.conta
                               ? "form-control mb-1 is-invalid"
                               : "form-control mb-2"
                       }`}
                       placeholder="Digite sua senha"/>
                <div className="invalid-feedback">{errors.senha?.message}</div>

                <button type="submit" className="btn btn-warning w-100 mb-3">Conectar</button>
            </form>
        </div>
    )
}

export default LoginFormModal;