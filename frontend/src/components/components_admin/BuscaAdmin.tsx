import useLivroTabelado from "../../utils/LivroTabelado.ts";
import {useRef} from "react";

const BuscaAdmin = () => {
    const setPagina = useLivroTabelado(s => s.setPagina)
    const setTitulo = useLivroTabelado(s => s.setTitulo)

    const tratarNome = (nome2: string) => {
        setTitulo(nome2)
        setPagina(0)
    }

    const nomeRef = useRef<HTMLInputElement>(null);

    return (
        <div className="d-flex mb-3">
            <input
                defaultValue={""}
                ref={nomeRef}
                type="text"
                className="form-control me-3 input-group admin-busca"
                placeholder="Pesquise por título..."
                onChange={() => tratarNome(nomeRef.current!.value)}
            />
        </div>
    );
}

export default BuscaAdmin;