
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

            }
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