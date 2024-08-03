package com.trabalho_03.lojaDeLivros.repository;

import com.trabalho_03.lojaDeLivros.models.Autor;
import com.trabalho_03.lojaDeLivros.models.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AutorRepository extends JpaRepository<Autor, Long> {


    @Query("select a from Autor a order by a.nome")
    List<Autor> acharAutores();
    @Query("select a from Autor a join fetch a.livros where a.id = :id")
    List<Livro> acharLivrosporAutor(Long id);
}
