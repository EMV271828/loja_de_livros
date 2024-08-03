package com.trabalho_03.lojaDeLivros.service;

import com.trabalho_03.lojaDeLivros.exceptions.AutoresRepetidos;
import com.trabalho_03.lojaDeLivros.exceptions.ObjetoDestacado;
import com.trabalho_03.lojaDeLivros.exceptions.ObjetoNaoEncontrado;
import com.trabalho_03.lojaDeLivros.exceptions.ObjetoTransiente;
import com.trabalho_03.lojaDeLivros.models.*;
import com.trabalho_03.lojaDeLivros.repository.*;
import jakarta.transaction.Transactional;

import jakarta.validation.Valid;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@Service
public class LivroService {
    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    @Lazy
    private AutorService autorService;

    ModelMapper modelMapper = new ModelMapper();

    public List<Livro> obterLivros() {

        return livroRepository.findAll(Sort.by("titulo"));
    }


    public List<LivroDTO> obterLivrosAleatorio() {
        List<Livro> livros = livroRepository.recuperarLivrosAleatorio();

        List<LivroDTO> livrosDTO = new ArrayList<>();

        for(Livro l: livros){
            livrosDTO.add(modelMapper.map(l, LivroDTO.class));
        }

        return livrosDTO;
    }

    public Livro obterLivro(Long id) {

        if (id == null) throw new ObjetoTransiente("Livro não registrado");

        return livroRepository.findById(id).orElseThrow(() -> new ObjetoNaoEncontrado("Livro não encontrado"));

    }

    public boolean checarAutoresRepetidos(Livro livro) {

        ArrayList<String> nomes = new ArrayList<>();
        for (Autor a : livro.getAutores()) {
            nomes.add(a.getNome());
        }

        return new HashSet<>(nomes).size() != nomes.size();

    }

    public Livro criarLivro(Livro livro) {

        if (livro.getId() != null) throw new ObjetoDestacado("Livro já registrado");

        for (Autor autor : livro.getAutores()) {
            Autor a = autorService.obterAutor(autor.getId());
            a.getLivros().add(livro);
        }

        return livroRepository.save(livro);
    }

    public Livro deleteLivro(Long id) {

        Livro l = obterLivro(id);

        HashMap<Usuario, Carrinho> usuarioCarrinho = new HashMap<>();


        for (Item i : l.getItens()) {
            Carrinho carrinho = i.getCarrinho();
            Usuario usuario = carrinho.getUsuario();

            usuarioCarrinho.put(usuario, carrinho);

        }


        for (Autor a : l.getAutores()) {
            a.getLivros().remove(l);
        }

        livroRepository.delete(l);

        for (Usuario u : usuarioCarrinho.keySet()) {

            if (usuarioCarrinho.get(u).getItens().isEmpty()) {
                u.setCarrinhos(new ArrayList<>());

                carrinhoRepository.delete(usuarioCarrinho.get(u));

                usuarioRepository.save(u);
            }

        }

        return l;
    }

    @Transactional
    public Livro editarLivro(Livro livroMod) {

        if (livroMod.getId() == null) throw new ObjetoTransiente("Tentando alterar um objeto transiente.");

        Livro l = livroRepository.recuperarPorIdComLock(livroMod.getId()).orElseThrow(
                () -> new ObjetoNaoEncontrado("Livro não encontrado"));

        for (Autor a : l.getAutores()) {
            a.getLivros().remove(l);
        }

        for (Autor autor : livroMod.getAutores()) {
            Autor a = autorService.obterAutor(autor.getId());
            a.getLivros().add(livroMod);

        }

        return livroRepository.save(livroMod);

    }

    public List<AutorQuery> obterAutoresPorLivro(Long livroId) {

        return livroRepository.acharAutoresPorLivro(livroId);
    }

    public List<Livro> obterLivrosPorGenero(String genero) {
        return livroRepository.acharLivrosPorGenero(genero);

    }

    public Livro atribuirAutorParaLivro(Long idAutor, Long idLivro) {
        Livro l = obterLivro(idLivro);
        Autor a = autorService.obterAutor(idAutor);

        l.getAutores().add(a);
        a.getLivros().add(l);

        autorRepository.save(a);
        return livroRepository.save(l);

    }


    public ResultadoPaginado<LivroDTO> obterLivrosPaginados(int pagina, int tamanho, String titulo) {

        Pageable p = PageRequest.of(pagina, tamanho);
        Page<Livro> livrosPaginado = livroRepository.obterLivrosPaginados(titulo, p);

        List<LivroDTO> livrosDTO = new ArrayList<>();

        for (Livro livro : livrosPaginado.getContent()) {
            LivroDTO l = modelMapper.map(livro, LivroDTO.class);

            livrosDTO.add(l);
        }

        return new ResultadoPaginado<>(
                livrosPaginado.getTotalElements(),
                livrosPaginado.getTotalPages(),
                livrosPaginado.getNumber(),
                livrosDTO
        );
    }

    public ResultadoPaginado<Livro> obterLivrosPaginadosOrdenados(int pagina, int tamanho, String titulo,
                                                                  String coluna, String ordem) {

        Pageable p = PageRequest.of(pagina, tamanho);
        Page<Livro> livrosPaginado = livroRepository.obterLivrosPaginadosOrdenados(titulo, p, coluna, ordem);

        return new ResultadoPaginado<>(
                livrosPaginado.getTotalElements(),
                livrosPaginado.getTotalPages(),
                livrosPaginado.getNumber(),
                livrosPaginado.getContent()
        );
    }


    public List<Livro> recuperarLivrosPorSlugDoGenero(String slug) {
        return livroRepository.findByGeneroSlug(slug);
    }

    public Page<LivroDTO> recuperarLivrosPaginadosPorSlugDoGenero(String slug, Pageable pageable) {

        Page<Livro> livros;

        if (!slug.isEmpty()) {
            livros = livroRepository.recuperarLivrosPaginadosPorSlugDoGenero(slug, pageable);
        } else {
            livros = livroRepository.recuperarLivrosPaginados(pageable);
        }

        return getLivroDTOS(livros);
    }

    private Page<LivroDTO> getLivroDTOS(Page<Livro> livros) {
        List<LivroDTO> livrosDTO = new ArrayList<>();

        for (Livro livro : livros) {
            LivroDTO l = modelMapper.map(livro, LivroDTO.class);

            livrosDTO.add(l);
        }

        return new PageImpl<>(livrosDTO, livros.getPageable(), livrosDTO.size());
    }


}


//Livro l = obterLivro(id);
//
//        for(Item i : l.getItens()){
//Carrinho carrinho = i.getCarrinho();
//Usuario usuario = carrinho.getUsuario();
//
//            if (carrinho.getItens().size() == 1) {
//        usuario.setCarrinhos(new ArrayList<>());
//
//        carrinhoRepository.delete(carrinho);
//
//                usuarioRepository.save(usuario);
//            }
//                    }
//
//
//                    for (Autor a : l.getAutores()) {
//        a.getLivros().remove(l);
//        }
//
//                livroRepository.delete(l);
//
//        return l;