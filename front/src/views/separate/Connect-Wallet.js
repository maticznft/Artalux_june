import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from 'react-router-dom';
import SINGLE from 'ABI/SINGLE.json';
// import BNB from '../../assets/images/bnb.png'
import Onboard from 'bnc-onboard'
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Icon1 from "assets/images/icon1.jpg";
import Icon3 from "assets/images/wallet_05.png";
import Icon4 from "assets/images/wallet1.png";
import { Dialog, MenuItem, Select } from '@material-ui/core';
import {toast} from 'react-toastify';

import $ from 'jquery';
import axios from 'axios';
import config from '../../lib/config';
// import LoderImg from '../../assets/dev/images/loader.gif'
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import Modal from 'react-modal';
// https://data-seed-prebsc-1-s1.binance.org:8545/
import {
  AddLikeAction,
  GetLikeDataAction,
  convertionValue,WenlamboConvert
} from '../../actions/v1/token';
import {
  AddressUserDetails_GetOrSave_Action,
  Collectibles_Get_Action,
  changeReceiptStatus_Action,
  
} from '../../actions/v1/user';
import DETH_ABI from 'ABI/DETH_ABI.json';

import isEmpty from './../../lib/isEmpty'
import Link,{useParams} from 'react-router-dom';

let toasterOption = config.toasterOption;
const useStyles = makeStyles(styles);

export default function ConnectWallet(props) {
  const [modalopen, setmodalopen] = useState(true)
  const [accounts, setaccounts] = useState('')
  // const [Service_Fee, set_Service_Fee] = useState(0);
  const [providers, set_providers] = useState(null)
  const classes = useStyles();
  const { ...rest } = props;

  const {
    WalletConnected,
  } = props;

  const timerRef = useRef(null);

  useEffect(() => {
    // console.clear(); 
    getServi();
   if(localStorage.walletConnectType&&localStorage.walletConnectType!=null&&localStorage.walletConnectType=='mt'){
      getInit('mt');
      //////("meta check coming",localStorage.walletConnectType)
    
    }
    else if(localStorage.walletConnectType=='wc'&&localStorage.walletconnect!=null){
      //////("wall check coming",localStorage.walletconnect)
      getInit('wc')
    }
   (async()=>{
  var convertion = await convertionValue();
  if(convertion&&convertion.data&&convertion.data.USD){
    props.setConvertVal(convertion.data.USD)                 
  }
 
 
  // var contractCall = new web3.eth.Contract(EXCHANGE,config.exchangeAddress)
  // var swapFee = await contractCall.methods.getTransValue().call();
  // config.swapFee=swapFee
  // props.set_swap_fee(swapFee);
  
 
})()

  }, [localStorage.walletConnectType,WalletConnected]);


async function getServi(){
  //////("service fee calling")
 
  var web3sw=new Web3(config.BNBPROVIDER)
  // //////("service fee calling",web3)
 
  if(web3sw){
  var CoursetroContracti = new web3sw.eth.Contract(
    SINGLE,
    config.singleContract
  );
  // //////("service fee calling",CoursetroContract)
  
  var Singlefee1 = await CoursetroContracti
    .methods
    .getServiceFee()
    .call()
    // //////("service fee calling",Singlefee1)
  props.set_Service_Fee(Number(Singlefee1[0])+Number(Singlefee1[1]))
  config.buyerfee=Singlefee1[0];
config.sellerfee=Singlefee1[1];
var wenlamboconvertion = await WenlamboConvert();
if(wenlamboconvertion&&wenlamboconvertion.data&&wenlamboconvertion.data.data&&wenlamboconvertion.data.data.value){
  // //("sdadadsadas",wenlamboconvertion.data.data.value)
config.token_usd_value=Number(wenlamboconvertion.data.data.value)
}
  }
}
 


  var {paramUsername,paramAddress} = useParams();
  // //////("ewqewqeqwewqewqeqw",paramUsername,paramAddress)
  var handle=null;
  var currAddr="";
  var provider = null;

  async function getInit(type) {
    // if(provider==null){
      //alert(1)
    provider = await connect_Wallet(type);

    if (provider) {
      try {
        await  provider.enable()
        .then(async function () {
          var web3=new Web3(provider)
          // alert(1)
          // //("connect",web3.currentProvider.isWalletConnect)
          if((web3.currentProvider.networkVersion == config.networkVersion)
          ||(web3.currentProvider.chainId == config.networkVersion)
          )
          {
            localStorage.setItem('walletConnectType',type)
            // //("connect",web3.currentProvider)
            var balance=0,setacc='';
            if(localStorage.walletConnectType=="wc"){
             var result = JSON.parse(localStorage.walletconnect).accounts
              setacc = result[0];
              var val = await web3.eth.getBalance(setacc)
              // //////("provider check",provider,currAddr,val)
              balance = val / 1000000000000000000;
              props.Set_UserAccountBal(balance);
              currAddr=String(setacc).toLowerCase();
              props.set_providers(provider)
              config.providercon=provider;
              props.Set_UserAccountBal(balance);
             props.Set_Accounts(setacc); 
             setaccounts(setacc)
              props.Set_UserAccountAddr(currAddr);
             config.currAdrress=currAddr
             props.Set_WalletConnected("true");
             await AddressUserDetails_GetOrSave_Call(currAddr);
             props.AfterWalletConnected();
              var bidvalue = new web3.eth.Contract(
                DETH_ABI, config.tokenAddr[config.tokenSymbol]
            );
            var bidbln = await bidvalue
              .methods
              .balanceOf(currAddr)
              .call()
            var bidbln1 = (bidbln / config.decimalvalues).toFixed(config.toFixed)
            // //("bidbln1",bidbln1)
            props.set_Wen_Bln(bidbln1)
            var _CHARITY = await bidvalue
            .methods
            ._CHARITY_FEE()
            .call();
            var _BURN = await bidvalue
            .methods
            ._BURN_FEE()
            .call();
            var _TAX = await bidvalue
            .methods
            ._TAX_FEE()
            .call();
            config.tokenFee=((Number(_CHARITY)+Number(_BURN)+Number(_TAX))/100)*config.decimalvalues
            }
            else if(localStorage.walletConnectType=="mt"){
              var result = await web3.eth.getAccounts()
              setacc = result[0];
              await web3.eth.getBalance(setacc)
              .then(async(val) => {
                
                var val = await web3.eth.getBalance(setacc)
                balance = val / 1000000000000000000;               
              })
              //////("provider check",provider,currAddr)
              currAddr=String(setacc).toLowerCase();
              props.set_providers(provider)
              config.providercon=provider;
              props.Set_UserAccountBal(balance);
             props.Set_Accounts(setacc); 
             setaccounts(setacc)
              props.Set_UserAccountAddr(currAddr);
             config.currAdrress=currAddr
             props.Set_WalletConnected("true");
             await AddressUserDetails_GetOrSave_Call(currAddr);
             props.AfterWalletConnected();
            // //("bidbln1","sdf")

 
              var bidvalue = new web3.eth.Contract(
                DETH_ABI, config.tokenAddr[config.tokenSymbol]
            );
            
            // //("bidbln1","sdf",bidvalue.methods,currAddr)
            var bidbln = await bidvalue
            .methods
            .balanceOf(currAddr)
            .call();
            var bidbln1 = (bidbln / config.decimalvalues).toFixed(config.toFixed)
            // //("bidbln1",bidvalue,bidbln1)
            props.set_Wen_Bln(bidbln1)
            var _CHARITY = await bidvalue
            .methods
            ._CHARITY_FEE()
            .call();
            var _BURN = await bidvalue
            .methods
            ._BURN_FEE()
            .call();
            var _TAX = await bidvalue
            .methods
            ._TAX_FEE()
            .call();
            config.tokenFee=((Number(_CHARITY)+Number(_BURN)+Number(_TAX))/100)*config.decimalvalues

            }
        
          }
          else {
            var a=0;
            props.Set_WalletConnected("false"); 
             if(a==0){
              a=a+1
               //////("dsdhjash",a)
            toast.warning("Please Connect to Binance Network", toasterOption);
          }
          }
        })
        .catch((e) => {
        })
      } catch (err) {
        props.Set_WalletConnected("false");
      }
    }
    else {
      var n=0
   
      props.Set_WalletConnected("false");
      if(n==0){
        n=n+1
      toast.warning("Please Add Wallet", toasterOption);}
    }
  }

  async function clr(){
  
    if(currAddr!=""){
    clearInterval(handle)}
  }
  async function connect_Wallet(type) {
    // window.$('#connect_modal').modal('hide');
    if (type == 'wc') {
			var provider = new WalletConnectProvider({
				rpc: {
					56: "https://bsc-dataseed1.binance.org",
          // 97:"https://data-seed-prebsc-1-s1.binance.org:8545/"
        },
				network: 'binance',
				 chainId: 56,
       // chainId: 97,
			}
			);
			//////('Connnnnnn>>>>');
			return provider;
		}  
   
      else if(type == 'mt') {
        var provider = window.ethereum;
        return provider;
        
      }
    
      
    }


  async function AfterWalletConnected() {
    // //("comecome here here")
    await AddressUserDetails_GetOrSave_Call();
    props.AfterWalletConnected();
  
}

  async function AddressUserDetails_GetOrSave_Call(currAddr) {
    var ReqData = {
      addr: String(currAddr).toLowerCase()
    }
    var Resp = await AddressUserDetails_GetOrSave_Action(ReqData);
    if (Resp && Resp.data && Resp.data.data && Resp.data.data.User) {
      props.Set_AddressUserDetails(Resp.data.data.User);
    } else {
      props.Set_AddressUserDetails({});
    }
    return true;
  }

window.addEventListener('load', async (event) => {
  if(localStorage.getItem('walletConnectType')=='mt'){
    if(window.ethereum) {
      // ////('addEventListener',window.ethereum)
      window.ethereum.on('accountsChanged', function (accounts) {
        if(timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          getInit('mt');
        }, 1000);
      })
      
      window.ethereum.on('chainChanged', async function (networkId) {
        ////("varala poda",networkId,config.chainId)
      if(networkId == config.chainId){
        if(timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          getInit('mt');
        }, 1000);
        props.Set_WalletConnected("true");
      }
      else {
        props.set_providers(null)
        props.Set_WalletConnected("false");
      }
    })
  }}
  else if(localStorage.walletConnectType=="wc"){
    var provider3 = null
    ////("localsorage ",provider)
    if(provider3==null){
       provider3 = await connect_Wallet("wc");
   
    }
    else if(provider3!=null){
    (provider3).on("connect", () => {
   
      getInit('wc')
    });
    (provider3).on("disconnect", () => {
   
      localStorage.removeItem('walletConnectType')
    });
    }}
})


  const customStyles = {
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 27px 24px 0 rgb(0 0 0 / 20%), 0 40px 77px 0 rgb(0 0 0 / 22%)',
      borderRadius: '30px',
      border: 'none !important'
    },
  };

  let subtitle;
  const [WalletConnectNotifyPopup, Set_WalletConnectNotifyPopup] = React.useState(false);

 
  function closeModal() {
    Set_WalletConnectNotifyPopup(false);
  }
  function closeModal1() {
    setmodalopen(false)
  }
  var WalletConnectNotifyPopup_test = '';

  if (WalletConnected) {
    WalletConnectNotifyPopup_test = false;
  }
  else {
    WalletConnectNotifyPopup_test = true;
  }

  var pathVal = '';

  const location = useLocation();
  if (location.pathname) {
    if (location.pathname.split('/').length >= 2) {
      pathVal = location.pathname.split('/')[1];
    }
  }

  const [location_pathname, Set_location_pathname] = useState(pathVal);


 
  return (<>
    <div>


      {(
        (WalletConnected == "false" || WalletConnected == 'false')
        &&
        (
          location_pathname == 'my-items'
          || location_pathname == 'following'
          || location_pathname == 'activity'
          || location_pathname == 'edit-profile'
        // || paramUsername
        //  || paramAddress
        )
      ) &&
        <Modal
          isOpen={modalopen}
          ariaHideApp={false}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h5 className="modal-title react_modal_title" id="wallet_connect_modalLabel_1">Network</h5>


          <div className="modal-body">
            <div className="text-center icon_coin_net">
              {/* <img src={BNB} alt="logo" className="img-fluid" /> */}
            </div>
            <div className="update_cover_div_1" id="update_cover_div_1">
              <p className="mt-0 approve_desc text-center mb-0">Connect to Binance network</p>

            </div>

          </div>

        </Modal>
      }
     
    


    </div>
    {/* <Dialog
        
      > */}
   
      {/* </Dialog> */}
</>
  )
}