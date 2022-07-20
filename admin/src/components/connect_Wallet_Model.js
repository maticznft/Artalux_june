
import React, { useEffect,useRef } from "react";
import { toast } from 'react-toastify';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Modal from '@material-ui/core/Modal';
import Web3 from 'web3';
import { useSelector, useDispatch } from 'react-redux';
import { Account_Connect,Account_disConnect} from "../reducers"
import Icon1 from "../assets/img/icon1.jpg";
import Icon3 from "../assets/img/wallet_05.png";
import Coin from "../assets/img/coinbase.png";
import SINGLE from 'ABI/SINGLE.json';
import MULTIPLE from 'ABI/MULTIPLE.json';
import config from '../lib/config';

toast.configure();
let toasterOption = config.toasterOption;


export default function Connect_wallect_Model(props) {

console.log("props",props);

useEffect(()=>
{
    if(open == false)
    {
    setOpen(props.open)
    }
}
)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const timerRef = useRef(null);

    const handleClose = () => setOpen(false);

console.log("open",open);




async function connect_Wallet(type) {
  if (type == 'wc') {
    var provider = new WalletConnectProvider({
      rpc: {
        56: "https://bsc-dataseed1.binance.org",
      },
      network: 'binance',
      chainId: 56,
    }
    );
    localStorage.setItem('walletConnectType', type)
    return provider;
  }
  else if (type == 'mt' || type == 'math') {
    var provider = window.ethereum;
    return provider;

  }
  else if (type == 'coin98') {
    var provider = window.ethereum || window.coin98;
    return provider;

  }
  else if (type == 'binance') {
    var provider = window.BinanceChain;
    return provider;

  }
}





// async function getInit(type) {
//     var handle = null;
//     var provider = null;

//     provider = await connect_Wallet(type);

//     if (provider) {
//       try {
//         await provider.enable()
//           .then(async function () {
//             var currAddr = '';
//             var balance = 0, setacc = '';
//             var val
//             var web3 = new Web3(provider)
//             if ((web3.currentProvider.networkVersion == config.networkVersion)) {
//               localStorage.setItem('walletConnectType', type)
//               console.log("localStorage.walletConnectType",localStorage.walletConnectType);
//               if (localStorage.walletConnectType == "wc") {
//                 var result = JSON.parse(localStorage.walletconnect).accounts
//                 setacc = result[0];
//                 val = await web3.eth.getBalance(setacc)
//                 balance = val / 1000000000000000000;
//                 currAddr = String(setacc).toLowerCase();
//                 //console("curaddr.........",currAddr);

//               }
//               else if (localStorage.walletConnectType == "mt") {
//                 var result = await web3.eth.getAccounts()
//                 setacc = result[0];
//                 await web3.eth.getBalance(setacc)
//                   .then(async (val) => {

//                     val = await web3.eth.getBalance(setacc)
//                     balance = val / 1000000000000000000;
//                   })
//                 currAddr = String(setacc).toLowerCase();
//               }
//              // var respval = await AddressUserDetails_GetOrSave_Call(currAddr);
//               //("curraddr,web3",currAddr, web3);
//              // var wenbl = await WenlamboValue(currAddr, web3)
//               //("dfrehsrh",currAddr,wenbl);

//               var web3=new Web3(config.BNBProvider)
//               var contractCall = new web3.eth.Contract(SINGLE, config.singleContract)
//               var ownerGet = await contractCall.methods.owner().call()
//               var ownget = String(ownerGet).toLowerCase();
//              // set_Owner_Get(ownget)
// // console.log("ownget.....................",ownget);

//               dispatch({
//                 type: Account_Connect,
//                 Account_Detail: {
//                   UserAccountAddr: currAddr,
//                   providerss: provider,
//                   UserAccountBal: balance,
//                   WalletConnected: "true",
//                   Accounts: setacc,
//                   ownget:ownget
//                  // AddressUserDetails: respval,
//                  // Wen_Bln: wenbl
//                 }
               
//               })
              
//             }
//             else {
//               toast.warn("Connect to Ethereum Mainnet", toasterOption);
//             }
            
//           })
//           .catch((e) => {
//           })
//       } catch (err) {

//       }
//     }
//     else {

//       toast.warning("Please Add Wallet", toasterOption);
//     }
//   }




async function getInit(type) {
  console.log("type",type)
  var provider = await connect_Wallet(type);
  // var provider = new Web3(window.coin98)

  if (provider) {
    try {
      ////("web3.currentProvider", provider)
      if (localStorage.walletConnectType == "wc") {
        provider.enable().
          then(async (accounts) => {
            localStorage.setItem('walletConnectType', type)

            window.$('#connect_modal').modal('hide')
            var web3 = new Web3(provider)
            if ((web3.currentProvider.chainId == config.chainId)
            ) {
              localStorage.setItem('walletConnectType', type)
              var balance = 0, setacc = '', currAddr = '';


              var result = JSON.parse(localStorage.walletconnect).accounts
              setacc = result[0];
              var val = await web3.eth.getBalance(setacc)
              balance = web3.utils.fromWei(String(val));
              currAddr = String(setacc).toLowerCase();
              //var respval = await AddressUserDetails_GetOrSave_Call(currAddr);
              //var wenbl = await WenlamboValue(currAddr, web3)

              dispatch({
                type: Account_Connect,
                Account_Detail: {
                  UserAccountAddr: currAddr,
                  providers: provider,
                  UserAccountBal: Number(balance),
                  WalletConnected: "true",
                  Accounts: setacc,
                  //AddressUserDetails: respval,
                  //Wen_Bln: Number(wenbl),
                  load: "true"
                }
              })
            }
            else {
              dispatch({
                type: Account_disConnect,
                Account_Detail_Disconnect: {

                  UserAccountAddr: '',
                  providers: null,
                  UserAccountBal: 0,
                  WalletConnected: "false",
                  Accounts: '',
                  AddressUserDetails: null,
                  Wen_Bln: 0,
                  load: 'wrong'

                }
              })
              toast.warning("Please Connect to Binance Network", config.toasterOption);
            }
          })
          .catch((e) => { })
      }
      else {
        provider.request({ 'method': 'eth_requestAccounts' }).
          then(async (accounts) => {
            localStorage.setItem('walletConnectType', type)
            window.$('#connect_modal').modal('hide')
            var web3 = new Web3(provider)
            ////("provider address",web3.currentProvider.networkVersion,web3.currentProvider.chainId)
            
            if ((web3.currentProvider.networkVersion == config.networkVersion)
            || (web3.currentProvider.chainId == config.networkVersion)
            || (web3.currentProvider.chainId == config.chainId)
          ) {
            
              localStorage.setItem('walletConnectType', type)
              var balance = 0, setacc = '', currAddr = '';

              var result = await web3.eth.getAccounts()
              setacc = accounts[0];
              await web3.eth.getBalance(setacc)
                .then(async (val) => {
                  var val = await web3.eth.getBalance(setacc)
                  balance = web3.utils.fromWei(String(val));
                })
              currAddr = String(setacc).toLowerCase();
             // var respval = await AddressUserDetails_GetOrSave_Call(currAddr);
             // var wenbl = await WenlamboValue(currAddr, web3)
              ////("mt wallet address check ",currAddr);
              dispatch({
                type: Account_Connect,
                Account_Detail: {
                  UserAccountAddr: currAddr,
                  providers: provider,
                  UserAccountBal: Number(balance),
                  WalletConnected: "true",
                  Accounts: setacc,
                 // AddressUserDetails: respval,
                 // Wen_Bln: Number(wenbl),
                  load: "true"
                }
              })
            }
            else {
              dispatch({
                type: Account_disConnect,
                Account_Detail_Disconnect: {

                  UserAccountAddr: '',
                  providers: null,
                  UserAccountBal: 0,
                  WalletConnected: "false",
                  Accounts: '',
                  AddressUserDetails: null,
                  Wen_Bln: 0,
                  load: 'wrong'

                }
              })
              toast.warning("Please Connect to Binance Network", config.toasterOption);
            }
          })
          .catch((e) => { })
      }
    } catch (err) {
      toast.warning("Something went wrong" + err, config.toasterOption);

    }
  }

  else {
    dispatch({
      type: Account_disConnect,
      Account_Detail_Disconnect: {

        SingleContract: null,
        MultipleContract: null,
        UserAccountAddr: '',
        providers: null,
        UserAccountBal: 0,
        WalletConnected: "false",
        Accounts: '',
        AddressUserDetails: null,
        Wen_Bln: 0
      }
    })
    toast.warning("Please Connect Wallet", config.toasterOption);
  }


}






window.addEventListener('load', async () => {

  if (localStorage.walletConnectType == "wc") {
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
  else {
    if (window.ethereum) {
      window.ethereum.on('connect', function (accounts) {
        window.ethereum.on('accountsChanged', function (accounts) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            getInit(localStorage.walletConnectType);
          }, 1000);
        })
        window.ethereum.on('chainChanged', async function (networkId) {
             ////("chain id",networkId);
            if ((networkId == config.chainId)||(networkId==config.networkVersion)) {
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
              timerRef.current = setTimeout(() => {
                getInit(localStorage.walletConnectType);

              }, 1000);

            }
            else {
              getInit('mt');
            }
        })
      })
    }
    if (window.coin98) {
      window.coin98.on('connect', function (accounts) {

        window.coin98.on('accountsChanged', function (accounts) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            getInit(localStorage.walletConnectType);
          }, 1000);
        })

          window.coin98.on('chainChanged', async function (networkId) {
            // //("chain id",networkId);
            if (networkId == config.chainId) {
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
              timerRef.current = setTimeout(() => {
                getInit(localStorage.walletConnectType);

              }, 1000);

            }
            else {
              getInit('mt');
            }
          })
      })
    }
    if (window.BinanceChain) {
      // (window.BinanceChain).on('connect', function (accounts) {
        // alert(2)
        window.BinanceChain.on('accountsChanged', function (accounts) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            getInit(localStorage.walletConnectType);
          }, 1000);
        })

          window.BinanceChain.on('chainChanged', async function (networkId) {
            // //("chain id",networkId);
            if (networkId == config.chainId) {
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
              timerRef.current = setTimeout(() => {
                getInit(localStorage.walletConnectType);

              }, 1000);

            }
            else {
              getInit('mt');
            }
          })
      // })
    }
  }

  
})



return(

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    className="modal modal_dialog"
  >
    <div className="modal-content">
        <div className="modal-header text-center">
          <h5 className="modal-title" id="connect_modalLabel">Connect Your Wallet</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <ul className="connect_ul mb-4">




          {

window.BinanceChain
&& new Web3(window.BinanceChain)
// && new Web3(window.web3.currentProvider)
// && (new Web3(window.web3.currentProvider.isBinance == true))
&&

<li>
	<div className="connect_card" onClick={() => {
		//  wallet.connect()
		getInit('binance')
    console.log("localStorage.walletconnect",localStorage.walletConnectType);
    if (localStorage.walletConnectType != null) {
      localStorage.removeItem('walletconnect')
      window.$('.modal').modal('hide')
    }
	}} >
		<div className="card-body-mod">
			<div className="media follow_media">
				<div className="media-body flex_body">
					<div className="w-100">
						<div className="wallet-lists"
						>
							<p className="my-0 media_text"> <img src={require('../assets/img/bsw.png')} />Binance Wallet</p>

						</div>

					</div>

				</div>

			</div>

		</div>
	</div>
</li>
}




            {/* {

              window.ethereum
              && new Web3(window.ethereum)
              && new Web3(window.web3.currentProvider)
              && (new Web3(window.web3.currentProvider.isMetaMask))
              &&

              <li>
                <div className=" connect_card" onClick={() => {
                   getInit('mt')
                  if (localStorage.walletconnect != null) {
                    localStorage.removeItem('walletconnect')
                    window.$('.modal').modal('hide')
                  }
                }} >
                  <div className="card-body-mod">
                    <div className="media follow_media">
                      <div className="media-body flex_body">
                        <div className="w-100">
                          <div className="wallet-lists"
                          >
                            <p className="my-0 media_text">
                                 <img src={Icon1} alt="Metamask" className="img-fluid" />
                                 Metamask</p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              </li>

            } */}
            {/* {

           

              <li>
                <div className=" connect_card" onClick={() => {
                  window.$('.modal').modal('hide')
                   getInit('mt')
                  if (localStorage.walletconnect != null) {
                    localStorage.removeItem('walletconnect')
                  }
                }} >
                  <div className="card-body-mod">
                    <div className="media follow_media">
                  

                      <div className="media-body flex_body">
                        <div className="w-100">
                          <div className="wallet-lists"
                          >
                            <p className="my-0 media_text">
                                 <img src={Coin} alt="CoinBase" className="Coinbase" />
                                 CoinBase</p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              </li>
            }
            <li>
              <div className="connect_card" onClick={() => {
                window.$('.modal').modal('hide')
                 getInit('wc')
              }}>
                <div className="card-body-mod">
                  <div className="media follow_media">
                  

                    <div className="media-body flex_body">
                      <div className="w-100">
                        <div className="wallet-lists"
                        >
                          <p className="my-0 media_text">
                             <img src={Icon3} alt="WalletConnect" className="img-fluid"/>
                             Wallet Connect</p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </li> */}
            {/* {window.ethereum
            && new Web3(window.ethereum)
            && new Web3(window.web3.currentProvider)
            && (new Web3(window.web3.currentProvider.isWalletConnect)) &&

            <li>
              <div className="connect_card  d-xl-none"
                onClick={() => {
                  // localStorage.setItem('walletConnectType','mt')
                  window.$('.modal').modal('hide')
                  getInit('mt')
                  if (localStorage.walletconnect != null) {
                    localStorage.removeItem('walletconnect')
                  }
                  props.Set_WalletConnected("true");
                }}
              >
                <div className="card-body-mod">
                  <div className="media follow_media">

                    <div className="media-body flex_body">
                      <div className="w-100">
                        <div className="wallet-lists" >
                          <p className="my-0 media_text"> <img src={Icon4} />Trust wallet</p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </li>} */}

          </ul>
        </div>
      </div>
    </Modal>
    
)



}