import {useFieldArray, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import CadastrarLivro from "../../hooks/livros/CadastrarLivro.tsx";
import Livro from "../../interfaces/livro.ts";
import CarrregarAutores from "./CarrregarAutores.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import DataValida from "../../utils/DataValida.ts";
import Autor from "../../interfaces/autor.ts";
import LivroTabelado from "../../utils/LivroTabelado.ts";
import dayjs from "dayjs";
import AlterarLivro from "../../hooks/livros/AlterarLivro.tsx";
import Genero from "../../interfaces/genero.ts";
import {Modal, ModalBody} from "react-bootstrap";
import {spinnerBorderSize} from "../../utils/CustomStyles.ts";
import useLivroTabelado from "../../utils/LivroTabelado.ts";
import RemoverLivro from "../../hooks/livros/RemoverLivro.tsx";


const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const regexImagem = /^livro_imagem_[0-9]\.(gif|jpg|png|bmp)$/;

const verificarCamposSemValor = (elem: string) => {
    return elem !== "0"
}

const carregarAutores = (): [{ valor: string, rotulo: string }[], JSX.Element[]] => {

    const listaDeAutores = [{valor: "0", rotulo: "Selecione um autor"}]

    const opcoesDeAutores = [<option value="0">Selecione um autor</option>]


    const autores = CarrregarAutores();

    if (autores[0].nome === "carregando...") {

        return [listaDeAutores, opcoesDeAutores]
    }

    for (let i = 0; i < autores.length; i++) {
        listaDeAutores.push(
            {valor: JSON.stringify(autores[i]), rotulo: autores[i].nome}
        )
        opcoesDeAutores.push(
            <option key={autores[i].id} value={JSON.stringify(autores[i])}>{autores[i].nome}</option>
        )
    }

    return [listaDeAutores, opcoesDeAutores];

}

const CadastroDeLivrosForm = () => {

    const livroSelecionado = LivroTabelado((s) => s.livroSelecionado);

    const setLivroSelecionado = LivroTabelado((s) => s.setLivroSelecioando);

    const remocao = useLivroTabelado(s => s.statusRemocao);

    const setRemocao = useLivroTabelado(s => s.setstatusRemocao);

    const [conclusaoAlteracao, setConclusaoAlteracao] =
        useState({estd: 0, msg: ""});


    const [listaDeAutores, opcoesDeAutores] = carregarAutores()

    const autoresSchema = z.object(
        {
            valor: z.enum([listaDeAutores[0].valor, ...listaDeAutores.slice(1)
                .map((c) => c.valor)])
                .refine(verificarCamposSemValor, {message: "Selecione pelo menos um autor para o livro"})
        }
    )

    const schema = z.object(
        {
            titulo: z
                .string({invalid_type_error: "O título deve ser informado"})
                .min(3, {message: "O título deve ter no minimo três caracteres"}),
            imagem: z
                .string()
                .min(1, { message: "A imagem deve ser informada." })
                .regex(regexImagem, { message: "Nome de imagem inválido." }),
            genero: z
                .string()
                .refine(verificarCamposSemValor, {message: "O gênero do livro dever ser informado"}),
            preco: z
                .number({invalid_type_error: "O preço deve ser informado"})
                .min(1.0, {message: "O valor dever ser maior quer R$ 0"}),
            data: z
                .string({invalid_type_error: "A data deve ser informada"})
                .regex(regexData, "A data deve estar no formato dd/mm/yyyy")
                .refine(DataValida, {message: "A data deve ser no formato dd/mm/yyyy"}),
            paginas: z
                .number({invalid_type_error: "O número de páginas dever ser informado"})
                .min(10, {message: "Deve ter no mínimo dez páginas"}),
            editora: z
                .string({invalid_type_error: "A editora dever ser informada"})
                .min(3, {message: "O nome dever ter mais do que duas letras"}),
            idioma: z
                .string({invalid_type_error: "O idioma dever ser informado"})
                .min(1, {message: "Um idioma deve ser informado"})
                .max(20, {message: "O idioma deve ter mínimo caracteres três caracteres"}),
            quantidade: z
                .number({invalid_type_error: "A quantidade de livros dever ser informada"})
                .min(0, {message: "O valor dever ser no mínimo zero"}),
            disponivel: z
                .boolean(),
            autores: z
                .array(autoresSchema)

        }
    );

    type FormLivro = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        setValue,
        control,
        formState: {isSubmitSuccessful, errors},
    } = useForm<FormLivro>({
        resolver: zodResolver(schema),
        defaultValues: {
            autores: [{valor: "0"}]
        }
    });

    const {fields, append, remove} = useFieldArray(
        {
            control,
            name: "autores"
        }
    )

    // livro cadastrado com sucesso
    useEffect(() => {
        setFocus("titulo");
        reset();
        setLivroSelecionado({} as Livro);
    }, [isSubmitSuccessful, reset, setFocus, setLivroSelecionado]);

    // alteracao de livro
    useEffect(() => {
        setFocus("titulo");
        if (livroSelecionado.id) {
            setValue("titulo", livroSelecionado.titulo);
            setValue("imagem", livroSelecionado.imagem);
            setValue("genero", String(livroSelecionado.genero.id));
            setValue("preco", livroSelecionado.preco);
            setValue("data", dayjs(livroSelecionado.data).format("DD/MM/YYYY"));
            setValue("paginas", livroSelecionado.paginas);
            setValue("editora", livroSelecionado.editora);
            setValue("idioma", livroSelecionado.idioma);
            setValue("idioma", livroSelecionado.idioma);
            setValue("quantidade", livroSelecionado.quantidade);
            setValue("disponivel", livroSelecionado.disponivel);
            setValue("autores", livroSelecionado.autores.map((autor) => ({
                valor: JSON.stringify(autor),
                rotulo: autor.nome
            })));
        }
    }, [livroSelecionado, reset, setFocus, setValue]);


    const {
        mutate: cadastarLivro,
        error: errorCadastrarLivro
    } = CadastrarLivro();

    const {
        mutate: alterarLivro,
        error: errorAlterarLivro
    } = AlterarLivro();

    const {error: erroRemoverLivro} = RemoverLivro();

    const onSubmit = (
        {
            titulo,
            imagem,
            genero,
            preco,
            data,
            paginas,
            editora,
            idioma,
            quantidade,
            disponivel,
            autores

        }: FormLivro) => {

        const livro: Livro = {
            titulo: titulo,
            imagem: imagem,
            genero: {id: parseInt(genero)} as Genero,
            preco: preco,
            data: new Date(
                data.substring(6, 10) +
                "-" +
                data.substring(3, 5) +
                "-" +
                data.substring(0, 2)
            ),
            paginas: paginas,
            editora: editora,
            idioma: idioma,
            quantidade: quantidade,
            disponivel: disponivel,
            autores: autores.map((a) => JSON.parse(a.valor) as Autor) as Autor[]
        };

        if (livroSelecionado.id) {
            livro.id = livroSelecionado.id
            setConclusaoAlteracao({estd: 1, msg: ""})
            setTimeout(() => {
                alterarLivro(livro, {
                    onSuccess: () => {
                        scrollTo(0, 0)
                        setConclusaoAlteracao({estd: 2, msg: "Edição do livro"})
                    }, onError: () => {
                        scrollTo(0, 0)
                        setConclusaoAlteracao({
                            estd: -1,
                            msg: "Houve um erro de edição",
                        })
                    }
                })
            }, 2000)

        } else {
            setConclusaoAlteracao({estd: 1, msg: ""})
            setTimeout(() => {
                cadastarLivro(livro, {
                    onSuccess: () => {
                        scrollTo(0, 0)
                        setConclusaoAlteracao({estd: 2, msg: "Cadastro do livro"})
                    }, onError: () => {
                        scrollTo(0, 0)
                        setConclusaoAlteracao({
                            estd: -1,
                            msg: "Houve um erro de cadastro",
                        })
                    }
                });
            }, 2000)

        }
    };

    const tratamentoDeErros = () => {

        const message = `${conclusaoAlteracao.msg}. `
        let code: string;
        let msgs: string;

        if (conclusaoAlteracao.msg.split(" ")[4] === "cadastro") {

            code =  errorCadastrarLivro?.errorCode ? `Erro do código: ${errorCadastrarLivro.errorCode}. ` : ""

            msgs = errorCadastrarLivro?.msgs ? `Mensagens: ${errorCadastrarLivro.msgs?.map((msg, index) =>
                index > 0 ? msg.charAt(0).toLowerCase() + msg.slice(1) : msg).join(", ")}. ` : ""

        } else {

            code =  errorAlterarLivro?.errorCode ? `Erro do código: ${errorAlterarLivro.errorCode}. ` : ""

            msgs = errorAlterarLivro?.msgs ? `Mensagens: ${errorAlterarLivro.msgs?.map((msg, index) =>
                index > 0 ? msg.charAt(0).toLowerCase() + msg.slice(1) : msg).join(", ")}.` : ""
        }

        if(msgs === ""){
            msgs = `Mensagens: ${errorAlterarLivro?.message}.` || `Mensagens: ${errorCadastrarLivro?.message}.` || ""
        }

        return `${message} ${code} ${msgs}`

    }


    return (

        <>
            <Modal show={conclusaoAlteracao.estd === 1}
                   onHide={() => conclusaoAlteracao.estd === 2 || conclusaoAlteracao.estd === -1} backdrop={"static"}
                   keyboard={false}
                   className={"mt-5"}
            >
                <ModalBody>
                    <div className={"d-flex flex-column align-items-center"}>
                        <div className="spinner-border" role="status" style={spinnerBorderSize}>
                        </div>
                        <h4>Aguarde...</h4>
                    </div>
                </ModalBody>
            </Modal>
            {
                remocao === 1 &&
                <div className={"alert alert-success d-flex justify-content-between"} role={"alert"}>
                    <div className={"fw-bold"}>
                        Remoção feita com sucesso!
                    </div>
                    <div>
                        <button className={"btn-close"}
                                onClick={() => setRemocao(0)}></button>
                    </div>
                </div>
            }
            {
                remocao === -1 &&
                <div className={"alert alert-danger d-flex justify-content-between"} role={"alert"}>
                    <div className={"fw-bold"}>
                        {`Houve um problema com a remoção! ${erroRemoverLivro?.message}`}
                    </div>
                    <div>
                        <button className={"btn-close"}
                                onClick={() => setRemocao(0)}></button>
                    </div>
                </div>
            }
            {
                conclusaoAlteracao.estd === 2 &&
                <div className={"alert alert-success d-flex justify-content-between"} role={"alert"}>
                    <div className={"fw-bold"}>
                        {`${conclusaoAlteracao.msg} feito com sucesso!`}
                    </div>
                    <div>
                        <button className={"btn-close"}
                                onClick={() => setConclusaoAlteracao({
                                    estd: 0,
                                    msg: "",
                                })}></button>
                    </div>
                </div>
            }
            {
                conclusaoAlteracao.estd === -1 &&
                <div className={"alert alert-danger d-flex justify-content-between"} role={"alert"}>
                    <div className={"fw-bold"}>
                        {tratamentoDeErros()}
                    </div>
                    <div>
                        <button className={"btn-close"} onClick={() => setConclusaoAlteracao({
                            estd: 0,
                            msg: "",
                        })}></button>
                    </div>
                </div>
            }
            <h4>Cadastro de Livros</h4>

            <hr className={"mt-2 border-4 w-100"}/>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"d-flex flex-column mx-auto w-100 px-5"}>

                    <div className={"d-flex"}>
                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="titulo" className={"fw-bold"}>Título</label>
                            <input {...register("titulo")} className={
                                !errors.titulo ?
                                    "form-control" : "form-control is-invalid"
                            }/>
                            <div className="invalid-feedback">
                                {errors.titulo?.message}
                            </div>
                        </div>

                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="imagem" className={"fw-bold"}>Imagem</label>
                            <input {...register("imagem")} className={
                                !errors.imagem ?
                                    "form-control" : "form-control is-invalid"
                            }/>
                            <div className="invalid-feedback">
                                {errors.imagem?.message}
                            </div>
                        </div>

                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="genero" className={"fw-bold"}>Gênero</label>
                            <select
                                {...register("genero")}
                                id={"genero"}
                                className={
                                    !errors.genero ?
                                        "form-control form-select" : "form-control form-select is-invalid"}
                            >
                                <option value="0">Selecione um gênero</option>
                                <option value="1">Ação</option>
                                <option value="2">Terror</option>
                                <option value="3">Fantasia</option>
                            </select>
                            <div className="invalid-feedback">
                                {errors.genero?.message}
                            </div>
                        </div>
                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="preco" className={"fw-bold"}>Preço</label>
                            <input {...register("preco", {valueAsNumber: true})}
                                   type="number"
                                   step="0.01"
                                   min="0"
                                   className={
                                       !errors.preco ?
                                           "form-control" : "form-control is-invalid"
                                   }/>
                            <div className="invalid-feedback">
                                {errors.preco?.message}
                            </div>
                        </div>
                    </div>

                    <div className={"d-flex"}>
                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="data" className={"fw-bold"}>Data</label>
                            <input {...register("data")} className={
                                !errors.data ?
                                    "form-control" : "form-control is-invalid"
                            }/>
                            <div className="invalid-feedback">
                                {errors.data?.message}
                            </div>
                        </div>

                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="preco" className={"fw-bold"}>Número de Páginas</label>
                            <input {...register("paginas", {valueAsNumber: true})} type={"number"} className={
                                !errors.paginas ?
                                    "form-control" : "form-control is-invalid"
                            }/>
                            <div className="invalid-feedback">
                                {errors.paginas?.message}
                            </div>
                        </div>

                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="data" className={"fw-bold"}>Editora</label>
                            <input {...register("editora")} className={
                                !errors.editora ?
                                    "form-control" : "form-control is-invalid"
                            }/>
                            <div className="invalid-feedback">
                                {errors.editora?.message}
                            </div>
                        </div>
                    </div>

                    <div className={"d-flex"}>
                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="idioma" className={"fw-bold"}>Idioma</label>
                            <input {...register("idioma")} className={
                                !errors.idioma ?
                                    "form-control" : "form-control is-invalid"
                            }/>
                            <div className="invalid-feedback">
                                {errors.idioma?.message}
                            </div>
                        </div>

                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="quantidade" className={"fw-bold"}>Quantidade</label>
                            <input {...register("quantidade", {valueAsNumber: true})} type={"number"} className={
                                !errors.quantidade ?
                                    "form-control" : "form-control is-invalid"
                            }/>
                            <div className="invalid-feedback">
                                {errors.quantidade?.message}
                            </div>
                        </div>

                        <div className={"mb-3  mx-2 d-flex flex-column w-100"}>
                            <label htmlFor="disponivel" className={"fw-bold"}>
                                Disponível?
                            </label>
                            <input
                                {...register("disponivel")}
                                type="checkbox"
                                id="disponivel"
                                className="form-check-input"
                            />
                        </div>
                    </div>

                    {fields.map((field, index) => {
                            return (
                                (
                                    <div className={"d-flex flex-column mb-3"}>
                                        <div className={"mx-2 d-flex flex-column w-100"}>
                                            <label htmlFor="autor" className={"fw-bold"}>Autor</label>
                                            <select key={field.id}
                                                    {...register(`autores.${index}.valor`)} className={
                                                !errors.autores ?
                                                    "form-control form-select" : "form-control is-invalid form-select"
                                            }>
                                                {opcoesDeAutores}

                                            </select>

                                            {
                                                errors.autores?.[index]?.valor?.message &&
                                                <div className="invalid-feedback">
                                                    {errors.autores?.[index]?.valor?.message}
                                                </div>
                                            }
                                        </div>

                                        <button type={"button"} className={"btn btn-danger mt-2 mx-2 w-25"}
                                                onClick={() => remove(index)}
                                                disabled={fields.length < 2}>Remover
                                        </button>

                                    </div>
                                ))
                        }
                    )}

                    <button type={"button"} className={"btn btn-warning mb-3 mx-auto"}
                            onClick={() => append({valor: "0"})}>
                        Adicionar Autor
                    </button>

                    <div className={"d-flex align-content-between w-100 mb-3"}>
                        <button type={"submit"} className={"btn btn-warning mx-auto mb-3 w-25"}>
                            Cadastrar
                        </button>

                        <button type={"button"} onClick={() => {
                            reset();
                            setLivroSelecionado({} as Livro)
                        }} className={"btn btn-warning mx-auto mb-3 w-25"}>
                            Cancelar
                        </button>
                    </div>

                </div>
            </form>
        </>
    );
}

export default CadastroDeLivrosForm;