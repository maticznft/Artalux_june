/**
 * FILE		   	:	PURCHASENOW - MODAL
 * DISPATCH		:	NIL
 * REF			:	PurchaseNowRef
 * METHOD   	:   getReceipt,  PurchaseNow_Complete_Action,   checkOtherPlatformDetais1155,  PurchaseNow_Complete_Action_Meta, GetTokenBalance, TokenExitsOrNotFunc
 * C-DATE   	:   28_01_22
 * S-DATE   	:   28-01-22
*/

import React, {
    useEffect,
    forwardRef,
    useState,
    useImperativeHandle
} from 'react';
import {
    useHistory,useLocation
} from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import Web3 from 'web3';
import '@metamask/legacy-web3'
import { useSelector } from 'react-redux';
import DETH_ABI from 'ABI/DETH_ABI.json';
import config from '../../lib/config';
import {toast} from 'react-toastify';
import {
    PurchaseNow_Complete_Action,
    checkOtherPlatformDetais1155,
    PurchaseNow_Complete_Action_Meta,
    token_usd,
} from '../../actions/v1/token';
import Convert from './Convert';
import SINGLE from '../../ABI/SINGLE.json';
import MULTIPLE from '../../ABI/MULTIPLE.json';
import TOKENABI from '../../ABI/DETH_ABI.json';
import isEmpty from 'lib/isEmpty'

import Trade from '../../ABI/Trade.json'
import {getReceipt, 
        GetTokenBalance,
        TokenExitsOrNotFunc} from '../../actions/v1/getReceiptFunc'
import useContractProviderHook from 'actions/web3/contract_provider';


let toasterOption = config.toasterOption;


export const PurchaseNowRef = forwardRef((props, ref) => {

    const my_hook = useContractProviderHook()
	const Wallet_Details = useSelector(state => state.wallet_connect_context);
    const history = useHistory();
     const location=useLocation();
    var location_name=location.pathname;
    
    const [ApproveCallStatus, setApproveCallStatus] = React.useState('init');
    const [PurchaseCallStatus, setPurchaseCallStatus] = React.useState('init');
    const [MultipleWei, Set_MultipleWei] = React.useState(0);
    const [NoOfToken, Set_NoOfToken] = React.useState(1);

    const [FormSubmitLoadings, Set_FormSubmitLoading] = React.useState('start');

    const [ValidateError, Set_ValidateError] = React.useState({});
    const [YouWillPay, Set_YouWillPay] = React.useState(0);

    const [TokenPrice, Set_TokenPrice] = React.useState(0);
    const [CoinName,set_CoinName] = React.useState(0);
    const [TokenUSD,setTokenUSD] = useState();
    const [BuyOwnerDetails,set_BuyOwnerDetail] = React.useState({});
    const [Mul_YouWillPay, Set_Mul_YouWillPay] = React.useState(0);
    const [TokenBalances,Set_TokenBalances]=useState(0)
    const [Decimal_Value,set_Decimal_Value]=useState(0)
    const [Token_Address,set_Token_Address]=useState('')
    const [item,Set_item]=useState([])
    
    const inputChange = (e) => {
        Set_FormSubmitLoading('start')
        if(e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
            var value = e.target.value;
            switch(e.target.name) {
                case 'NoOfToken':
                    Set_NoOfToken(value);
                    PriceCalculate({quantity:Number(value)});
                    break;
                case 'TokenPrice':
                    Set_TokenPrice(value);
                    if(value != '' && isNaN(value) == false && value > 0) {
                        PriceCalculate({price:Number(value)});
                    }
                    break;
                default:
                // code block
            }
            // ItemValidation({TokenPrice:value});
        }
    }

    const PriceCalculate = async (data={}) => {
        var web3 = new Web3(Wallet_Details.providers)
        var price = (typeof data.price != 'undefined') ? data.price : TokenPrice;
        var quantity = (typeof data.quantity != 'undefined') ? data.quantity : NoOfToken;
        var royalty=(typeof data.tokenRoyality!='undefined')?data.tokenRoyality:item.tokenRoyality
        var newPrice = item.type == 721 ? (price* 1000000) : (quantity * (price* 1000000) );
        var toMid = newPrice
        var serfee = (toMid/100000000)*((Wallet_Details.buyerfee/config.decimalvalues)*1000000)
        var totfee = serfee + toMid
        var aprrove='';
        if(Decimal_Value == 18)
        {
               var tot2cont = web3.utils.toWei(String(Number((Number(totfee))/1000000)))
                aprrove = web3.utils.toWei(String(Number((Number(totfee))/1000000)))
        }
        else{
               var tot2cont = web3.utils.toWei(String(Number((Number(totfee))/1000000)))
                var dec = 18 - (Decimal_Value);
                aprrove = ((tot2cont)/10**dec)

        }
          Set_YouWillPay(totfee/1e6)
        Set_Mul_YouWillPay(aprrove)
        Set_MultipleWei(String(tot2cont));
    }


    async function FormSubmit(){
            window.$('#PurchaseNow_modal').modal('hide');
            window.$('#PurchaseStep_modal').modal('show');
          
        }
    const ItemValidation = async (data={}) => {
        var ValidateError = {};

        var Chk_TokenPrice = (typeof data.TokenPrice!='undefined')?data.TokenPrice:TokenPrice;
        var quantity = (typeof data.quantity != 'undefined') ? data.quantity : NoOfToken;

        if(quantity == '') {
            ValidateError.NoOfToken = '"Quantity" is not allowed to be empty';
        }
        else if(quantity == 0) {
            ValidateError.NoOfToken = '"Quantity" must be greater than 0';;
        } 
        else if(isNaN(quantity) == true) {
          ValidateError.NoOfToken = '"Quantity" must be a number';
        }
        if(quantity > BuyOwnerDetails.balance) {
            ValidateError.NoOfToken = '"Quantity" must be below on '+BuyOwnerDetails.balance;
        }

        if(Chk_TokenPrice == '') {
            ValidateError.TokenPrice = '"Token Price" is not allowed to be empty';
        }
        else if(Chk_TokenPrice == 0) {
            ValidateError.TokenPrice = '"Token Price" must be greater than 0';;
        } 
        else if(isNaN(Chk_TokenPrice) == true) {
          ValidateError.TokenPrice = '"Token Price" must be a number';
        }
        
     else  if(String(BuyOwnerDetails.CoinName).toLowerCase()!=String(config.currencySymbol).toLowerCase()) { 
        if(TokenBalances == 0){
            Set_FormSubmitLoading('errors');
        }
        else if(TokenBalances<Chk_TokenPrice){
            Set_FormSubmitLoading('errors');
        }
       
}
else  if(String(BuyOwnerDetails.CoinName).toLowerCase()==String(config.currencySymbol).toLowerCase()) {
       
    if(Wallet_Details.UserAccountBal == 0){
        Set_FormSubmitLoading('errors');
       
    }
    else if(Wallet_Details.UserAccountBal<Chk_TokenPrice){
        Set_FormSubmitLoading('errors');
       
    }
    }
        
        else {
         
            if(Chk_TokenPrice > Wallet_Details.UserAccountBal) {
                ValidateError.TokenPrice = 'Insufficient balance, Check your wallet balance';
            }
            else {
                delete ValidateError.TokenPrice;
            }
        }

        if(!isEmpty(ValidateError)){
            Set_FormSubmitLoading('errors1')
        }
        if(NoOfToken>0)
        {
            Set_FormSubmitLoading('start')
        }     
        Set_ValidateError(ValidateError);
        return ValidateError;
    }


    async function FormSubmit_StepOne(){
       
        var tokencoinbalance = null;
        if(CoinName !== "" && Wallet_Details.providers){
          
            //console.log("token address array in purchase now ref ",Wallet_Details.tokenAddress)
            var CoursetroContract = null;
            var coindata = (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()===String(CoinName).toLowerCase())
            
            var addressOfToken = coindata[0].address
            console.log("token dtaa dsfsdf",coindata,addressOfToken)
            var web3 = new Web3(Wallet_Details.providers)
            if(web3) {
             
                CoursetroContract= new web3.eth.Contract(
                TOKENABI,
                addressOfToken
            )}
            //console.log("waller det useraddr ",Wallet_Details.UserAccountAddr)
            tokencoinbalance = await CoursetroContract.methods.balanceOf(Wallet_Details.UserAccountAddr).call()
          
        }
        if(tokencoinbalance && tokencoinbalance <= 0){
           
            toast.error("Not enough Token in wallet");
            setTimeout(() => {
                window.$('#PurchaseStep_modal').modal('hide');
                window.location.reload()
            }, 1000);
            return false;
        }
        else{

        if(Wallet_Details.providers) {
            var web3 = new Web3(Wallet_Details.providers)
            if(
                web3
            ) {
                var handle=null;
                var receipt=null;
                var CoursetroContract=null
                var contractCall=null;
                var sendAmount =web3.utils.toWei(String(Number(Number(BuyOwnerDetails.tokenPrice*1e6)*NoOfToken)/1e6));
                var web3   = new Web3(Wallet_Details.providers);
               try{
                setPurchaseCallStatus('processing');
                if (item.contractAddress == config.singleContract || 
                    item.contractAddress == config.multipleContract) {
               if(item.type==721){   
                 CoursetroContract = new web3.eth.Contract(
                    SINGLE,
                    item.contractAddress
                )
                if(String(CoinName).toLowerCase()!=(config.currencySymbol).toLowerCase()){
                    console.log("data to buy call ",CoinName,
                    BuyOwnerDetails.tokenOwner,
                    item.tokenCounts,
                    sendAmount.toString(),)
                contractCall= await CoursetroContract.methods
                .saleWithToken(
                    CoinName,
                    BuyOwnerDetails.tokenOwner,
                    item.tokenCounts,
                    sendAmount.toString(),
                     )
                    .send({
                        from: Wallet_Details.Accounts
                    }) 
                    .on('transactionHash',async (transactionHash) => {
                        handle = setInterval(async () => {
                            receipt = await getReceipt(web3, transactionHash)
                            clr1();
                          }, 8000)
                        })
                   }
                else{
                     contractCall=   await   CoursetroContract.methods
                        .saleToken(
                        BuyOwnerDetails.tokenOwner,
                        item.tokenCounts,
                        sendAmount.toString()
                        ) 
                         .send({
                            from: Wallet_Details.Accounts,
                            value: web3.utils.fromWei(web3.utils.toWei(((MultipleWei))))
                            })
                        .on('transactionHash',async (transactionHash) => {
                            handle = setInterval(async () => {
                                receipt = await getReceipt(web3, transactionHash)
                                clr1();
                              }, 8000)
                            })
                }               
               }
               else{
                CoursetroContract = new web3.eth.Contract(
                    MULTIPLE,
                    item.contractAddress
                )
                if(String(CoinName).toLowerCase()!=(config.currencySymbol).toLowerCase()){
                     contractCall=    await  CoursetroContract.methods
                    .saleWithToken(
                        BuyOwnerDetails.tokenOwner,
                        item.tokenCounts,
                        sendAmount.toString(),
                        NoOfToken,
                        CoinName,
                                         
                         )
                         .send({
                            from: Wallet_Details.Accounts
                        })
                        .on('transactionHash',async (transactionHash) => {
                            handle = setInterval(async () => {
                                receipt = await getReceipt(web3, transactionHash)
                                clr1();
                              }, 8000)
                            })
                          
                    }
                    else{
                         contractCall=   await   CoursetroContract.methods
                        .saleToken(
                            BuyOwnerDetails.tokenOwner,
                            item.tokenCounts,
                            sendAmount.toString(),
                            NoOfToken,
                             )
                             .send({
                                from: Wallet_Details.Accounts,
                                value: web3.utils.fromWei(web3.utils.toWei(((MultipleWei))))
                            })
                            .on('transactionHash',async (transactionHash) => {
                                handle = setInterval(async () => {
                                    receipt = await getReceipt(web3, transactionHash)
                                    clr1();
                                  }, 8000)
                                })                         
                    }
                    
               }
            }
            else{
                CoursetroContract = new web3.eth.Contract(
                    Trade,
                    config.trade
                )
                if(String(CoinName).toLowerCase()!=(config.currencySymbol).toLowerCase()){
                     contractCall=    await  CoursetroContract.methods
                    .saleWithToken(
                        BuyOwnerDetails.tokenOwner,
                        item.tokenCounts,
                        sendAmount.toString(),
                        NoOfToken,
                        CoinName, 
                        BuyOwnerDetails.type,
                        BuyOwnerDetails.contractAddress
                         )
                         .send({
                            from: Wallet_Details.Accounts
                        })
                        .on('transactionHash',async (transactionHash) => {
                            handle = setInterval(async () => {
                                receipt = await getReceipt(web3, transactionHash)
                                clr1();
                              }, 8000)
                            })
                          
                    }
                    else{
                       
                         contractCall=   await   CoursetroContract.methods
                        .saleToken(
                            BuyOwnerDetails.tokenOwner,
                            item.tokenCounts,
                            sendAmount.toString(),
                            NoOfToken,
                            BuyOwnerDetails.type,
                            BuyOwnerDetails.contractAddress
                             )
                             .send({
                                from: Wallet_Details.Accounts,
                                value: web3.utils.fromWei(web3.utils.toWei(((MultipleWei))))
                            })
                            .on('transactionHash',async (transactionHash) => {
                                handle = setInterval(async () => {
                                    receipt = await getReceipt(web3, transactionHash)
                                    clr1();
                                  }, 8000)
                                })                         
                    }
            }
          }
          catch(error){
         
            setPurchaseCallStatus('tryagain');
            //console.log("tra",error)
            toast.error(config.ErrorTransaction, toasterOption);
        } 

         async function clr1(){
                            if(receipt!=null){
                                if(receipt.status==true){
                                    clearInterval(handle);
            var postData = {
                tokenOwner: BuyOwnerDetails.tokenOwner, // old owner
                UserAccountAddr: Wallet_Details.UserAccountAddr, // new owner
                tokenCounts: item.tokenCounts,
                tokenType: item.type,
                NoOfToken: item.type == 721 ? 1 : NoOfToken,
                transactionHash: receipt.transactionHash,
                tokenBid:true,
                CoinName:CoinName,
                contractAddress: item.contractAddress,
                usdval:TokenUSD
            }
            if (((String(item.contractAddress).toLowerCase()) != config.singleContract) ||
                ((String(item.contractAddress).toLowerCase()) != config.multipleContract) ) {
                var postMetaData = {
                    tokenOwner: BuyOwnerDetails.tokenOwner, // old owner
                    tokenCounts: item.tokenCounts,
                    NoOfToken: item.type == 721 ? 1 : NoOfToken,
                    contractAddress: item.contractAddress
                }
                var result = await PurchaseNow_Complete_Action_Meta(postMetaData);
            }   
            var Resp = await PurchaseNow_Complete_Action(postData);
            if (Resp.data && Resp.data.toast && Resp.data.toast.type=='success') {
                toast.success("Transaction Completed", toasterOption)
                setPurchaseCallStatus('done');
                window.$('.modal').modal('hide');
                // alert(location_name)
                if(location_name.includes('/info')){
                    window.$('div').removeClass('modal-backdrop');
                    props.Refresh_page()
                }
                else{
                history.push('/info/'+Wallet_Details.UserAccountAddr+'/'+item.contractAddress+'/'+item.tokenCounts)}
              
            }          
        }}} }
           
            }
            else{
                window.$('#connect_modal').modal('show');
            }
        }
        
    }

    async function FormSubmit_StepTwo(){
        setPurchaseCallStatus('start')
        setApproveCallStatus('process')
        var sendAmount = (BuyOwnerDetails.tokenPrice * config.decimalvalues).toString();

        if(Wallet_Details.providers) {
            var web3 = new Web3(Wallet_Details.providers)
            if(
                web3
            ) {
                //console.log("ama>>>>>>>",Token_Address,BuyOwnerDetails.contractAddress,Wallet_Details.Accounts)
                var web3   = new Web3(Wallet_Details.providers);
                var handle=null;
                var receipt=null;
                 var SendMntCon=web3.utils.toWei(String(Mul_YouWillPay))
                var bidvalue = new web3.eth.Contract(
                    DETH_ABI, Token_Address
                    ); 
                    try{
                        if(Token_Address!=config.deadAddress){
                        if (item.contractAddress == config.singleContract ||
                            item.contractAddress == config.multipleContract ) {
                // alert(BuyOwnerDetails.contractAddress)
              await bidvalue.methods.approve(
                BuyOwnerDetails.contractAddress,
                    SendMntCon
                ).send({
                    from: Wallet_Details.Accounts,
                })
                .on('transactionHash',async (transactionHash) => {
                    handle = setInterval(async () => {
                        receipt = await getReceipt(web3, transactionHash)
                        clr1();
                      }, 8000)
                    })
                  
            
            }
            else{
                await bidvalue.methods.approve(
                    config.trade,
                    SendMntCon
                ).send({
                    from: Wallet_Details.Accounts,
                })
                .on('transactionHash',async (transactionHash) => {
                    handle = setInterval(async () => {
                        receipt = await getReceipt(web3, transactionHash)
                        clr1();
                      }, 8000)
                    })

            }
            }
        
        else{
            toast.warn("You can't buy this token right now.. Contact Admin..",config.toasterOption)
        }
    }
            catch(e){
                setApproveCallStatus('try')
                toast.error('Transaction Reverted'+e,config.toasterOption)
            }
            async function clr1() {
                if(receipt!=null){
                    if(receipt.status==true){
                        clearInterval(handle);
            setApproveCallStatus('done')
            setPurchaseCallStatus('init')
                              }
                            }
                        }
            }
            else{
                window.$('#connect_modal').modal('show');
            }
        }
    }

   
    useEffect(() => {
        // Set_ValidateError({});
        ItemValidation({NoOfToken:NoOfToken,TokenPrice:TokenPrice});
    }, [
        NoOfToken,
        TokenPrice
    ]);

 



    useImperativeHandle(
        ref,
        () => ({
            async PurchaseNow_Click(item, BuyOwnerDetail={}) {
                console.log("purchase now imperative data ",item,BuyOwnerDetail)
                if (Wallet_Details.UserAccountAddr!="") {
                    var web3=new Web3(Wallet_Details.providers)
                  
                if(BuyOwnerDetail && typeof BuyOwnerDetail.tokenOwner != 'undefined') {
                    item.tokenowners_current = {};
                    item.tokenowners_current = BuyOwnerDetail;
                }

                if(item) {
                    var balance = await checkOtherPlatformDetais1155(item,BuyOwnerDetail,item.type,web3);
                    console.log('balance>>>>>>>>>',balance)
                    if (balance == 0) {
                        toast.warning("You won't buy at this moment please refresh you data",toasterOption);
                        setTimeout(() => {
                            window.location.href="/"
                        }, 1000);
                        return false;
                    }
                    else{
                    Set_item(item);
                    if(BuyOwnerDetail&&BuyOwnerDetail.tokenPrice){
                    Set_TokenPrice(BuyOwnerDetail.tokenPrice);}
                   set_BuyOwnerDetail(BuyOwnerDetail)
                    if(BuyOwnerDetail&&BuyOwnerDetail.CoinName){
                        set_CoinName(BuyOwnerDetail.CoinName)}
                   
                    Set_NoOfToken(1);
                    PriceCalculate({quantity:1,price:BuyOwnerDetail.tokenPrice,tokenRoyality:item.tokenRoyality});
                    var usdOfTokenArr = (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()===String(BuyOwnerDetail.CoinName).toLowerCase())
                    var usdOfToken = usdOfTokenArr[0].usd;
                    console.log("usd of token in purchase now ref ",usdOfToken * BuyOwnerDetail.tokenPrice);
                    var usdprice = usdOfToken * BuyOwnerDetail.tokenPrice;
                    setTokenUSD(usdprice)
                   
                   
                }}
                if(BuyOwnerDetail&&BuyOwnerDetail.CoinName&&BuyOwnerDetail.CoinName!=config.currencySymbol){
                       
                         if(Wallet_Details.tokenAddress!=null){
                              var filOp = (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()===String(BuyOwnerDetail.CoinName).toLowerCase())
                         var TokenExitsOrNot=await my_hook.TokenExitsOrNotFunc(item.type,item.contractAddress,filOp[0].address,filOp[0].label)
                         set_Decimal_Value(filOp[0].decimal)
                         set_Token_Address(filOp[0].address)
                        if(TokenExitsOrNot){
                       var TokenBalanceCheck= await my_hook.Token_Balance_Calculation(Wallet_Details.UserAccountAddr,filOp[0].address)
                       //console.log("token_bn",TokenBalanceCheck);
                         Set_TokenBalances(TokenBalanceCheck)
                         window.$('#PurchaseNow_modal').modal('show');
                                 }
                              else{
                                Set_FormSubmitLoading('tokennotexits')
                                toast.warn('Currently This token is not in this platform... Try Again or Contact Admin...')
                              } } }
                else{
                    window.$('#PurchaseNow_modal').modal('show');
                }

            }
        
        else{
            window.$('#connect_modal').modal('show');
           
        }
    }
        }),    )

    return (
        <div>
            <div className="modal fade primary_modal PurchaseNow_modal" id="PurchaseNow_modal" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="accept_modalCenteredLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                    <h5 className="modal-title" id="buy_modalLabel">Checkout</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close9">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body px-0">
                        <div className="row mx-0">
                            <div className="col-12 col-md-3 px-4">
                                <p className="buy_title_sm">Seller</p>
                            </div>
                            <div className="col-12 col-md-9 px-4">
                                <p className="buy_title_md text-md-right word_brak_text">
                                <span  title={"Seller : "+(!isEmpty(BuyOwnerDetails)&&BuyOwnerDetails.tokenOwner)}>{String(BuyOwnerDetails&&(BuyOwnerDetails.tokenOwner!=""&&BuyOwnerDetails.tokenOwner)).slice(0,12).concat('....')}</span></p>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <div className="col-12 col-md-3 px-4">
                                <p className="buy_title_sm" >Buyer</p>
                            </div>
                            <div className="col-12 col-md-9 px-4">
                            <p className="buy_title_md text-md-right word_brak_text">
                                <span  title={"Buyer : "+ (!isEmpty(Wallet_Details.AddressUserDetails)?(Wallet_Details.AddressUserDetails.name!="" ? Wallet_Details.AddressUserDetails.name : Wallet_Details.UserAccountAddr):Wallet_Details.UserAccountAddr)} > { !isEmpty(Wallet_Details.AddressUserDetails)&&Wallet_Details.AddressUserDetails.name!="" ? Wallet_Details.AddressUserDetails.name :  String(Wallet_Details.UserAccountAddr).slice(0,12).concat('....')}</span></p>
                            </div>
                        </div>
                        <form className="bid_form" action="#">
                            {item.type == 721 ?(''):
                            <div className="mb-3 px-4 ">
                                <label htmlFor="qty">Quantity
                                <span>({item&&BuyOwnerDetails&&BuyOwnerDetails.balance&&BuyOwnerDetails.balance} is available)</span>
                                </label>
                                
                                <div className="mb-3 input_grp_style_1">
                                    <input
                                        type="text"
                                        maxLength={config.maxLength}
                                        className="form-control primary_inp text-center"
                                        name="NoOfToken"
                                        id="NoOfToken"
                                        onChange={inputChange}
                                        placeholder="e.g. 2"
                                        autoComplete="off"
                                        value={NoOfToken}
                                    />
                                    {ValidateError.NoOfToken && <span className="text-danger">{ValidateError.NoOfToken}</span>}
                                    {!ValidateError.NoOfToken && ValidateError.TokenPrice && <span className="text-danger">{ValidateError.TokenPrice}</span>}
                                </div>
                            </div>}
                        </form>
                       
                      
                        <div className="row mx-0 pb-3">
                            <div className="col-12 col-sm-6 px-4">
                                <p className="buy_desc_sm">Your balance</p>
                            </div>
                            <div className="col-12 col-sm-6 px-4 text-sm-right">
                                <p className="buy_desc_sm_bold">
                                    {token_usd(Wallet_Details.UserAccountBal,1)}  {config.currencySymbol}</p>
                                {/* <Convert
                         item={Number(Wallet_Details.UserAccountBal)}
                         coinName={BuyOwnerDetails.CoinName}
                         convertVal={1}/> */}
                                    {/* {BuyOwnerDetails.CoinName}</p> */}
                            </div>
                        </div>
                        {String(BuyOwnerDetails.CoinName).toLowerCase() != String(config.currencySymbol).toLowerCase() &&
                         <div className="row mx-0 pb-3">
                         <div className="col-12 col-sm-6 px-4">
                             <p className="buy_desc_sm">Your Token balance</p>
                         </div>
                         <div className="col-12 col-sm-6 px-4 text-sm-right">
                             <p className="buy_desc_sm_bold">
                                 {token_usd(TokenBalances,1)}
                             {/* <Convert
                         item={Number(TokenBalances)}
                         coinName={BuyOwnerDetails.CoinName}
                         convertVal={1}/> */}
                                 {CoinName}</p>
                         </div>
                     </div>
                        }
                        <div className="row mx-0 pb-3">
                            <div className="col-12 col-sm-6 px-4">
                                <p className="buy_desc_sm">Price</p>
                            </div>
                            <div className="col-12 col-sm-6 px-4 text-sm-right">
                                <p className="buy_desc_sm_bold">
                                 {token_usd(TokenPrice,1)}

                                {/* <Convert
                         item={Number(TokenPrice)}
                         coinName={BuyOwnerDetails.CoinName}
                         convertVal={1}/> */}
                                    {BuyOwnerDetails.CoinName}</p>
                            </div>
                        </div>
                        <div className="row mx-0 pb-3">
                            <div className="col-12 col-sm-6 px-4">
                                <p className="buy_desc_sm">Service fee</p>
                            </div>
                            <div className="col-12 col-sm-6 px-4 text-sm-right">
                                <p className="buy_desc_sm_bold">
                                   {
                                    Wallet_Details.buyerfee/config.decimalvalues
                                    }
                                    % <span>{BuyOwnerDetails.CoinName}</span></p>
                            </div>
                        </div>
                        <div className="row mx-0 pb-3">
                            <div className="col-12 col-sm-6 px-4">
                                <p className="buy_desc_sm">Royalty fee</p>
                            </div>
                            <div className="col-12 col-sm-6 px-4 text-sm-right">
                                <p className="buy_desc_sm_bold">
                                     {((item.tokenRoyality))}                                   
                                    % <span>{BuyOwnerDetails.CoinName}</span></p>
                            </div>
                        </div>
                        <div className="row mx-0 pb-3">
                            <div className="col-12 col-sm-6 px-4">
                                <p className="buy_desc_sm">You will pay</p>
                            </div>
                            <div className="col-12 col-sm-6 px-4 text-sm-right">
                                <p className="buy_desc_sm_bold">
                                {token_usd(YouWillPay,1)}
                                    {/* {
                                        String(BuyOwnerDetails.CoinName).toLowerCase()!=String(config.currencySymbol).toLowerCase() ?
                                        token_usd(YouWillPay,1)
                                        <Convert
                                        item={Number(YouWillPay)}
                                        coinName={BuyOwnerDetails.CoinName}
                                        convertVal={1}/>
                                        :
                                        <Convert
                                        item={Number(YouWillPay)}
                                        coinName={BuyOwnerDetails.CoinName}
                                        convertVal={1}/>
                                    } */}
                                   
                                
                                   <span>{BuyOwnerDetails.CoinName}</span></p>
                            </div>
                        </div>
                        <form className="px-4">
                            <div className="text-center">
                                <Button
                                    type="button"
                                    className="create_btn btn-block"
                                    onClick={(FormSubmitLoadings=='start'||isEmpty(ValidateError))?(() => FormSubmit()):''}
                                    disabled={(FormSubmitLoadings=='processing')||(FormSubmitLoadings == 'error' )||(FormSubmitLoadings == 'errors' )||(FormSubmitLoadings == 'errors1' ) ||(!isEmpty(ValidateError))}
                                >
                                    {FormSubmitLoadings== 'processing' &&<> <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i > <>In-Progress</></>}
                                  {FormSubmitLoadings == 'error' && 'Check Wenlambo Balance'}
                                  {FormSubmitLoadings == 'start' && 'Proceed to payment'}
                                  {FormSubmitLoadings == 'errors' && 'Check Balance'}
                                  {FormSubmitLoadings == 'errors1' && 'Error in Field'}
                              
                                </Button>
                                <Button className="btn_outline_red btn-block cancel_btn" data-dismiss="modal" aria-label="Close">Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            <div className="modal fade primary_modal PurchaseStep_modal" id="PurchaseStep_modal" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="PurchaseStepCenteredLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                        <h5 className="modal-title" id="PurchaseStepLabel">Follow Steps</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"    disabled={(ApproveCallStatus=='process' || PurchaseCallStatus=='done')}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <form>
                              {String(CoinName).toLowerCase() != String(config.currencySymbol).toLowerCase() &&
                               <div className="text-center">
                                    <p className="mt-3 purchase_desc text-center">Approve the transaction</p>
                                    <Button
                                        type="button"
                                        onClick={() => FormSubmit_StepTwo()}
                                        className={"create_btn btn-block"}
                                        disabled={(ApproveCallStatus=='process' || ApproveCallStatus=='done')}
                                    >
                                        {ApproveCallStatus == 'process' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                                        {ApproveCallStatus == 'init' && 'Approve'}
                                        {ApproveCallStatus == 'process' && 'In-progress...'}
                                        {ApproveCallStatus == 'done' && 'Done'}
                                        {ApproveCallStatus == 'try' && 'Try Again'}
                                    </Button>
                                </div>
                                }
                                <div className="text-center my-3">
                                <p className="mt-3 purchase_desc text-center">Send transaction with your wallet</p>
                                    <Button
                                        type="button"
                                        onClick={() => FormSubmit_StepOne()}
                                        className={"create_btn btn-block"}
                                        disabled={(PurchaseCallStatus=='processing' ||PurchaseCallStatus=='start' || PurchaseCallStatus=='done')}
                                    >
                                        {PurchaseCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                                        {PurchaseCallStatus == 'init' && 'Purchase'}
                                        {PurchaseCallStatus == 'start' && 'Purchase'}
                                        
                                        {PurchaseCallStatus == 'processing' && 'In-progress...'}
                                        {PurchaseCallStatus == 'done' && 'Done'}
                                        {PurchaseCallStatus == 'tryagain' && 'Try Again'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

