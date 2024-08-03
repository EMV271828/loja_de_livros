package com.trabalho_03.lojaDeLivros.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AutorQuery {

    private String nome;
    private String descricao;

    public AutorQuery(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
}
