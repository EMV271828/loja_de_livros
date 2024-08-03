package com.trabalho_03.lojaDeLivros.service;

import com.trabalho_03.lojaDeLivros.exceptions.ObjetoDestacado;
import com.trabalho_03.lojaDeLivros.exceptions.ObjetoTransiente;
import com.trabalho_03.lojaDeLivros.exceptions.ObjetoNaoEncontrado;
import com.trabalho_03.lojaDeLivros.models.Autor;
import com.trabalho_03.lojaDeLivros.models.Livro;
import com.trabalho_03.lojaDeLivros.repository.AutorRepository;
import com.trabalho_03.lojaDeLivros.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.trabalho_03.lojaDeLivros.service.LivroService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutorService {
    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private  LivroRepository livroRepository;


    @Autowired
    @Lazy
    private LivroService livroService;

    public List<Autor> obterAutores() {
        return autorRepository.acharAutores();
    }

    public Autor obterAutor(Long id) {
        if (id == null) throw new ObjetoTransiente("Autor não registrado no sistema");

        return autorRepository.findById(id).orElseThrow(() -> new ObjetoNaoEncontrado("Autor não encontrado"));
    }


    public Autor criarAutor(Autor autor) {

        if (autor.getId() != null) throw new ObjetoDestacado("Autor já registrado");

        return autorRepository.save(autor);
    }

    public Autor editarAutor(Autor autorMod) {
        obterAutor(autorMod.getId());

        return autorRepository.save(autorMod);

    }

    public void deleteAutor(Long id) {

        Autor a = obterAutor(id);

        for (Livro l : a.getLivros()) {
            l.getAutores().remove(a);
        }

        autorRepository.delete(a);
    }

    public List<Livro> obterLivrosPorAutor(Long id) {

        return autorRepository.acharLivrosporAutor(id);
    }

    public Autor atribuirLivroParaAutor(Long idLivro, Long idAutor){
        Autor a = obterAutor(idAutor);
        Livro l = livroService.obterLivro(idLivro);

        a.getLivros().add(l);
        l.getAutores().add(a);

        livroRepository.save(l);
        return autorRepository.save(a);
    }

}
