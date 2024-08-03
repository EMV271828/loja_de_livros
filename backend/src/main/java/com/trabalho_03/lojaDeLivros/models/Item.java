package com.trabalho_03.lojaDeLivros.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantidade;
    @JsonIgnore
    @ManyToOne
    Carrinho carrinho;
    @ManyToOne
    Livro livro;

    public Item(int quantidade, Carrinho carrinho, Livro livro) {
        this.quantidade = quantidade;
        this.carrinho = carrinho;
        this.livro = livro;
    }

}
