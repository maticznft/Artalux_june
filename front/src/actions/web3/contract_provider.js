import Web3 from "web3";
import config from '../../lib/config'
import SINGLE from '../../ABI/SINGLE.json'
import MULTIPLE from '../../ABI/MULTIPLE.json'
import DETH_ABI from '../../ABI/DETH_ABI.json'
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import Web3Utils from 'web3-utils'
import { type } from "jquery";

// const web3=new Web3(config.web3_global)
// ////("balance",web3)



export default function useContractProviderHook() {
    const Wallet_Details = useSelector(state => state.wallet_connect_context);
    useEffect(() => { }, [Wallet_Details.providers])
    const web3 = new Web3(Wallet_Details.providers)

    const contrat_connection = async (abi_Array, address) => {
        if (web3) {
            var contract_value = await new web3.eth.Contract(
                abi_Array, address
            );
            return contract_value;
        }
    }

    const Token_Balance_Calculation = async (wallet_Address, token_Address) => {
        try {
            ////("com here");
            const ConnectContract = await contrat_connection(DETH_ABI, token_Address)
            var bidAMt = await ConnectContract.methods.balanceOf(wallet_Address).call();
            if(bidAMt>0)
            return Number(web3.utils.fromWei(String(bidAMt)))
            else
            return 0
        }
        catch (e) {
            ////("com here",e);
            return 0
        }
    }

    const wallet_Balance_Calculation = async (wallet_Address) => {
        try {
            if (web3 != null) {
                if (localStorage.walletConnectType === 'wc' || localStorage.walletconnect != null) {
                    var bln = await web3.eth.getBalance(wallet_Address)
                    var wallet_Address_balance = Number(web3.utils.fromWei(bln))
                }
                else {
                    var wallet_Address_balance = await web3.eth.getBalance(wallet_Address)
                        .then(async (val) => {
                            wallet_Address_balance = web3.utils.fromWei(String(val));
                            return Number(wallet_Address_balance)
                        })
                }
                return wallet_Address_balance
            }
        }
        catch (e) {

            return 0
        }

    }
    const TokenExitsOrNotFunc = async(type,contractAddress,Token_Address,CoinName) => {
        //("token exist or nor i/p data ",type,contractAddress,Token_Address,CoinName);
        try{
            const ConnectContract = await contrat_connection(type == 721 ? SINGLE : MULTIPLE, contractAddress)
        var tokenAddress = await ConnectContract.methods.getTokenAddress(CoinName).call()
        //("token exist or nor tok addr ",tokenAddress,Token_Address);
        ////("dsadsajdsa",tokenAddress,type,contractAddress,Token_Address,CoinName)
        // if(String(tokenAddress).toLowerCase() == Token_Address)   {
        if(tokenAddress == Token_Address)   {
            return true;
        } 
        else
            return false

        }
          catch(e){
              ////("dsadsajdsa",e)
              return false
          }
      }
    var price_calculation = async (data,roy) => {
        //create,orderplace
        try{
            var price =  data;
            var weii = price*1e6
            var ser_per = (weii/100000000)*((Wallet_Details.sellerfee/config.decimalvalues)*1000000)
            var roy_per = (weii/100000000)*((roy)*1000000)
            var mulWei = ((weii) - (ser_per+roy_per));
            var getVal = Number(mulWei)/1e6;
            ////("you will get lower",price,weii,ser_per,roy_per,getVal);
            return getVal

        }
        catch(e){
            return false
        }
    }

    var buy_bid_price_calculation   =   async(newPrice,royality,decimal,pricedegit)=>{
        /**old one
        var serfee = (toMid)*((Wallet_Details.buyerfee/config.decimalvalues)*1000000)/100000000
        var totfee = serfee + toMid
        if(decimal == 18)
        {
                var tot2cont = web3.utils.toWei(String(Number((Number(totfee))/1000000)))
                var aprrove = web3.utils.toWei(String(((Number(totfee))/1000000)))
        }
        else{
                var tot2cont = web3.utils.toWei(String(Number((Number(totfee))/1000000)))
                var dec = 18 - (decimal);
                var aprrove = ((tot2cont)/10**dec)  

        }
        */
              
       
        // if(String(data.price).includes(".")){
        //     pricedegit = String(data.price).split(".")[1].length
        // }
        // var price = (typeof data.price != 'undefined') ? data.price : TokenPrice;
        // var quantity = (typeof data.quantity != 'undefined') ? data.quantity : NoOfToken;
        // var newPrice = item.type == 721 ? (price * (10 ** pricedegit)) : (quantity * (price * (10 ** pricedegit)) );
        if (String(Wallet_Details.buyerfee).includes('.'))
                var service = (Wallet_Details.buyerfee/1e17)/1000
            else
                var service = (Wallet_Details.buyerfee/1e18)/100

        var totfee=0
        if(pricedegit >= 1){
        //var toMid = newPrice
        var serfee = (newPrice * service) 
         totfee = ( newPrice + serfee ) / 10**pricedegit
      
        if(decimal == 18){
        //    var tot2cont = web3.utils.toWei(String(totfee / (10 ** pricedegit)))
           var aprrove = web3.utils.toWei(String(totfee))
        }
        else{
        //    var tot2cont = web3.utils.toWei(String(totfee / (10 ** pricedegit)))
           var aprrove = web3.utils.toWei(String(totfee))/(10 ** (18 - decimal))
        }
        }
        else{
           
            var serfee = (newPrice )*(service)
             totfee = newPrice + serfee
            if(decimal == 18){
                var aprrove = web3.utils.toWei(String(totfee))
            }
            else{
               var aprrove =   web3.utils.toWei(String(totfee))/(10 ** (18 - decimal))
                
            }
            ////("newPrice" , newPrice , decimal,pricedegit,serfee , aprrove,totfee,);
        return ({servicewithamt:Number(aprrove),send_value:Number(web3.utils.toWei(String(totfee))),pop_up_price:Number(totfee)})
    }

}
  

    var get_receipt = async (HashValue) => {
        var receipt = await web3.eth.getTransactionReceipt(HashValue);
        if (receipt) {
            ////("come here if");
            return receipt
        }
        else {
            ////("come here");
            get_receipt(HashValue)
        }
    }

    const contract_symbol = async (type, token_Address) => {
        ////("connect contract coming");
        try {
            if (web3 != null) {
                ////("connect contract coming and getting web3");
                const ConnectContract = await contrat_connection(type == 721 ? SINGLE : MULTIPLE, token_Address)
                ////("connect contract", ConnectContract)
                const contract_Method_Hash = await ConnectContract.methods.symbol().call()
                return contract_Method_Hash
            }
        }
        catch (e) {
            return false
        }
    }

    const minting_721_1155 = async (type, token_Address, Token_Price, Token_Royalities, Token_Quantity, ipfs_metatag, Accounts) => {
        try {
            if (web3 != null) {
           
                    const ConnectContract = await contrat_connection(type == 721 ? SINGLE : MULTIPLE, token_Address)
                    ////("mint connect contract", type, token_Address, Token_Price, Token_Royalities, Token_Quantity, ipfs_metatag, Accounts, ConnectContract)
                  if(type == 721){  var contract_Method_Hash = await
                        ConnectContract
                            .methods
                            .mint(ipfs_metatag, Token_Price, Token_Quantity, Token_Royalities)
                            .send({ from: Accounts })
                            .on('transactionHash', (transactionHash) => {
                                ////("hash value", transactionHash)
                                return transactionHash
                            })}
                    else{
                        var contract_Method_Hash = await
                        ConnectContract
                            .methods
                            .mint(Token_Price,  Token_Royalities ,Token_Quantity,ipfs_metatag)
                            .send({ from: Accounts })
                            .on('transactionHash', (transactionHash) => {
                                ////("hash value", transactionHash)
                                return transactionHash
                            })
                    }
                    ////("hash value 2", contract_Method_Hash)
                    const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                        tokenCounts: Web3Utils.hexToNumber(receipt.logs[1].topics[2])
                    }
                    return need_data
              

            }
        }

        catch (e) {
            ////("hash value 2 e", e)

            return false
        }

    }

    const Sign_contract_for_all = async (message, wallet_Address) => {
        try {
            if (web3 != null) {
                var contract_Method_Hash = web3.eth.personal.sign(message, wallet_Address);
                return contract_Method_Hash
            }
        }

        catch (e) {
            return false
        }

    }

    const burn_721_1155 = async (type, token_Address, Token_Counts,wallet_Address, Token_Quantity,  Accounts) => {
        try {
            if (web3 != null) {
               
                    const ConnectContract = await contrat_connection(type == 721 ? SINGLE : MULTIPLE, token_Address)
                   if(type  ==   721 ){
                        var contract_Method_Hash = await
                        ConnectContract
                            .methods
                            .burnToken(Token_Counts,wallet_Address)
                            .send({ from: Accounts })
                            .on('transactionHash', (transactionHash) => {
                                ////("hash value", transactionHash)
                                return transactionHash
                            })
                        }
                        else{
                            var contract_Method_Hash = await
                            ConnectContract
                                .methods
                                .burnToken(wallet_Address,Token_Counts,Token_Quantity)
                                .send({ from: Accounts })
                                .on('transactionHash', (transactionHash) => {
                                    ////("hash value", transactionHash)
                                    return transactionHash
                                })
                            }

                    ////("hash value 2", contract_Method_Hash)
                    const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                    }
                    return need_data
               

            }
        }

        catch (e) {
            return false
        }

    }

    const place_order_721_1155 = async (type, token_Address, Token_Counts, Token_Price,  Accounts) => {
        try {
            if (web3 != null) {
              
                    const ConnectContract = await contrat_connection(type == 721 ? SINGLE : MULTIPLE, token_Address)    
                    var tknP    =   Token_Price != 0?web3.utils.toWei(String(Token_Price)):0          
                    ////("all type",type,token_Address,Token_Counts,Token_Price,Accounts,tknP);
                            var contract_Method_Hash = await
                            ConnectContract
                                .methods
                                .orderPlace(Token_Counts,tknP)
                                .send({ from: Accounts })
                                .on('transactionHash', (transactionHash) => {
                                    ////("hash value", transactionHash)
                                    return transactionHash
                                })
                            

                    ////("hash value 2", contract_Method_Hash)
                    const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                    }
                    return need_data
               

            }
        }

        catch (e) {
            return false
        }

    }

    const cancel_order_721_1155 = async (type, token_Address, Token_Counts,   Accounts) => {
        try {
            if (web3 != null) {
              
                    const ConnectContract = await contrat_connection(type == 721 ? SINGLE : MULTIPLE, token_Address)
                 
                
                            var contract_Method_Hash = await
                            ConnectContract
                                .methods
                                .cancelOrder(Token_Counts)
                                .send({ from: Accounts })
                                .on('transactionHash', (transactionHash) => {
                                    ////("hash value", transactionHash)
                                    return transactionHash
                                })
                            

                    ////("hash value 2", contract_Method_Hash)
                    const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                    }
                    return need_data
               

            }
        }

        catch (e) {
            return false
        }

    }

    const buy_721_1155 = async (type, token_Address, Token_Counts, Accounts, CoinName, tokenOwner, Amount ,send_value ,NoOfToken) => {
        try {
            if (web3 != null) {
             
                    const ConnectContract = await contrat_connection(type == 721 ? SINGLE : MULTIPLE, token_Address)
                   if(type == 721) {
                       if(CoinName == config.currencySymbol){
                               ////("(type, token_Address, Token_Counts, Accounts, CoinName, tokenOwner, Amount ,send_value)",type, token_Address, Token_Counts, Accounts, CoinName, tokenOwner, Amount ,send_value);
                             var contract_Method_Hash = await
                                                        ConnectContract
                                                            .methods
                                                            .saleToken(tokenOwner,Token_Counts,Amount)
                                                            .send({ 
                                                                from    : Accounts ,    
                                                                value    : send_value    })
                                                            .on('transactionHash', (transactionHash) => {
                                                                ////("hash value", transactionHash)
                                                                return transactionHash
                                                            })
                                                        }
                            else{
                                var contract_Method_Hash = await
                                                            ConnectContract
                                                                .methods
                                                                .saleWithToken(CoinName,tokenOwner,Token_Counts,Amount)
                                                                .send({ from    :    Accounts })
                                                                .on('transactionHash', (transactionHash) => {
                                                                    ////("hash value", transactionHash)
                                                                    return transactionHash
                                                                })}}
                    else{
                        if(CoinName == config.currencySymbol){
                            ////("(type, token_Address, Token_Counts, Accounts, CoinName, tokenOwner, Amount ,send_value)",type, token_Address, Token_Counts, Accounts, CoinName, tokenOwner, Amount ,send_value);
                          var contract_Method_Hash = await
                                                     ConnectContract
                                                         .methods
                                                         .saleToken(tokenOwner,Token_Counts,Amount,NoOfToken)
                                                         .send({ 
                                                             from    : Accounts ,    
                                                             value    : send_value    })
                                                         .on('transactionHash', (transactionHash) => {
                                                             ////("hash value", transactionHash)
                                                             return transactionHash
                                                         })
                                                     }
                         else{
                             var contract_Method_Hash = await
                                                         ConnectContract
                                                             .methods
                                                             .saleWithToken(tokenOwner,Token_Counts,Amount,NoOfToken,CoinName)
                                                             .send({ from    :    Accounts })
                                                             .on('transactionHash', (transactionHash) => {
                                                                 ////("hash value", transactionHash)
                                                                 return transactionHash
                                                             })}
                    }

                    ////("hash value 2", contract_Method_Hash)
                    const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                    }
                    return need_data
               

            }
        }

        catch (e) {
            return false
        }

    }

    const approve_721_1155 = async (token_address, token_Contract_Address, Amount, Accounts) => {
        try {
            if (web3 != null) {
              
                    ////("oken_address_coin, token_Contract_Address, Amount, Accounts",token_address, token_Contract_Address, Amount, Accounts);
                    const ConnectContract = await contrat_connection(DETH_ABI, token_address)
                             var contract_Method_Hash = await
                                                        ConnectContract
                                                            .methods
                                                            .approve(token_Contract_Address,Amount)
                                                            .send({ from    :    Accounts })
                                                            .on('transactionHash', (transactionHash) => {
                                                                ////("hash value", transactionHash)
                                                                return transactionHash
                          
                                                            })
                    ////("hash value 2", contract_Method_Hash)
                    const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                    }
                    return need_data
               

            }
        }

        catch (e) {
            ////("check ",e);
            return false
        }

    }

    const allowance_721_1155 = async (token_Contract_Address,wallet_Address,token_Address) => {
        try {
            if (web3 != null) {
             
                   const ConnectContract = await contrat_connection(DETH_ABI, token_Address)
                             var contract_Method_Hash = await
                                                        ConnectContract
                                                            .methods
                                                            .allowance(wallet_Address,token_Contract_Address)
                                                            .call()
                   
                    return contract_Method_Hash

            }
        }

        catch (e) {
            return false
        }

    }
    const accept_721_1155 = async (type,token_Contract_Address,CoinName,Bid_Address,Amount,token_counts,NoOfToken,Account) => {
        try {
            ////("(type,token_Contract_Address,CoinName,Bid_Address,Amount,token_counts,NoOfToken,Account)",type,token_Contract_Address,CoinName,Bid_Address,Amount,token_counts,NoOfToken,Account);
            if (web3 != null) {
                const ConnectContract = await contrat_connection(type == 721 ? SINGLE : MULTIPLE, token_Contract_Address)
                if(type  ==  721)
                { 
                   var contract_Method_Hash = await
                        ConnectContract
                            .methods
                            .acceptBId(CoinName, Bid_Address, Amount, token_counts)
                            .send({ from: Account })
                            .on('transactionHash', (transactionHash) => {
                                ////("hash value", transactionHash)
                                return transactionHash
                            })}
                    else{
                        var contract_Method_Hash = await
                        ConnectContract
                            .methods
                            .acceptBId(CoinName, Bid_Address, Amount, token_counts,NoOfToken)
                            .send({ from: Account })
                            .on('transactionHash', (transactionHash) => {
                                ////("hash value", transactionHash)
                                return transactionHash
                            })}
                    
                    ////("hash value 2", contract_Method_Hash)
                    const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                        tokenCounts: Web3Utils.hexToNumber(receipt.logs[1].topics[2])
                    }
                    return need_data
                }}
                catch (e) {
                    return false
                }

            }

    
   
        return {    Token_Balance_Calculation, 
                    wallet_Balance_Calculation,
                    minting_721_1155,
                    Sign_contract_for_all, 
                    contract_symbol, 
                    burn_721_1155,
                    place_order_721_1155,
                    price_calculation,
                    cancel_order_721_1155,
                    buy_bid_price_calculation,
                    buy_721_1155,
                    approve_721_1155,
                    allowance_721_1155,
                    accept_721_1155,
                    TokenExitsOrNotFunc
                };
    }



