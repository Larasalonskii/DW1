DROP TABLE IF EXISTS AUTOR, LIVRO, usuarios;

CREATE TABLE AUTOR(
id_autor INT,
nome_autor CHAR (200),
nacionalidade CHAR (200)
);
CREATE TABLE LIVRO(
id_livro INT,
titulo CHAR(200),
ano_pulicacao INT,
genero CHAR(200),
id_autor INT
);

-- ========================================
-- SCRIPT DE CRIAÇÃO E POPULAÇÃO DO BANCO
-- ========================================

DROP TABLE IF EXISTS LIVRO;
DROP TABLE IF EXISTS AUTOR;

CREATE TABLE AUTOR(
    id_autor INT,
    nome_autor CHAR (200),
    nacionalidade CHAR (200)
);

CREATE TABLE LIVRO(
    id_livro INT,
    titulo CHAR(200),
    ano_pulicacao INT,
    genero CHAR(200),
    id_autor INT
);

-- ========================================
-- AUTORES (50)
-- ========================================
INSERT INTO AUTOR (id_autor, nome_autor, nacionalidade) VALUES
(1, 'Machado de Assis', 'Brasileira'),
(2, 'Clarice Lispector', 'Brasileira'),
(3, 'J.K. Rowling', 'Britânica'),
(4, 'George Orwell', 'Britânica'),
(5, 'Gabriel García Márquez', 'Colombiana'),
(6, 'J.R.R. Tolkien', 'Britânica'),
(7, 'Jorge Amado', 'Brasileira'),
(8, 'Agatha Christie', 'Britânica'),
(9, 'Paulo Coelho', 'Brasileira'),
(10, 'Isaac Asimov', 'Americana'),
(11, 'Carlos Drummond de Andrade', 'Brasileira'),
(12, 'Fernando Pessoa', 'Portuguesa'),
(13, 'José Saramago', 'Portuguesa'),
(14, 'Mario Vargas Llosa', 'Peruana'),
(15, 'Jorge Luis Borges', 'Argentina'),
(16, 'Franz Kafka', 'Tcheca'),
(17, 'Fiódor Dostoiévski', 'Russa'),
(18, 'Liev Tolstói', 'Russa'),
(19, 'Victor Hugo', 'Francesa'),
(20, 'Alexandre Dumas', 'Francesa'),
(21, 'Jane Austen', 'Britânica'),
(22, 'Charles Dickens', 'Britânica'),
(23, 'Virginia Woolf', 'Britânica'),
(24, 'Ernest Hemingway', 'Americana'),
(25, 'F. Scott Fitzgerald', 'Americana'),
(26, 'Mark Twain', 'Americana'),
(27, 'Stephen King', 'Americana'),
(28, 'Dan Brown', 'Americana'),
(29, 'Suzanne Collins', 'Americana'),
(30, 'George R. R. Martin', 'Americana'),
(31, 'Neil Gaiman', 'Britânica'),
(32, 'Aldous Huxley', 'Britânica'),
(33, 'Oscar Wilde', 'Irlandesa'),
(34, 'Albert Camus', 'Francesa'),
(35, 'Jean-Paul Sartre', 'Francesa'),
(36, 'Umberto Eco', 'Italiana'),
(37, 'Italo Calvino', 'Italiana'),
(38, 'Haruki Murakami', 'Japonesa'),
(39, 'Yukio Mishima', 'Japonesa'),
(40, 'Gabriel Garcia Lorca', 'Espanhola'),
(41, 'Miguel de Cervantes', 'Espanhola'),
(42, 'Cecília Meireles', 'Brasileira'),
(43, 'Graciliano Ramos', 'Brasileira'),
(44, 'Erico Verissimo', 'Brasileira'),
(45, 'Lygia Fagundes Telles', 'Brasileira'),
(46, 'Rachel de Queiroz', 'Brasileira'),
(47, 'Monteiro Lobato', 'Brasileira'),
(48, 'Eça de Queiroz', 'Portuguesa'),
(49, 'Antoine de Saint-Exupéry', 'Francesa'),
(50, 'Homero', 'Grega');

-- ========================================
-- LIVROS (100+)
-- ========================================
INSERT INTO LIVRO (id_livro, titulo, ano_pulicacao, genero, id_autor) VALUES
(1, 'Dom Casmurro', 1899, 'Romance', 1),
(2, 'Memórias Póstumas de Brás Cubas', 1881, 'Romance', 1),
(3, 'Quincas Borba', 1891, 'Romance', 1),
(4, 'A Hora da Estrela', 1977, 'Romance', 2),
(5, 'Laços de Família', 1960, 'Contos', 2),
(6, 'A Paixão Segundo G.H.', 1964, 'Romance', 2),
(7, 'Harry Potter e a Pedra Filosofal', 1997, 'Fantasia', 3),
(8, 'Harry Potter e a Câmara Secreta', 1998, 'Fantasia', 3),
(9, 'Harry Potter e o Prisioneiro de Azkaban', 1999, 'Fantasia', 3),
(10, 'Harry Potter e o Cálice de Fogo', 2000, 'Fantasia', 3),
(11, '1984', 1949, 'Ficção Distópica', 4),
(12, 'A Revolução dos Bichos', 1945, 'Sátira Política', 4),
(13, 'Cem Anos de Solidão', 1967, 'Realismo Mágico', 5),
(14, 'O Amor nos Tempos do Cólera', 1985, 'Romance', 5),
(15, 'Crônica de uma Morte Anunciada', 1981, 'Romance', 5),
(16, 'O Senhor dos Anéis: A Sociedade do Anel', 1954, 'Fantasia', 6),
(17, 'O Senhor dos Anéis: As Duas Torres', 1954, 'Fantasia', 6),
(18, 'O Senhor dos Anéis: O Retorno do Rei', 1955, 'Fantasia', 6),
(19, 'O Hobbit', 1937, 'Fantasia', 6),
(20, 'Gabriela, Cravo e Canela', 1958, 'Romance', 7),
(21, 'Capitães da Areia', 1937, 'Romance', 7),
(22, 'Dona Flor e Seus Dois Maridos', 1966, 'Romance', 7),
(23, 'Assassinato no Expresso Oriente', 1934, 'Policial', 8),
(24, 'E Não Sobrou Nenhum', 1939, 'Policial', 8),
(25, 'Morte no Nilo', 1937, 'Policial', 8),
(26, 'O Alquimista', 1988, 'Ficção', 9),
(27, 'Brida', 1990, 'Ficção', 9),
(28, 'Onze Minutos', 2003, 'Romance', 9),
(29, 'Fundação', 1951, 'Ficção Científica', 10),
(30, 'Eu, Robô', 1950, 'Ficção Científica', 10),
(31, 'O Fim da Eternidade', 1955, 'Ficção Científica', 10),
(32, 'Sentimento do Mundo', 1940, 'Poesia', 11),
(33, 'A Rosa do Povo', 1945, 'Poesia', 11),
(34, 'Mensagem', 1934, 'Poesia', 12),
(35, 'O Livro do Desassossego', 1982, 'Prosa Poética', 12),
(36, 'Ensaio sobre a Cegueira', 1995, 'Romance', 13),
(37, 'O Evangelho Segundo Jesus Cristo', 1991, 'Romance', 13),
(38, 'Memorial do Convento', 1982, 'Romance', 13),
(39, 'A Cidade e os Cachorros', 1963, 'Romance', 14),
(40, 'A Festa do Bode', 2000, 'Romance', 14),
(41, 'Ficções', 1944, 'Contos', 15),
(42, 'O Aleph', 1949, 'Contos', 15),
(43, 'A Metamorfose', 1915, 'Novela', 16),
(44, 'O Processo', 1925, 'Romance', 16),
(45, 'O Castelo', 1926, 'Romance', 16),
(46, 'Crime e Castigo', 1866, 'Romance', 17),
(47, 'Os Irmãos Karamázov', 1880, 'Romance', 17),
(48, 'O Idiota', 1869, 'Romance', 17),
(49, 'Guerra e Paz', 1869, 'Romance', 18),
(50, 'Anna Karênina', 1877, 'Romance', 18),
(51, 'Os Miseráveis', 1862, 'Romance', 19),
(52, 'O Corcunda de Notre-Dame', 1831, 'Romance', 19),
(53, 'Os Três Mosqueteiros', 1844, 'Aventura', 20),
(54, 'O Conde de Monte Cristo', 1844, 'Aventura', 20),
(55, 'Orgulho e Preconceito', 1813, 'Romance', 21),
(56, 'Razão e Sensibilidade', 1811, 'Romance', 21),
(57, 'Grandes Esperanças', 1861, 'Romance', 22),
(58, 'Oliver Twist', 1837, 'Romance', 22),
(59, 'Um Conto de Natal', 1843, 'Novela', 22),
(60, 'Mrs. Dalloway', 1925, 'Romance', 23),
(61, 'Rumo ao Farol', 1927, 'Romance', 23),
(62, 'O Velho e o Mar', 1952, 'Novela', 24),
(63, 'Por Quem os Sinos Dobram', 1940, 'Romance', 24),
(64, 'O Grande Gatsby', 1925, 'Romance', 25),
(65, 'Suave É a Noite', 1934, 'Romance', 25),
(66, 'As Aventuras de Tom Sawyer', 1876, 'Aventura', 26),
(67, 'As Aventuras de Huckleberry Finn', 1884, 'Aventura', 26),
(68, 'O Iluminado', 1977, 'Terror', 27),
(69, 'It - A Coisa', 1986, 'Terror', 27),
(70, 'Carrie, a Estranha', 1974, 'Terror', 27),
(71, 'O Código Da Vinci', 2003, 'Suspense', 28),
(72, 'Anjos e Demônios', 2000, 'Suspense', 28),
(73, 'Jogos Vorazes', 2008, 'Distopia', 29),
(74, 'Em Chamas', 2009, 'Distopia', 29),
(75, 'A Esperança', 2010, 'Distopia', 29),
(76, 'A Guerra dos Tronos', 1996, 'Fantasia', 30),
(77, 'A Fúria dos Reis', 1998, 'Fantasia', 30),
(78, 'Deuses Americanos', 2001, 'Fantasia', 31),
(79, 'Coraline', 2002, 'Fantasia', 31),
(80, 'Admirável Mundo Novo', 1932, 'Ficção Distópica', 32),
(81, 'O Retrato de Dorian Gray', 1890, 'Romance', 33),
(82, 'O Estrangeiro', 1942, 'Romance', 34),
(83, 'A Peste', 1947, 'Romance', 34),
(84, 'A Náusea', 1938, 'Romance', 35),
(85, 'O Nome da Rosa', 1980, 'Romance', 36),
(86, 'O Pêndulo de Foucault', 1988, 'Romance', 36),
(87, 'Se um Viajante numa Noite de Inverno', 1979, 'Romance', 37),
(88, 'As Cidades Invisíveis', 1972, 'Romance', 37),
(89, 'Norwegian Wood', 1987, 'Romance', 38),
(90, 'Kafka à Beira-Mar', 2002, 'Romance', 38),
(91, '1Q84', 2009, 'Romance', 38),
(92, 'Confissões de uma Máscara', 1949, 'Romance', 39),
(93, 'Romanceiro Cigano', 1928, 'Poesia', 40),
(94, 'Dom Quixote', 1605, 'Romance', 41),
(95, 'Romanceiro da Inconfidência', 1953, 'Poesia', 42),
(96, 'Vidas Secas', 1938, 'Romance', 43),
(97, 'São Bernardo', 1934, 'Romance', 43),
(98, 'O Tempo e o Vento', 1949, 'Romance', 44),
(99, 'Ciranda de Pedra', 1954, 'Romance', 45),
(100, 'O Quinze', 1930, 'Romance', 46),
(101, 'Sítio do Picapau Amarelo', 1920, 'Infantil', 47),
(102, 'Reinações de Narizinho', 1931, 'Infantil', 47),
(103, 'Os Maias', 1888, 'Romance', 48),
(104, 'O Primo Basílio', 1878, 'Romance', 48),
(105, 'O Pequeno Príncipe', 1943, 'Fábula', 49),
(106, 'Ilíada', -800, 'Épico', 50),
(107, 'Odisseia', -700, 'Épico', 50);





CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);