package com.trabalho_03.lojaDeLivros.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "A 'Conta' deve ser informada.")
    private String conta;
    @NotEmpty(message = "A 'Senha' deve ser informada.")
    private String senha;
    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    private List<Carrinho> carrinhos;

    public Usuario(String conta, String senha) {
        this.conta = conta;
        this.senha = senha;
        this.carrinhos = new ArrayList<>();
    }
}

