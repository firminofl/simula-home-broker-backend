INSERT INTO public.suitability(
            id, pergunta, resposta)
    VALUES (1, 'Tem medo de perder dinheiro na bolsa?', 'Não.');
    
INSERT INTO public.usuario(
            cpf, nome, grau_investidor, ass_eletronica, id_suitability_fk)
    VALUES ('123.123.123-12', 'Filipe Firmino', 'Agressivo', 'sml3uc0', 1);