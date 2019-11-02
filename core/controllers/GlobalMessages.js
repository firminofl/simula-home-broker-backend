const PORT = 3001
const API_KEY = `U9XAE4AJ73JY5S22`
const IMMUTABLE_URL = `https://www.alphavantage.co/query?function=`
let TYPE = ['GLOBAL_QUOTE', 'TIME_SERIES_DAILY_ADJUSTED', 'TIME_SERIES_DAILY']

const Message = {
    PORT,
    API_KEY,
    IMMUTABLE_URL,
    TYPE,
    UNABLE_TO_FIND_SERVER: `Impossível alcançar o servidor que fornece a API.`,
    REQUEST_TO_SERVER_FAILED: 'Requisição no servidor que fornece os dados da API está apresentando problemas.',
    SUCCESS_SAVE_DATABASE: 'Sucesso ao salvar no banco de dados!',
    ERROR_SAVE_DATABASE: 'Erro ao salvar no banco de dados!',
    ACTIVE_EXITS_DATABASE: 'Este ativo já existe salvo na tabela.',
    ERROR_SELECT_ACTIVES: 'Erro ao buscar ativos salvos no bancos de dados.',
    SUCCESS_SAVE_ACTIVE_CARTEIRA_VARIAVEL: 'Ordem de compra efetuada com sucesso!',
    ERROR_SAVE_ACTIVE_CARTEIRA_VARIAVEL: 'Erro ao efetuar a ordem de compra do ativo!',
    SUCCESS_UPDATE_ACTIVE_CARTEIRA_VARIAVEL: 'Sucesso ao atualizar as informações do ativo na renda variável.',
    ERROR_UPDATE_ACTIVE_CARTEIRA_VARIAVEL: 'Erro ao atualizar as informações do ativo na renda variável.',
    SUCCESS_ZERO_ACTIVE_CARTEIRA_VARIAVEL: 'Sucesso ao vender o ativo. Posição zerada neste ativo.',
    ERROR_ZERO_ACTIVE_CARTEIRA_VARIAVEL: 'Erro ao vender o ativo. Não foi possível zerar sua posição nele.'

}

module.exports = Message;