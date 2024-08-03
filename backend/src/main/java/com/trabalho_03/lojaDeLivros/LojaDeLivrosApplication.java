package com.trabalho_03.lojaDeLivros;

import com.trabalho_03.lojaDeLivros.models.*;
import com.trabalho_03.lojaDeLivros.repository.*;
import com.trabalho_03.lojaDeLivros.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.*;
import java.time.LocalDate;

@SpringBootApplication
public class LojaDeLivrosApplication implements CommandLineRunner {

    @Autowired
    LivroRepository livroRepository;

    @Autowired
    AutorRepository autorRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    GeneroRepository generoRepository;

    @Autowired
    CarrinhoRepository carrinhoRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    LivroService livroService;

    public static void main(String[] args) {
        SpringApplication.run(LojaDeLivrosApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        Usuario usuario = new Usuario("admin", "12345");

        usuarioRepository.save(usuario);

        ArrayList<Genero> generos = new ArrayList<>(
                List.of(
                        new Genero("Ação", "ação"),
                        new Genero("Terror", "terror"),
                        new Genero("Fantasia", "fantasia")
                )
        );

        generoRepository.saveAll(generos);


        ArrayList<Autor> autores = new ArrayList<>(List.of(new Autor("Jane Austen", ""),
                new Autor("Charles Dickens", ""),
                new Autor("Leo Tolstoy", ""),
                new Autor("Mark Twain", ""),
                new Autor("Emily Bronte", ""),
                new Autor("Fyodor Dostoevsky", ""),
                new Autor("George Orwell", ""),
                new Autor("Gabriel Garcia Marquez", ""),
                new Autor("Virginia Woolf", ""),
                new Autor("Haruki Murakami", ""),
                new Autor("J.K. Rowling", ""),
                new Autor("Ernest Hemingway", ""),
                new Autor("Toni Morrison", ""),
                new Autor("J.R.R. Tolkien", ""),
                new Autor("Agatha Christie", ""),
                new Autor("Franz Kafka", ""),
                new Autor("James Baldwin", ""),
                new Autor("Margaret Atwood", ""),
                new Autor("Albert Camus", ""),
                new Autor("Neil Gaiman", ""),
                new Autor("Philip K. Dick", ""),
                new Autor("Octavia E. Butler", ""),
                new Autor("F. Scott Fitzgerald", ""),
                new Autor("Kazuo Ishiguro", ""),
                new Autor("Stephen King", ""),
                new Autor("Chimamanda Ngozi Adichie", ""),
                new Autor("Maya Angelou", ""),
                new Autor("Hermann Hesse", ""),
                new Autor("George R.R. Martin", ""),
                new Autor("Sylvia Plath", "")));

        autorRepository.saveAll(autores);

        ArrayList<String> titulos = new ArrayList<>(
                List.of(
                        "1984",
                        "Ulysses",
                        "O Sol é para Todos",
                        "Orgulho e Preconceito",
                        "O Apanhador no Campo de Centeio",
                        "O Grande Gatsby",
                        "Moby Dick",
                        "Guerra e Paz",
                        "O Hobbit",
                        "Cem Anos de Solidão",
                        "Admirável Mundo Novo",
                        "O Senhor dos Anéis",
                        "Crime e Castigo",
                        "As Vinhas da Ira",
                        "O Retrato de Dorian Gray",
                        "Anna Karenina",
                        "Apanhado no Arame Farpado",
                        "Matadouro 5",
                        "Amada",
                        "Frankenstein",
                        "As Aventuras de Sherlock Holmes",
                        "O Homem Invisível",
                        "A Redoma de Vidro",
                        "O Conto da Aia",
                        "Norwegian Wood",
                        "A Estrada",
                        "Duna",
                        "O Guia do Mochileiro das Galáxias",
                        "O Sol Nasce Sempre",
                        "Middlemarch",
                        "Os Irmãos Karamazov",
                        "A Dança da Morte",
                        "Deuses Americanos",
                        "O Ladrão de Livros",
                        "O Alquimista",
                        "O Poderoso Chefão",
                        "A História Secreta",
                        "E o Vento Levou",
                        "O Morro dos Ventos Uivantes",
                        "A Sangue Frio",
                        "Eu Sei Por Que o Pássaro Canta na Gaiola",
                        "Este Lado do Paraíso"
                )
        );

        ArrayList<String> editoras = new ArrayList<>(
                List.of(
                        "Random House",
                        "Penguin Books",
                        "HarperCollins",
                        "Simon & Schuster",
                        "Macmillan Publishers",
                        "Hachette Livre",
                        "Scholastic Corporation",
                        "Oxford University Press"

                )
        );

        ArrayList<String> linguas = new ArrayList<>(
                List.of(
                        "Inglês",
                        "Espanhol",
                        "Francês",
                        "Alemão",
                        "Chinês",
                        "Árabe",
                        "Russo",
                        "Português",
                        "Japonês",
                        "Hindi",
                        "Turco",
                        "Italiano",
                        "Holandês",
                        "Polonês",
                        "Tailandês",
                        "Tcheco",
                        "Sueco",
                        "Grego",
                        "Dinamarquês",
                        "Finlandês",
                        "Norueguês",
                        "Hebraico",
                        "Húngaro",
                        "Romeno",
                        "Lituano",
                        "Esloveno",
                        "Letão",
                        "Estoniano"
                )
        );

        Random r = new Random();

        for (String t : titulos) {

            Collections.shuffle(autores);

            Livro l = new Livro(
                    t,
                    "livro_imagem_" + r.nextInt(1, 11) + ".jpg",
                    generos.get(r.nextInt(3)),
                    BigDecimal.valueOf(r.nextInt(300, 1001)).add(BigDecimal.valueOf(r.nextInt(0, 99) * 0.01)),
                    LocalDate.of(r.nextInt(1970, 2025), r.nextInt(1, 13), r.nextInt(1, 20)),
                    BigInteger.valueOf(r.nextInt(100, 2000)),
                    editoras.get(r.nextInt(editoras.size())),
                    linguas.get(r.nextInt(linguas.size())),
                    BigInteger.valueOf(r.nextInt(100, 1001)),
                    true,
                    new ArrayList<>(List.of(autores.get(0), autores.get(1), autores.get(2)))
            );

            livroRepository.save(l);
            autores.get(0).getLivros().add(l);
            autores.get(1).getLivros().add(l);
            autores.get(2).getLivros().add(l);
        }

        autorRepository.saveAll(autores);

//        Carrinho c = new Carrinho(LocalDate.now(), usuario);
//
//        carrinhoRepository.save(c);
//
//        Livro l1 = livroService.obterLivro(1L);
//        Livro l2 = livroService.obterLivro(2L);
//
//        Item item = new Item(3, c, l1);
//        Item item2 = new Item(5, c, l2);
//
//        itemRepository.save(item);
//        itemRepository.save(item2);
//
//        c.getItens().add(item);
//        c.getItens().add(item2);
//
//        carrinhoRepository.save(c);
//
//        l1.getItens().add(item);
//        livroRepository.save(l1);
//
//        l2.getItens().add(item2);
//        livroRepository.save(l2);

    }

}

//Usuario usuario = new Usuario("admin", "12345");
//        usuarioRepository.save(usuario);
//
//Genero acao = new Genero("Ação", "ação");
//Genero terror = new Genero("Terror", "terror");
//Genero fantasia = new Genero("Fantasia", "fantasia");
//
//        generoRepository.save(acao);
//        generoRepository.save(terror);
//        generoRepository.save(fantasia);
//
//Autor a = new Autor("AAA", "AAA é um autor");
//
//Autor b = new Autor("BBB", "BBB é um autor");
//
//Autor c = new Autor("CCC", "CCC é um autor");
//
//        autorRepository.save(a);
//        autorRepository.save(b);
//        autorRepository.save(c);
//
//
//List<Autor> autores = new ArrayList<>(List.of(a, b, c));
//
//Livro l = new Livro("titulo1", acao, 12.40,
//        LocalDate.of(2022, Calendar.NOVEMBER, 10),
//        200, "editora1", "idioma2", 1000, true, autores);
//
//
//Livro l2 = new Livro("titulo2", acao, 12.40,
//        LocalDate.of(2022, Calendar.NOVEMBER, 13),
//        100, "editora1", "idioma2", 1000, true, autores.subList(0, 1));
//
//
//Livro l3 = new Livro("titulo3", terror, 12.40,
//        LocalDate.of(2022, Calendar.NOVEMBER, 14),
//        840, "editora2", "idioma3", 1000, true, autores.subList(1, 3));
//
//Livro l4 = new Livro("titulo4", terror, 12.40,
//        LocalDate.of(2022, Calendar.NOVEMBER, 14),
//        700, "editora4", "idioma3", 1000, true, autores.subList(1, 3));
//
//Livro l5 = new Livro("titulo5", fantasia, 12.40,
//        LocalDate.of(2022, Calendar.NOVEMBER, 14),
//        450, "editora4", "idioma3", 1000, true, autores.subList(0, 1));
//
//        a.setLivros(new ArrayList<>(Arrays.asList(l, l2, l5)));
//        b.setLivros(new ArrayList<>(List.of(l, l2, l3, l4)));
//        c.setLivros(new ArrayList<>(List.of(l, l3, l4)));
//
//        acao.setLivros(new ArrayList<>(Arrays.asList(l, l2)));
//        terror.setLivros(new ArrayList<>(Arrays.asList(l3, l4)));
//        acao.setLivros(new ArrayList<>(List.of(l5)));
//
//        livroRepository.save(l);
//        livroRepository.save(l2);
//        livroRepository.save(l3);
//        livroRepository.save(l4);
//        livroRepository.save(l5);
//
//        autorRepository.save(a);
//        autorRepository.save(b);
//        autorRepository.save(c);