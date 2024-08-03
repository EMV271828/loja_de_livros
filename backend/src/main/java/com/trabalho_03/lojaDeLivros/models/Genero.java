package com.trabalho_03.lojaDeLivros.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Genero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String slug;
    @JsonIgnore
    @OneToMany(mappedBy = "genero")
    private List<Livro> livros;


    public Genero(String nome, String slug) {
        this.nome = nome;
        this.slug = slug;
        this.livros = new ArrayList<>();
    }
}
