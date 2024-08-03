import {create} from "zustand";
import Livro from "../interfaces/livro.ts";

interface LivroTabelado {
    pagina: number;
    tamanho: number;
    titulo: string;
    coluna: string;
    ordem: string;
    statusRemocao: number;
    livroSelecionado: Livro;

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setTitulo: (titulo: string) => void;
    setColuna: (coluna: string) => void;
    setOrdem: (ordem: string) => void;
    setstatusRemocao: (statusRemocao: number) => void;
    setLivroSelecioando: (livroSelecioando: Livro) => void;
}

const useLivroTabelado = create<LivroTabelado>((set) => ({
    pagina: 0,
    tamanho: 4,
    titulo: "",
    coluna: "",
    ordem: "",
    statusRemocao: 0,
    livroSelecionado: {} as Livro,

    setPagina: (pagina: number) => set(() => ({pagina: pagina})),
    setTamanho: (tamanho: number) => set(() => ({tamanho: tamanho})),
    setTitulo: (titulo: string) => set(() => ({titulo: titulo})),
    setColuna: (coluna: string) => set(() => ({coluna: coluna})),
    setOrdem: (ordem: string) => set(() => ({ordem: ordem})),
    setstatusRemocao: (statusRemocao: number) => set(() => (
        {statusRemocao: statusRemocao})),
    setLivroSelecioando: (livroSelecionado: Livro) => set(() => ({livroSelecionado: livroSelecionado}))

}))

export default useLivroTabelado;