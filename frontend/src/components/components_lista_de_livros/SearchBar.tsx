import {FormEvent, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ModalBuscaVazia from "./ModalBuscaVazia.tsx";
import useLivroBusca from "../../utils/LivroBusca.ts";

const SearchBar = () => {
    const titulo = useLivroBusca(s => s.titulo)
    const setPagina = useLivroBusca(s => s.setPagina)
    const setTitulo = useLivroBusca(s => s.setTitulo)

    useEffect(() => {
        if(localStorage.getItem("buscaLivro") === null || location.pathname !== "/lista-de-livros-busca"){
            setTitulo("")
        }
        else{
            setTitulo(localStorage.getItem("buscaLivro")!)
        }
    }, []);

    const tratarNome = (titulo: string) => {
        setTitulo(titulo)
        localStorage.setItem("buscaLivro", titulo)
        setPagina(0)
    }

    const navigate = useNavigate()

    const location = useLocation();

    const [closeModal, setCloseModal] = useState(false);

    const handleModal = () => setCloseModal(!closeModal);

    const guardarBusca = () => {
        if (nomeRef.current!.value !== "") {
            localStorage.setItem("buscaLivro", titulo)
        }

    }

    const submit = (event: FormEvent) => {
        event.preventDefault()
        if (nomeRef.current?.value === "") {
            handleModal()
            return
        }

        tratarNome(nomeRef.current!.value)

        if (location.pathname !== "lista-de-livros-busca") {
            navigate(`lista-de-livros-busca`)
        }
    }

    const nomeRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <ModalBuscaVazia closeModal={closeModal} handleModal={handleModal}/>

            <form onSubmit={submit} className={"w-100"}>
                <div className={"input-group"}>
                    <input defaultValue={titulo}
                           ref={nomeRef}
                           onChange={() => guardarBusca()}
                           className="form-control form-control-sm" type="text"
                           placeholder="Busque por um livro..."
                    />
                    <div className="input-group-append">
                        <button className="btn btn-light" type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SearchBar

//TODO adicionar sugestoes na busca