import {create} from "zustand";

interface LivroBusca {
    pagina: number;
    tamanho: number;
    titulo: string;

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setTitulo: (titulo: string) => void;
}

const useLivroBusca = create<LivroBusca>((set) => ({
    pagina: 0,
    tamanho: 4,
    titulo: "",

    setPagina: (pagina: number) => set(() => ({pagina: pagina})),
    setTamanho: (tamanho: number) => set(() => ({tamanho: tamanho})),
    setTitulo: (titulo: string) => set(() => ({titulo: titulo})),


}))

export default useLivroBusca;