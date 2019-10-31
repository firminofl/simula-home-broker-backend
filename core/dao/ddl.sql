CREATE TABLE IF NOT EXISTS homebroker (
	ativo VARCHAR(5) NOT NULL,
	ultimo_negocio DECIMAL,
	preco_minimo DECIMAL,
	preco_abertura DECIMAL,
	preco_maximo DECIMAL,
	volume BIGINT,
	PRIMARY KEY (ativo)
);

CREATE TABLE IF NOT EXISTS suitability(
	id INTEGER NOT NULL,
	pergunta VARCHAR(200) NOT NULL,
	resposta VARCHAR(200) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS usuario(
	cpf VARCHAR(14) NOT NULL,
	nome VARCHAR(100) NOT NULL,
	grau_investidor VARCHAR(25) NOT NULL,
	ass_eletronica VARCHAR(12) NOT NULL,
	id_suitability_fk INTEGER NOT NULL,
	PRIMARY KEY (cpf)
);
ALTER TABLE usuario ADD CONSTRAINT usuario_suitability_fk FOREIGN KEY (id_suitability_fk) REFERENCES suitability(id) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS carteira_variavel(
	papel VARCHAR(5),
	quantidade INTEGER,
	preco_medio DECIMAL,
	valor_pago DECIMAL,
	total_investido DECIMAL,
	cpf_usuario_fk VARCHAR(14) NOT NULL,
	PRIMARY KEY (Papel)
);
ALTER TABLE carteira_variavel ADD CONSTRAINT carteira_variavel_usuario_fk FOREIGN KEY (cpf_usuario_fk) REFERENCES usuario(cpf) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS carteira_fixa(
	titulo VARCHAR(50) NOT NULL,
	vencimento DATE,
	quantidade DECIMAL,
	valor_atual DECIMAL,
	taxa DECIMAL,
	cpf_usuario_fk VARCHAR(14) NOT NULL,
	PRIMARY KEY (Titulo)
);
ALTER TABLE carteira_fixa ADD CONSTRAINT carteira_fixa_usuario_fk FOREIGN KEY (cpf_usuario_fk) REFERENCES usuario(cpf) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS tesouro(
	titulo VARCHAR(70),
	vencimento DATE,
	rentabilidade DECIMAL,
	valor_minimo DECIMAL
);