/**
 * FILE		   	:	Put on sale
 * DISPATCH		:	NIL
 * METHOD   	:	TokenPriceChange_update_Action,getReceipt
 * C-DATE   	:   26_01_22
 * S-DATE   	:   24-01-22
*/

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import $ from 'jquery';
import Web3 from 'web3';
import '@metamask/legacy-web3'
import Select from 'react-select'
import Web3Utils from 'web3-utils'
import { useSelector } from 'react-redux'
import moment from 'moment'
// FILES

import {
  TokenPriceChange_update_Action, token_usd
} from '../actions/v1/token';
import Convert1 from '../views/separate/Convert1'

import config from '../lib/config'
import Convert from 'views/separate/Convert';
import { getReceipt } from '../actions/v1/getReceiptFunc';
import isEmpty from "lib/isEmpty";
import SINGLE from '../ABI/SINGLE.json';
import MULTIPLE from '../ABI/MULTIPLE.json'
import {toast} from 'react-toastify';

const dashboardRoutes = [];
let toasterOption = config.toasterOption;
const useStyles = makeStyles(styles);
// Scroll to Top
function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return null;
}

export default function CreateSingle(props) {

	const classes = useStyles();
	const { ...rest } = props;
	const history = useHistory();
  const location = useLocation();
  // ////("contract",location)
  const [Tokenvalue, setTokenValues] = useState(null);

	const Wallet_Details    =  useSelector(state => state.wallet_connect_context);
  const {ContractAddress,tokenCounts}=useParams()
  var location_pathname=location.pathname
 		const [FormSubmitUserClicked, Set_FormSubmitUserClicked] = useState(false);
	const [StartDate, Set_StartDate] = useState('Select Start Date');
	const [EndDate, Set_EndDate] = useState('Select End Date');
	const [priceoption, setPriceoption] = useState([]);

		const [MinimumBid, Set_MinimumBid] = useState(0);
	const [Clocktime, set_Clocktime] = useState('');
	const [EndClocktime, set_EndClocktime] = useState("");
	const [UnLockcontent, Set_UnLockcontent] = useState("");
	const [ApproveCallStatus, setApproveCallStatus] = useState('init');
	const [MintCallStatus, setMintCallStatus] = useState('init');
	const [SignCallStatus, setSignCallStatus] = useState('init');
	const [ValidateError, setValidateError] = useState({ TokenPrice: '' });
	const [PutOnSale, setPutOnSale] = useState(true);
	const [PutOnSaleType, setPutOnSaleType] = useState('FixedPrice');
	const [TokenPrice, setTokenPrice] = useState(0);
	const [YouWillGet, Set_YouWillGet] = useState(0);
	const [TokenName, setTokenName] = useState('');
	const [CoinName, setCoinNames] = useState('');
	const [bidTokens,setBidTokens] =  useState([]);


	
	useEffect(() => {
	 if(PutOnSale && PutOnSaleType == "TimedAuction"){
	  var filOp = (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()!==String(config.currencySymbol).toLowerCase())
	  //("sjdfsdf ",filOp);  
	  setBidTokens(filOp)
	 }
	}, [PutOnSale,PutOnSaleType])



useEffect(()=>{
  var bnbs = [];
  ////("Wallet_Details",Wallet_Details.tokenAddress)
    if(Wallet_Details.tokenAddress!=null){
	if(CoinName==''){
    if(PutOnSaleType=='TimedAuction')
		var filOp = (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()!==String(config.currencySymbol).toLowerCase())
	else
		var filOp = Wallet_Details.tokenAddress
   
	setCoinNames( filOp[0].label)
    setPriceoption( filOp)
    }
}

    if(Tokenvalue==null){

    if(location&&location.state&&location.state!=null){
      ////(location.state)
      setTokenValues(location.state)
	  if(location.state.clocktime!=null&&new Date(location.state.clocktime)<Date.now()){
	  set_Clocktime(null)}
	  if(location.state.endclocktime!=null&&new Date(location.state.endclocktime)<Date.now()){
	  set_EndClocktime(null)
		Set_MinimumBid(0)
	}
    }
    else{
    history.push('/')
      setTokenValues(null)
    }
}
CreateItemValidation(FormSubmitUserClicked);

},[
	FormSubmitUserClicked,
		StartDate,
		EndDate,
		MinimumBid,
		Clocktime,
		EndClocktime,
		PutOnSale,
		PutOnSaleType,
		TokenPrice,
	
	

])
	const changePutOnSaleType = (type) => {
		setPutOnSaleType(type);
		if (type == 'FixedPrice') {
		}
	};

	const priceoptionfunc = (e) => {
    setCoinNames(e.value)
	};

	const PriceCalculate = async (data = {}) => {
		var price = (typeof data.price != 'undefined') ? data.price : TokenPrice;
		var web3=new Web3(Wallet_Details.providers)
		var weii = price*1e6
		var per = (weii/100000000)*((Wallet_Details.buyerfee/config.decimalvalues)*1000000)
		var mulWei = ((weii) - (per));
		////("mulwei",mulWei,per)
		var getVal = Number(mulWei)/1e6;
		//("get val data ",getVal)
		Set_YouWillGet(Number(getVal).toFixed(4));
	}
	const inputChange = (e) => {
		if (e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
			var value = e.target.value;
			const re = /^[0-9]+([.][0-9]+)?$/; //with decimal
			const re1 = /^[0-9\b]+$/; // only [0-9]
			switch (e.target.name) {
				case 'TokenPrice':
					if (value != '' && isNaN(value) == false ) {
						setTokenPrice(value);
						PriceCalculate({ price: value });
					}
					else {
						setValidateError(ValidateError);
						setTokenPrice('0');
						PriceCalculate({ price: 0 });
					}
					break;
			
			
				case 'UnLockcontent':
					Set_UnLockcontent(value);
					break;
				case 'MinimumBid':
					Set_MinimumBid(value);
					break;
			
				default:
			}
		}
	}

	async function ApproveCall(){
    var web3 = new Web3(Wallet_Details.providers);
    if (Wallet_Details.UserAccountAddr == "") {
      toast.warning("OOPS!..connect Your Wallet", toasterOption);
      return false;
    }
   var CoursetroContract = new web3.eth.Contract(Tokenvalue==1155?MULTIPLE:SINGLE,ContractAddress)
    try {
     
      var receipt = null;
      var handle = null;
      setApproveCallStatus('processing')
      if (CoursetroContract != null) {
        var contractCall = await CoursetroContract
                          .methods
                          .listNft(tokenCounts)
                          .send({
                            from:Wallet_Details.Accounts,
                            value :Wallet_Details.Listing_Fee
                          })
          .on('transactionHash', (transactionHash) => {
            if (transactionHash) {
              handle = setInterval(async () => {
                receipt = await getReceipt(web3, transactionHash)
                clr1();
              }, 8000)
            }
          })
      }
    }
    catch (e) {
      toast.error("Execution reverted"+e.toString(), toasterOption);
      setApproveCallStatus('tryagain');
    }

    async function clr1() {
      if (receipt != null) {
        if (receipt.status == true) {
          clearInterval(handle);
           toast.success("Your Token Listed Successfully", toasterOption);
          setApproveCallStatus('done');
        }
      }}
	}

	const MintCall = async () => {

		var web3 = new Web3(Wallet_Details.providers);
		if (Wallet_Details.UserAccountAddr == "") {
			toast.warning("OOPS!..connect Your Wallet", toasterOption);
			return false;
		}
		if(PutOnSaleType=='FixedPrice'){
			setMintCallStatus('processing')
  		  if (ContractAddress == config.singleContract || 
      ContractAddress == config.multipleContract ) {
   
		var CoursetroContract = new web3.eth.Contract(Tokenvalue.type==1155?MULTIPLE:SINGLE,ContractAddress)
		var contractCall=null 
			var contractCall= await  CoursetroContract.methods
			.orderPlace(
			tokenCounts,
			 web3.utils.toWei(TokenPrice),  
			)
			}
    else{
      var contractCall= await  CoursetroContract.methods
      .orderPlace(
       tokenCounts,
	  web3.utils.toWei(TokenPrice),  
	   ContractAddress,
        Tokenvalue.type
      )
    }
		try {
			var mintCall = null;
			var receipt = null;
			var handle = null;
	
			if (contractCall != null) {
				await contractCall
					.send({ from: Wallet_Details.Accounts })
					.on('transactionHash', (transactionHash) => {
						mintCall = transactionHash;
						if (mintCall) {
							handle = setInterval(async () => {
								receipt = await getReceipt(web3, transactionHash)
								clr1();
							}, 8000)
						}
					})
			}
		}
		catch (e) {
			toast.error(config.ErrorTransaction, toasterOption);
			setMintCallStatus('tryagain');
		}
	}
	else{
		setMintCallStatus('processing')
		putonsaleDb('auction'); 
	}
		async function clr1() {
			if (receipt != null) {
				if (receipt.status == true) {
                   	clearInterval(handle);
					   putonsaleDb(receipt.transactionHash);
                  				}
			}}

	async function putonsaleDb(receiptVal){
		var postData = {
			tokenOwner: Wallet_Details.UserAccountAddr,
			tokenCounts: tokenCounts,
			tokenPrice:PutOnSaleType == 'FixedPrice' ? TokenPrice:0,
			blockHash: receiptVal,
			transactionHash:receiptVal,
			owner:Wallet_Details.UserAccountAddr,
			CoinName:CoinName,
			Clocktime:Clocktime,
			EndClocktime:EndClocktime,
			MinimumBid:MinimumBid,
			list:Tokenvalue.listNft,
			contractAddress:ContractAddress,
			PutOnSaleType:PutOnSaleType,
			type:Tokenvalue.type
		}
	
	  var Resp = await TokenPriceChange_update_Action(postData)
	  if (Resp&&Resp.data && Resp.data.message && Resp.data.message == 'success') {
		  toast.success(config.SuccessTransaction, toasterOption)
		  window.$('#PutOnSale_modal').modal('hide');
	    setMintCallStatus('done');

	setTimeout(() => {
		if((location_pathname).includes('/info')){
			window.$('.modal').modal('hide');
		// props.Refresh_page()
			
		}
		else{
		history.push('/info/'+Wallet_Details.UserAccountAddr+'/'+ContractAddress+'/'+tokenCounts,{from:'asset'})}
	  
	}, 3000);
}
	}
	}




	async function CreateItemValidation(chk) {
		if (chk) {
			var ValidateError = {};
		
			if (PutOnSaleType === 'FixedPrice') {
				if (TokenPrice == '' || isNaN(TokenPrice) == true && TokenPrice == 0) {
					ValidateError.TokenPrice = '"Price" must be a number';
				}
				else if (TokenPrice == 0) {
					ValidateError.TokenPrice = '"Price" must be greater than zero';
				}
			
				if (YouWillGet == 0) {
					ValidateError.TokenPrice = 'Price Must be Greate than 0.0001';
				}

			}

			if (PutOnSaleType === 'TimedAuction') {
				if (MinimumBid == '') {
					ValidateError.MinimumBid = '"Bid Price" must be a number';
				}
				if (Clocktime == '') {
					ValidateError.Clocktime = '"Start Clock Time " cant be a number';
				}
				if (EndClocktime == '') {
					ValidateError.EndClocktime = '"End Clock Time " cant be a number';
				}
				if (Clocktime == 'Select Start Date') {
					ValidateError.Clocktime = '"Start Clock Time " cant be a number';
				}
				if (EndClocktime == 'Select End Date') {
					ValidateError.EndClocktime = '"End Clock Time " cant be a number';
				}
				if (Clocktime == 'Invalid Date') {
					ValidateError.Clocktime = '"Start Clock Time " cant be a number';
				}
				if (EndClocktime == 'Invalid Date') {
					ValidateError.EndClocktime = '"End Clock Time " cant be a number';
				}
				// else if (CoinName == "") {
				// 	ValidateError.CoinName = '"Currency or Token" must be required';
				// }
				if(String(MinimumBid).includes('.')==true){
					if(String((MinimumBid).split('.').pop()).length==4)
					ValidateError.MinimumBid = '"Bid Price" must be a greater than 0.0001';
				}
			}
		
			setValidateError(ValidateError);
			return ValidateError;
		}
		else {
			return {};
		}
	}
	async function DateChange(from, val) {
		if (from == 'StartDateDropDown') {
			if (val == 'PickStartDate') {
				ModalAction('calendar_modal', 'show');
			}
			else {
				Set_StartDate(val);
				var myDate = new Date();
				if (val == 'RightAfterListing') {
					var newdat = myDate.setDate(myDate.getDate());
				}
				else {
					var newdat = myDate.setDate(myDate.getDate() + parseInt(val));
				}
				var newdate = new Date(newdat);
				////////("Date",newdate)
				set_Clocktime(newdate);
			}
		}
		else if (from == 'EndDateDropDown') {
			if (val == 'PickEndDate') {
				ModalAction('calendar_modal_expire', 'show');
			}
			else {
				Set_EndDate(val);
				var myDate = new Date();
				var newdat = myDate.setDate(myDate.getDate() + parseInt(val));
				var newdate = new Date(newdat)
				set_EndClocktime(newdate)
			}
		}
	}
	async function ModalAction(id, type) {
		window.$('#' + id).modal(type);
		if (id == 'calendar_modal') {
			if (Clocktime) {
				var dt = new Date(Clocktime);
				var dt1 = dt.toLocaleString();
				Set_StartDate(dt1);
			}
		}
		else if (id == 'calendar_modal_expire') {
			if (EndClocktime) {
				var dt = new Date(EndClocktime);
				var dt1 = dt.toLocaleString();
				Set_EndDate(dt1);
			}
		}
	}
	async function CreateItem() {
		Set_FormSubmitUserClicked(true);
		var errors = await CreateItemValidation(true);
		var errorsSize = Object.keys(errors).length;
		if (errorsSize != 0) {
			toast.error("Form validation error. Fix all mistakes and submit again", toasterOption);
			return false
		}
		else if (Wallet_Details.providers) {
			if (Wallet_Details.providers == null) {
				toast.error("Please Connect to Binance Network", toasterOption)
			}
			else {
		
              setValidateError({});
              window.$('#create_item_modal').modal('show');
						}
					
				
			
		}
		else {
			toast.error("Please Connect to Binance Network", toasterOption);
		}
	}
	var validStart = function (current) {
		var yesterday=moment().subtract(1,'day')
		//return current.isAfter(new Date())&&current.isBefore(new Date(EndClocktime));
		return current.isAfter( yesterday );
	  }
	  var validEnd = function (current) {
		return current.isAfter(Clocktime?new Date(Clocktime):undefined);
	  }
	

	  const handleendclock = (value)=>{
		if(Clocktime == ""){
			window.$("#calendar_modal_expire").modal("hide");
			return toast.error("select start time first")
		}
		set_EndClocktime(value)
		
	  }



	return (
		<div className="inner_header">
			<Header
				color="transparent"
				routes={dashboardRoutes}
				brand={<Link to="/"><img src={require("../assets/images/logo.svg")} alt="logo" className="img-fluid" /></Link>}
				rightLinks={<HeaderLinks />}
				changeColorOnScroll={{
					height: 50,
					color: "dark"
				}}
				{...rest}
			/>
			<ScrollToTopOnMount />
			<div className={classes.pageHeader + " inner_pageheader"}>
				<div className="container">
					<GridContainer>
						<GridItem xs={12} sm={12} md={12}>
							<div className="d-flex align-items-center">
								<Link to="/create">
									<i className="fas fa-arrow-left mr-3 arrow_back"></i>
								</Link>
								<h3 className="section-head mb-0 sec_he_sm">
                List item for sale
                                </h3>
							</div>
						</GridItem>
					</GridContainer>
				</div>
        {
          Tokenvalue==null?'':
				<div className="container mt-5">
					<GridContainer>
						<GridItem xs={12} sm={4} md={4}>
					
							<div className="single_collectible masonry mx-0">
								<div className="item itemd_heih_adj">
									<div className="card_inner_item">
										<div className="d-flex justify-content-between">
										</div>
										<div className="remaintime mt-3">
										{Tokenvalue.image!=''&&
                    	<div className="item_inner_img">
												{
                        
                        ((Tokenvalue.image.split('.').pop() == 'mp4') ||
													(Tokenvalue.image.split('.').pop() == 'webm') ||
													(Tokenvalue.image.split('.').pop() == 'WEBM') ||
													(Tokenvalue.image.split('.').pop() == 'OGV') ||
													(Tokenvalue.image.split('.').pop() == 'ogv'))
													&&
													<video
														id="imgPreview"
														className="img-fluid"
														alt="img"
														autoPlay
														controls
														muted
														playsInline
														loop
														src={Tokenvalue.TokenFile} type="video/mp4"
													/>

												}
												{(Tokenvalue.image.split('.').pop() == 'mp3')
													&&
													<>
														<img src={config.AudioImg} className="img-fluid" />

														<audio
															muted
															id="imgPreview"
															className="img-fluid"
															alt="img"
															autoPlay
															controls
															muted
															playsInline
															loop
															src={Tokenvalue.TokenFile} type="video/mp3"
														>
														</audio>
													</>

												}

												{(Tokenvalue.image.split('.').pop()		=== "webp"
													|| Tokenvalue.image.split('.').pop() === "WEBP"
													|| Tokenvalue.image.split('.').pop() === "gif"
													|| Tokenvalue.image.split('.').pop() == "jpg"
													|| Tokenvalue.image.split('.').pop() == "GIF"
													|| Tokenvalue.image.split('.').pop() == "JPG"
													|| Tokenvalue.image.split('.').pop() == "JPEG"
													|| Tokenvalue.image.split('.').pop() == "jpeg"
													|| Tokenvalue.image.split('.').pop() == "png"
													|| Tokenvalue.image.split('.').pop() == "PNG")
													&&
													<img src={Tokenvalue.TokenFile } id="imgPreview" alt="Collections" className="img-fluid" />
												}
													

											</div>
}

										</div>
										<h2>{TokenName} </h2>
										<div className="d-flex justify-content-between align-items-end">
											<div>
												<h3 className="my-2 ">
													<span className="text-gray">
														{(PutOnSale == false || (PutOnSale == true && PutOnSaleType == 'FixedPrice' && TokenPrice == 0)) && <span className="mr-1">Not for sale </span>}
														{(PutOnSale == true && PutOnSaleType == 'FixedPrice' && TokenPrice > 0) && <span className="mr-1">For Sale</span>}
														{(PutOnSale == true && PutOnSaleType == 'TimedAuction') && <span className="mr-1">Minimum Bid </span>}
														{(PutOnSale == true && PutOnSaleType == 'UnLimitedAuction') && <span>Open for Bids </span>}
													
													</span> </h3>

												{(PutOnSale == true && PutOnSaleType == 'FixedPrice' && TokenPrice > 0) && <button className="btn btn_purple_sm bg-theme" data-toggle="modal" data-target="#place_bid_multiple_modal"><span>
												{token_usd(TokenPrice,1)} {CoinName}</span></button>}
												{(PutOnSale == true && PutOnSaleType == 'TimedAuction') && <button className="btn btn_purple_sm bg-theme" data-toggle="modal" data-target="#place_bid_multiple_modal"> <span>{MinimumBid == '' ? 0 :
													token_usd(MinimumBid,1)} {CoinName} </span></button>}
                          <span className="ml-2">	<>For each</></span>
												</div>
										</div>
									</div>
								</div>

							</div>
						</GridItem>
						<GridItem xs={12} sm={8} md={8}>
							<form className="formCls mt-5">
             
								<div className="form-row">
                <div className="form-group col-md-12">
										<div className="d-flex justify-content-between align-items-start grid_toggle">
											<div>
												<label className="primary_label" htmlFor="inputEmail4">Token Name</label>
												<p className="form_note">Token Name which is you Listing On this platform</p>
											</div>
                      <label className="primary_label" htmlFor="inputEmail4">{Tokenvalue.TokenName}</label>
										</div>
									
									
									</div>
									<div className="form-group col-md-12">
										<div className="d-flex justify-content-between align-items-start grid_toggle">
											<div>
												<label className="primary_label" htmlFor="inputEmail4">Put on Sale</label>
												<p className="form_note">You’ll receive bids on this item</p>
											</div>
											<label className="switch toggle_custom">
												{/* <input type="checkbox"
													id="putonsale"
													name="putonsale"
													onChange={CheckedChange}
													checked={PutOnSale}
												/> */}
												{/* <span className="slider"></span> */}
											</label>
										</div>
										{
											(PutOnSale == false) ? ('') : (
												<>
													<div className="row connect_row mt-3 putonsale_sec">
														<div className="col-12 col-sm-4 col-md-12 col-lg-4 mb-3">
															<div className={"create_box create_sing_bx" + ((PutOnSaleType == 'FixedPrice') ? 'active' : 'inactive')} id="fixedprice" onClick={() => { changePutOnSaleType('FixedPrice') }} >
																<img src={require("../assets/images/price_svg.svg")} alt="Fixed Price" className="img-fluid" />
																<p>Fixed Price</p>
															</div>
														</div>
														{(Tokenvalue.type == 721) &&
															<div className="col-12 col-sm-4 col-md-12 col-lg-4 mb-3">
																<div className={"create_box create_sing_bx" + ((PutOnSaleType == 'TimedAuction') ? 'active' : 'inactive')} onClick={() => { changePutOnSaleType('TimedAuction') }}>
																	<img src={require("../assets/images/timed_svg.svg")} alt="Timed Auction" className="img-fluid" />
																	<p>Timed Auction</p>
																</div>
															</div>}
														<div className="col-12 col-sm-4 col-md-12 col-lg-4 mb-3" onClick={() => { changePutOnSaleType('UnLimitedAuction') }}>
															<div className={"create_box create_sing_bx" + ((PutOnSaleType == 'UnLimitedAuction') ? 'active' : 'inactive')}>
																<img src={require("../assets/images/unlimited_svg.svg")} alt="Unlimited Auction" className="img-fluid" />
																<p>Unlimited Auction</p>
															</div>
														</div>
													</div>

												</>)}
											{(PutOnSale === true &&( PutOnSaleType === 'FixedPrice'||PutOnSaleType === 'TimedAuction'))&&
												<div>{Tokenvalue.listNft==false?
                          	<span className="font_we_700_note_txt">Listing a NFT You Need Pay {(Wallet_Details.Listing_Fee)/config.decimalvalues}</span>
                          	:
                            <span className="font_we_700_note_txt">You are Token is Already Listed</span>
                        
                          }</div>}
										{(PutOnSale == true && PutOnSaleType == 'FixedPrice') &&
											<div className="row mx-0 mt-3 fixed_price_sec">

												<label className="primary_label" htmlFor="price_new">Price</label>

												<div className="form-row w-100">
													<div className="form-group col-md-6">
														<div className="input-group input_grp_style_1">

															<input
																type="text"
																className="form-control selct_form_input_h"
																placeholder="0"
																aria-label="Recipient's username"
																aria-describedby="basic-addon2"
																name="TokenPrice"
																id="TokenPrice"
																step="0.01"
																maxLength={15}
																onChange={inputChange}
																placeholder="e.g. 10"
																autoComplete="off"
															/>
															<div className="input-group-append">
																<Select
																	className="yes1 form-control primary_inp select1 selxet_app"
																	id="basic-addon2"
																	name="coinname"
																	//value={{label:CoinName}}
																	onChange={priceoptionfunc}
																	options={Wallet_Details.tokenAddress}
																	label="Select price"
																	formControlProps={{
																		fullWidth: true
																	}}
																/>
															</div>
														</div>
														{ValidateError.TokenPrice && <span className="text-danger">{ValidateError.TokenPrice}</span>}
													</div>
												</div>
												<p className="form_note">Service fee
													<span className="font_we_700_note_txt">{Wallet_Details.sellerfee / 1e18}% </span><br />
													You will receive <span className="font_we_700_note_txt">
														{/* {YouWillGet} */}
														{token_usd(YouWillGet,1)} {CoinName}</span>
													<span className="font_we_700_note_txt">
													
													</span>
												</p>
											</div>
										}
										{(PutOnSale == true && PutOnSaleType == 'TimedAuction') &&
											<div className="row mt-3 timed_sec">
												<div className="col-12 mb-3">
													<label className="primary_label" htmlFor="price_new">Minimum bid</label>
													<div className="input-group mb-1">
														<input
															type="text"
															className="form-control selct_form_input_h"
															placeholder="Enter minimum bid"
															aria-label="Recipient's username"
															aria-describedby="basic-addon3"
															name="MinimumBid"
															id="MinimumBid"
															maxLength={config.maxLength}
															onChange={inputChange}
															autoComplete="off"
														/>
														<div className="input-group-append">
																<Select
																	className="yes1 form-control primary_inp select1 selxet_app"
																	id="basic-addon2"
																	// name="coinname"
																	//value={{label:CoinName}}
																	onChange={priceoptionfunc}
																	options={bidTokens}
																	label="Select price"
																	formControlProps={{
																		fullWidth: true
																	}}
																/>
															</div>

													</div>
                          {ValidateError.MinimumBid && <span className="text-danger">{ValidateError.MinimumBid}</span>}
                          {ValidateError.CoinName && <span className="text-danger">{ValidateError.CoinName}</span>}
													<p className="form_note">   Bids below this amount won't be allowed. If you not enter any amount we will consider as 0</p>
												</div>
												<div className="col-12 col-lg-6  mb-3">
													<div className="single_dd_1">
														<label className="primary_label" htmlFor="start_date">Starting Date</label>
														<div className="dropdown">
															<button className="btn btn-secondary dropdown-toggle filter_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
																{StartDate}<i className="fas fa-chevron-down"></i>
															</button>
															<div className="dropdown-menu filter_menu" aria-labelledby="dropdownMenuButton">
																<div >Select Date</div>
																<div id="RightAfterListing" onClick={() => { DateChange('StartDateDropDown', 'RightAfterListing') }}>Right after listing</div>
																<div id="PickStart" onClick={() => { DateChange('StartDateDropDown', 'PickStartDate') }} >Pick specific date</div>
															</div>
														</div>
														{ValidateError.Clocktime && <span className="text-danger">{ValidateError.Clocktime}</span>}
													</div>
												</div>
												<div className="col-12 col-lg-6 mb-3">
													<div className="single_dd_1">
														<label className="primary_label" htmlFor="start_date">Expiration Date</label>
														<div className="dropdown">
															<button className="btn btn-secondary dropdown-toggle filter_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																{EndDate}<i className="fas fa-chevron-down"></i>
															</button>
															<div className="dropdown-menu filter_menu" aria-labelledby="dropdownMenuButton">
																<div>Select Date</div>
																<div onClick={() => { DateChange('EndDateDropDown', '1 Day') }}>1 day</div>
																<div onClick={() => { DateChange('EndDateDropDown', '3 Day') }}>3 days</div>
																<div onClick={() => { DateChange('EndDateDropDown', 'PickEndDate') }}>Pick specific date</div>

															</div>
														</div>
														{ValidateError.EndClocktime && <span className="text-danger">{ValidateError.EndClocktime}</span>}

													</div>

												</div>
												<div className="col-12">
													<p className="form_note_link_boild" data-toggle="modal" data-target="#learn_modal">Learn more how timed auctions work</p>

												</div>

											</div>


										}</div>
								
							  <div className="form-group col-md-12">
{/* 
                <div className="d-flex justify-content-between align-items-start grid_toggle">
											<div>
												<label className="primary_label" htmlFor="inputEmail4">Fees</label>
												<p className="form_note">Service Fee</p>
											</div>
                      <label className="primary_label" htmlFor="inputEmail4">{Wallet_Details.sellerfee} %</label>
										</div> */}
                    </div>
                    <div>
                    <Button className="create_btn" onClick={CreateItem}>Create item</Button>

								</div>
								
								</div>
							</form>
						</GridItem>
					</GridContainer>
				</div>
      }
			</div>
			<Footer />


			{/* create_item Modal */}
			<div className="modal fade primary_modal" id="create_item_modal" tabIndex="-1" role="dialog" aria-labelledby="create_item_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
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
           
							 {PutOnSale==true&&
               Tokenvalue!=null&&Tokenvalue.listNft==false&&
								<>
								<div className="media approve_media">
									{ApproveCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
									{ApproveCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
									{ApproveCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
									{ApproveCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
									<div className="media-body">
										<p className="mt-0 approve_text">Listing</p>
										<p className="mt-0 approve_desc">Listing An NFT to Our Platform</p>
									</div>
								</div>
								<div className="text-center my-3">
									<Button className="create_btn btn-block"
										disabled={(ApproveCallStatus == 'processing' || ApproveCallStatus == 'done')}
										onClick={ApproveCall}
									>
										{ApproveCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
										{ApproveCallStatus == 'init' && 'Listing'}
										{ApproveCallStatus == 'processing' && 'In-progress...'}
										{ApproveCallStatus == 'done' && 'Done'}
										{ApproveCallStatus == 'tryagain' && 'Try Again'}


									</Button>
								</div>
								</>}
								<></>
								<div className="media approve_media">
									{MintCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
									{MintCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
									{MintCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
									{MintCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
									<div className="media-body">
										<p className="mt-0 approve_text">Sell token</p>
										<p className="mt-0 approve_desc">Call contract method</p>
									</div>
								</div>
								<div className="text-center my-3">
									<Button className="create_btn btn-block"
										disabled={((PutOnSale==true&&Tokenvalue!=null&&Tokenvalue.listNft==false)?(ApproveCallStatus != 'done'||( MintCallStatus == 'processing' || MintCallStatus == 'done')):(MintCallStatus == 'processing' || MintCallStatus == 'done'))}
										onClick={MintCall}
									>
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
			{/* end create_item modal */}


			{/* learn Modal */}
			<div className="modal fade primary_modal" id="learn_modal" tabIndex="-1" role="dialog" aria-labelledby="learn_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
				<div className="modal-dialog modal-dialog-centered modal-sm" role="document">
					<div className="modal-content">
						<div className="modal-header text-center">
							<h5 className="modal-title" id="learn_modalLabel">How timed auction work</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<p>When you put your item on timed auction, you choose currency, minimum bid, starting and ending dates of your auction.</p>
							<p>The bidder can only place a bid which satisfies the following conditions:</p>
							<ol>
								<li>
									It is at least minimum bid set for the auction
								</li>
								<li>
									It is at least 5% higher than the current highest bid
								</li>
							</ol>
							<p>Note that some bids may disappear with time if the bidder withdraws their balance. At the same time, some bids may reappear if the bidder has topped up their balance again.</p>
							<p>Auction cannot be cancelled after any valid bid was made. Any bid placed in the last 10 minutes extends the auction by 10 minutes.</p>
							<p>In the 48 hours after the auction ends you will only be able to accept the highest available bid placed during the auction. As with regular bids, you will need to pay some gas to accept it.Note that you can always decrease the price of your listing for free, without making a transaction or paying gas. You can view all your items here.</p>
						</div>
					</div>
				</div>
			</div>
			{/* end learn modal */}

			{/* calendar Modal */}
			<div className="modal fade primary_modal" id="calendar_modal" tabIndex="-1" role="dialog" aria-labelledby="calendar_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
				<div className="modal-dialog modal-dialog-centered modal-sm" role="document">
					<div className="modal-content">
						<div className="modal-header text-center">
							<h5 className="modal-title" id="calendar_modalLabel">Choose date</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="pb-3">
              <Datetime
                                input={false}
                                isValidDate={validStart}
                                	value={Clocktime}
                                timeFormat="HH:mm:ss"
                                timeConstraints={{
                                  hours: { min: new Date().getHours(), max: 23 },
                                }}
                              	onChange={(value) => set_Clocktime(value)}
                              />

							</div>
							<div className="text-center pb-3">
								<Button className="btn create_btn" id="doneStartDate" onClick={() => ModalAction('calendar_modal', 'hide')}>Done</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* end calendar modal */}
			{/* calendar Modal */}
			<div className="modal fade primary_modal" id="calendar_modal_expire" tabIndex="-1" role="dialog" aria-labelledby="calendar_modalCenteredLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-sm" role="document">
					<div className="modal-content">
						<div className="modal-header text-center">
							<h5 className="modal-title" id="calendar_modalLabel">Choose date</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="pb-3">
              <Datetime
                                input={false}
                                isValidDate={validEnd}
                                value={EndClocktime}
                                timeFormat="HH:mm:ss"
                                timeConstraints={{
                                  hours: { min: new Date().getHours(), max: 23 },
                                }}
                          //	onChange={(value) => set_EndClocktime(value)}    />
							  onChange={(value) => handleendclock(value)}    />  

							</div>
						</div>
						<div className="text-center pb-3 mb-3">
							<Button className="btn create_btn" id="doneEndDate" onClick={() => ModalAction('calendar_modal_expire', 'hide')}>Done</Button>
						</div>
					</div>
				</div>
			</div>
			{/* end calendar modal */}

		</div>
	);
}
