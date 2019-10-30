CREATE TABLE IF NOT EXISTS homebroker (
	ativo VARCHAR(5) NOT NULL,
	ultNegocio DECIMAL,
	precoMin DECIMAL,
	precoAbertura DECIMAL,
	precoMax DECIMAL,
	volume BIGINT,
	PRIMARY KEY (ativo)
);