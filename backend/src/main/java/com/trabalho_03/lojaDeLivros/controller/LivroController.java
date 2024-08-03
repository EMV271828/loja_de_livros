package com.trabalho_03.lojaDeLivros.controller;

import com.trabalho_03.lojaDeLivros.exceptions.GlobalExceptionHandler;
import com.trabalho_03.lojaDeLivros.models.AutorQuery;
import com.trabalho_03.lojaDeLivros.models.Livro;
import com.trabalho_03.lojaDeLivros.models.LivroDTO;
import com.trabalho_03.lojaDeLivros.models.ResultadoPaginado;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.ErrorResponse;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.*;
import com.trabalho_03.lojaDeLivros.service.LivroService;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    //list
    @GetMapping("{id}/autores")
    public List<AutorQuery> obterAutores(@PathVariable("id") Long id) {
        return livroService.obterAutoresPorLivro(id);
    }

    //list
    @GetMapping
    public List<Livro> obterListaDeLivros() {
        return livroService.obterLivros();
    }

    @GetMapping("aleatorio")
    public List<LivroDTO> obterLivrosAleatotrio(){
        return livroService.obterLivrosAleatorio();
    }

    //get
    @GetMapping("{id}")
    public Livro obterLivro(@PathVariable long id) {
        return livroService.obterLivro(id);
    }

    //get
    @GetMapping("livros_por_genero/{genero}")
    public List<Livro> obterLivrosPorGenero(@PathVariable("genero") String genero) {
        return livroService.obterLivrosPorGenero(genero);
    }

    //update
    @PutMapping
    public ResponseEntity<Livro> atualizarLivro(@Valid @RequestBody Livro livro, BindingResult result) {
        Livro atualizado = livroService.editarLivro(livro);
        return new ResponseEntity<>(atualizado, HttpStatus.OK);
    }

    //create
    @PostMapping
    public ResponseEntity<Livro> criarLivro(@Valid @RequestBody Livro livro, BindingResult result) {
        Livro novoLivro = livroService.criarLivro(livro);
        return new ResponseEntity<>(novoLivro, HttpStatus.OK);
    }

    //delete
    @DeleteMapping("{id}")
    public Livro deletarLivro(@PathVariable Long id) {
        return livroService.deleteLivro(id);
    }


    @PostMapping("{idLivro}/atribuir_autor/{idAutor}")
    public Livro atribuirAutorParaLivro(@PathVariable Long idAutor, @PathVariable Long idLivro) {
        return livroService.atribuirAutorParaLivro(idAutor, idLivro);
    }

    //list com page
    @GetMapping("paginado")
    public ResultadoPaginado<LivroDTO> obterLivrosPaginados(
            @RequestParam(value="pagina", defaultValue = "0") int pagina ,
            @RequestParam(value="tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value="titulo", defaultValue = "") String titulo
            ){
        return livroService.obterLivrosPaginados(pagina, tamanho, titulo);
    }

    @GetMapping("paginacaoOrdenada")
    public ResultadoPaginado<Livro> obterLivrosPaginadosOrdenados(
            @RequestParam(value="pagina", defaultValue = "0") int pagina ,
            @RequestParam(value="tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value="titulo", defaultValue = "") String titulo,
            @RequestParam(value="coluna", defaultValue = "id") String coluna,
            @RequestParam(value="ordem", defaultValue = "asc") String ordem
    ){
        return livroService.obterLivrosPaginadosOrdenados(pagina, tamanho, titulo, coluna, ordem);
    }

    @GetMapping("slugGenero/{slug}")
    public List<Livro> recuperarLivrosPorSlugDoGenero(@PathVariable("slug") String slug){
        return livroService.recuperarLivrosPorSlugDoGenero(slug);
    }

    @GetMapping("genero/paginacao")
    public ResultadoPaginado<LivroDTO> obterLivrosPaginadosPorSlugDoGenero(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "slug", defaultValue = "") String slug
    ){
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<LivroDTO> page = livroService.recuperarLivrosPaginadosPorSlugDoGenero(slug, pageable);

        return new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
    }

}
