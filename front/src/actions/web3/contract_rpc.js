import Web3 from "web3";
import config from '../../lib/config'
import SINGLE from '../../ABI/SINGLE.json'
import DETH_ABI from '../../ABI/DETH_ABI.json'
var web3=new Web3(config.BNBPROVIDER)


export const getServiceFee=async()=>{
    var CoursetroContracti = new web3.eth.Contract(
        SINGLE,
        config.single_Contract_Address
    );
    var servicefee=CoursetroContracti
    .methods
    .getServiceFee()
    .call()
    return servicefee
}
export const TokenExitsOrNot_Decimal_Func = async (tokenAddress) => {
    ////("token_status_data _ 1",tokenAddress);

    if (web3 != null) {
        try {
            const ConnectContract  = new web3.eth.Contract(
                DETH_ABI,
                tokenAddress
            );
            var TokenDecimal = await ConnectContract.methods.decimals().call()
            return TokenDecimal;
        }
        catch (e) {
            ////("deimal",e);
            return false
        }
    }
}