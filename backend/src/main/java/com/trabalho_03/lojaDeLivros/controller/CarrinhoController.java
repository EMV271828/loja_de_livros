package com.trabalho_03.lojaDeLivros.controller;

import com.trabalho_03.lojaDeLivros.models.Carrinho;
import com.trabalho_03.lojaDeLivros.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("carrinhos")
public class CarrinhoController {
    @Autowired
    CarrinhoService carrinhoService;

    @GetMapping("{usuario_id}")
    Carrinho obterCarrinhoPorIdDoUsuario(@PathVariable("usuario_id") Long usuario_id){
        return carrinhoService.obterCarrinhoPorUsuarioId(usuario_id);
    }

}
