 database: hp_desafio



TABELA
CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    patrono VARCHAR(100)
);  

INSERT INTO bruxos (nome, idade, casa, habilidade, status, patrono) VALUES ('harry potter', 18, 'grifinoria', 'voar', 'vivo', 'veado');

CREATE TABLE varinha (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento DECIMAL (10,2) NOt NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL
);

INSERT INTO varinha (material, comprimento, nucleo, data_criacao) VALUES ('madeira', 30.5, 'pena de fenix', '1991-07-31');