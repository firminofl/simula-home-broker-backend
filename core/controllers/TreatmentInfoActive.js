/**
 * Body retornado na requisição da API externa:
 * '{\n                                        Position (0)
 * "Global Quote": {\n                         Position (1)
 * "01. symbol": "LEVE3.SA",\n                 Position (2)       
 * "02. open": "24.8700",\n                    Position (3)  
 * "03. high": "24.9000",\n                    Position (4) 
 * "04. low": "24.0500",\n                     Position (5)
 * "05. price": "24.4600",\n                   Position (6)  
 * "06. volume": "196800",\n                   Position (7)   
 * "07. latest trading day": "2019-10-23",\n   Position (8)     
 * "08. previous close": "24.7500",\n          Position (9)
 * "09. change": "-0.2900",\n                  Position (10)
 * "10. change percent": "-1.1717%"\n          Position (11)
 * }\n}'
 * Então vou cortando os valores para obte-los da forma mais real possível, utilizando o método SPLIT
 */
module.exports = {
    treatmentActive(data, symbol) {
        let open = ``,
            high = ``,
            low = ``,
            price = ``,
            volume = ``,
            latestTrading = ``,
            changePercent = ``;

        //Cortando as informações para obte-las de modo separado
        open = data.split('\n')[3].split(':')[1].split(',')[0].split('"')[1] //.split('0')[0]
        high = data.split('\n')[4].split(':')[1].split(',')[0].split('"')[1] //.split('0')[0]
        low = data.split('\n')[5].split(':')[1].split(',')[0].split('"')[1] //.split('0')[0]
        price = data.split('\n')[6].split(':')[1].split(',')[0].split('"')[1] //.split('0')[0]
        volume = data.split('\n')[7].split(':')[1].split(',')[0].split('"')[1] //.split('0')[0]
        latestTrading = data.split('\n')[8].split(':')[1].split(',')[0].split('"')[1] //.split('0')[0]
        changePercent = data.split('\n')[11].split(':')[1].split(',')[0].split('"')[1] //.split('0')[0]

        //Convertendo a data do padrão americano para o padrão brasileiro
        let date = new Date(latestTrading)
        latestTrading = `${(date.getDate() < 10 ? '0' : '') + (date.getDate() + 1)}/${((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))}/${date.getFullYear()}`;

        //Enviando a resposta do que foi obtido no servidor para o front-end
        active = {
            symbol,
            open,
            high,
            low,
            price,
            volume,
            latestTrading,
            changePercent
        }

        return active;
    }
}