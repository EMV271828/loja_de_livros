package com.trabalho_03.lojaDeLivros.controller;

import com.trabalho_03.lojaDeLivros.models.Autor;
import com.trabalho_03.lojaDeLivros.models.Livro;
import com.trabalho_03.lojaDeLivros.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("autores")
public class AutorController {

    @Autowired
    private AutorService autorService;

    //list
    @GetMapping
    public List<Autor> obterListaDeAutores() {
        return autorService.obterAutores();
    }

    //get
    @GetMapping("{id}")
    public Autor obterAutor(@PathVariable Long id) {
        return autorService.obterAutor(id);
    }

    //create
    @PutMapping
    public Autor adicionarAutor(@RequestBody Autor autor) {
        return autorService.criarAutor(autor);
    }

    //update
    @PostMapping
    public Autor atualizarAutor(@RequestBody Autor autor) {
        return autorService.editarAutor(autor);
    }

    //delete
    @DeleteMapping("{id}")
    public void deletarAutor(@PathVariable Long id) {
        autorService.deleteAutor(id);
    }

    //list livros
    @GetMapping("{id}/livros")
    public List<Livro> obterLivros(@PathVariable Long id) {
        return autorService.obterLivrosPorAutor(id);
    }

    @PostMapping("{idAutor}/atribuir_livro/{idLivro}")
    public Autor atribuirLivroParaAutor(@PathVariable Long idLivro, @PathVariable Long idAutor){
        return autorService.atribuirLivroParaAutor(idLivro, idAutor);
    }

}
