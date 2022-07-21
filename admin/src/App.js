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


  

 
// async function connect_Wallet(type) {
//   if (type == 'wc') {
//     var provider = new WalletConnectProvider({
//       rpc: {
//         56: "https://bsc-dataseed1.binance.org",
//       },
//       network: 'binance',
//       chainId: 56,
//     }
//     );
//     localStorage.setItem('walletConnectType', type)
//     return provider;
//   }
//   else if (type == 'mt' || type == 'math') {
//     var provider = window.ethereum;
//     return provider;

//   }
//   else if (type == 'coin98') {
//     var provider = window.ethereum || window.coin98;
//     return provider;

//   }
//   else if (type == 'binance') {
//     var provider = window.BinanceChain;
//     return provider;

//   }
// }




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
             // set_Owner_Get(ownget)
// console.log("ownget.....................",ownget);

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








// async function getInit(type) {
//   console.log("type",type)
//   var provider = await connect_Wallet(type);
//   // var provider = new Web3(window.coin98)

//   if (provider) {
//     try {
//       ////("web3.currentProvider", provider)
//       if (localStorage.walletConnectType == "wc") {
//         provider.enable().
//           then(async (accounts) => {
//             localStorage.setItem('walletConnectType', type)

//             window.$('#connect_modal').modal('hide')
//             var web3 = new Web3(provider)
//             if ((web3.currentProvider.chainId == config.chainId)
//             ) {
//               localStorage.setItem('walletConnectType', type)
//               var balance = 0, setacc = '', currAddr = '';


//               var result = JSON.parse(localStorage.walletconnect).accounts
//               setacc = result[0];
//               var val = await web3.eth.getBalance(setacc)
//               balance = web3.utils.fromWei(String(val));
//               currAddr = String(setacc).toLowerCase();
//               //var respval = await AddressUserDetails_GetOrSave_Call(currAddr);
//               //var wenbl = await WenlamboValue(currAddr, web3)

//               dispatch({
//                 type: Account_Connect,
//                 Account_Detail: {
//                   UserAccountAddr: currAddr,
//                   providers: provider,
//                   UserAccountBal: Number(balance),
//                   WalletConnected: "true",
//                   Accounts: setacc,
//                   //AddressUserDetails: respval,
//                   //Wen_Bln: Number(wenbl),
//                   load: "true"
//                 }
//               })
//             }
//             else {
//               dispatch({
//                 type: Account_disConnect,
//                 Account_Detail_Disconnect: {

//                   UserAccountAddr: '',
//                   providers: null,
//                   UserAccountBal: 0,
//                   WalletConnected: "false",
//                   Accounts: '',
//                   AddressUserDetails: null,
//                   Wen_Bln: 0,
//                   load: 'wrong'

//                 }
//               })
//               toast.warning("Please Connect to Binance Network", config.toasterOption);
//             }
//           })
//           .catch((e) => { })
//       }
//       else {
//         provider.request({ 'method': 'eth_requestAccounts' }).
//           then(async (accounts) => {
//             localStorage.setItem('walletConnectType', type)
//             window.$('#connect_modal').modal('hide')
//             var web3 = new Web3(provider)
//             ////("provider address",web3.currentProvider.networkVersion,web3.currentProvider.chainId)
            
//             if ((web3.currentProvider.networkVersion == config.networkVersion)
//             || (web3.currentProvider.chainId == config.networkVersion)
//             || (web3.currentProvider.chainId == config.chainId)
//           ) {
            
//               localStorage.setItem('walletConnectType', type)
//               var balance = 0, setacc = '', currAddr = '';

//               var result = await web3.eth.getAccounts()
//               setacc = accounts[0];
//               await web3.eth.getBalance(setacc)
//                 .then(async (val) => {
//                   var val = await web3.eth.getBalance(setacc)
//                   balance = web3.utils.fromWei(String(val));
//                 })
//               currAddr = String(setacc).toLowerCase();
//              // var respval = await AddressUserDetails_GetOrSave_Call(currAddr);
//              // var wenbl = await WenlamboValue(currAddr, web3)
//               ////("mt wallet address check ",currAddr);
//               dispatch({
//                 type: Account_Connect,
//                 Account_Detail: {
//                   UserAccountAddr: currAddr,
//                   providers: provider,
//                   UserAccountBal: Number(balance),
//                   WalletConnected: "true",
//                   Accounts: setacc,
//                  // AddressUserDetails: respval,
//                  // Wen_Bln: Number(wenbl),
//                   load: "true"
//                 }
//               })
//             }
//             else {
//               dispatch({
//                 type: Account_disConnect,
//                 Account_Detail_Disconnect: {

//                   UserAccountAddr: '',
//                   providers: null,
//                   UserAccountBal: 0,
//                   WalletConnected: "false",
//                   Accounts: '',
//                   AddressUserDetails: null,
//                   Wen_Bln: 0,
//                   load: 'wrong'

//                 }
//               })
//               toast.warning("Please Connect to Binance Network", config.toasterOption);
//             }
//           })
//           .catch((e) => { })
//       }
//     } catch (err) {
//       toast.warning("Something went wrong" + err, config.toasterOption);

//     }
//   }

//   else {
//     dispatch({
//       type: Account_disConnect,
//       Account_Detail_Disconnect: {

//         SingleContract: null,
//         MultipleContract: null,
//         UserAccountAddr: '',
//         providers: null,
//         UserAccountBal: 0,
//         WalletConnected: "false",
//         Accounts: '',
//         AddressUserDetails: null,
//         Wen_Bln: 0
//       }
//     })
//     toast.warning("Please Connect Wallet", config.toasterOption);
//   }


// }






// window.addEventListener('load', async () => {

//   if (localStorage.walletConnectType == "wc") {
//     var provider3 = null
//     if (provider3 == null) {
//       provider3 = await connect_Wallet("wc");
//     }
//     else if (provider3 != null) {
//       (provider3).on("connect", () => {
//         getInit('wc')
//       });
//       (provider3).on("disconnect", () => {
//         localStorage.removeItem('walletConnectType')
//       });
//     }
//   }
//   else {
//     if (window.ethereum) {
//       window.ethereum.on('connect', function (accounts) {
//         window.ethereum.on('accountsChanged', function (accounts) {
//           if (timerRef.current) {
//             clearTimeout(timerRef.current);
//           }
//           timerRef.current = setTimeout(() => {
//             getInit(localStorage.walletConnectType);
//           }, 1000);
//         })
//         window.ethereum.on('chainChanged', async function (networkId) {
//              ////("chain id",networkId);
//             if ((networkId == config.chainId)||(networkId==config.networkVersion)) {
//               if (timerRef.current) {
//                 clearTimeout(timerRef.current);
//               }
//               timerRef.current = setTimeout(() => {
//                 getInit(localStorage.walletConnectType);

//               }, 1000);

//             }
//             else {
//               getInit('mt');
//             }
//         })
//       })
//     }
//     if (window.coin98) {
//       window.coin98.on('connect', function (accounts) {

//         window.coin98.on('accountsChanged', function (accounts) {
//           if (timerRef.current) {
//             clearTimeout(timerRef.current);
//           }
//           timerRef.current = setTimeout(() => {
//             getInit(localStorage.walletConnectType);
//           }, 1000);
//         })

//           window.coin98.on('chainChanged', async function (networkId) {
//             // //("chain id",networkId);
//             if (networkId == config.chainId) {
//               if (timerRef.current) {
//                 clearTimeout(timerRef.current);
//               }
//               timerRef.current = setTimeout(() => {
//                 getInit(localStorage.walletConnectType);

//               }, 1000);

//             }
//             else {
//               getInit('mt');
//             }
//           })
//       })
//     }
//     if (window.BinanceChain) {
//       // (window.BinanceChain).on('connect', function (accounts) {
//         // alert(2)
//         window.BinanceChain.on('accountsChanged', function (accounts) {
//           if (timerRef.current) {
//             clearTimeout(timerRef.current);
//           }
//           timerRef.current = setTimeout(() => {
//             getInit(localStorage.walletConnectType);
//           }, 1000);
//         })

//           window.BinanceChain.on('chainChanged', async function (networkId) {
//             // //("chain id",networkId);
//             if (networkId == config.chainId) {
//               if (timerRef.current) {
//                 clearTimeout(timerRef.current);
//               }
//               timerRef.current = setTimeout(() => {
//                 getInit(localStorage.walletConnectType);

//               }, 1000);

//             }
//             else {
//               getInit('mt');
//             }
//           })
//       // })
//     }
//   }

  
// })



  return (
    <>
      <BrowserRouter basename="/xulatra" >
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