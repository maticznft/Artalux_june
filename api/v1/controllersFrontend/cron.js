import axios from 'axios';
// var cron = require('node-cron');
import ChartData from '../../models/chartdata'

export const cron = async(req,res)=>{
    
    var CHart_data =  new Date().getDate()
    ChartData.findOne({created:{'$eq':CHart_data}})
    .then((data)=>{
        console.log("danny",data)
        
        if(data == null){
            var payload ={ 
                query: "\n  query(\n    $baseAddress: String\n    $quoteAddress: String\n    $from: ISO8601DateTime!\n    $to: ISO8601DateTime!\n    $interval: Int\n\n  ) {\n    ethereum(network: bsc) {\n      dexTrades(\n    options:{limit:1000 }    baseCurrency: { is: $baseAddress }\n        quoteCurrency: { is: $quoteAddress }\n        date: { between: [$from, $to] }\n        priceAsymmetry: { lt: 0.7 }\n        ) {\n        timeInterval {\n          day(count: $interval)\n        }\n        buyCurrency: baseCurrency {\n          symbol\n          address\n        }\n        buyAmount: baseAmount\n        sellCurrency: quoteCurrency {\n          symbol\n          address\n        }\n        volume: quoteAmount\n        trades: count\n        high: quotePrice(calculate: maximum)\n        low: quotePrice(calculate: minimum)\n        open: minimum(of: block, get: quote_price)\n        close: maximum(of: block, get: quote_price)\n      }\n    }\n  }\n"
                ,
                variables: {
                  "from": "2022-01-01T00:15:33+03:00",
                  "to": new Date(),
                  "interval": 1,
                  "baseAddress": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                  "quoteAddress":"0x8cb6aa6e8575d87961bd01d2ff09007c2499ec56"  
                 } }
                axios.post("https://graphql.bitquery.io",    
                            payload ,
                            {headers: {
                            'X-API-KEY': 'BQYeIh3H4JsBX2UaeZh8sK6ZzQBY2mTA'
                            }},
                  )
                  .then((datas)=>{
                   console.log("data", datas.data );
                    if(datas.data && datas.data.data && datas.data.data.ethereum && datas.data.data.ethereum.dexTrades&&datas.data.data.ethereum.dexTrades.length>0){
                    ChartData.update({created:{'$ne':CHart_data}},{$set:{ timestamp:new Date(),created:CHart_data,data: datas.data.data.ethereum.dexTrades}})
                    .then((data)=>{
                        res.json(data)
                    })
                    .catch(e=>{
                        res.json([])

                    })
                    }
                  })         
        
        }
        else{
            res.json(data.data)
                   
        }
    })
    .catch(e=>{
        console.log("e cecj",e);
        res.json([])
    })
 }

