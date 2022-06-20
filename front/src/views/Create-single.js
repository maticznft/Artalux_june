 /**
 * FILE		   	:	CREATE-SINGLE,CREATE-MULTIPLE
 * DISPATCH		:	NIL
 * METHOD   	:	ipfsImageHashGet,GetCategoryAction,	CreateTokenValidationAction,TokenAddItemAction,getReceipt
 * C-DATE   	:   26_01_22
 * S-DATE   	:   24-01-22
*/

import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link, useHistory, useLocation } from "react-router-dom";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import $ from 'jquery';
import Web3 from 'web3';
import '@metamask/legacy-web3'
import Select from 'react-select'
import Web3Utils from 'web3-utils'
import { useSelector } from 'react-redux'
import moment from 'moment'
 
//// Drag and Drop /////

import Dropzone from 'react-dropzone'

import {
	ipfsImageHashGet,
	GetCategoryAction,
	CreateTokenValidationAction,
	TokenAddItemAction,
	token_usd,
	token_usd_value_from_function,
} from '../actions/v1/token';
import Convert1 from '../views/separate/Convert1'

import config from '../lib/config'
import Avatars from "./Avatar";
// import {toast} from 'react-toastify';
import Convert from 'views/separate/Convert';
import { getReceipt } from '../actions/v1/getReceiptFunc';
import isEmpty from "lib/isEmpty";
import PreviewFile from '../assets/images/noimage.png'
import SINGLE from '../ABI/SINGLE.json';
import MULTIPLE from '../ABI/MULTIPLE.json'
import {toast} from 'react-toastify';

import threeimg from "../assets/images/adamHead/adamHead.gltf"

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
	const Wallet_Details    =  useSelector(state => state.wallet_connect_context);
	const my_audio = useRef(new Audio(TokenFilePreReader))
	var pathVal = '';
	const location = useLocation();
	if (location.pathname) {
		if (location.pathname.split('/').length >= 2) {
			pathVal = location.pathname.split('/')[1];
		}
	}


	const [location_pathname, Set_location_pathname] = useState(pathVal);
	var CollectibleType_val = (location_pathname == 'create-single') ? config.singleType : config.multipleType;
	var ContractAddressUser_val = (location_pathname == 'create-single') ? config.singleContract : config.multipleContract;
	const [CollectibleType, Set_CollectibleType] = useState(CollectibleType_val);
	const [ContractAddressUser, set_ContractAddressUser] = useState(ContractAddressUser_val);
	const [FormSubmitUserClicked, Set_FormSubmitUserClicked] = useState(false);
	const [fileSizes, setfilesize] = useState(0)
	const [StartDate, Set_StartDate] = useState('Select Start Date');
	const [EndDate, Set_EndDate] = useState('Select End Date');
	const [priceoption, setPriceoption] = useState([]);

	const [TokenQuantity, Set_TokenQuantity] = useState(0);
	const [TokenBid, setTokenBid] = useState(true);
	const [MinimumBid, Set_MinimumBid] = useState(0);
	const [Clocktime, set_Clocktime] = useState('');
	const [EndClocktime, set_EndClocktime] = useState("");
	const [UnLockcontent, Set_UnLockcontent] = useState("");
	const [Unlockoncepurchased, Set_Unlockoncepurchased] = useState(false);
	const [TokenCount, Set_TokenCount] = useState(20000);
	const [ApproveCallStatus, setApproveCallStatus] = useState('init');
	const [MintCallStatus, setMintCallStatus] = useState('init');
	const [SignCallStatus, setSignCallStatus] = useState('init');
	const [SignLockCallStatus, setSignLockCallStatus] = useState('init');
	const [ValidateError, setValidateError] = useState({ TokenPrice: '' });
	const [PutOnSale, setPutOnSale] = useState(false);
	const [PutOnSaleType, setPutOnSaleType] = useState('');
	const [TokenCategory, setTokenCategory] = useState({ label: '' });
	const [CategoryOption, setCategoryOption] = useState([]);
	const [TokenPrice, setTokenPrice] = useState(0);
	const [YouWillGet, Set_YouWillGet] = useState(0);
	const [TokenName, setTokenName] = useState('');
	const [TokenDescription, setTokenDescription] = useState('');
	const [TokenRoyalities, setTokenRoyalities] = useState('');
	const [TokenProperties, setTokenProperties] = useState('');
	const [TokenFile, setTokenFile] = useState("");
	const [TokenFilePreReader, setTokenFilePreReader] = useState(PreviewFile);
	const [TokenFilePreUrl, setTokenFilePreUrl] = useState("");
	const [ipfshash, setIpfsHash] = useState("");
	const [imgfilename, setimgfilename] = useState('');
	const [CoinName, setCoinNames] = useState('');
	const [ipfsmetatag, set_ipfsmetatag] = useState('');
	const [bidTokens,setBidTokens] =  useState([]);

	const [ipfshash_thumb, setIpfsHash_thumb] = useState("");
	const [Thumb_TokenFile, setThumb_TokenFile] = useState("");
	const [Thumb_TokenFilePreReader, setThumb_TokenFilePreReader] = useState(PreviewFile);
	const [Thumb_TokenFilePreUrl, setThumb_TokenFilePreUrl] = useState("");

	const[play_set,set_play] = useState(false)


	
  useEffect(() => {
   if(PutOnSale && PutOnSaleType == "TimedAuction"){
	var filOp = (Wallet_Details.tokenAddress).filter(item=>String(item.label).toLowerCase()!==String(config.currencySymbol).toLowerCase())
	console.log("sjdfsdf ",filOp);  
	setBidTokens(filOp)
   }
  }, [PutOnSale,PutOnSaleType])



	useEffect(() => {
    if(CategoryOption.length==0){
    GetCategoryCall();
  }
  
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



		CreateItemValidation(FormSubmitUserClicked);
	}, [
		FormSubmitUserClicked,
		StartDate,
		EndDate,
		TokenQuantity,
		TokenBid,
		MinimumBid,
		Clocktime,
		EndClocktime,
		UnLockcontent,
		Unlockoncepurchased,
		PutOnSale,
		PutOnSaleType,
		TokenCategory,
		TokenPrice,
		TokenName,
		TokenDescription,
		TokenRoyalities,
		TokenProperties,
		TokenFilePreUrl,
		ipfshash,
	]);

	async function GetCategoryCall() {
		var resp = await GetCategoryAction()
		if (resp && resp.data && resp.data.list) {
			var CategoryOption = [];
			var ind = null
			resp.data.list.map((item, index) => {
				CategoryOption.push({
					name: 'TokenCategory',
					value: item._id,
					label: item.name
				})
			})
			if (ind > -1) {
				delete CategoryOption[ind]
			}
			setCategoryOption(CategoryOption)
		}
	}

	const changePutOnSaleType = (type) => {
		setPutOnSaleType(type);
		if (type == 'FixedPrice') {
		}
	};

	const CheckedChange = (e) => {
		if (e && e.target && e.target.name) {
			if (e.target.name == 'putonsale') {
				if (PutOnSale == false) {
					setPutOnSale(true);
					if (PutOnSaleType == '') {
						setPutOnSaleType('FixedPrice')
					}
				}
				else {
					setPutOnSale(false);
					setTokenBid(true)
				}
			}
			else if (e.target.name == 'unlockoncepurchased') {
				if (Unlockoncepurchased == false) {
					Set_Unlockoncepurchased(true);
				}
				else {
					Set_Unlockoncepurchased(false);
				}
			}
		}
	};


	const priceoptionfunc = (e) => {
		setCoinNames(e.value)
	};

	const selectFileChange = (e,acceptedfile,dataval) => {
		console.log("i.p data e,file,data",e,acceptedfile,dataval);


		if((acceptedfile == null && e.target && e.target.files)){
			var data = e.target.name	==	"thumb"	? "thumb"	:	"original" ;
			
		}else if(acceptedfile && e == null && dataval !== null){
			 
			var data = dataval;
			 
		}

		if(data === 'original')
			var validExtensions = ["png", 'gif', 'webp', 'mp4', 'PNG', 'jpg', 'JPEG', 'JPG',  'WEBM', 'webm', 'ogv', 'OGV' , 'mp3' , 'MP3' ,'wav','WAV','SVG','OGG','jpeg']; //array of valid extensions   /// 'GLB','GLTF','gltf'
		else
			var validExtensions = ['jpeg' , 'JPEG' ,'jpg' ,'JPG'];
		

		if ((acceptedfile !== null)||(e.target && e.target.files)) {
			var reader = new FileReader()
			 
			if((acceptedfile == null && e.target && e.target.files)){
				var file = e.target.files[0];
			}else if(acceptedfile && e == null){
				var file =acceptedfile[0];
			}


			setimgfilename(file.name)
			var fileName = file.name;
			var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
			if ($.inArray(fileNameExt, validExtensions) == -1) {
				toast.error("Only these file types are accepted : " + validExtensions.join(', '), toasterOption);
				return false;
			}
			const fileSize = file.size;
			//  if (50000000 < fileSize) {
			// 	toast.error("File size exceeds 50 MB", toasterOption);
			// 	return false;
			// }
			if (100000000 < fileSize) {
				toast.error("File size exceeds 100 MB", toasterOption);
				return false;
			}
			else {
				setfilesize(fileSize)

				if(data === 'original')
					setTokenFile(file);
				else
				    setThumb_TokenFile(file)
				var url = reader.readAsDataURL(file);
				reader.onloadend = function (e) {
					if (reader.result) {
						if(data === 'original')
							setTokenFilePreReader(reader.result);
						else
							setThumb_TokenFilePreReader(reader.result)
					}
				}.bind(this);
				if(data === 'original'){
					(acceptedfile == null && e.target && e.target.files)?setTokenFilePreUrl(e.target.value):setTokenFilePreUrl(file.path);
				}
					
				else{
					(acceptedfile == null && e.target && e.target.files)?setThumb_TokenFilePreUrl(e.target.value):setThumb_TokenFilePreUrl(file.path);
				}
			}
		}
	}

	const selectChange = (e) => {
		if (e && e.name && e.label && e.value) {
			switch (e.name) {
				case 'TokenCategory':
					setTokenCategory(e);
					break;
				default:
			}
		}
	}

	const PriceCalculate = async (data = {}) => {
		var price = (typeof data.price != 'undefined') ? data.price : TokenPrice;
		var web3=new Web3(Wallet_Details.providers)
		var weii = price*1e6
		var per = (weii/100000000)*((Wallet_Details.buyerfee/config.decimalvalues)*1000000)
		var mulWei = ((weii) - (per));
		////console.log("mulwei",mulWei,per)
		var getVal = Number(mulWei)/1e6;
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
				case 'TokenName':
					setTokenName(value);
					break;
				case 'TokenDescription':
					setTokenDescription(value);
					break;
				case 'TokenRoyalities':
					setTokenRoyalities(value);
					break;
				case 'TokenProperties':
					setTokenProperties(value);
					break;
				case 'UnLockcontent':
					Set_UnLockcontent(value);
					break;
				case 'MinimumBid':
					Set_MinimumBid(value);
					break;
				case 'TokenQuantity':
					Set_TokenQuantity(value);
					break;
				default:
			}
		}
	}

	// async function ApproveCall(){
    // var web3 = new Web3(Wallet_Details.providers);
    // if (Wallet_Details.UserAccountAddr == "") {
    //   toast.warning("OOPS!..connect Your Wallet", toasterOption);
    //   return false;
    // }

    // var TokenPriceInStr = window.web3.toWei(TokenPrice);
    // var CoursetroContract = new web3.eth.Contract(location_pathname == 'create-multiple'?MULTIPLE:SINGLE,location_pathname == 'create-multiple'?config.multipleContract:config.singleContract)

    // try {
    //   var mintCall = null;
    //   var receipt = null;
    //   var handle = null;
    //   setApproveCallStatus('processing')
    //   if (CoursetroContract != null) {
    //     var contractCall = await CoursetroContract
    //                       .methods
    //                       .listNft(0)
    //                       .send({
    //                         from:Wallet_Details.Accounts,
    //                         value :Wallet_Details.Listing_Fee
    //                       })
    //       .on('transactionHash', (transactionHash) => {
    //         if (transactionHash) {
    //           handle = setInterval(async () => {
    //             receipt = await getReceipt(web3, transactionHash)
    //             clr1();
    //           }, 8000)
    //         }
    //       })
    //   }
    // }
    // catch (e) {
    //   toast.error(config.ErrorTransaction, toasterOption);
    //   setApproveCallStatus('tryagain');
    // }

    // async function clr1() {
    //   if (receipt != null) {
    //     if (receipt.status == true) {
    //       clearInterval(handle);
    //       ////console.log("approve list",receipt);

    //       var tokenid = receipt.logs[0].topics[2];
    //                 const someString = Web3Utils.hexToNumber(tokenid);
    //                 Set_TokenCount(someString)
    //       ////console.log("approve list",someString);
    //       toast.success(config.SuccessTransaction, toasterOption);
    //       setApproveCallStatus('done');
    //     }
    //   }}
	// }

	const MintCall = async () => {

		var web3 = new Web3(Wallet_Details.providers);
		if (Wallet_Details.UserAccountAddr == "") {
			toast.warning("OOPS!..connect Your Wallet", toasterOption);
			return false;
		}
		var contractCall = null;
		var TokenPriceInStr = window.web3.toWei(TokenPrice);
   	
	
		try {
			var mintCall = null;
			var receipt = null;
			var handle = null;
			setMintCallStatus('processing')
			var CoursetroContract = new web3.eth.Contract(location_pathname == 'create-multiple'?MULTIPLE:SINGLE,location_pathname == 'create-multiple'?config.multipleContract:config.singleContract)
			var symbol=await CoursetroContract.methods.symbol().call()
			console.log("symbol data in mint call ",symbol)
			
			//  contractCall = await CoursetroContract.methods.mint(
			// 		 PutOnSale==true?TokenCount:0,
			// 		 TokenPriceInStr,
			// 		 location_pathname == 'create-multiple'? TokenQuantity : 1,
			// 		 TokenRoyalities,
			// 		ipfsmetatag
			// 		 )
			console.log("data i/p for mint call chexck ",ipfsmetatag,TokenPriceInStr,location_pathname,TokenRoyalities)

			if(location_pathname == 'create-multiple'){
			contractCall = await CoursetroContract.methods.mint(
				TokenPriceInStr,
					TokenRoyalities,
					location_pathname == 'create-multiple'? TokenQuantity : 1,
					ipfsmetatag
				)}else{contractCall = await CoursetroContract.methods.mint(

					ipfsmetatag,
					TokenPriceInStr,
					location_pathname == 'create-multiple'? TokenQuantity : 1,
					TokenRoyalities)}


			if (contractCall != null) {
				console.log("not null asjkdfsjdf",contractCall)
				await contractCall
					.send({ from: Wallet_Details.Accounts })
					.on('transactionHash', (transactionHash) => {
						mintCall = transactionHash;
						if (mintCall) {
							console.log("hash check ",mintCall)
							handle = setInterval(async () => {
								receipt = await getReceipt(web3, transactionHash)
								clr1();
							}, 8000)
						}
					})
			}
		}
		catch (e) {
			console.log("transaction revertes",e)
			toast.error(config.ErrorTransaction, toasterOption);
			setMintCallStatus('tryagain');
		}
		async function clr1() {
			console.log("ctrl 1 data call ")
			if (receipt != null) {
				console.log("receipt check ",receipt)
				if (receipt.status == true) {
              var tokenid = receipt.logs[1].topics[2];
                    const someString = Web3Utils.hexToNumber(tokenid);
						console.log("somesrtring token id ",someString);
					clearInterval(handle);
					var TokenAddItemPayload = {
						Image: TokenFile,
						Thumb	:	Thumb_TokenFile,
						thumb_ipfs	:	ipfshash_thumb,
						ipfsimage: ipfshash,
						Name: TokenName,
						Count:someString,
						Description: TokenDescription,
						Price: TokenPrice,
						Royalities: TokenRoyalities,
						Category_label: TokenCategory.label,
						Bid: TokenBid,
						Properties: TokenProperties,
						Owner: Wallet_Details.UserAccountAddr,
						Creator: Wallet_Details.UserAccountAddr,
						CategoryId: TokenCategory.value,
						Quantity: 	 location_pathname == 'create-multiple'? TokenQuantity : 1,
						Balance: 	 location_pathname == 'create-multiple'? TokenQuantity : 1,
						ContractAddress: ContractAddressUser,
						HashValue: mintCall,
						Type: CollectibleType,
						MinimumBid: 0,
						Clocktime: '',
						EndClocktime: '',
						UnLockcontent: '',
						PutOnSale: PutOnSale,
						PutOnSaleType: PutOnSaleType,
						symbol:symbol,
						CoinName:''
					};
					if (Unlockoncepurchased == true) {
						TokenAddItemPayload.UnLockcontent = UnLockcontent;
					}

					if (PutOnSale == true) {
						if (PutOnSaleType == 'FixedPrice') {
							TokenAddItemPayload.Price = TokenPrice;
							TokenAddItemPayload.CoinName = CoinName;
						}
						else if (PutOnSaleType == 'TimedAuction') {
							TokenAddItemPayload.MinimumBid = MinimumBid;
							TokenAddItemPayload.CoinName = CoinName;
							TokenAddItemPayload.Clocktime = Clocktime;
							TokenAddItemPayload.EndClocktime = EndClocktime;
						}
					}
					await TokenAddItemAction(TokenAddItemPayload);
					toast.success(config.SuccessTransaction, toasterOption);
					setMintCallStatus('done');
				}
			}else{console.log("else condition checj")}}
	}

	async function 	SignCall() {

		var web3 = new Web3(Wallet_Details.providers);
		if (Wallet_Details.UserAccountAddr == "") {
			toast.warning("OOPS!..connect Your Wallet", toasterOption);
		}
		setSignCallStatus('processing');
		try {
			await web3.eth.personal.sign("Sign Sell Order", Wallet_Details.UserAccountAddr)

			toast.success(config.SuccessTransaction, toasterOption);
			setSignCallStatus('done');
      if(!isEmpty(Wallet_Details.AddressUserDetails)){
        history.push('my-items') }

		}
		catch (e) {
			toast.error(config.ErrorTransaction, toasterOption);
			setSignCallStatus('tryagain');
		}
	}
	async function SignLockCall() {
    try{
      setSignLockCallStatus('processing')
      var senddata = {
        Image: TokenFile,
		Thumb	:	Thumb_TokenFile,
        name: TokenName,
        desc: TokenDescription!=""?TokenDescription:"This NFT Token From "+config.Front_URL
      }
      var ipfsimghashget = await ipfsImageHashGet(senddata);
	  console.log("ipfsimghashget",ipfsimghashget);// contains meta,originalfile,thumbfile,msg
      if(ipfsimghashget){

      if(ipfsimghashget.data&&ipfsimghashget.data.ipfsval){
        set_ipfsmetatag( config.IPFS_IMG+'/'+ipfsimghashget.data.ipfsval)
      }
    if(ipfsimghashget&&ipfsimghashget.data&&ipfsimghashget.data.ipfs_img_val){
        setIpfsHash(ipfsimghashget.data.ipfs_img_val)
      }
	if (ipfsimghashget && ipfsimghashget.data && ipfsimghashget.data.thumbFile) {
		setIpfsHash_thumb(ipfsimghashget.data.thumbFile)
	}
      setSignLockCallStatus('done')
      toast.success("Your token Uploaded Successfully",config.toasterOption)
    }
    else{
      toast.error('Meta data not fetched.. try later..')
    }
    }
    catch(e){
      setSignLockCallStatus('tryagain')
	  toast.error("Try Again",config.toasterOption)
    }
	}
	async function CreateItemValidation(chk) {
		if (chk) {
			var ValidateError = {};
			if (TokenName == '') {
				ValidateError.TokenName = '"Name" is not allowed to be empty';
			}
			if (TokenName != "") {
				if ((config.nameFormat).test(TokenName)) {
					ValidateError.TokenName = '"Emoji" is not allowed';
				}
			}
			if (TokenRoyalities == '') {
				ValidateError.TokenRoyalities = '"Royalties" is not allowed to be empty';
			}
			else if (isNaN(TokenRoyalities) == true) {
				ValidateError.TokenRoyalities = '"Royalties" must be a number';
			}
			else if (TokenRoyalities > 20) {
				ValidateError.TokenRoyalities = '"Royalties" must be less than or equal to 20';
			}
			else if (TokenRoyalities == 0) {
				ValidateError.TokenRoyalities = '"Royalties" must be greater than 0';
			}
			if (TokenFilePreUrl == '') {
				ValidateError.photo = '"File" is required';
			}
			// if (50000000 < fileSizes) {
			// 	ValidateError.photo = '"File" Must be below 50mb';
			// }
			if (10000000 < fileSizes) {
				ValidateError.photo = '"File" Must be below 100mb';
			}
			if(TokenFile	&&(	TokenFile.type.includes('audio')	||	TokenFile.type.includes('video'))){
				if (Thumb_TokenFilePreUrl == '') {
					ValidateError.thumb = '"File" is required';
				}
				if (10000000 < Thumb_TokenFile.size) {
					ValidateError.thumb = '"File" Must be below 100mb';
				}
			}
			if (typeof TokenCategory.label == 'undefined' || TokenCategory.label == '') {
				ValidateError.TokenCategory = '"Category" is required';
			}
			if (Unlockoncepurchased == true && UnLockcontent == '') {
				ValidateError.UnLockcontent = '"Locked content" is required';
			}
			if (PutOnSale == true && PutOnSaleType == 'FixedPrice') {
				if (TokenPrice == '' || isNaN(TokenPrice) == true && TokenPrice == 0) {
					ValidateError.TokenPrice = '"Price" must be a number';
				}
				else if (TokenPrice == 0) {
					ValidateError.TokenPrice = '"Price" must be greater than zero';
				}
				else if (CoinName == "") {
					ValidateError.CoinName = '"Currency or Token" must be required';
				}
				else if(String(TokenPrice).includes('.')==true){
					if(String((TokenPrice).split('.').pop()).length==5)
					ValidateError.TokenPrice = 'Price Must be Greate than 0.0001';
				}
			}
			if (PutOnSale == true && PutOnSaleType == 'TimedAuction') {
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
				else if (CoinName == "") {
					ValidateError.CoinName = '"Currency or Token" must be required';
				}
				if(String(MinimumBid).includes('.')==true){
					if(String((MinimumBid).split('.').pop()).length==4)
					ValidateError.MinimumBid = '"Bid Price" must be a greater than 0.0001';
				}

			}
			var tq=TokenQuantity
			var tqcheck = (location_pathname =="create-multiple" ?  tq :1)
			if (tqcheck == '' || isNaN(TokenQuantity) == true && tqcheck == 0) {
				ValidateError.TokenQuantity = '"Number of copies" must be a number';
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

				if (Wallet_Details.UserAccountBal == 0) {
					toast.error("Insufficient balance", toasterOption);
					return false;
				}
				var TokenCategory_label = TokenCategory.label;
				let payload = {
					TokenName,
					TokenRoyalities,
					image: TokenFile,
					TokenCategory_label,
					PutOnSaleType,
					TokenPrice,
				}
				const resp = await CreateTokenValidationAction(payload);
				if (resp && resp.data) {
					if (resp.data.errors) {
						var errors = resp.data.errors;
						var errorsSize = Object.keys(errors).length;
						if (errorsSize != 0) {
							setValidateError(errors);
							toast.error("Form validation error. Fix all mistakes and submit again", toasterOption);
						}
						else {
              setValidateError({});
              window.$('#create_item_modal').modal('show');
						}
					}
				}
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
								<h3 className="section-head mb-0 sec_he_sm">{location_pathname == "create-single" && 'Create Single Collectible'}{location_pathname == "create-multiple" && 'Create Multiple Collectible'}</h3>
							</div>
						</GridItem>
					</GridContainer>
				</div>
				<div className="container mt-5">
					<GridContainer>
						<GridItem xs={12} sm={4} md={4}>
							<label className="primary_label">Preview</label>
							<Dropzone onDrop={acceptedFiles => selectFileChange(null,acceptedFiles,"original")}>
							{({getRootProps, getInputProps}) => (
							<div className="single_collectible masonry mx-0" {...getRootProps()}>
								<input {...getInputProps()} />
								<div className="item itemd_heih_adj">
									<div className="card_inner_item">
										<div className="d-flex justify-content-between">
											<div className="d-flex creators_details">
											{!isEmpty(Wallet_Details.AddressUserDetails)&&
											<>
												 <a href={Wallet_Details.AddressUserDetails.customurl != "" ? `${config.Front_URL}/${Wallet_Details.AddressUserDetails.customurl}` : `${config.Users_URL}/${Wallet_Details.AddressUserDetails.curraddress}`} title={"Creator : " + Wallet_Details.AddressUserDetails.name != "" ? Wallet_Details.AddressUserDetails.name : String(Wallet_Details.AddressUserDetails.curraddress)}>
													{
														Wallet_Details.AddressUserDetails.image != ""?
															<img src={`${config.Back_URL}/images/${Wallet_Details.AddressUserDetails._id}/${Wallet_Details.AddressUserDetails.image}`} alt="User" className="img-fluid align-self-center" />
														:
															<Avatars item="img-fluid align-self-center" />
														}
													</a>

													<a href={Wallet_Details.AddressUserDetails.customurl != "" ? `${config.Front_URL}/${Wallet_Details.AddressUserDetails.customurl}` : `${config.Users_URL}/${Wallet_Details.AddressUserDetails.curraddress}`} title={"Owner : " + Wallet_Details.AddressUserDetails.name != "" ? Wallet_Details.AddressUserDetails.name : String(Wallet_Details.AddressUserDetails.curraddress)}>
												{ Wallet_Details.AddressUserDetails.image != ""	?
														<img src={`${config.Back_URL}/images/${Wallet_Details.AddressUserDetails._id}/${Wallet_Details.AddressUserDetails.image}`} alt="User" className="img-fluid align-self-center" />
													:
														<div className="img-fluid align-self-center" >
															<Avatars item="img-fluid align-self-center" />
														</div>
												}
												</a>
												</>
												}
												<a href={config.BSCSCAN+(location_pathname =='create-multiple'?config.multipleContract:config.singleContract)} title={"Collection : " + (location_pathname=='create-multiple'?config.multipleContract:config.singleContract)}>
													<img src={config.Lod} alt="User" className="img-fluid align-self-center" /></a>
											</div>

											<div>

											</div>
										</div>
										<div className="remaintime mt-3">
											<div className="item_inner_img">
												{((TokenFilePreUrl.split('.').pop() == 'mp4') ||
													(TokenFilePreUrl.split('.').pop() == 'webm') ||
													(TokenFilePreUrl.split('.').pop() == 'WEBM') ||
													(TokenFilePreUrl.split('.').pop() == 'OGV') ||
													(TokenFilePreUrl.split('.').pop() == 'ogv'))
													?
													<video
														id="imgPreview"
														className="img-fluid"
														alt="img"
														autoPlay
														controls
														muted
														playsInline
														loop
														 src={TokenFilePreReader} type={"video/mp4","video/webm","video/ogv"}
														
													/>:
													(TokenFilePreUrl.split('.').pop() == 'MP3'||TokenFilePreUrl.split('.').pop() == 'mp3' ||TokenFilePreUrl.split('.').pop() == 'wav'||TokenFilePreUrl.split('.').pop() == 'WAV')?
													<>
													<img src={config.AudioImg} className="img-fluid" />
													{/* {play_set?
														<i className="fas fa-pause" onClick={()=>{
															set_play(false)
															my_audio.current.pause()}} ></i>:
														<i className="fas fa-play" onClick={()=>{
															set_play(true)
															my_audio.current.play()}} ></i>} */}

													<audio
													ref={my_audio}
													
														id="imgPreview"
														className="img-fluid"
														alt="img"
														controls
														playsInline
														//hidden
														src={TokenFilePreReader} type={"audio/*"}
														
													>
													</audio></>:
													<img src={TokenFilePreReader } id="imgPreview" alt="Collections" className="img-fluid" />


												}
												{/* {((TokenFilePreUrl.split('.').pop() == 'mp3')
												|| (TokenFilePreUrl.split('.').pop() == 'MP3')
												|| (TokenFilePreUrl.split('.').pop() == 'aav')
												|| (TokenFilePreUrl.split('.').pop() == 'AAV')
												|| (TokenFilePreUrl.split('.').pop() == 'flac')
												|| (TokenFilePreUrl.split('.').pop() == 'FLAC')
												)
													&&
													<>
														<img src={config.AudioImg} className="img-fluid" onClick={()=>{
															new Audio(TokenFilePreReader).play()
															}
															} />

														<audio
															muted
															id="imgPreview"
															className="img-fluid"
															alt="img"
															playsInline
															src={TokenFilePreReader} type={"audio/mp3","audio/aav","audio/flac"}
														>
														</audio>
													</>

												} */}

											
													{/* {TokenFilePreReader==PreviewFile
													&&
													<img src={TokenFilePreReader } id="imgPreview" alt="Collections" className="img-fluid" />
												} */}

											</div>

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
														{TokenQuantity} of {TokenQuantity}
													</span> </h3>

												{(PutOnSale == true && PutOnSaleType == 'FixedPrice' && TokenPrice > 0) && <button className="btn btn_purple_sm bg-theme" data-toggle="modal" data-target=""><span>
													
													
													{token_usd(TokenPrice,1)}
													{CoinName}</span></button>}
												{(PutOnSale == true && PutOnSaleType == 'TimedAuction') &&
													 <span>{
														MinimumBid == '' ? 0 : token_usd(MinimumBid,1)
														} {CoinName} </span>}
												</div>
										</div>
									</div>
								</div>

							</div>
							 )}
							 </Dropzone>
							{TokenFile 
								&& (TokenFile.type.includes('video')
								|| TokenFile.type.includes('audio'))
								&&
								<Dropzone onDrop={acceptedFiles => selectFileChange(null,acceptedFiles,"thumb")}>
								{({getRootProps, getInputProps}) => (	
							<div className="single_collectible masonry mx-0" {...getRootProps()}>
								<input {...getInputProps()} />
								<div className="item itemd_heih_adj">
									<div className="card_inner_item">
										<div className="remaintime mt-3">
											<div className="item_inner_img">
														<img src={Thumb_TokenFilePreReader} id="imgPreview" alt="Collections" className="img-fluid" />
											</div>
										</div>
									</div>
								</div>
							</div>
							)}
							</Dropzone>	
						}
						</GridItem>
						<GridItem xs={12} sm={8} md={8}>
							<form className="formCls">
								<div className="form-row">
									<div className="form-group col-md-12">
										<div className="d-flex justify-content-between align-items-start">
											<div>
												<label className="primary_label" htmlFor="inputEmail4">Upload file</label>
												<p className="form_note">JPG, JPEG, PNG, GIF, WEBP, WEPM, OGV, or MP4 . Max 50mb.</p>
											</div>
											<div className="file_btn btn primary_btn">Upload
												<input
													className="inp_file"
													type="file"
													name="file"
													accept="audio/*,video/*,image/*"
													onChange={(e)=>selectFileChange(e,null,null)}
												/>
											</div>
										</div>
											{ValidateError.photo && <span className="text-danger">{ValidateError.photo}</span>}
									</div>
									{TokenFile 
								&& (TokenFile.type.includes('video')
								|| TokenFile.type.includes('audio'))
								&&
									<div className="form-group col-md-12">
										<div className="d-flex justify-content-between align-items-start">
											<div>
												<label className="primary_label" htmlFor="inputEmail4">Upload Thumbnail</label>
												<p className="form_note"> JPEG Only. Max 50mb.</p>
											</div>
											<div className="file_btn btn primary_btn">Upload
												<input
													className="inp_file"
													type="file"
													name="thumb"
													accept="audio/*,video/*,image/*"
													onChange={(e)=>selectFileChange(e,null,null)}

												/>
											</div>
										</div>
										{ValidateError.thumb && <span className="text-danger">{ValidateError.thumb}</span>}
									</div>
								}
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<div className="d-flex justify-content-between align-items-start grid_toggle">
											<div>
												<label className="primary_label" htmlFor="inputEmail4">Put on Sale</label>
												<p className="form_note">You’ll receive bids on this item</p>
											</div>
											<label className="switch toggle_custom">
												<input type="checkbox"
													id="putonsale"
													name="putonsale"
													onChange={CheckedChange}
													checked={PutOnSale}
												/>
												<span className="slider"></span>
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
														{(CollectibleType == 721) &&
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
											{/* {(PutOnSale === true &&( PutOnSaleType === 'FixedPrice'||PutOnSaleType === 'TimedAuction'))&&
												<div>	<span className="font_we_700_note_txt">Listing a NFT You Need Pay {(Wallet_Details.Listing_Fee)/config.decimalvalues}</span></div>} */}
										{(PutOnSale == true && PutOnSaleType == 'FixedPrice') &&
											<div className="row mx-0 mt-3 fixed_price_sec">

												<label className="primary_label" htmlFor="price_new">Price</label>

												<div className="form-row w-100">
													<div className="form-group col-md-6">
														<div className="input-group input_grp_style_1 pricelist">

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
																	className="yes1 form-control primary_inp select1 selxet_app select_bnb"
																	id="basic-addon2"
																	name="coinname"
																	value={{label:CoinName}}
																	placeholder={"Select"}
																	onChange={priceoptionfunc}
																	options={priceoption}
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
														{token_usd(YouWillGet,1)}
														 {CoinName}</span>
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
																	className="yes1 form-control primary_inp select1 selxet_app select_bnb"
																	id="basic-addon2"
																	name="coinname"
																	placeholder={"Select"}
																	// value={{label:CoinName}}
																	onChange={priceoptionfunc}
																	// options={priceoption}
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
																{/* <div onClick={() => { DateChange('StartDateDropDown', 'Select Date') }}>Select Date</div> */}
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
															{/* <div onClick={() => { DateChange('EndDateDropDown', 'Select Date') }}>Select Date</div> */}
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
										<div className="d-flex justify-content-between align-items-start grid_toggle">
											<div>
												<label className="primary_label" htmlFor="inputEmail4">Unlock Once Purchased</label>
												<p className="form_note">Content will be unlocked after successful transaction</p>
											</div>
											<label className="switch toggle_custom">
												<input
													type="checkbox"
													id="unlockoncepurchased"
													name="unlockoncepurchased"
													onChange={CheckedChange}
												/>
												<span className="slider"></span>
											</label>
										</div>
										{
											(Unlockoncepurchased) &&
											<div className="form-group unlock_sec">
												<input type="text"
													className="form-control primary_inp mb-1"
													name="UnLockcontent"
													id="UnLockcontent"
													onChange={inputChange}
													placeholder="Digital key, code to redeem or link to a file.." />
												<p className="form_note">Tip: Markdown syntax is supported</p>
											</div>

										}
										{ValidateError.UnLockcontent && <span className="text-danger">{ValidateError.UnLockcontent}</span>}

									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<label className="primary_label" htmlFor="name">Name</label>
										<input type="text"
											className="form-control primary_inp"
											name="TokenName"
											id="TokenName"
											onChange={inputChange}
											placeholder="e.g. Redeemable" />
										{ValidateError.TokenName && <span className="text-danger">{ValidateError.TokenName}</span>}
									</div>

									<div className="form-group col-md-6">
										<label className="primary_label" htmlFor="desccription">Description <span className="text-muted">(Optional)</span></label>
										<textarea type="text"
											className="form-control primary_inp"
											id="desccription"
											name="TokenDescription"
											onChange={inputChange}
											placeholder="Description about your NFTs..."
											autoComplete="off"
										></textarea>

									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<label className="primary_label" htmlFor="royalties">Royalties</label>
										<div className="inp_grp">
											<input type="text"
												className="form-control primary_inp"
												name="TokenRoyalities"
												onChange={inputChange}
												id="royalties"
												placeholder="10%" />
											<p className="inp_append">%</p>
											<span>Suggested: 0%,5%, 10%, 20%. Maximum is 20%</span>
											{ValidateError.TokenRoyalities && <span className="text-danger"><br />{ValidateError.TokenRoyalities}</span>}

										</div>
										{/* <p className="error_text">Royalties is required</p> */}
									</div>
									<div className="form-group col-md-6">
										<label className="primary_label" htmlFor="category">Category</label>
										<Select
											className="yes1 form-control primary_inp select1 selxet_app category_div"
											id="tokenCategory"
											name="tokenCategory"
											onChange={selectChange}
											options={CategoryOption}
											label="Single select"
											formControlProps={{
												fullWidth: true
											}}
										/>
										{ValidateError.TokenCategory && <span className="text-danger"><br />{ValidateError.TokenCategory}</span>}

									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label className="primary_label" htmlFor="properties">Properties <span className="text-muted">(Optional)</span></label>
										<input type="text"
											className="form-control primary_inp"
											id="properties"
											name="TokenProperties"
											onChange={inputChange}
											placeholder="e.g. size" />
										{/* <p className="error_text">Properties is required</p> */}
									</div>
									{location_pathname == 'create-multiple' &&
										<div className="form-group col-md-6">
											<label className="primary_label" htmlFor="desccription">Number of copies</label>
											<input
												type="text"
												className="form-control"
												id="TokenQuantity"
												name="TokenQuantity"
												onChange={inputChange}
												placeholder="e.g. 1"
												// value={TokenQuantity}
												maxLength={3}
												autoComplete="off"
											/>
											{ValidateError.TokenQuantity && <span className="text-danger"><br />{ValidateError.TokenQuantity}</span>}
										</div>
									}

								</div>
								<div>
									{/* <Button className="create_btn">Create item</Button> */}
									<Button className="create_btn" onClick={CreateItem}>Create item</Button>

								</div>
							</form>
						</GridItem>
					</GridContainer>
				</div>
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
              <div className="media approve_media">
                {SignLockCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
                {SignLockCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
                {SignLockCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
                {SignLockCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
                <div className="media-body">
                  <p className="mt-0 approve_text">Upload Meta Data</p>
                  <p className="mt-0 approve_desc">Upload meta contents to ipfs</p>
                </div>
              </div>
              <div className="text-center mt-3 mb-2">
                <Button className="create_btn btn-block"
                  disabled={( SignLockCallStatus == 'processing' || SignLockCallStatus == 'done')}
                  onClick={SignLockCall}>
                  {SignLockCallStatus == 'init' && 'Upload'}
                  {SignLockCallStatus == 'processing' && 'In-progress...'}
                  {SignLockCallStatus == 'done' && 'Done'}
                  {SignLockCallStatus == 'tryagain' && 'Try Again'}

                </Button>
              </div>
							 {/* {PutOnSale==true&&
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
										disabled={(SignLockCallStatus!="done"||ApproveCallStatus == 'processing' || ApproveCallStatus == 'done')}
										onClick={ApproveCall}
									>
										{ApproveCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
										{ApproveCallStatus == 'init' && 'Start'}
										{ApproveCallStatus == 'processing' && 'In-progress...'}
										{ApproveCallStatus == 'done' && 'Done'}
										{ApproveCallStatus == 'tryagain' && 'Try Again'}


									</Button>
								</div>
								</>} */}
								<div className="media approve_media">
									{MintCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
									{MintCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
									{MintCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
									{MintCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
									<div className="media-body">
										<p className="mt-0 approve_text">Mint token</p>
										<p className="mt-0 approve_desc">Call contract method</p>
									</div>
								</div>
								<div className="text-center my-3">
									<Button className="create_btn btn-block"
										// disabled={(PutOnSale==true?(ApproveCallStatus != 'done'||( MintCallStatus == 'processing' || MintCallStatus == 'done')):(SignLockCallStatus!='done'||MintCallStatus == 'processing' || MintCallStatus == 'done'))}
										// disabled={(PutOnSale==true && (SignLockCallStatus!='done'||MintCallStatus == 'processing' || MintCallStatus == 'done'))}
										disabled={(SignLockCallStatus!='done'||MintCallStatus == 'processing' || MintCallStatus == 'done')}
										onClick={MintCall}
									>
										{MintCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
										{MintCallStatus == 'init' && 'Start'}
										{MintCallStatus == 'processing' && 'In-progress...'}
										{MintCallStatus == 'done' && 'Done'}
										{MintCallStatus == 'tryagain' && 'Try Again'}
									</Button>
								</div>

								<div className="media approve_media">
									{SignCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
									{SignCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
									{SignCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
									{SignCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}

									{/* <i className="fas fa-check mr-3" aria-hidden="true"></i> */}
									<div className="media-body">
										<p className="mt-0 approve_text">Sign sell order</p>
										<p className="mt-0 approve_desc">Sign sell order using to our wallet</p>
									</div>
								</div>
								<div className="text-center my-3">
									<Button className="create_btn btn-block"
										disabled={(MintCallStatus != 'done' || SignCallStatus == 'processing' || SignCallStatus == 'done')}
										onClick={SignCall}>
										{SignCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
										{SignCallStatus == 'init' && 'Start'}
										{SignCallStatus == 'processing' && 'In-progress...'}
										{SignCallStatus == 'done' && 'Done'}
										{SignCallStatus == 'tryagain' && 'Try Again'}

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
							<button type="button" className="close" data-dismiss="modal" aria-label="Close" >
								<span aria-hidden="true"  >&times;</span>
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
                          	// onChange={(value) => set_EndClocktime(value)}    />   ////// changed to make sure start time is already selected
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
