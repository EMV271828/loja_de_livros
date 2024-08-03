package com.trabalho_03.lojaDeLivros.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LivroDTO {

    private Long id;
    private String titulo;
    private String imagem;
    private Genero genero;
    private BigDecimal preco;
    private LocalDate data;
    private BigInteger paginas;
    private String editora;
    private String idioma;
    private BigInteger quantidade;
    private boolean disponivel;
    private List<ItemDTO> itens;
    private List<Autor> autores;

    public LivroDTO(String titulo, String imagem, Genero genero, BigDecimal preco, LocalDate data, BigInteger paginas, String editora,
                    String idioma, BigInteger quantidade, boolean disponivel, List<ItemDTO> itens, List<Autor> autores) {
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
        this.itens = itens;
        this.autores = autores;
    }
}


