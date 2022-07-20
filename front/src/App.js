
/**
 * FILE		:	Indexes
 * DISPATCH	:	Connect,Disconnect
 * STATE 	: 	Wallet_connect_context
*/
import React, {
	useEffect,
	useState,
	useRef,lazy,Suspense
} from "react";
import './index.css';
// pages for this product
import Create from "views/Create.js";
import HowItWorks from "views/how-it-works.js";
import EditProfile from "views/edit-profile.js";
import Following from "views/following.js";
import Privacypolicy from "views/Privacypolicy.js";
import Info from "views/info.js";
import Activity from "views/activity.js";
import Ranking from "views/Ranking.js";
import Search from "views/search.js";
import ComingSoon from "views/coming-soon.js";
// import Explore from "views/exploring.js";
import comingsoon from "views/comingsoon.js";
import $ from 'jquery';
//packages
import Link, { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import '@metamask/legacy-web3'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from "axios";
import Bpxtoken from "views/bpxtoken";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { Account_Connect, Account_disConnect, Initial_Connect } from "actions/redux/action";

//import file
import config from './lib/config';
import { convertionValue,tokenConvertionValue, WenlamboConvert,token_usd_value_from_function,tokensUsdValue } from './actions/v1/token';
import { AddressUserDetails_GetOrSave_Action } from './actions/v1/user';
import DETH_ABI from './ABI/DETH_ABI.json';
import SINGLE from './ABI/SINGLE.json';
import MULTIPLE from './ABI/MULTIPLE.json';
import Icon1 from "./assets/images/icon1.jpg";
import Icon3 from "./assets/images/wallet_05.png";
import Icon4 from "./assets/images/wallet1.png";
import CreteMultiple from './views/create-multiple'
import Explores from "views/explore";
import Terms from "views/Termsofservice";

import { useWallet, UseWalletProvider } from 'use-wallet'
import { GetTokenBalance } from "actions/v1/getReceiptFunc";
import { TokenExitsOrNot_Decimal_Func } from "actions/web3/contract_rpc";

const Home	=	lazy(()=>import('./views/Home'))
const Myitems	=	lazy(()=>import('./views/my-items'));
const CreateMultiple	=	lazy(()=>import('./views/create-multiple'))
const CreateSingle		=	lazy(()=>import("./views/Create-single"));
toast.configure();


export default function Indexes() {
	// const wallet = useWallet()

	const dispatch = useDispatch();
	const timerRef = useRef(null);
	const Wallet_Details = useSelector(state => state.wallet_connect_context);


	useEffect(() => {
		getServi();
		getInit(localStorage.walletConnectType)
		

	}, [Wallet_Details.UserAccountAddr]);


	async function getServi() {
		var web3sw = new Web3(config.BNBPROVIDER)
		axios.get(`${config.vUrl}/token/tokenAddress`)
			.then((data) => {
				////("datada00a",data);
				var dddats=[];
				if (data && data.data && (data.data).length > 0) {
					(data.data).map(async(item)=>{
						////("mapping item ",item)
						if(item.address == config.deadAddress)
						var decimal = 0
						else
						var decimal = await TokenExitsOrNot_Decimal_Func(item.address) 
						var usdvalue = await tokensUsdValue(item)
						////("token usd value",usdvalue.data.USD)
						////("token decimals ",decimal)
						
						dddats.push({
							label: item.token,
							value: item.token,
							address: item.address,
							decimal:decimal,
							usd:usdvalue.data.USD
						})

					})
					dispatch({
						type: Account_Connect,
						Account_Detail: {
							tokenAddress: dddats
						}
					})
				}
			})
		
		if (web3sw) {
			var CoursetroContracti = new web3sw.eth.Contract(
				SINGLE,
				config.singleContract
			);
			var Singlefee1 = await CoursetroContracti
				.methods
				.getServiceFee()
				.call()

				////("service fee details ".Singlefee1)
			dispatch({
				type: Account_Connect,
				Account_Detail: {
					buyerfee: Number(Singlefee1[0]),
					sellerfee: Number(Singlefee1[1])
				}
			})
			// var listFee = await CoursetroContracti
			// 	.methods
			// 	.getListingFees()
			// 	.call()
			// // //("methods check",listFee)
			// dispatch({
			// 	type: Account_Connect,
			// 	Account_Detail: {
			// 		Listing_Fee: Number(listFee),
			// 	}
			// })

			var convertion = await convertionValue();
		if (convertion && convertion.data && convertion.data.USD) {
			dispatch({
				type: Account_Connect,
				Account_Detail: {
					currency_usd_value: Number(convertion.data.USD),

				}
			})
		}

			// var wenlamboconvertion = await WenlamboConvert();
			//var wenlamboconvertion = await token_usd_value_from_function(web3sw);
			//var wenlamboconvertion = 0
			var wenlamboconvertion = await tokenConvertionValue();
			wenlamboconvertion = wenlamboconvertion.data.USD
			////("token convertion data ",wenlamboconvertion)
			if(wenlamboconvertion){dispatch({
					type: Account_Connect,
					Account_Detail: {
						token_usd_value: Number(wenlamboconvertion),

					}
				})}
			// }
		}
		
		var id = "0000"
		axios.get(config.v1Url + '/admin/panel/getnfttag/' + id)
			.then((data) => {
				var shareTag = []
				if (data && data.data && data.data.userValue) {
					(data.data.userValue).map((item) => {
						(shareTag).push(item.nfttag)
						dispatch({
							type: Account_Connect,
							Account_Detail: {
								shareTag: shareTag,
							}
						})
					})
				}
			})

		


	}





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
								var respval = await AddressUserDetails_GetOrSave_Call(currAddr);
								var wenbl = await WenlamboValue(currAddr, web3)

								dispatch({
									type: Account_Connect,
									Account_Detail: {
										UserAccountAddr: currAddr,
										providers: provider,
										UserAccountBal: Number(balance),
										WalletConnected: "true",
										Accounts: setacc,
										AddressUserDetails: respval,
										Wen_Bln: Number(wenbl),
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
								var respval = await AddressUserDetails_GetOrSave_Call(currAddr);
								var wenbl = await WenlamboValue(currAddr, web3)
								////("mt wallet address check ",currAddr);
								dispatch({
									type: Account_Connect,
									Account_Detail: {
										UserAccountAddr: currAddr,
										providers: provider,
										UserAccountBal: Number(balance),
										WalletConnected: "true",
										Accounts: setacc,
										AddressUserDetails: respval,
										Wen_Bln: Number(wenbl),
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
	async function WenlamboValue(currAddr, web3) {
		//("data to get token balance ",currAddr,config.tokenAddr[config.tokenSymbol])
		try {
			var bidvalue = new web3.eth.Contract(
				DETH_ABI, config.tokenAddr[config.tokenSymbol]
			);
			var bidbln = await bidvalue
				.methods
				.balanceOf(currAddr)
				.call();
			var bidbln1 = Number(web3.utils.fromWei(String(bidbln))).toFixed(config.toFixed)
			//("token bal in wallet ",bidbln1,bidbln);
			return bidbln1
		}
		catch (e) {
		}
	}


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


	async function AddressUserDetails_GetOrSave_Call(currAddr) {
		var ReqData = {
			addr: String(currAddr).toLowerCase()
		}
		var Resp = await AddressUserDetails_GetOrSave_Action(ReqData);
		if (Resp && Resp.data && Resp.data.data && Resp.data.data.User) {
			return Resp.data.data.User;
		} else {
			return null;
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


	function headerDropDownBlock(){
		
		var useclassresex = document.getElementsByClassName("exploremneu_dd_res")
		for(var m=0;m<useclassresex.length;m++)
		{
		useclassresex[m].classList.add('d-none')
		} 

		
		
	}
	



	return (

		<>

			<BrowserRouter basename="/ArtaluxNFT" >
				{/* <ToastContainer icon={true}
					theme="dark"
				/> */}
				<Suspense fallback={<></>}>

				<Switch>

					<Route path="/my-items/:activity?" component={Myitems} />
					<Route path="/assets/:ContractAddress/:tokenCounts/sell" component={CreateMultiple} />
					<Route path="/create-single" component={CreateSingle} />
					<Route path="/create-multiple" component={CreateSingle} />
					<Route path="/explore/:Param_category" component={Explores} />
					<Route path="/explore" component={Explores} />					
					<Route path="/token-BPX-BSC-0x8cb6aa6e8575d87961bd01d2ff09007c2499ec56" component={Bpxtoken} />
					<Route path="/faq" component={HowItWorks} />
					<Route path="/aboutus" component={Privacypolicy} />
					<Route path="/edit-profile" component={EditProfile} />
					<Route path="/search" component={Search} />
					<Route path="/my-items" component={Myitems} />
					<Route path="/Following" component={Following} />
					<Route path="/create" component={Create} />
					<Route path="/privacy-policy" component={Privacypolicy} />
					<Route path="/terms_conditions" component={Privacypolicy} />
					<Route path="/contact" component={Privacypolicy} />
					<Route path="/how_it_works" component={Privacypolicy} />
					<Route path="/activity" component={Activity} />
					<Route path="/ranking" component={Ranking} />
					<Route path="/vip" component={ComingSoon} />
					{/* <Route path="/explore" component={Explore}/> */}
					<Route path="/comingsoon" component={comingsoon} />
					{/* <Route path="/terms" component={Terms} /> */}
					<Route path="/info/:owneraddress/:collectionaddress/:tokenidval" component={Info} />
					<Route path="/user/:paramAddress" component={Myitems} />
					<Route path="/:paramUsername" component={Myitems} />
					<Route path="/" component={Home} />
					<Route exact path="/*" component={Home}>
						<Redirect to="/" />
					</Route>


				</Switch>

				</Suspense>
			</BrowserRouter>
			<div className="modal fade primary_modal" id="connect_modal" role="dialog" aria-labelledby="connect_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"   >
				<div className="modal-dialog modal-dialog-centered modal-sm" role="document">
					<div className="modal-content">
						<div className="modal-header text-center">
							<h5 className="modal-title" id="connect_modalLabel">Connect Your Wallet</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<ul className="connect_ul mb-4">
								{window && (window.ethereum) && <>
									{

										window.ethereum
										&& new Web3(window.ethereum)
										&& (new Web3(window.ethereum).currentProvider)
										&& (new Web3(window.ethereum).currentProvider.isMetaMask)
										&& (new Web3(window.ethereum).currentProvider.isMetaMask == true) &&



										<li>
											<div className=" connect_card" onClick={() => {
												getInit('mt')
											}} >
												<div className="card-body-mod">
													<div className="media follow_media">
														<div className="media-body flex_body">
															<div className="w-100">
																<div className="wallet-lists"
																>
																	<p className="my-0 media_text"> <img src={Icon1} />Metamask</p>

																</div>

															</div>

														</div>

													</div>

												</div>
											</div>
										</li>
									}

									{
										window.ethereum
										&& new Web3(window.ethereum)
										&& new Web3(window.web3.currentProvider)
										&& (new Web3(window.web3.currentProvider.isWalletConnect == true)) &&

										<li>
											<div className="connect_card  d-xl-none"
												onClick={() => {

													getInit('mt')

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
										</li>}
									{/* {//("coin98", new Web3(window.ethereum).currentProvider)} */}

			
									</>}
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
	}} >
		<div className="card-body-mod">
			<div className="media follow_media">
				<div className="media-body flex_body">
					<div className="w-100">
						<div className="wallet-lists"
						>
							<p className="my-0 media_text"> <img src={require('./assets/images/bidpixels_trba/bsw.png')} />Binance Wallet</p>

						</div>

					</div>

				</div>

			</div>

		</div>
	</div>
</li>
}
								<li>
									<div className="connect_card"
										onClick={() => {

											getInit('wc')
										}}>
										<div className="card-body-mod">
											<div className="media follow_media">
												{/* <img src={require("../../assets/images/connect_img_1.png")} alt="User" className="img-fluid mr-2" /> */}

												<div className="media-body flex_body">
													<div className="w-100">
														<div className="wallet-lists"
														>
															<p className="my-0 media_text"> <img src={require('../src/assets/images/wallet-connect.png')} alt="Wallet connect"/>Wallet Connect
																
															</p>

														</div>

													</div>

												</div>

											</div>

										</div>
									</div>
								</li>
						
							
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>

	)
}



//// add to line no 802 top of trust wallet connect


// <li className="safepal">
// <div className="connect_card"
// 	onClick={() => {

// 		getInit('wc')
// 	}}>
// 	<div className="card-body-mod">
// 		<div className="media follow_media">
// 			{/* <img src={require("../../assets/images/connect_img_1.png")} alt="User" className="img-fluid mr-2" /> */}

// 			<div className="media-body flex_body">
// 				<div className="w-100">
// 					<div className="wallet-lists"
// 					>
// 						<p className="my-0 media_text"> <img src={require('../src/assets/images/safepal.png')} alt="Safepal connect"/>Safepal Connect
							
// 						</p>

// 					</div>

// 				</div>

// 			</div>

// 		</div>

// 	</div>
// </div>
// </li>




// <li>
// <div className="connect_card"
// 	onClick={() => {

// 		getInit('wc')
// 	}}>
// 	<div className="card-body-mod">
// 		<div className="media follow_media">
// 			{/* <img src={require("../../assets/images/connect_img_1.png")} alt="User" className="img-fluid mr-2" /> */}

// 			<div className="media-body flex_body">
// 				<div className="w-100">
// 					<div className="wallet-lists"
// 					>
// 						<p className="my-0 media_text"> <img src={require('../src/assets/images/wallet_05.png')} alt="Trust Wallet connect"/>Trust Wallet Connect
							
// 						</p>

// 					</div>

// 				</div>

// 			</div>

// 		</div>

// 	</div>
// </div>
// </li>



//// add on top of binance chain wallet if needed

// {

// 	// window.coin98
// 	window.ethereum &&
// 	new Web3(window.ethereum)
// 	&& new Web3(window.ethereum).currentProvider
// 	&& new Web3(window.ethereum).currentProvider.isCoin98

// 	&& (new Web3(window.ethereum).currentProvider.isCoin98 == true)
// 	&&

// 	<li>
// 		<div className="connect_card" onClick={() => {
// 			getInit('coin98')
// 		}} >
// 			<div className="card-body-mod">
// 				<div className="media follow_media">
// 					<div className="media-body flex_body">
// 						<div className="w-100">
// 							<div className="wallet-lists"
// 							>
// 								<p className="my-0 media_text"> <img src={require('./assets/images/bidpixels_trba/coin98.png')} />Coin 98</p>

// 							</div>

// 						</div>

// 					</div>

// 				</div>

// 			</div>
// 		</div>
// 	</li>
// }

// {

// 	window && window.ethereum
// 	&& new Web3(window.ethereum)
// 	&& (new Web3(window.ethereum).currentProvider)
// 	&& (new Web3(window.ethereum).currentProvider.isMathWallet == true) && 
// 	(window.web3.currentProvider.isMetaMask==true)
// 	// ?'':   // ternary condition changed
// 	&&
// 	<li>
// 		{/* {//("new Web3(window.web3.currentProvider.isMathWallet)", new Web3(window.web3.currentProvider))} */}
// 		<div className=" connect_card" onClick={() => {
// 			getInit('mt')
// 		}} >
// 			<div className="card-body-mod">
// 				<div className="media follow_media">
// 					{/* <img src={require("../../assets/images/connect_img_1.png")} alt="User" className="img-fluid mr-2" /> */}

// 					<div className="media-body flex_body">
// 						<div className="w-100">
// 							<div className="wallet-lists"
// 							>
// 								<p className="my-0 media_text"> <img src={require('./assets/images/bidpixels_trba/mathwallet.png')} />Math Wallet</p>

// 							</div>

// 						</div>

// 					</div>

// 				</div>

// 			</div>
// 		</div>
// 	</li>
// }