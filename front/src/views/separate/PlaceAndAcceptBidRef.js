
/**
 * FILE		   	:	PLACEANDACCEPT - Modal
 * DISPATCH		:	NiL
 * REF			  :	PlaceAndAcceptBidRef
 * METHOD   	:  BidApply_ApproveAction, acceptBId_Action,GetTokenAllowance,  CancelBid_Action,  null_time_auction,  checkOtherPlatformDetais1155,  PurchaseNow_Complete_Action_Meta ,getReceipt,TokenExitsOrNotFunc,GetTokenBalance
 * C-DATE   	: 30_01_22
 * S-DATE   	: 30-01-22
*/


import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState
} from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import config from '../../lib/config';
import DETH_ABI from '../../ABI/DETH_ABI.json';
import SINGLE from '../../ABI/SINGLE.json'
import MULTIPLE from '../../ABI/MULTIPLE.json'
import isEmpty from "../../lib/isEmpty";
import { Button, TextField } from '@material-ui/core';
import Convert from '../separate/Convert'
import Select from 'react-select';
import {
   useLocation,useHistory
} from "react-router-dom";
import {
  BidApply_ApproveAction,
  acceptBId_Action,
  CancelBid_Action,
  checkOtherPlatformDetais1155,
  PurchaseNow_Complete_Action_Meta
} from '../../actions/v1/token';

import { getReceipt,TokenExitsOrNotFunc,GetTokenBalance,GetTokenAllowance, ListNFT } from '../../actions/v1/getReceiptFunc'
import Trade from '../../ABI/Trade.json'
import {toast} from 'react-toastify';
import useContractProviderHook from 'actions/web3/contract_provider';
let toasterOption = config.toasterOption;
export const PlaceAndAcceptBidRef = forwardRef((props, ref) => {
  const history = useHistory()
  const my_hook = useContractProviderHook()
  const Wallet_Details = useSelector(state => state.wallet_connect_context);
  const [BidformSubmit, Set_BidformSubmit] = React.useState(false);
  const [NoOfToken_NeedToSend, Set_NoOfToken_NeedToSend] = React.useState(false);
  const [accept_btn, Set_accept_btn] = React.useState("start");
  const [token_owner_detail, set_token_owner_detail] = useState({})
   const [YouWillGetWith, set_YouWillGetWith] = useState(0)
  const [YouWillPayTest, set_YouWillPayTest] = useState(0)
  const [ApprovalCallStatus, setApprovalCallStatus] = React.useState('init');
  const [MintCallStatus, setMintCallStatus] = React.useState('init');
  const [item,set_item] =useState({}) 
  const [tokenBidAmt, Set_tokenBidAmt] = useState(0);
  const [NoOfToken, Set_NoOfToken] = useState(0);

  const [ValidateError, Set_ValidateError] = useState({});

  const [YouWillPayFee, Set_YouWillPayFee] = useState(0);
  const [YouWillPay, Set_YouWillPay] = useState(0);
  const [YouWillGet, Set_YouWillGet] = useState(0);

  const [BidApply_ApproveCallStatus, Set_BidApply_ApproveCallStatus] = React.useState('init');
  const [BidApply_SignCallStatus, Set_BidApply_SignCallStatus] = React.useState('init');
  const [AccepBidSelect, Set_AccepBidSelect] = useState(0);
  const[Bids,Set_Bids]=useState({})
  const [highbid,sethighbid] = useState(0)
  const [TokenBalances,Set_TokenBalances]=useState('')
      const [Decimal_Value,set_Decimal_Value]=useState(0)
      const [Token_Address,set_Token_Address]=useState('')
      const [CoinName, set_CoinName] = useState('');
      const [priceoption, setPriceoption] = useState([]);
   
  //("prop dtaa ",props);
  var {
    MyTokenBalance,
    AllowedQuantity,
  } = props;
  const location = useLocation();
  var location_name = location.pathname;

  async function PriceCalculate_this(data = {}) {
    var web3 = new Web3(Wallet_Details.providers)
    ////("valespriceca",data.NoOfToken,data.tokenBidAmt,NoOfToken,tokenBidAmt) 
    var price = (typeof data.tokenBidAmt != 'undefined') ? Number(data.tokenBidAmt) : Number(tokenBidAmt);
    var quantity = (typeof data.NoOfToken != 'undefined') ? Number(data.NoOfToken) : Number(NoOfToken);
    var Decimal_Values=(typeof data.Decimal_Value != 'undefined') ? Number(data.Decimal_Value) : Number(Decimal_Value);
    var TokenBalances=(typeof data.TokenBalances!='undefined')?Number(data.TokenBalances):Number(TokenBalances);
    var CoinName   = typeof data.CoinName!= "undefined" ? data.CoinName :CoinName;

    if (price == '') { price = 0; }
    if (quantity == '') { quantity = 0; }
    ////("valespriceca2",typeof price,typeof quantity,isNaN(price) , isNaN(quantity),price,quantity)
    if (! isNaN(price) && !isNaN(quantity) &&Decimal_Values) {
      
      var totalPrice = (price* 1000000) * quantity;
      var toMid = totalPrice 
      var serfee = (toMid)*((Wallet_Details.buyerfee/config.decimalvalues)*1000000)/100000000
      var totfee = serfee + toMid
      ////( "check all",web3.utils.toWei(String(Number(totfee)/1000000)))
      set_YouWillPayTest( web3.utils.toWei(String(Number(totfee)/1000000)))
      
      if( Decimal_Values == 18)
      {
        Set_YouWillPay( web3.utils.toWei(String(Number(totfee)/1000000)));
      }
      else{
        Set_YouWillPay((Number(totfee)/1000000)*(10**(Decimal_Values)));
      }
    
     }
    else {
      Set_YouWillPay(0);
    }
    Validation_PlaceABid({tokenBidAmt:tokenBidAmt,
      NoOfToken:item.type==721?1:NoOfToken,
      Decimal_Value:Decimal_Value,
      TokenBalances:TokenBalances,
      CoinName:CoinName,YouWillPay,YouWillPay})
  }

  const Validation_PlaceABid = (chk) => {
    ////("valescalled",chk,typeof chk.NoOfToken,NoofToken)
    if (chk) {
      var tokenbidAmt = typeof chk.tokenBidAmt!= "undefined" ? Number(chk.tokenBidAmt ):Number(tokenBidAmt);
      var NoofToken   = typeof chk.NoOfToken!= "undefined" ? chk.NoOfToken :NoOfToken;
      var CoinName   = typeof chk.CoinName!= "undefined" ? chk.CoinName :CoinName;
      var TokenBalances   = typeof chk.TokenBalances!= "undefined" ? chk.TokenBalances :TokenBalances;
      var YouWillPay   = typeof chk.YouWillPay!= "undefined" ? chk.YouWillPay :YouWillPay;

     var ValidateError = {};
    if(item.type==1155){ if (NoofToken == '') {
       ValidateError.NoOfToken = '"Quantity" is not allowed to be empty';
     }
     else if (isNaN(NoofToken)) {
       ValidateError.NoOfToken = '"Quantity" must be a number';
     }
     else if (NoofToken == 0) {
       ValidateError.NoOfToken = '"Quantity" is required';
     }
     else if (NoofToken > AllowedQuantity) {
       ValidateError.NoOfToken = '"Quantity" must be less than or equal to ' + AllowedQuantity;
     }}
     if (tokenbidAmt == '') {
       ValidateError.tokenBidAmt = '"Bid amount" is not allowed to be empty';
     }
     else if (isNaN(tokenbidAmt)) {
       ValidateError.tokenBidAmt = `Bid Amount must be a number`
     }
     else if (String(tokenbidAmt).split('.').pop().length == 5) {
       ValidateError.tokenBidAmt = '"Bid amount" Must be greater than 0.0001';
     }

     else if (tokenbidAmt <= (Bids && Bids.pending && (Bids.pending).length > 0 && Bids.pending[0].tokenBidAmt)) {
       ValidateError.tokenBidAmt = '"Bid amount" must be greater than ' + (Bids && Bids.pending && (Bids.pending).length > 0 && Bids.pending[0].tokenBidAmt);
     }
     
     else if (token_owner_detail.minimumBid > tokenbidAmt) {
       ValidateError.tokenBidAmt = '"Bid amount" must be higher than or equal to ' + token_owner_detail.minimumBid;
     }
     else if (highbid >= tokenbidAmt) {
       ValidateError.tokenBidAmt = 'Bid must be higher than current highest Bid of ' + highbid +" "+ config.tokenSymbol;
     }
     else if ((YouWillPay / 10**18) > TokenBalances) {
      ValidateError.tokenBidAmt = 'Insufficient balance, Check your wallet balance';
     }
     else if ( TokenBalances == 0) {
      ValidateError.tokenBidAmt = 'Insufficient balance, Check your wallet balance';
     }
     else if ((YouWillPay ==0 )) {
      ValidateError.tokenBidAmt = 'Err in Generating Price';
     }
    

     Set_ValidateError(ValidateError);
     return ValidateError;
   }
 }

  async function priceListFunction(){
    //////("POPup starting")
    window.$('#accept_price_item_modal').modal('hide');
    window.$('#accept_modal').modal('show');
}
const priceoptionfunc = async(e) => {
  set_CoinName(e.value)
  var coin=e.value
  set_Decimal_Value(e.decimal)
  set_Token_Address(e.address)
  ////("owpqeopwqpeopwqe",e);
  var web3=new Web3(Wallet_Details.providers)
            var sendContAddr=(item.type  == 721) ?   SINGLE :   MULTIPLE
            if((String(item.contractAddress).toLowerCase() == String(config.singleContract).toLowerCase()) 
            || (String(item.contractAddress).toLowerCase() == String(config.multipleContract).toLowerCase())){
              var ContrctAddr=item.contractAddress
            }
            else{
             
              var ContrctAddr=config.trade
            }
            var TokenBalanceCheck= 0;
            var TokenExitsOrNot=await my_hook.TokenExitsOrNotFunc(item.type,ContrctAddr,e.address,coin)
            if(TokenExitsOrNot){
            var TokenBalanceCheck= await my_hook.Token_Balance_Calculation(Wallet_Details.UserAccountAddr,e.address)
            Set_TokenBalances(TokenBalanceCheck)
                  }
                 else{
                   Set_TokenBalances(0)
                   set_Token_Address(config.deadAddress)
                 }
                 Validation_PlaceABid({tokenBidAmt:tokenBidAmt,
                  NoOfToken:item.type==721?1:NoOfToken,
                  Decimal_Value:e.decimal,
                  TokenBalances:TokenBalanceCheck,
                  CoinName:CoinName})

PriceCalculate_this({tokenBidAmt:tokenBidAmt,NoOfToken:item.type==721?1:NoOfToken,Decimal_Value:e.decimal,TokenBalances:TokenBalanceCheck,CoinName:coin})


  
};
 

  const inputChange = (e) => {
    if (e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
      var value = Number(e.target.value);
      ////("vales",typeof value,value)
      switch (e.target.name) {
          case 'tokenBidAmt':
            Set_tokenBidAmt(Number(value));
            Validation_PlaceABid({tokenBidAmt: Number(value),NoOfToken:item.type == 721 ? 1:NoOfToken ,CoinName:CoinName,TokenBalances:TokenBalances})
            PriceCalculate_this({ tokenBidAmt: Number(value),NoOfToken:item.type == 721 ? 1:NoOfToken ,CoinName:CoinName,TokenBalances:TokenBalances});
            if(item.type == 721) Set_NoOfToken(1)
            break;
          case 'NoOfToken':
            Set_NoOfToken( Number(value));
            Validation_PlaceABid({tokenBidAmt:tokenBidAmt,NoOfToken: Number(value),CoinName:CoinName,TokenBalances:TokenBalances});
            PriceCalculate_this({ tokenBidAmt:tokenBidAmt,NoOfToken:  Number(value),CoinName:CoinName,TokenBalances:TokenBalances });
          break;
          }      
    }
  }

  async function FormSubmit_PlaceABid(e) {
    Set_BidformSubmit(true);
    var errors = await Validation_PlaceABid({tokenBidAmt:tokenBidAmt,NoOfToken:NoOfToken,CoinName:CoinName,TokenBalances:TokenBalances});
    var errorsSize = Object.keys(errors).length;
    //("eroor datta ",errors,errorsSize);
    if (errorsSize != 0) {
      toast.error("Form validation error. Fix all mistakes and submit again", toasterOption);
      return false;
    }
    window.$('#place_bid_modal').modal('hide');
    window.$('#proceed_bid_modal').modal('show');
  }
  //////('>>>>>approvecall');
  async function ApproveCall() {
  if (Wallet_Details.providers==null) {
        var receiptt = null;
        var handlee = null;
        toast.warning("OOPS!..connect Your Wallet", toasterOption);
        return false;
      }
      var web3 = new Web3(Wallet_Details.providers);
      var currAddr = Wallet_Details.UserAccountAddr
      
      if (currAddr=="") {
        toast.warning("OOPS!..connect Your Wallet", toasterOption);
        return false;
      }
      setApprovalCallStatus('processing');
      try {
        var MultiContract = new web3.eth.Contract(
                (item.type == 721?SINGLE:MULTIPLE),
                (item.contractAddress)
                );
              ////("item.type",item.type,item.contractAddress, config.trade,item.tokenOwner,MultiContract,web3)
        await MultiContract.methods.setApprovalForAll(
            config.trade,
            true
          ).send({
            from: Wallet_Details.Account,
          }).on('transactionHash', async (transactionHash) => {
            if (transactionHash != "") {
              handlee = setInterval(async () => {
                receiptt = await getReceipt(web3, transactionHash)
                clr();
              }, 2000)
            }
          })
        }
        catch (error) {
          toast.error("Approve failed", toasterOption);
          setApprovalCallStatus('tryagain');
        }
        async function clr() {
          if (receiptt != null) {
            clearInterval(handlee)
              toast.success("Approve Successfully", toasterOption);
              setApprovalCallStatus('done');
            }
      }
    }

  
  async function BidApply_ApproveCall() {
  
    if (Wallet_Details.providers==null) {
      toast.warning("OOPS!... connect Your Wallet", toasterOption);
      return false;
    }
    var web3 = new Web3(Wallet_Details.providers);
     Set_BidApply_ApproveCallStatus('processing');
     var filOp = (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()===String(CoinName).toLowerCase())
     var tokenAddrDetail = filOp[0].address;
     console.log("token for contract instance",tokenAddrDetail)
    // var CoursetroContract = new web3.eth.Contract(DETH_ABI, config.tokenAddr[config.tokenSymbol]);
    var CoursetroContract = new web3.eth.Contract(DETH_ABI, tokenAddrDetail);  //dynamic token contract instance
    //var CoursetroContract = new web3.eth.Contract(DETH_ABI, config.tokenAddr[config.tokenSymbol]);
    var getAllowance = null;
    var ContractCall = null;
    var sendVal = null;
    var handle = null;
    var receipt = null;

    try {
      if (String(item.contractAddress).toLowerCase() == String(config.singleContract.toLowerCase()) 
      || String(item.contractAddress).toLowerCase() == String(config.multipleContract).toLowerCase()) {
      
        var SendAddress=item.contractAddress
      }
      else{
        var SendAddress=config.trade
      }
      //("get tok allow i/p data ",CoursetroContract,SendAddress,Wallet_Details.UserAccountAddr);
      var getAllowance=await GetTokenAllowance(CoursetroContract,SendAddress,Wallet_Details.UserAccountAddr)
      //("getallowance typeof",typeof(getAllowance))  
      //("getallowance o/p ",getAllowance)  
     
      if(Decimal_Value == 18){
      
        //("i/p arg for youwillpay ",YouWillPay);
          sendVal=web3.utils.toWei(String(Number(web3.utils.fromWei(String(YouWillPay)))+Number(web3.utils.fromWei(String(getAllowance)))))
          //("send val data ",sendVal)
      }
      else{
        var sendVal=(((Number(YouWillPay))/(10**(Decimal_Value)))+((Number(getAllowance))/(10**(Decimal_Value))))*(10**(Decimal_Value))
                     
      }//("approve call i/p data ", SendAddress,(String(sendVal)))
        ContractCall = await CoursetroContract
          .methods
          .approve(
            SendAddress,
          (String(sendVal)))
          .send({ from: Wallet_Details.Accounts })
          .on('transactionHash', async (transactionHash) => {
            handle = setInterval(async () => {
              receipt = await getReceipt(web3, transactionHash)
              clr1();
            }, 2000)
          })
        
      } 
    catch (e) {
      //("error ",e);
      toast.error("Transaction Reverted",+e.toString(), toasterOption);
      Set_BidApply_ApproveCallStatus('tryagain');
    }
    async function clr1() {
      if (receipt != null) {
        if (receipt.status == true) {
          clearInterval(handle);

          var BidData = {
              tokenCounts: item.tokenCounts,
              tokenBidAddress: Wallet_Details.UserAccountAddr,
              tokenBidAmt: tokenBidAmt,
              NoOfToken: item.type == 721 ? 1 : NoOfToken,
              owner: token_owner_detail.tokenOwner,
              CoinName:CoinName
          }

          var Resp = await BidApply_ApproveAction(BidData);
          if (Resp.data && Resp.data.type) {
            Set_BidApply_ApproveCallStatus('done');
            toast.success("Transaction Completed", toasterOption);
            // window.location.reload();
          }
        }
      }

    }
    // await ContractCall
  }

  async function BidApply_SignCall() {
    if (Wallet_Details.providers==null) {
      toast.warning("OOPS!..connect Your Wallet", toasterOption);
      return;
    }
    var web3 = new Web3(Wallet_Details.providers);
    var currAddr = Wallet_Details.UserAccountAddr;
    if (currAddr=='') {
      toast.warning("OOPS!..connect Your Wallet", toasterOption);
      return;
    }

    Set_BidApply_SignCallStatus('processing');

    try {
      await web3.eth.personal.sign("Bidding a Art", currAddr, "Bid Placed")
      toast.success("Bid sign successfully", toasterOption);
      Set_BidApply_SignCallStatus('done');
      setTimeout(() => {
        window.$('#proceed_bid_modal').modal('hide')
        var payload = {
          curAddr: Wallet_Details.UserAccountAddr,
          tokenCounts: item.tokenCounts,
          paramAddress: String(token_owner_detail.tokenOwner).toLowerCase(),
          contractAddress: String(item.contractAddress).toLowerCase()
        };
       
          window.$('div').removeClass('modal-backdrop');
          props.Refresh_page()
     
      }, 600);
       
     }
    catch (e) {
      toast.error("Singnature Reverted",+e.toString(), toasterOption);
      Set_BidApply_SignCallStatus('tryagain');
    }
  }

  async function CancelBid_Proceed(curBid_val) {
    
    var payload = {
      tokenCounts: curBid_val.tokenCounts,
      tokenBidAddress: curBid_val.tokenBidAddress,
      owner: token_owner_detail.tokenOwner
     }
    var Resp = await CancelBid_Action(payload);
    if (Resp && Resp.data && Resp.data.toast && Resp.data.toast.type ) {
      if (Resp.data.toast.type == 'error') {
        toast.error(Resp.data.toast.message, toasterOption);
      }
      else if (Resp.data.toast.type == 'success') {
        toast.success(Resp.data.toast.message, toasterOption);
      }
      setTimeout(() => {
        window.$('#close_cancel').click()
        // window.$('.modal').modal('hide')
        // window.$('div').removeClass('modal-backdrop');
        props.Refresh_page()
      }, 600);

    }
    else {
      window.$('#close_cancel').click()
          props.Refresh_page()
    }
  }

  async function orderApprovecheck(item){
    if (Wallet_Details.providers==null) {
        toast.warning("OOPS!..connect Your Wallet", toasterOption);
        return false;
      }
      var web3 = new Web3(Wallet_Details.providers);
      try{
        var MultiContract = new web3.eth.Contract(
          (item.type == 721?SINGLE:MULTIPLE),
          item.contractAddress
        )
   var status = await MultiContract.methods.isApprovedForAll(
         Wallet_Details.UserAccountAddr,
         config.trade
       ).call();
       ////("OrderApprove Check", status);
       return status
        }
        catch(e){
          ////("OrderApprove Check", e);
          return false
     
        }
     
      }
  async function AcceptBid_Proceed() {
  if (Wallet_Details.providers) {
      var web3 = new Web3(Wallet_Details.providers);
      var CoursetroContract = null;
      var contractCall = null
      var handle = null;
      var receipt = null;
      var CHcekDethBlnOfBid = new web3.eth.Contract(DETH_ABI, Token_Address);
      var tokenBalance = TokenBalances;
      var passAmt = AccepBidSelect.tokenBidAmt;

      if (item.contractAddress==config.singleContract||item.contractAddress==config.multipleContract) {
        var SendAddress=item.contractAddress
      }
      else{
        var SendAddress=config.trade
      }
      var getAllowance=await GetTokenAllowance(CHcekDethBlnOfBid,SendAddress, AccepBidSelect.tokenBidAddress)
      var getAllowancecal = web3.utils.fromWei(String(getAllowance));
      if ((tokenBalance) > (passAmt)) {

        if ((Number(getAllowancecal)) >= (passAmt)) {
          if (NoOfToken_NeedToSend) {
            try {
              if ((String(item.contractAddress).toLowerCase() == String(config.singleContract).toLowerCase() )|| 
                  (String(item.contractAddress).toLowerCase() == String(config.multipleContract).toLowerCase()) ||
                  (String(item.contractAddress).toLowerCase() == String(config.old_singleContract).toLowerCase() )|| 
                  (String(item.contractAddress).toLowerCase() == String(config.old_multipleContract).toLowerCase())) {
              if (item.type == 721) {
                Set_accept_btn('process')
                CoursetroContract = new web3.eth.Contract(SINGLE, item.contractAddress);
                contractCall = await CoursetroContract
                  .methods
                  .acceptBId(
                    AccepBidSelect.CoinName,
                    AccepBidSelect.tokenBidAddress,
                    web3.utils.toWei(String(passAmt)),
                    item.tokenCounts
                  )
                  .send({ from: Wallet_Details.Accounts })
                  .on('transactionHash', async (transactionHash) => {
                    handle = setInterval(async () => {
                      receipt = await getReceipt(web3, transactionHash)
                      clr1();
                    }, 2000)
                  })
              }
              else {
                Set_accept_btn('process')
                CoursetroContract = new web3.eth.Contract(MULTIPLE, item.contractAddress);
                contractCall = await CoursetroContract
                  .methods
                  .acceptBId(
                    AccepBidSelect.CoinName,
                    AccepBidSelect.tokenBidAddress,
                    web3.utils.toWei(String(passAmt)),
                    item.tokenCounts,
                    NoOfToken_NeedToSend
                  )
                  .send({ from: Wallet_Details.Accounts })
                  .on('transactionHash', async (transactionHash) => {
                    handle = setInterval(async () => {
                      receipt = await getReceipt(web3, transactionHash)
                      clr1();
                    }, 2000)
                  })


              }
            }
            else{
              Set_accept_btn('process')
            
              var TradeContract = new web3.eth.Contract(
                Trade,
                config.trade
            );
           
            await TradeContract
                .methods
                .acceptBId(
                  AccepBidSelect.CoinName,
                  AccepBidSelect.tokenBidAddress,
                  web3.utils.toWei(String(passAmt)),
                  (item.tokenCounts),
                  NoOfToken_NeedToSend,
                  item.type,
                  item.contractAddress
                )
                .send({ from: Wallet_Details.Accounts })
                .on('transactionHash',async (transactionHash) => {
                  handle = setInterval(async () => {
                      receipt = await getReceipt(web3, transactionHash)
                      clr1();
                    }, 2000)
              })
            }
            }
            catch (e) {
              //////("check accept test",e)
    
              toast.error("accept bid cancelled", toasterOption)
              Set_accept_btn('try')

            }
            async function clr1() {
              if (receipt != null) {
                clearInterval(handle);
                if (receipt.status == true) {
                  if (((String(item.contractAddress).toLowerCase()) != config.singleContract) ||
                     ((String(item.contractAddress).toLowerCase()) != config.multipleContract) ||
                     ((String(item.contractAddress).toLowerCase()) != config.old_singleContract) ||
                     ((String(item.contractAddress).toLowerCase()) != config.old_multipleContract)) {
                    var postMetaData = {
                        tokenOwner: Wallet_Details.UserAccountAddr, // old owner
                        tokenCounts: item.tokenCounts,
                        NoOfToken: item.type == 721 ? 1 : NoOfToken,
                        contractAddress: item.contractAddress   
                    }
                    var resultt = await PurchaseNow_Complete_Action_Meta(postMetaData);
                }   
                  var acceptBId_Payload = {
                    tokenCounts: item.tokenCounts,
                    NoOfToken: NoOfToken_NeedToSend, //AccepBidSelect.NoOfToken,
                    tokenBidAddress: AccepBidSelect.tokenBidAddress,
                    UserAccountAddr_byaccepter: Wallet_Details.UserAccountAddr,
                    transactionHash: receipt.transactionHash,
                    owner: token_owner_detail.tokenOwner,
                    CoinName:CoinName,
                    tokenAddArr:Wallet_Details.tokenAddress
                  
                  }
                  var Resp = await acceptBId_Action(acceptBId_Payload);
                  Set_accept_btn('done')
                  setTimeout(() => {
                  //   window.$('.modal').modal('hide')
                  // window.$('div').removeClass('modal-backdrop');
                  props.Refresh_page()
                }, 600);
                    }
              }
            }
          }
        }
        else {
          toast.error("This Bidder Doesn't have enough allowance,Pleae try  another bidder")
          Set_accept_btn('error1')
        }
      }

      else {
        toast.error("This Bidder Doesn't have enough balance,Pleae try  another bidder")
        Set_accept_btn('error')
      }

    }
  }

  useImperativeHandle(
    ref,
    () => ({
      async PlaceABid_Click(item, itemCur, Bids) {
        console.log("placebid ref i/p data ",item, itemCur, Bids)
        set_item(item)
        set_token_owner_detail(itemCur)
        if (Wallet_Details.UserAccountAddr != "") {
          Set_BidformSubmit(false);
          if (Bids && Bids.myBid) {
            Set_Bids(Bids)
            Set_tokenBidAmt(Bids.myBid.tokenBidAmt);
            Set_NoOfToken(Bids.myBid.NoOfToken);

          }
          if(Wallet_Details.tokenAddress!=null){
            if(CoinName==''){
              var filOp = (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()!==String(config.currencySymbol).toLowerCase())
              if(filOp.length>0){
              ////("check la",filOp);
              set_CoinName(filOp[0].label)
              setPriceoption(filOp)
              set_Decimal_Value(filOp[0].decimal)
              set_Token_Address(String(filOp[0].address).toLowerCase())
               
          var web3=new Web3(Wallet_Details.providers)
          var sendContAddr=(item.type  == 721) ?   SINGLE :   MULTIPLE
          if((String(item.contractAddress).toLowerCase() == String(config.singleContract).toLowerCase()) 
          || (String(item.contractAddress).toLowerCase() == String(config.multipleContract).toLowerCase())){
            var ContrctAddr=item.contractAddress
          }
          else{
           
            var ContrctAddr=config.trade
          }
          const ContractCall = new web3.eth.Contract(sendContAddr,ContrctAddr);
          var TokenExitsOrNot=await my_hook.TokenExitsOrNotFunc(item.type,ContrctAddr,filOp[0].address,filOp[0].label)
          console.log("token_bn",TokenExitsOrNot);
        if(TokenExitsOrNot){
        var TokenBalanceCheck= await my_hook.Token_Balance_Calculation(Wallet_Details.UserAccountAddr,filOp[0].address)
        console.log("token_bn...........",TokenBalanceCheck);
          Set_TokenBalances(TokenBalanceCheck)
                  }
               else{
                 set_Token_Address(config.deadAddress)
                 Set_TokenBalances(0)
               }
               Validation_PlaceABid({tokenBidAmt:tokenBidAmt,NoOfToken:item.type==721?1:NoOfToken,Decimal_Value:filOp[0].decimal,TokenBalances:TokenBalanceCheck,CoinName:filOp[0].token})
                PriceCalculate_this({tokenBidAmt:tokenBidAmt,NoOfToken:item.type==721?1:NoOfToken,Decimal_Value:filOp[0].decimal,TokenBalances:TokenBalanceCheck,CoinName:filOp[0].token})

              }
              }
          }
          
       
          window.$('#place_bid_modal').modal('show');

        }
        else {
           window.$('#place_bid_modal').modal('hide');
          window.$('#connect_modal').modal('show')
        }
      },
      async PriceCalculate(data = {}) {
        PriceCalculate_this(data);
      },

async AcceptBid_Select(item, curBid_val) {
  //("accept bid select ",item, curBid_val);
   if (Wallet_Details.providers) {
    var web3=new Web3(Wallet_Details.providers)
    var BuyOwnerDetail={
      tokenOwner:Wallet_Details.UserAccountAddr,
      tokenCounts:curBid_val.tokenCounts,
      contractAddress:item.contractAddress
    }
    //('balance>>>>>>>>>0',BuyOwnerDetail)
    var balance = await checkOtherPlatformDetais1155(item,BuyOwnerDetail,item.type,web3);
    //('balance>>>>>>>>>',balance)
    if (balance == 0) {
        toast.warning("You won't buy at this moment please refresh you data",toasterOption);
        setTimeout(() => {
            window.location.href="/"
        }, 1000);
        return false;
    }
    else{
    set_item(item)
    if (curBid_val && curBid_val.tokenBidAmt) {
    
      //("curbid val ",curBid_val.tokenBidAmt,item.tokenCounts);
      var contractCall= new web3.eth.Contract(item.type==721?SINGLE:MULTIPLE,item.contractAddress)
     // var listnft=await ListNFT(contractCall,Wallet_Details.UserAccountAddr,item.tokenCounts)
      
      //if(listnft){
       
     set_CoinName(curBid_val.CoinName)
      Set_AccepBidSelect(curBid_val);
      var totalAmt = 0;
      if (Number(MyTokenBalance) < Number(curBid_val.pending)) {
        
        Set_NoOfToken_NeedToSend(MyTokenBalance);
        totalAmt = Number(MyTokenBalance) * (Number(curBid_val.tokenBidAmt)*1000000);
      }
      else {
        Set_NoOfToken_NeedToSend(curBid_val.pending);
        totalAmt = Number(curBid_val.pending) * (Number(curBid_val.tokenBidAmt)*1000000);
      }

      var toMid = Number(totalAmt)
      var ServiceFee_val = (toMid)*((Wallet_Details.sellerfee/config.decimalvalues)*1000000)/100000000
      var YouWillGet_Val = (toMid - ServiceFee_val);
      Set_YouWillPayFee(ServiceFee_val/1e6);
      Set_YouWillGet((YouWillGet_Val)/1e6);
      var royalFee = (toMid) * ((item.tokenRoyality) * 1000000)/100000000
      var YouWillGet_Val1 = ((toMid - (ServiceFee_val + royalFee))/1000000);
      set_YouWillGetWith(YouWillGet_Val1) 
      //////(" curBid_val.tokenBidAmt", curBid_val.tokenBidAmt,"MyTokenBalance",MyTokenBalance,"curBid_val.pending",curBid_val.pending,"totalAmt",totalAmt,"toMid",toMid,"ServiceFee_val",ServiceFee_val,"YouWillGet_Val",YouWillGet_Val,"royalFee",royalFee,"YouWillGet_Val1",YouWillGet_Val1)
      if (item.contractAddress == config.singleContract ||
         item.contractAddress == config.multipleContract ||
         item.contractAddress == config.old_singleContract ||
         item.contractAddress == config.old_multipleContract) {
    

      var web3=new Web3(Wallet_Details.providers)
      var sendContAddr=(item.type  == 721) ?   SINGLE :   MULTIPLE
      if  ((String(item.contractAddress).toLowerCase() == String(config.singleContract).toLowerCase()) 
      || (String(item.contractAddress).toLowerCase() == String(config.multipleContract).toLowerCase())){
        var ContrctAddr=item.contractAddress
      }
      else{
       
        var ContrctAddr=config.trade
      }
    const ContractCall = new web3.eth.Contract(sendContAddr,ContrctAddr);
    //////("ContractCall",ContractCall)
     var TokenExitsOrNot=await TokenExitsOrNotFunc(ContractCall,curBid_val.CoinName)
     //("TokenExitsOrNot",TokenExitsOrNot);
    if(TokenExitsOrNot!=config.deadAddress){
     
      var TokenBalanceCheck=await GetTokenBalance(curBid_val.tokenBidAddress,curBid_val.CoinName,TokenExitsOrNot,web3)
      console.log("TokenBalanceCheck",TokenBalanceCheck);
      Set_TokenBalances(TokenBalanceCheck.bidbln1)
      set_Decimal_Value(TokenBalanceCheck.TokenDecimal)
      set_Token_Address(String(TokenExitsOrNot).toLowerCase())
      window.$('#accept_modal').modal('show');
           }
           else {
            toast.error("This Token is not Currently Available in this platform")
            Set_accept_btn('error3')
          }
   
      }
      else{
        toast.error("Error in accepting bid")
        // var check = await orderApprovecheck(item);
        // if(check)
        // {
        //   setApprovalCallStatus('done')
        // }
        // window.$('#accept_price_item_modal').modal('show');
      }
    //}
    // else{
    //   var token_detail={
    //     image:item.image,
    //     TokenFile:item.additionalImage == "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`,
    //     TokenName:item.tokenName,
    //     type:item.type,
    //     listNft:listnft,
    //     clocktime:null,
    //     endclocktime:null,
    //     }
    // history.push({
    //     pathname:'/assets/'+item.contractAddress+'/'+item.tokenCounts+'/sell',
    //     state:token_detail,
      
    // })
    // }
  } 
  }
  
}
else {
    window.$('#connect_modal').modal('show')
  }
},
      async CancelBid_Select(item,curBid_val) {
        if (Wallet_Details.providers) {
          if (
            curBid_val
            && curBid_val.pending > 0
            &&
            (
              curBid_val.status == 'pending'
              || curBid_val.status == 'partiallyCompleted'
            )
          ) {
            Set_AccepBidSelect(curBid_val);
            set_CoinName(curBid_val.CoinName)
            set_item(item)
            window.$('#cancel_modal').modal('show');
          }
          else {
            window.$('.modal').modal('hide')
          }
        }

        else {
          window.$('#connect_modal').modal('show')
        }
      }

    }),
  )

  useEffect(() => {
    Validation_PlaceABid(BidformSubmit);
    PriceCalculate_this({tokenBidAmt:tokenBidAmt,NoOfToken:NoOfToken,CoinName:CoinName})
   }, [
    tokenBidAmt,
    CoinName,
    TokenBalances,
    NoOfToken,
    Decimal_Value,
    YouWillGet,
    YouWillPay
  ])

  return (
    <div>
      <div id="Validation_PlaceABid" onClick={() => Validation_PlaceABid(BidformSubmit)}></div>
      {/* place_bid Modal */}
      <div className="modal fade primary_modal" id="place_bid_modal" tabIndex="-1" role="dialog" aria-labelledby="place_bid_modalCenteredLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              {/* {YouWillPay==''} */}
              <h5 className="modal-title" id="place_bid_modalLabel">Place a bid</h5>
              <p className="text-center place_bit_desc">You are about to place a bid for</p>
              <p className="place_bit_desc_2 "><span className="text_red mr-2">{item.tokenName}</span>by
                <span className="text_red ml-2"
                    title={"Bidder : " + (!isEmpty(Wallet_Details.AddressUserDetails) ? (Wallet_Details.AddressUserDetails.name != "" ? Wallet_Details.AddressUserDetails.name : Wallet_Details.UserAccountAddr) : Wallet_Details.UserAccountAddr)} >
                    {!isEmpty(Wallet_Details.AddressUserDetails)
                      && Wallet_Details.AddressUserDetails.name != ""
                      ? Wallet_Details.AddressUserDetails.name
                      : String(Wallet_Details.UserAccountAddr).slice(0, 12).concat('....')}
                 </span></p>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body px-0 pt-0">
              <form className="px-4 bid_form">
                <label htmlFor="bid">Your bid</label>
                <div className="input-group mb-3 input_grp_style_1 min_h_45px_input_grp">
                  <input
                    type="text"
                    maxLength={config.maxLength}
                    name="tokenBidAmt"
                    id="tokenBidAmt"
                    className="form-control min_h_45px_input"
                    placeholder="Enter your bid amount"
                    aria-label="bid"
                    aria-describedby="basic-addon2"
                    // value={tokenBidAmt}
                    onChange={inputChange}
                  />
                  <div className="input-group-append">
                  <span class="input-group-text pl-0" id="basic-addon2">
                      <Select
                        className="yes1 form-control primary_inp select1 selxet_app"
                        id="basic-addon2"
                        name="coinname"
                        // value={{label:CoinName}}
                        onChange={priceoptionfunc}
                        options={token_owner_detail.minimumBid && token_owner_detail.minimumBid > 0?
                          (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()===String(token_owner_detail.CoinName).toLowerCase())
                          :priceoption}
                        label="Select price"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
  
                      </span>
                  </div>
                </div>
                {ValidateError.tokenBidAmt && <span className="text-danger">{ValidateError.tokenBidAmt}</span>}
                {item.type == config.multipleType && <label htmlFor="qty">Enter quantity <span className="label_muted pl-2">( {AllowedQuantity} available)</span></label>}
                {item.type == config.multipleType && <div className="mb-3 input_grp_style_1">
                  <input
                    type="text"
                    name="NoOfToken"
                    id="NoOfToken"
                    className="form-control"
                    placeholder="Enter your bid quantity"
                    onChange={inputChange}
                
                  />
                </div>}
                {ValidateError.NoOfToken && <span className="text-danger">{ValidateError.NoOfToken}</span>}
                <div className="row pb-3">
                  <div className="col-12 col-sm-6">
                    <p className="buy_desc_sm">Your balance</p>
                  </div>
                  <div className="col-12 col-sm-6 text-sm-right">
                    <p className="buy_desc_sm_bold">{Number(Wallet_Details.UserAccountBal).toFixed(config.toFixed)} {config.currencySymbol}</p>
                  </div>
                </div>
                {TokenBalances!=''&&
                <>
                <div className="row pb-3">
                  <div className="col-12 col-sm-6">
                    <p className="buy_desc_sm">Your bidding balance</p>
                  </div>
                  <div className="col-12 col-sm-6 text-sm-right">
                    <p className="buy_desc_sm_bold">{Number(TokenBalances).toFixed(config.toFixed)} {CoinName}</p>
                  </div>
                </div></>}
                <div className="row pb-3">
                  <div className="col-12 col-sm-6">
                    <p className="buy_desc_sm">Service fee</p>
                  </div>
                  <div className="col-12 col-sm-6 text-sm-right">
                    <p className="buy_desc_sm_bold">{(Number(Wallet_Details.buyerfee) ) / config.decimalvalues}% <span>{CoinName}</span></p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-12 col-sm-6">
                    <p className="buy_desc_sm">You will pay</p>
                  </div>
                  <div className="col-12 col-sm-6 text-sm-right">
                    <p className="buy_desc_sm_bold">
                      {YouWillPay/1e18}
                      {CoinName}
                      {/* <Convert
                        item={Number(YouWillPay)}
                        coinName={CoinName}
                        convertVal={1}
                      /> */}

                    </p>
                  </div>
                </div>

                <div className="text-center">
                  {/* data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#proceed_bid_modal" */}
                  <Button className="create_btn btn-block" onClick={() => FormSubmit_PlaceABid()} >Place a bid</Button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      {/* end place_bid modal */}

      {/* proceed_bid Modal */}
      <div className="modal fade primary_modal" id="proceed_bid_modal" tabIndex="-1" role="dialog" aria-labelledby="proceed_bid_modalCenteredLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title" id="proceed_bid_modalLabel">Follow Steps</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="media approve_media">
                  <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>
                  {/* <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i> */}
                  <div className="media-body">
                    <p className="mt-0 approve_text">Approve</p>
                    <p className="mt-0 approve_desc">Checking balance and approving</p>
                  </div>
                </div>
                <div className="text-center my-3">
                  <Button
                    className={"create_btn btn-block "}
                    disabled={(BidApply_ApproveCallStatus == 'processing' || BidApply_ApproveCallStatus == 'done')}
                    onClick={BidApply_ApproveCall}
                  >
                    {BidApply_ApproveCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                    {BidApply_ApproveCallStatus == 'init' && 'Approve'}
                    {BidApply_ApproveCallStatus == 'processing' && 'In-progress...'}
                    {BidApply_ApproveCallStatus == 'done' && 'Done'}
                    {BidApply_ApproveCallStatus == 'tryagain' && 'Try Again'}
                  </Button>
                </div>
                <div className="media approve_media">
                  <i className="fas fa-check mr-3" aria-hidden="true"></i>
                  <div className="media-body">
                    <p className="mt-0 approve_text">Signature</p>
                    <p className="mt-0 approve_desc">Create a signatute to place a bid</p>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <Button
                    className={"create_btn btn-block "}
                    disabled={(BidApply_ApproveCallStatus != 'done' || BidApply_SignCallStatus == 'processing' || BidApply_SignCallStatus == 'done')}
                    onClick={BidApply_SignCall}
                  >
                    {BidApply_SignCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                    {BidApply_SignCallStatus == 'init' && 'Start'}
                    {BidApply_SignCallStatus == 'processing' && 'In-progress...'}
                    {BidApply_SignCallStatus == 'done' && 'Done'}
                    {BidApply_SignCallStatus == 'tryagain' && 'Try Again'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* end proceed_bid modal */}

      {/* accept bid Modal */}
      <div className="modal fade primary_modal" id="accept_modal" tabIndex="-1" role="dialog" aria-labelledby="accept_modalCenteredLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false"> 
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title" id="accept_modalLabel">Accept bid</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body px-0">
              <div className="img_accept text-center">
                {
                  item && item.image &&
                  (String(item.image).split('.').pop() == "mp4" ||
                    (String(item.image).split('.').pop() == "webm") ||
                    (String(item.image).split('.').pop() == "WEBM") ||
                    (String(item.image).split('.').pop() == "ogv") ||
                    (String(item.image).split('.').pop() == "OGV")
                  )
                  &&
                  <video
                  id="my-video"
                  className="img-fluid"
                  autoPlay controls playsInline loop
                  preload="auto"
                  >

                    <source
                      src={(item.additionalImage == "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}
                 type="video/mp4" />
                  </video>}

                {
                  item && item.image && item.image != ""
                  && ((String(item.image).split('.').pop() == "mp3" || String(item.image).split('.').pop() == "aac" || String(item.image).split('.').pop() == "AAC" || String(item.image).split('.').pop() == "FLAC" || String(item.image).split('.').pop() == "flac")) &&
                  <>
                    {

                      <>
                        <audio controls
                          muted
                          alt='audio'
                          className="img-fluid"
                          playsInline loop
                          type="audio/mp3"
                          autostart="off"
                          id="audio_play"
                          src={item.ipfsimage != "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`}
                        >
                        </audio>
                      </>
                    }
                  </>
                }
                {
                  item && item.image && item.image != ""
                  && ((String(item.image).split('.').pop() == "mp3" || String(item.image).split('.').pop() == "aac" || String(item.image).split('.').pop() == "AAC" || String(item.image).split('.').pop() == "FLAC" || String(item.image).split('.').pop() == "flac")) &&

                  <img
                    src={(item.additionalImage == "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}
                    alt="Collections" className="img-fluid " />
                }
              </div>
             
              <p className="text-center accept_desc">
                <span className="buy_desc_sm">You are about to accept bid for</span>
                <span className="buy_desc_sm_bold pl-2">{item.tokenName}</span>
                <span className="buy_desc_sm pl-2">from</span>
                <span className="buy_desc_sm_bold word_braek_txt_new pl-2">{AccepBidSelect.tokenBidAddress}</span>
              </p>
              <p className="info_title text-center">
                <Convert
                  item={AccepBidSelect.tokenBidAmt}
                  coinName={CoinName}
                  convertVal={1}
                />
                {CoinName} for {NoOfToken_NeedToSend} edition(s)</p>
              <div className="row mx-0 pb-3">
                <div className="col-12 col-sm-6 px-4">
                  <p className="buy_desc_sm">Service fee in % </p>
                </div>
                <div className="col-12 col-sm-6 px-4 text-sm-right">
                  <p className="buy_desc_sm_bold">{(Number(Wallet_Details.sellerfee)) / config.decimalvalues}%  {CoinName}</p>
                </div>
              </div>
              
              <div className="row mx-0 pb-3">
                <div className="col-12 col-sm-6 px-4">
                  <p className="buy_desc_sm">Royalty fee in %

                  </p>
                </div>
                <div className="col-12 col-sm-6 px-4 text-sm-right">
                  <p className="buy_desc_sm_bold">
                    {item.tokenRoyality} %  {CoinName}
                 
                  </p>
                </div>
              </div>
              <div className="row mx-0 pb-3">
                <div className="col-12 col-sm-6 px-4">
                  <p className="buy_desc_sm">You will get</p>
                </div>
                <div className="col-12 col-sm-6 px-4 text-sm-right">
                  <p className="buy_desc_sm_bold">
                    <Convert
                      item={(YouWillGetWith)}
                      coinName={CoinName}
                      convertVal={1}
                    />
                    {CoinName}</p>
                </div>
              </div>
              <form className="px-4">
                <div className="text-center">
                  <Button className="primary_btn btn-block"
                    onClick={(accept_btn == "start" || accept_btn == "try") ? AcceptBid_Proceed:''}
                    disabled={(accept_btn == "process" || accept_btn == "done")}
                  >{accept_btn == "start" && 'Accept Bid'}
                    {accept_btn == "try" && 'Try Again'}
                    {accept_btn == "process" && 'In-Progress'}
                    {accept_btn == "done" && 'Done'}
                    {accept_btn == "error" && 'Something went wrong'}
                    {accept_btn == "error1" && "Bidder doesn't have enough allowance"}

                  </Button>
                  <Button className="cancel_btn btn-block cancel_btn"
                    disabled={(accept_btn == "process")}
                    data-dismiss="modal" aria-label="Close">Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* end accept bid modal */}

      {/* accept bid Modal */}
      <div className="modal fade primary_modal" id="cancel_modal" tabIndex="-1" role="dialog" aria-labelledby="accept_modalCenteredLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title" id="accept_modalLabel">Cancel bid</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close_cancel">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body px-0">
              <div className="img_accept text-center">
                {
                  item && item.image &&
                  (String(item.image).split('.').pop() == "mp4" ||
                    (String(item.image).split('.').pop() == "webm") ||
                    (String(item.image).split('.').pop() == "WEBM") ||
                    (String(item.image).split('.').pop() == "ogv") ||
                    (String(item.image).split('.').pop() == "OGV")
                  )
                  &&
                  <video
                  id="my-video"
                  className="img-fluid"
                  autoPlay controls playsInline loop
                  preload="auto"
                  >

                    <source
                      src={(item.additionalImage == "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}
                   type="video/mp4" />

                  </video>}

                {
                  item && item.image && item.image != ""
                  && ((String(item.image).split('.').pop() == "mp3" || String(item.image).split('.').pop() == "aac" || String(item.image).split('.').pop() == "AAC" || String(item.image).split('.').pop() == "FLAC" || String(item.image).split('.').pop() == "flac")) &&
                  <>
                  
                    {

                      <>
                        <audio controls
                          muted
                          alt='audio'
                          className="img-fluid"
                          playsInline loop
                          type="audio/mp3"
                          autostart="off"
                          id="audio_play"
                          src={item.ipfsimage != "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`}
                        >
                        </audio>
                      </>
                    }
                  </>
                }
                {
                  item && item.image && item.image != ""
                  && ((String(item.image).split('.').pop() == "mp3" || String(item.image).split('.').pop() == "aac" || String(item.image).split('.').pop() == "AAC" || String(item.image).split('.').pop() == "FLAC" || String(item.image).split('.').pop() == "flac")) &&

                  <img
                    src={(item.additionalImage == "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}
                  alt="Collections" className="img-fluid " />
                }
              </div>
              <p className="text-center accept_desc p-3">
                <span className="buy_desc_sm">You are about to cancel bid for</span>
                <span className="buy_desc_sm_bold pl-2">{item.tokenName}</span>
              </p>
              <p className="info_title text-center">
                <Convert
                  item={AccepBidSelect.tokenBidAmt}
                  coinName={CoinName}
                  convertVal={1} />
                {CoinName} for {AccepBidSelect.NoOfToken} edition(s)</p>
              <form className="px-4">
                <div className="text-center">
                  <Button className="primary_btn btn-block"
                  
                  onClick={() => CancelBid_Proceed(AccepBidSelect)}>Cancel bid</Button>
                  <Button className="cancel_btn btn-block" data-dismiss="modal" aria-label="Close">Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* end accept bid modal */}

      <div className="modal fade primary_modal" id="accept_price_item_modal" tabIndex="-1" role="dialog" aria-labelledby="create_item_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
              <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div className="modal-content">
                  <div className="modal-header text-center">
                    <h5 className="modal-title" id="create_item_modalLabel">Follow Steps</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="media approve_media">
                        {ApprovalCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
                        {ApprovalCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
                        {ApprovalCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
                        {ApprovalCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
      
       
                        <div className="media-body">
                          <p className="mt-0 approve_text">Approve</p>
                          <p className="mt-0 approve_desc">Checking balance and approving</p>
                        </div>
                      </div>
                      <div className="text-center my-3">
                        <Button className={"primary_btn btn-block"}
                          disabled={(ApprovalCallStatus == 'processing' || ApprovalCallStatus == 'done')}
                          onClick={ApproveCall}
                        >
                          {ApprovalCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                          {ApprovalCallStatus == 'init' && 'Approve'}
                          {ApprovalCallStatus == 'processing' && 'In-progress...'}
                          {ApprovalCallStatus == 'done' && 'Done'}
                          {ApprovalCallStatus == 'tryagain' && 'Try Again'}
      
                        </Button>
                      </div>
                      <div className="media approve_media">
                       {MintCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
                        {MintCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
                        {MintCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
                        {MintCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
                        <div className="media-body">
                          <p className="mt-0 approve_text">Accept the Bid</p>
                          <p className="mt-0 approve_desc">Call contract method</p>
                        </div>
                        </div>
                        <div className="text-center my-3">
                        <Button className={"primary_btn btn-block"}
                          disabled={(ApprovalCallStatus != 'done' || MintCallStatus == 'processing' || MintCallStatus == 'done')}
                          onClick={priceListFunction}>
                          {MintCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                          {MintCallStatus == 'init' && 'Start'}
                          {MintCallStatus == 'processing' && 'In-progress...'}
                          {MintCallStatus == 'done' && 'Done'}
                          {MintCallStatus == 'tryagain' && 'Try Again'}
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

