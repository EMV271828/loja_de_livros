package com.trabalho_03.lojaDeLivros.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.trabalho_03.util.validacaoAutores.AutoresConstraint;
import com.trabalho_03.util.validacaoData.DataConstraint;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@Table(name = "livro")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String imagem;

    @ManyToOne
    @NotNull(message = "A Gênero deve ser informado.")
    private Genero genero;

    @DecimalMin(value = "300.00", message = "O 'preço' deve ser maior ou igual a 300,00")
    @DecimalMax(value = "9000.00", message = "O 'preço' deve ser menor ou igual a 9000,00")
    private BigDecimal preco;

    @DataConstraint
    private LocalDate data;

    @Max(value = 5000, message = "O máximo de páginas dever ser 5000")
    private BigInteger paginas;

    @Length(min= 5, message = "A editora deve ter no mínimo cinco letras")
    private String editora;

    @Length(min= 5, message = "O idioma deve ter no mínimo cinco letras")
    private String idioma;

    @Max(value = 5000, message = "O máximo de livros no estoque só pode ser 5000")
    private BigInteger quantidade;

    private boolean disponivel;

    @JsonIgnore
    @OneToMany(mappedBy = "livro", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Item> itens;

    @ManyToMany(mappedBy = "livros", fetch = FetchType.LAZY)
    @AutoresConstraint
    private List<Autor> autores;

    public Livro(String titulo, String imagem, Genero genero, BigDecimal preco, LocalDate data,
                 BigInteger paginas, String editora, String idioma, BigInteger quantidade, boolean disponivel, List<Autor> autores) {
        this.titulo = titulo;
        this.imagem = imagem;
        this.genero = genero;
        this.preco = preco;
        this.data = data;
        this.paginas = paginas;
        this.editora = editora;
        this.idioma = idioma;
        this.quantidade = quantidade;
        this.disponivel = disponivel;
        this.autores = autores;
        this.itens = new ArrayList<>();
    }
}