import React, { useState, useEffect, useRef, useContext, } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
// import { Account_Connect, Account_disConnect } from "actions/redux/action";
import { Account_Connect,Account_disConnect} from "./reducers"
// import { AddressUserDetails_GetOrSave_Action } from "actions/v1/user";
// import DETH_ABI from 'ABI/DETH_ABI.json';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import config from './lib/config';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// import Icon1 from "assets/images/icon1.jpg";
// import Icon3 from "assets/images/wallet_05.png";
// import Coin from "assets/images/coinbase.png";
import ConditionRoute from './components/Route/ConditionRoute';
import SINGLE from 'ABI/SINGLE.json';
import MULTIPLE from 'ABI/MULTIPLE.json';
import Admin from "layouts/Admin.js";
import Login from "views/Login/login.js";
import Forogt from "views/forgotpass/forgot.js";
import changepass from "views/forgotpass/changepass.js";

toast.configure();
let toasterOption = config.toasterOption;


export default function Indexs(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const Wallet_Details = useSelector(state => state.wallet_connect_context);

    const dispatch = useDispatch(); const { ...rest } = props;
    const timerRef = useRef(null);
  useEffect(() => {
    
    //getServi();
    console.log("localStorage.walletConnectType",localStorage.walletConnectType);
    if (localStorage.walletConnectType && localStorage.walletConnectType != null && localStorage.walletConnectType == 'mt') {
      getInit('mt');
   }
   else if (localStorage.walletConnectType == 'wc' && localStorage.walletconnect != null) {
   }
    
  }, [localStorage.walletConnectType]);

//   async function getBuyTokensList() {
//     var TokenList = await getListOfToken()
//     if (TokenList) {
     
//       var get_token_details = await Promise.all(TokenList.data.data.data.map(async (item) => {
//         var web3 = new Web3(config.BNBPROVIDER);
//         var get_data_tokens = 0;
//         if((item.tokenSymbol).toString().toLowerCase() != (config.currencySymbol).toString().toLocaleLowerCase()){
//           //("fdhbdfhbn",item);
//           try{
//           var tokenObj = new web3.eth.Contract(
//             DETH_ABI, item.tokenAddress
//           );
//           get_data_tokens = await tokenObj
//             .methods
//             .decimals()
//             .call();
//           }
//           catch(e){
//             get_data_tokens = false
//           }
//         }
//         return ({
//           label: item.tokenSymbol,
//           value: item.tokenSymbol,
//           Address: item.tokenAddress,
//           Decimal: Number(get_data_tokens)
//         })
//       }))
//       dispatch({
//         type: Account_Connect,
//         Account_Detail: {
//           tokenAddress: get_token_details
//         }
//       })
//     }

//     var cover = get_token_details;
//     var TokenUSDArray = []
//     //console("sdegadsgr",cover)
//     if(cover != null || cover != undefined)
//     {
//     var newArr = cover.filter(item => item.label !== config.currencySymbol);
//     }
//     //console("NewArryr", newArr)
//     for (let i = 0; i < newArr.length; i++) {
//       //console("token in lloop --1212", newArr[i].label)
//       var ans = await WenlamboConvert(newArr[i].label);
//       if (ans && ans.data && !isEmpty(ans.data)) {
//         //console("tghgfdhfdghfdg", { [newArr[i].label]: ans.data.USD })
//         TokenUSDArray.push({ USD: ans.data.USD, label: newArr[i].label })
//         console.log("mgfbnjfiojgjog", TokenUSDArray);
//       }
//     }
//     dispatch({
     
//       type: Account_Connect,
//       Account_Detail: {
//         Token_convertion: TokenUSDArray
     
      
//       }
//     })
//     //console("kgkjhgfkujf",TokenUSDArray);
//   }
//   async function getServi() {
//     var web3sw = new Web3(config.BNBPROVIDER)
//     if (web3sw) {
//       try{
//       var CoursetroContracti = new web3sw.eth.Contract(
//         SINGLE,
//         config.singleContract
//       );
//       var Singlefee1 = await CoursetroContracti
//         .methods
//         .getServiceFee()
//         .call()
//       var buyerFee = Singlefee1[0];
//       var sellerFee = Singlefee1[1];

//       }
//       catch(e){
//         var buyerFee =0;
//         var sellerFee = 0;
//       }
//       dispatch({
//         type: Account_Connect,
//         Account_Detail: {
//           Service_Fee_buyer: buyerFee,
//           Service_Fee_seller: sellerFee,
//         }
//       })
//       var currency = await convertionValue();
//       console.log("dfhjvfudhbvjfhkbvjkfd", currency);
//       dispatch({
//         type: Account_Connect,
//         Account_Detail: {
//           currency_convertion: { currency: config.currencySymbol, USD: currency.data.USD }
//         }
//       })
//     }
//   }
  

  async function getInit(type) {
    var handle = null;
    var provider = null;

    provider = await connect_Wallet(type);

    if (provider) {
      try {
        await provider.enable()
          .then(async function () {
            var currAddr = '';
            var balance = 0, setacc = '';
            var val
            var web3 = new Web3(provider)
            if ((web3.currentProvider.networkVersion == config.networkVersion)) {
              localStorage.setItem('walletConnectType', type)
              console.log("localStorage.walletConnectType",localStorage.walletConnectType);
              if (localStorage.walletConnectType == "wc") {
                var result = JSON.parse(localStorage.walletconnect).accounts
                setacc = result[0];
                val = await web3.eth.getBalance(setacc)
                balance = val / 1000000000000000000;
                currAddr = String(setacc).toLowerCase();
                //console("curaddr.........",currAddr);

              }
              else if (localStorage.walletConnectType == "mt") {
                var result = await web3.eth.getAccounts()
                setacc = result[0];
                await web3.eth.getBalance(setacc)
                  .then(async (val) => {

                    val = await web3.eth.getBalance(setacc)
                    balance = val / 1000000000000000000;
                  })
                currAddr = String(setacc).toLowerCase();
              }
             // var respval = await AddressUserDetails_GetOrSave_Call(currAddr);
              //("curraddr,web3",currAddr, web3);
             // var wenbl = await WenlamboValue(currAddr, web3)
              //("dfrehsrh",currAddr,wenbl);

              var web3=new Web3(config.BNBProvider)
              var contractCall = new web3.eth.Contract(SINGLE, config.singleContract)
              var ownerGet = await contractCall.methods.owner().call()
              var ownget = String(ownerGet).toLowerCase();

console.log("dfbhasdrtn",ownget);

              dispatch({
                type: Account_Connect,
                Account_Detail: {
                  UserAccountAddr: currAddr,
                  providerss: provider,
                  UserAccountBal: balance,
                  WalletConnected: "true",
                  Accounts: setacc,
                  ownget:ownget
                 // AddressUserDetails: respval,
                 // Wen_Bln: wenbl
                }
               
              })
              
            }
            else {
              toast.warn("Connect to Ethereum Mainnet", toasterOption);
            }
            
          })
          .catch((e) => {
          })
      } catch (err) {

      }
    }
    else {

      toast.warning("Please Add Wallet", toasterOption);
    }
  }


  async function connect_Wallet(type) {
    if (type == 'wc') {
      var provider = new WalletConnectProvider({
        rpc: {
          1: config.BNBPROVIDER,
          // 97:"https://data-seed-prebsc-1-s1.binance.org:8545/"
        },
        network: 'mainnet',
        chainId: 1,
        // chainId: 97,
      }
      );
      return provider;
    }

    else if (type == 'mt' || type == 'math' && window.ethereum.providers) {
			try{
        //console("szderhgsydrh", window.ethereum.providers)
				var provider =  window.ethereum.providers.find((provider) => provider.isMetaMask);
				}
				catch(eror)
				{
					//console("incatch",eror)
					var provider =  window.ethereum
				}
				return provider;	
		}

  }


//   async function AddressUserDetails_GetOrSave_Call(currAddr) {
//     var ReqData = {
//       addr: String(currAddr).toLowerCase()
//     }
//     var Resp = await AddressUserDetails_GetOrSave_Action(ReqData);
//     //console("AddressUserDetails_GetOrSave_Call", Resp);
//     //console("dxvhdkbvdbv",Resp.data.data.token);
  
//     if (Resp && Resp.data &&Resp.data.data.token) {
//         // //console("kjngkjfkjnjlf",Resp.data.RetData.token);
      
       
//         localStorage.setItem("user_token", Resp.data.data.token);
      
//       return Resp.data.data.RetData.User;
//     } else {
//       return null
//     }

//   }

//   async function WenlamboValue(currAddr, web3) {
//     try {
//       var bidvalue = new web3.eth.Contract(
//         DETH_ABI, config.tokenAddr[config.tokenSymbol]
//       );
//       var bidbln = await bidvalue
//         .methods
//         .balanceOf(currAddr)
//         .call();
//         //("checking balance",bidbln,config.decimalvalues,config.toFixed);
//       var bidbln1 = (bidbln / config.decimalvalues).toFixed(config.toFixed)
//       return bidbln1
//     }
//     catch (e) {
//       //("balance errorrrrrr",e);
//       return 0
//     }
//   }



  window.addEventListener('load', async (event) => {
    if (localStorage.getItem('walletConnectType') == 'mt') {
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            getInit('mt');
          }, 1000);
        })

        window.ethereum.on('chainChanged', async function (networkId) {
          //console("chainid", networkId, config.chainId)
          if (networkId == config.chainId) {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
              getInit('mt');
            }, 1000);
          }
          else {
            dispatch({
              type: Account_disConnect,
            })
          }
        })
      }
    }
    else if (localStorage.walletConnectType == "wc") {
      var provider3 = null
      if (provider3 == null) {
        provider3 = await connect_Wallet("wc");
      }
      else if (provider3 != null) {
        (provider3).on("connect", () => {
          getInit('wc')
        });
        (provider3).on("disconnect", () => {
          localStorage.removeItem('walletConnectType')
        });
      }
    }
  })


  return (
    <>
      <BrowserRouter basename="/" >
        <Switch>
        <ConditionRoute path="/login" component={Login} type={"auth"} />        
        <ConditionRoute path="/forgot" component={Forogt} type={"auth"} />
        <ConditionRoute path="/change-password/:userId" component={changepass} type={"auth"} />
        <ConditionRoute path="/user" component={Admin} type={"private"} />        
        <ConditionRoute path="/" component={Admin} type={"private"} />
        </Switch>
      </BrowserRouter>



    </>
  )
}

// ReactDOM.render(<Indexs/>,document.getElementById('root')
// );