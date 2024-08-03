package com.trabalho_03.lojaDeLivros.models;

import java.util.List;

public record ResultadoPaginado<T>(

        long totalDeLivros,
        int totalDePaginas,
        int paginaCorrente,
        List<T> livros) {

}
