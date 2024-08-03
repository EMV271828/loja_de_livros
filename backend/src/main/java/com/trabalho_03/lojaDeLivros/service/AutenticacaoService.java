package com.trabalho_03.lojaDeLivros.service;

import com.trabalho_03.lojaDeLivros.models.Usuario;
import com.trabalho_03.lojaDeLivros.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(Usuario usuario){
        return usuarioRepository.findByContaAndSenha(
                usuario.getConta(), usuario.getSenha());
    }
}
