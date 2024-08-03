package com.trabalho_03.lojaDeLivros.repository;

import com.trabalho_03.lojaDeLivros.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByContaAndSenha(String conta, String senha);

}