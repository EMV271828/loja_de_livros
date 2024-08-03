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
@Table(name = "autor")
public class Autor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "autorLivros",
            joinColumns = @JoinColumn(name = "autor_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "livro_id", referencedColumnName = "id")
    )
    @JsonIgnore
    private List<Livro> livros;


    public Autor(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.livros = new ArrayList<>();
    }

}
