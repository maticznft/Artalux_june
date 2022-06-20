import Web3 from 'web3';
import config from '../../lib/config'
import DETH_ABI from '../../ABI/DETH_ABI.json'

export const getReceipt=async(web3,approveCall)=>{
        var receipt =  await web3.eth.getTransactionReceipt(approveCall)
        return receipt
}



export const ListNFT=async(contractCall,UserAccountAddr,tokenCounts)=>{
        var listnft = await contractCall.methods.listingNFT(tokenCounts,UserAccountAddr).call()
        //("list nft",listnft)
        return listnft
      }
      
      export const TokenExitsOrNotFunc = async(MultiContract,CoinName) => {
        var tokenAddress = await MultiContract.methods.getTokenAddress(CoinName).call()
          return tokenAddress;   
      }
      export const GetTokenBalance=async(UserAddress,CoinName,tokenAddress,web3)=>{
        var bidvalue = new web3.eth.Contract(
          DETH_ABI, tokenAddress
          );
          var bidbln = await bidvalue
          .methods
          .balanceOf(UserAddress)
          .call();
          var bidbln1 = (bidbln / config.decimalvalues).toFixed(config.toFixed)
          var TokenDecimal =await bidvalue.methods.decimals().call()
          var sendVal={
            bidbln1:bidbln1,
            TokenDecimal:Number(TokenDecimal)
          }      
          return sendVal;
      }
      
      export const GetTokenAllowance=async(CoursetroContract,ContractAddress,UserAccountAddr)=>{
       
        //("get token alllowance call i/p data ",CoursetroContract,ContractAddress,UserAccountAddr);
      
        try{
        var  getAllowance = await CoursetroContract
        .methods
        .allowance(
          UserAccountAddr,
          ContractAddress
          ).call()    
          //("allowance",CoursetroContract,ContractAddress,UserAccountAddr,getAllowance)
          return getAllowance;}
          catch (e){
            //("get allowance call error",e);
          }
      }