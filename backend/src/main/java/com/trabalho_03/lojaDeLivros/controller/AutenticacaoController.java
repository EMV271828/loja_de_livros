package com.trabalho_03.lojaDeLivros.controller;

import com.trabalho_03.lojaDeLivros.exceptions.LoginException;
import com.trabalho_03.lojaDeLivros.models.Usuario;
import com.trabalho_03.lojaDeLivros.service.AutenticacaoService;
import com.trabalho_03.lojaDeLivros.service.CarrinhoService;
import com.trabalho_03.util.RetornoDoLogin;
import com.trabalho_03.util.TokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("autenticacao")
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @Autowired
    private CarrinhoService carrinhoService;

    @PostMapping("login")
    public RetornoDoLogin login(@RequestBody Usuario usuario) {
        Usuario usuarioLogado = autenticacaoService.login(usuario);
        if (usuarioLogado != null) {
            return new RetornoDoLogin(
                    new TokenResponse("Sucesso"),
                    usuarioLogado.getId(),
                    carrinhoService.obterCarrinhoPorUsuarioId(usuarioLogado.getId()));
        } else {
            throw new LoginException("Erro de login");
        }
    }

}
