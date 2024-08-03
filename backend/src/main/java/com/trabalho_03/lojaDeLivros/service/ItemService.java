package com.trabalho_03.lojaDeLivros.service;

import com.trabalho_03.lojaDeLivros.exceptions.ObjetoNaoEncontrado;
import com.trabalho_03.lojaDeLivros.exceptions.ObjetoTransiente;
import com.trabalho_03.lojaDeLivros.models.*;
import com.trabalho_03.lojaDeLivros.repository.CarrinhoRepository;
import com.trabalho_03.lojaDeLivros.repository.ItemRepository;
import com.trabalho_03.lojaDeLivros.repository.LivroRepository;
import com.trabalho_03.lojaDeLivros.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;


@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    CarrinhoRepository carrinhoRepository;

    @Autowired
    LivroRepository livroRepository;

    @Autowired
    LivroService livroService;


    public Item buscarItem(Long id) {

        if (id == null) throw new ObjetoTransiente("Item não registrado");

        return itemRepository.findById(id).orElseThrow(() -> new ObjetoNaoEncontrado("Item não encontrado"));
    }

    public Item criarItem(ItemDTO itemDTO, Long idDoUsuario) {

        Item item = new Item();

        item.setQuantidade(itemDTO.getQuantidade());

        Usuario buscaUsuario = usuarioRepository
                .findById(idDoUsuario)
                .orElseThrow(() -> new ObjetoNaoEncontrado("Usuário não encontrado"));

        Livro livroDoItem = livroService.obterLivro(itemDTO.getLivroId());

        item.setLivro(livroDoItem);

        livroDoItem.getItens().add(item);

        if (itemDTO.getCarrinhoId() == null) {

            Carrinho carrinho = new Carrinho(LocalDate.now(), buscaUsuario);
            buscaUsuario.getCarrinhos().add(carrinho);

            carrinhoRepository.save(carrinho);
            usuarioRepository.save(buscaUsuario);

            carrinho.getItens().add(item);

            item.setCarrinho(carrinho);

            itemRepository.save(item);

            livroRepository.save(livroDoItem);

            carrinhoRepository.save(carrinho);

        } else {

            Carrinho carrinhoDoUsuario = buscaUsuario.getCarrinhos().stream().filter(
                    carrinho -> carrinho.getId().equals(itemDTO.getCarrinhoId())
            ).findFirst().orElseThrow(() -> new ObjetoNaoEncontrado("O carrinho deste usuário não foi encontrado"));

            carrinhoDoUsuario.getItens().add(item);

            item.setCarrinho(carrinhoDoUsuario);

            itemRepository.save(item);

            livroRepository.save(livroDoItem);

            carrinhoRepository.save(carrinhoDoUsuario);
        }

        return item;

    }

    public Item deletarItem(Long id, Long usuarioId) {

        Item item = buscarItem(id);

        Usuario buscaUsuario = usuarioRepository
                .findById(usuarioId)
                .orElseThrow(() -> new ObjetoNaoEncontrado("Usuário não encontrado"));

        Carrinho carrinhoDoUsuario = buscaUsuario.getCarrinhos().stream().filter(
                carrinho -> carrinho.getId().equals(item.getCarrinho().getId())
        ).findFirst().orElseThrow(() -> new ObjetoNaoEncontrado("Carrinho não encontrado"));

        Livro livroDoItem = item.getLivro();
        livroDoItem.getItens().remove(item);
        livroRepository.save(livroDoItem);

        if (carrinhoDoUsuario.getItens().size() == 1) {
            buscaUsuario.setCarrinhos(new ArrayList<>());
            carrinhoRepository.delete(carrinhoDoUsuario);
            usuarioRepository.save(buscaUsuario);

        } else {
            carrinhoDoUsuario.getItens().remove(item);
            livroDoItem.getItens().remove(item);
            carrinhoRepository.save(carrinhoDoUsuario);
        }

        itemRepository.delete(item);

        return item;

    }

    @Transactional
    public Item alterarItem(Item item) {
        Item itemOriginal = buscarItem(item.getId());

        itemOriginal.setQuantidade(item.getQuantidade());

        return itemRepository.save(itemOriginal);
    }
}
