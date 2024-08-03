package com.trabalho_03.lojaDeLivros.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemDTO {
    private Long id;
    private int quantidade;
    private Long carrinhoId;
    private Long livroId;


    public ItemDTO(int quantidade, Long carrinhoId, Long livroId) {
        this.quantidade = quantidade;
        this.carrinhoId = carrinhoId;
        this.livroId = carrinhoId;
    }
}


