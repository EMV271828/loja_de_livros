drop table if exists tarefa03.autorLivro;
drop table if exists tarefa03.autores;
drop table if exists tarefa03.livros;

create table tarefa03.autorLivro
(
    autor_id int not null,
    livro_id int not null,
    primary key (autor_id, livro_id),
    foreign key (autor_id) references autores (id),
    foreign key (livro_id) references livros (id)

) ENGINE = INNODB
  CHARACTER SET utf8mb4;


create table tarefa03.livros
(
    id      int not null auto_increment,
    titulo varchar(255),
    genero  varchar(255),
    preco   float,
    data    Date,
    editora varchar(255),
    edicao  int,
    primary key (id)

) ENGINE = INNODB
  CHARACTER SET utf8mb4;

create table tarefa03.autores
(
    id      int not null auto_increment,
    nome varchar(255),
    descricao text
) ENGINE = INNODB
  CHARACTER SET utf8mb4;


# this.titulo = titulo;
# this.genero = genero;
# this.preco = preco;
# this.paginas = paginas;
# this.data = data;
# this.editora = editora;
# this.edicao = edicao;
# this.isbn = isbn;
# this.idioma = idioma;