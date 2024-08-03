import {create} from "zustand";
import Livro from "../interfaces/livro.ts";

interface LivroEdicaoGenero {

    livroSelecionado: Livro;
    setLivroSelecionado: (livroSelecionado: Livro) => void;
}

const useLivroEdicaoGenero = create<LivroEdicaoGenero>((set) => ({

    livroSelecionado: {} as Livro,
    setLivroSelecionado: (livroSelecionado: Livro) => set(() => ({livroSelecionado: livroSelecionado}))

}))

export default useLivroEdicaoGenero;