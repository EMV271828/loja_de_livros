package com.trabalho_03.lojaDeLivros.repository;
import com.trabalho_03.lojaDeLivros.models.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    @Query("select c from Carrinho c left join c.usuario u where u.id = :usuarioId")
    Carrinho obterCarrinhoPorUsuarioId(Long usuarioId);
}
