package com.trabalho_03.lojaDeLivros.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class Carrinho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate data;
    @OneToMany(mappedBy = "carrinho", cascade = CascadeType.ALL)
    private List<Item> itens;
    @JsonIgnore
    @ManyToOne
    private Usuario usuario;

    public Carrinho(LocalDate data, Usuario usuario) {
        this.data = data;
        this.usuario = usuario;
        this.itens = new ArrayList<>();
    }
}
