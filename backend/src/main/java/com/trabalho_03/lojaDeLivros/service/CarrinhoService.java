package com.trabalho_03.lojaDeLivros.service;

import com.trabalho_03.lojaDeLivros.models.Carrinho;
import com.trabalho_03.lojaDeLivros.repository.CarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarrinhoService {

    @Autowired
    CarrinhoRepository carrinhoRepository;

    public Carrinho obterCarrinhoPorUsuarioId(Long usuarioId){
        return carrinhoRepository.obterCarrinhoPorUsuarioId(usuarioId);
    }



}
