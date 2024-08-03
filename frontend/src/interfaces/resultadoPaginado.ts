interface ResultadoPaginado <T>{
    totalDeLivros: number;
    totalDePaginas: number;
    paginaAtual: number;
    livros: T[];
}