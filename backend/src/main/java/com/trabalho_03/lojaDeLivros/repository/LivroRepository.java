package com.trabalho_03.lojaDeLivros.repository;


import com.trabalho_03.lojaDeLivros.models.AutorQuery;
import com.trabalho_03.lojaDeLivros.models.Livro;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface LivroRepository extends JpaRepository<Livro, Long> {

    @Query("select new  com.trabalho_03.lojaDeLivros.models.AutorQuery(a.nome, a.descricao) from Autor a " +
            "where a in " +
            "(select l.autores from Livro l where l.id = :id)")
    List<AutorQuery> acharAutoresPorLivro(Long id);

    @Query("select l from Livro l join fetch l.autores where l.genero = :genero")
    List<Livro> acharLivrosPorGenero(String genero);

    @Query(value = "select l from " +
                    "Livro as l left outer join fetch l.autores where l.titulo like %:titulo%",

            countQuery = "select count(l) from Livro l where l.titulo like %:titulo%")
    Page<Livro> obterLivrosPaginados(String titulo, Pageable p);

    @Query(value = "select l from Livro l left outer join fetch l.autores where l.titulo like %:titulo% order by " +
            "case when (:col = '' and :ordem = '') then l.id end, " +
            "case when (:col = 'id' and :ordem = 'asc') then l.id end, " +
            "case when (:col = 'id' and :ordem = 'desc') then l.id end desc, " +
            "case when (:col = 'titulo' and :ordem = 'asc') then l.titulo end, " +
            "case when (:col = 'titulo' and :ordem = 'desc') then l.titulo end desc, " +
            "case when (:col = 'genero' and :ordem = 'asc') then l.genero.nome end, " +
            "case when (:col = 'genero' and :ordem = 'desc') then l.genero.nome end desc, " +
            "case when (:col = 'editora' and :ordem = 'asc') then l.editora end, " +
            "case when (:col = 'editora' and :ordem = 'desc') then l.editora end desc, " +
            "case when (:col = 'preco' and :ordem = 'asc') then l.preco end, " +
            "case when (:col = 'preco' and :ordem = 'desc') then l.preco end desc, " +
            "case when (:col = 'data' and :ordem = 'asc') then l.data end, " +
            "case when (:col = 'data' and :ordem = 'desc') then l.data end desc, " +
            "case when (:col = 'quantidade' and :ordem = 'asc') then l.quantidade end, " +
            "case when (:col = 'quantidade' and :ordem = 'desc') then l.quantidade end desc, " +
            "case when (:col = 'paginas' and :ordem = 'asc') then l.paginas end, " +
            "case when (:col = 'paginas' and :ordem = 'desc') then l.paginas end desc, " +
            "case when (:col = 'idioma' and :ordem = 'asc' ) then l.idioma end, " +
            "case when (:col = 'idioma' and :ordem = 'desc' ) then l.idioma end desc",

            countQuery = "select count(l) from Livro l where l.titulo like %:titulo%")
    Page<Livro> obterLivrosPaginadosOrdenados(String titulo, Pageable p, String col, String ordem);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select l from Livro l where l.id = :id")
    Optional<Livro> recuperarPorIdComLock(Long id);

    @Query("select l from Livro l left outer join fetch l.autores " +
            "left outer join fetch l.genero g where g.slug =:slug")
    List<Livro> findByGeneroSlug(String slug);

    @Query(
            value = "select l from Livro l left outer join fetch l.autores " +
                    "left outer join fetch l.genero g where g.slug = :slug order by l.titulo",
            countQuery = "select count(l) from Livro l left outer join l.autores left outer join l.genero g where g.slug = :slug"
    )
    Page<Livro> recuperarLivrosPaginadosPorSlugDoGenero(String slug, Pageable pageable);

    @Query(
            value = "select l from Livro l " +
                    "left outer join fetch l.autores " +
                    "left outer join fetch l.genero " +
                    "order by l.titulo",
            countQuery = "select count(l) from Livro l "
    )
    Page<Livro> recuperarLivrosPaginados(Pageable pageable);


    @Query(nativeQuery = true, value = "select * from livro order by rand() limit 12")
    List<Livro> recuperarLivrosAleatorio();

}
