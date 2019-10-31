-- Drop tables
DROP TABLE homebroker;
DROP TABLE suitability;
DROP TABLE usuario;
DROP TABLE carteira_variavel;
DROP TABLE carteira_fixa;
DROP TABLE tesouro;

-- Table HomeBroker
INSERT INTO public.homebroker(
            ativo, ultimo_negocio, preco_minimo, preco_abertura, preco_maximo, 
            volume)
    VALUES (?, ?, ?, ?, ?, 
            ?);

UPDATE public.homebroker
   SET ativo=?, ultimo_negocio=?, preco_minimo=?, preco_abertura=?, 
       preco_maximo=?, volume=?
 WHERE <condition>;

DELETE FROM public.homebroker
 WHERE <condition>;
-- End of HomeBroker

-- Table Suitability
INSERT INTO public.suitability(
            id, pergunta, resposta)
    VALUES (?, ?, ?);

UPDATE public.suitability
   SET id=?, pergunta=?, resposta=?
 WHERE <condition>;

DELETE FROM public.suitability
 WHERE <condition>;
-- End of Suitability

-- Table Usuario
INSERT INTO public.usuario(
            cpf, nome, grau_investidor, ass_eletronica, id_suitability_fk)
    VALUES (?, ?, ?, ?, ?);

UPDATE public.usuario
   SET cpf=?, nome=?, grau_investidor=?, ass_eletronica=?, id_suitability_fk=?
 WHERE <condition>;

DELETE FROM public.usuario
 WHERE <condition>;
-- End of Usuario

-- Table Carteira Variavel
INSERT INTO public.carteira_variavel(
            papel, quantidade, preco_medio, valor_pago, total_investido, 
            cpf_usuario_fk)
    VALUES (?, ?, ?, ?, ?, 
            ?);

UPDATE public.carteira_variavel
   SET papel=?, quantidade=?, preco_medio=?, valor_pago=?, total_investido=?, 
       cpf_usuario_fk=?
 WHERE <condition>;

DELETE FROM public.carteira_variavel
 WHERE <condition>;
-- End of Carteira Variavel

-- Table Carteira Fixa
INSERT INTO public.carteira_fixa(
            titulo, vencimento, quantidade, valor_atual, taxa, cpf_usuario_fk)
    VALUES (?, ?, ?, ?, ?, ?);

UPDATE public.carteira_fixa
   SET titulo=?, vencimento=?, quantidade=?, valor_atual=?, taxa=?, 
       cpf_usuario_fk=?
 WHERE <condition>;

DELETE FROM public.carteira_fixa
 WHERE <condition>;
-- End of Carteira Fixa

-- Table Tesouro
INSERT INTO public.tesouro(
            titulo, vencimento, rentabilidade, valor_minimo)
    VALUES (?, ?, ?, ?);

UPDATE public.tesouro
   SET titulo=?, vencimento=?, rentabilidade=?, valor_minimo=?
 WHERE <condition>;

DELETE FROM public.tesouro
 WHERE <condition>;
-- End of Tesouro