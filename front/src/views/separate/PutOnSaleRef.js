/**
 * FILE		   	:	PUTONSALEREF - MODAL
 * DISPATCH		:	NIL
 * REF			:	PutOnSale_Click
 * METHOD   	:   TokenPriceChange_update_Action, null_time_auction,  checkOtherPlatformDetais1155 , getReceipt , ListNFT
 * C-DATE   	:   28_01_22
 * S-DATE   	:   26-01-22
*/


import React, {
    useEffect,
    forwardRef,
    useState,
    useImperativeHandle
} from 'react';
import {
    useHistory, useLocation
} from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import Web3 from 'web3';
import '@metamask/legacy-web3'
import config from '../../lib/config';
import Select from 'react-select';
import isEmpty from 'lib/isEmpty';
import Trade from '../../ABI/Trade.json'
import {
   
    TokenPriceChange_update_Action,
    null_time_auction,
    checkOtherPlatformDetais1155,
    token_usd,
   
} from '../../actions/v1/token';
import { getReceipt ,  ListNFT} from 'actions/v1/getReceiptFunc';
import Convert from '../separate/Convert'
import {toast} from 'react-toastify';
import SINGLE from '../../ABI/SINGLE.json'
import MULTIPLE from '../../ABI/MULTIPLE.json'


let toasterOption = config.toasterOption;

export const PutOnSaleRef = forwardRef((props, ref) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const location_pathname = useLocation();
	const Wallet_Details = useSelector(state => state.wallet_connect_context);


    const [FormSubmitLoading, Set_FormSubmitLoading] = useState('init');
    const [CoinName, setCoinNames] = useState('');
    const [CoinName_Initial, set_CoinName_Initial] = useState('');
    const [Items,Set_Items]=useState({});
    const [ValidateError, Set_ValidateError] = useState({});
    const [YouWillGet, Set_YouWillGet] = useState(0);
    const [owner_Detail,set_owner_Detail]=useState({})
   
    const [TokenPrice, Set_TokenPrice] = useState(0);
    const [TokenPrice_Initial, Set_TokenPrice_Initial] = React.useState(0);
    const [token_onwers_info,set_token_onwers_info]=useState({})
    const [ApproveCallStatus, setApproveCallStatus] = React.useState('init');
    const [MintCallStatus, setMintCallStatus] = React.useState('init');
    const [listnft, setlistnft] = React.useState();
 
    
    const priceoption = [
        { value: config.currencySymbol, label: config.currencySymbol },
        { value: config.tokenSymbol, label: config.tokenSymbol },
      ];
    
    const priceoptionfunc = (e) => {
        set_CoinName_Initial(e.value)
        Set_FormSubmitLoading('start')
      };
    const inputChange = (e) => {
        if (e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
            Set_FormSubmitLoading('start')
            var value = e.target.value;
            switch (e.target.name) {
                case 'TokenPrice':
                    Set_TokenPrice(value);
                    if (value != '' && isNaN(value) == false && value > 0) {
                        var weii = value * config.decimalvalues;
                        var per = (weii * Wallet_Details.sellerfee)/ 1e20;
                        var royal = weii * Items.tokenRoyality*config.decimalvalues/1e20
                       
                            // Set_YouWillGet(parseFloat((weii - (per+royal)) / config.decimalvalues).toFixed(4));
                            Set_YouWillGet(parseFloat((weii - (per)) / config.decimalvalues).toFixed(4));
                            ////("parseFloat((weii - (per)) / config.decimalvalues).toFixed(4)",parseFloat((weii - (per)) / config.decimalvalues).toFixed(4))
                        // var weii = window.web3.toWei(value);
                        // var per = (Number(weii) * config.sellerfee)/ 1e20;
                        // var royal = Number(weii) * Number(window.web3.toWei(item.tokenRoyality))/1e20
                        // if((String(CoinName_Initial).toLowerCase())==(String(config.tokenSymbol).toLowerCase())){
                        //     var getValue=window.web3.fromWei((Number(weii) - (Number(per)+Number(royal))))
                        // Set_YouWillGet(parseFloat(Number(getValue)).toFixed(2));}
                        // else{
                        //     var getValues=window.web3.fromWei((Number(weii) - (Number(per)+Number(royal))))
                        //     Set_YouWillGet(parseFloat(Number(getValues)).toFixed(2));      
                        //       }
                        //////("Set_YouWillGet",weii,per,royal)

                    }
                    ItemValidation({ TokenPrice: value });
                    break;
                default:
                // code block
            }
        }
    }

    const ItemValidation = async (data = {}) => {
        var ValidateError = {};

        var Chk_TokenPrice = (typeof data.TokenPrice != 'undefined') ? data.TokenPrice : TokenPrice;

        if (Chk_TokenPrice == '') {
            ValidateError.TokenPrice = '"Token Price" is not allowed to be empty';
        }
        else if (Chk_TokenPrice == 0) {
            ValidateError.TokenPrice = '"Token Price" must be greater than 0';
        }
        else if (String((Chk_TokenPrice).split('.').pop()).length==5) {
            ValidateError.TokenPrice = '"Token Price" must be greater than 0.0001';
        }
        
        else if (isNaN(Chk_TokenPrice) == true) {
            ValidateError.TokenPrice = '"Token Price" must be a number';
        }
        else if (TokenPrice_Initial > 0 && Chk_TokenPrice >= TokenPrice_Initial) {
            ValidateError.TokenPrice = '"Token Price" must be less than ' + TokenPrice_Initial;
        }
        else if (CoinName_Initial=="") {
            ValidateError.CoinName = '"Currency or Token Symbol" is required' ;
        }
        else if (CoinName_Initial=="undefined") {
            ValidateError.CoinName = '"Currency or Token Symbol" is required' ;
        }
     
        // else if(Chk_TokenPrice > Wallet_Details.UserAccountBal) {
        //     ValidateError.TokenPrice = 'Insufficient balance, Check your wallet balance';
        // }
        // else if(Chk_TokenPrice > Wallet_Details.UserAccountBal) {
        //     ValidateError.TokenPrice = 'Insufficient balance, Check your wallet balance';
        // }
        else {
            // await Wallet_Details.GetUserBal();
            // if(Chk_TokenPrice > Wallet_Details.Wallet_Details.UserAccountBal) {
            //     ValidateError.TokenPrice = 'Insufficient balance, Check your wallet balance';
            // }
            // else {
            delete ValidateError.TokenPrice;
            Set_FormSubmitLoading('start')
            // }
        }
        Set_ValidateError(ValidateError);
        return ValidateError;
    }

    async function FormSubmit() {
        Set_FormSubmitLoading('start');
        var errors = await ItemValidation();
        var errorsSize = Object.keys(errors).length;
        if (errorsSize != 0) {
            Set_FormSubmitLoading('error');
            toast.error("Form validation error. Fix mistakes and submit again", toasterOption);
            return false;
        }

        if (Wallet_Details.providers) {
            var web3 = new Web3(Wallet_Details.providers)
            if (
                web3
            ) {
                var receipt=null;
                var handle=null;
                if (Items.contractAddress == config.singleContract || 
                    Items.contractAddress == config.multipleContract ) {
                        var CoursetroContract =  new web3.eth.Contract(Items.type==1155?MULTIPLE:SINGLE,Items.contractAddress)

                try{
                    Set_FormSubmitLoading('processing');
                  await  CoursetroContract.methods
                        .orderPlace(
                           Items.tokenCounts,
                           web3.utils.toWei(TokenPrice),
                        )
                        .send({ from: Wallet_Details.Accounts })
                        .on('transactionHash',async (transactionHash) => {
                            handle = setInterval(async () => {
                                receipt = await getReceipt(web3, transactionHash)
                                clr1();
                              }, 8000)
                        })
                    }
    
                    catch(error) {
                        Set_FormSubmitLoading('try');
                        toast.error('Execution Reverted'+error.toString(), toasterOption)
                    }
            }
            else{
                ////("Trade is Working",Items.type)
                var CoursetroContract = new web3.eth.Contract(
                    Trade,
                    config.trade
                );
                try{
                    Set_FormSubmitLoading('processing');
                    
                  await  CoursetroContract.methods
                        .orderPlace(
                           Items.tokenCounts,
                           web3.utils.toWei(TokenPrice),
                           Items.contractAddress,
                           Items.type
                        )
                        .send({ from: Wallet_Details.Accounts })
                        .on('transactionHash',async (transactionHash) => {
                            handle = setInterval(async () => {
                                receipt = await getReceipt(web3, transactionHash)
                                clr1();
                              }, 8000)
                        })
                    }
    
                    catch(error) {
                        Set_FormSubmitLoading('try');
                        toast.error('Execution Reverted'+error.toString(), toasterOption)
                    }
            }
               
                async function clr1(){
       
                    if(receipt!=null){
                        clearInterval(handle);
                         if(receipt.status==true){   
                      
                   
                        var postData = {
                            tokenOwner: Wallet_Details.UserAccountAddr,
                            tokenCounts: Items.tokenCounts,
                            tokenPrice: TokenPrice,
                            blockHash: receipt.blockHash,
                            transactionHash: receipt.transactionHash,
                            owner:owner_Detail.tokenOwner,
                            CoinName:CoinName_Initial,
                            PutOnSaleType:'lower',
                            type:owner_Detail.type,
                            contractAddress:owner_Detail.contractAddress
                        }
   
                        var Resp = await TokenPriceChange_update_Action(postData)
                        if (Resp&&Resp.data && Resp.data.message && Resp.data.message == 'success') {
                            toast.success("Transaction complete successfully", toasterOption)
                            Set_FormSubmitLoading('done');
                            window.$('#PutOnSale_modal').modal('hide');
                            setTimeout(() => { 
                                if(location_pathname.pathname=='/info'){
                                    
                                    // var payload = {
                                        //     curAddr: Wallet_Details.UserAccountAddr,
                                        //     tokenCounts: Items.tokenCounts,
                                        //     paramAddress: Wallet_Details.UserAccountAddr,
                                        //     contractAddress: Items.contractAddress
                                        // };
                                        // window.$('div').removeClass('modal-backdrop');
                                    props.Refresh_page()}
                                    else{
                                   history.push('/info/'+Wallet_Details.UserAccountAddr+'/'+owner_Detail.contractAddress+'/'+owner_Detail.tokenCounts)
                               }
                               }, 2000);
                        }
                    }
                }}
                    
            }
        }
    }

    useEffect(() => {
     
        Set_ValidateError({});
    }, [TokenPrice]);

    useImperativeHandle(
        ref,
        () => ({
            async PutOnSale_Click(item,tokenOwnerInfo, ownerdetail,functype) {
                //("put on sale data ",item,tokenOwnerInfo, ownerdetail,functype);
               document.getElementById('TokenPrice').value=''
                set_CoinName_Initial('')
                Set_YouWillGet(0)
                            /**
                 * item- initial item
                 * tokenownerinfo - token owner user details
                 * ownerdetails - token owner token details
                 */

                if (Wallet_Details.UserAccountAddr!="") {
                    var web3=new Web3(Wallet_Details.providers)
                    var balance = await checkOtherPlatformDetais1155(item,ownerdetail,item.type,web3);
                    if (balance == 0) {
                        toast.warning("You won't buy at this moment please refresh you data",toasterOption);
                        setTimeout(() => {
                            window.location.href="/"
                        }, 1000);
                        return false;
                    }
                    else{
                   
                        if (String(item.contractAddress).toLowerCase() == String(config.singleContract).toLowerCase() || 
                            String(item.contractAddress).toLowerCase() == String(config.multipleContract).toLowerCase()) {
                                var contractCall= new web3.eth.Contract(item.type==721?SINGLE:MULTIPLE,item.contractAddress)
                               // var listnft=await ListNFT(contractCall,Wallet_Details.UserAccountAddr,ownerdetail.tokenCounts)
                                //setlistnft(listnft)
                            // window.$('#PutOnSale_modal').modal('show');
                            if(functype=='putonsale'){
                                
                           
                            var token_detail={
                                image:item.image,
                                TokenFile:item.additionalImage == "" ? `${config.Back_URL}/compressedImg/${item.tokenCreator}/${item.additionalImage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`,
                                TokenName:item.tokenName,
                                type:ownerdetail.type,
                                listNft:listnft,
                                clocktime:ownerdetail.clocktime,
                                endclocktime:ownerdetail.endclocktime
                                }
                            history.push({
                                pathname:'/assets/'+ownerdetail.contractAddress+'/'+ownerdetail.tokenCounts+'/sell',
                                state:token_detail,
                              
                            })
                            }
                            else{
                                window.$('#PutOnSale_modal').modal('show')
                            }
                        
                        }
                        else{
                            var check = await orderApprovecheck(item,ownerdetail);
                            if(check)
                            {
                                setApproveCallStatus('done')
                            }
                            }
                     
                        Set_Items(item)
                        set_owner_Detail(ownerdetail)
                        if(ownerdetail.tokenPrice>0){
                        Set_TokenPrice(ownerdetail.tokenPrice);
                        Set_TokenPrice_Initial(ownerdetail.tokenPrice);
                        set_CoinName_Initial(ownerdetail.CoinName)
                        setCoinNames(ownerdetail.CoinName)}
                        if(!isEmpty(tokenOwnerInfo)){
                            set_token_onwers_info(tokenOwnerInfo)
                        }
                        else{
                            set_token_onwers_info({})
                        }
                        Set_ValidateError({});
                }}
                else {
                    window.$('#connect_modal').modal('show');
                }
            }
        }),
    )
    async function orderApprovecheck(item,tokenOwnerInfo){
        if (Wallet_Details.providers==null) {
            toast.warning("OOPS!..connect Your Wallet", toasterOption);
            return false;
          }
          var web3 = new Web3(Wallet_Details.providers);
          try{
             var MultiContract = new web3.eth.Contract(
                (item.type == 721?SINGLE:MULTIPLE),
                item.contractAddress
            );
             var status = await MultiContract.methods.isApprovedForAll(
                tokenOwnerInfo.tokenOwner,
            config.trade
         ).call();
         return status;
          }
          catch(e){
              ////("OrderApprove Check", e);
            return false
       
          }
    }
    async function ApproveCall() {
            var receiptt = null;
            var handlee = null;
        if (Wallet_Details.providers==null) {
          toast.warning("OOPS!..connect Your Wallet", toasterOption);
          return false;
        }
        var web3 = new Web3(Wallet_Details.providers);
        var currAddr = Wallet_Details.UserAccountAddr
        
        if (currAddr=="") {
          toast.warning("OOPS!..connect Your Wallet", toasterOption);
          return false;
        }
        setApproveCallStatus('processing');
        try {
            var MultiContract = new web3.eth.Contract(
                (Items.type == 721?SINGLE:MULTIPLE),
                Items.contractAddress
                );
               await MultiContract.methods.setApprovalForAll(
              config.trade,
              true
            ).send({
              from: owner_Detail.tokenOwner,
            }).on('transactionHash', async (transactionHash) => {
              if (transactionHash != "") {
                handlee = setInterval(async () => {
                  receiptt = await getReceipt(web3, transactionHash)
                  clr();
                }, 8000)
              }
            })
          }
          catch (error) {
            toast.error("Approve failed"+error.toString(), toasterOption);
            setApproveCallStatus('tryagain');
          }
          async function clr() {
              if (receiptt != null) {
                clearInterval(handlee)
                  toast.success("Approve Successfully", toasterOption);
                  setApproveCallStatus('done');
                }
          }
      }

      
    async function priceListFunction(){
        //////("POPup starting")
        window.$('#price_item_modal').modal('hide');
        var token_detail={
            image:Items.image,
            TokenFile:Items.additionalImage == "" ? `${config.IPFS_IMG}/${Items.ipfsimage}` : `${config.Back_URL}/nftImg/${Items.tokenCreator}/${Items.additionalImage}`,
            TokenName:Items.tokenName,
            type:owner_Detail.type,
            listNft:listnft,
            clocktime:owner_Detail.clocktime,
            endclocktime:owner_Detail.endclocktime
            }
        history.push({
            pathname:'/assets/'+owner_Detail.contractAddress+'/'+owner_Detail.tokenCounts+'/sell',
            state:token_detail,
          
        })
        // window.$('#PutOnSale_modal').modal('show');
    }
    return (
        <>
        
                <div className="modal fade primary_modal" id="PutOnSale_modal" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="accept_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"  >
            <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title" id="accept_modalLabel">{(TokenPrice_Initial == 0||TokenPrice_Initial == null) ? 'Put On Sale' : 'Lower Price'}</h5>
                        <div className="change_price_img_div">
                            {
                               String(Items.image).includes('.mp4')   ?
                                <video
                                alt="video"
                                    id="my-video"
                                    className="img-fluid" muted
                                    autoPlay controls playsInline loop
                                    preload="auto"
                                  >
                                    <source 
                                    src={Items.additionalImage == "" ? `${config.Back_URL}/compressedImg/${Items.tokenCreator}/${Items.image}` : `${config.Back_URL}/nftImg/${Items.tokenCreator}/${Items.additionalImage}`} type="video/mp4" />
                                </video>:''

                                }
                                 {
                               String(Items.image).includes('.webp')   ?
                               <img 
                               src={Items.additionalImage == "" ?  `${config.Back_URL}/compressedImg/${Items.tokenCreator}/${Items.image}` : `${config.Back_URL}/nftImg/${Items.tokenCreator}/${Items.additionalImage}`} alt="Collections" className="img-fluid" />
                               :''
                                }
                            
                        </div>
                        <p className="text-gray font_we_600 font_12">You are about to Lower Price for
                            <span className="buy_desc_sm_bold pl-1 bold_red owner_break">{Items.tokenName} </span>
                            for
                            <span className="buy_desc_sm_bold pl-1 bold_red owner_break" styel={{ fontSize: 10 }}>
                                {
                                    token_onwers_info
                                    && (token_onwers_info) 
                                    &&(token_onwers_info.name!="" ?
                                  <span >{token_onwers_info.name}</span>
                                        :
                                 <span className="word_brak_text_inline_new" title={"Owner : "+owner_Detail.tokenOwner}>{String(owner_Detail.tokenOwner).slice(0, 8).concat('...')}</span>)
                                }
                            </span>
                        </p>

                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close9">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body px-0 pt-0">
                        <form className="px-4 bid_form">
                            <div className="input-group mb-2 input_grp_style_1 min_h_45px_input_grp">
                                <input type="text"
                                    type="text"
                                    maxLength={config.maxLength}
                                    name="TokenPrice"
                                    id="TokenPrice"
                                    // value={TokenPrice}
                                    onChange={inputChange}
                                    placeholder="e.g. 10"
                                    autoComplete="off"

                                    className="form-control min_h_46px_input"
                                    aria-describedby="basic-addon2" />
                                    {(TokenPrice_Initial == 0||TokenPrice_Initial == null) ?
                                   <div className="input-group-append">
                                  <Select
                                  className="yes1 form-control primary_inp select1 selxet_app"
                                  id="basic-addon2"
                                  name="coinname"
                                  onChange={priceoptionfunc}
                                  options={priceoption}
                                  label="Select price"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                />
                                </div>:''}
                             

                              
                            </div>
                            {ValidateError.TokenPrice && <span className="text-danger">{ValidateError.TokenPrice}</span>}
                                {ValidateError.CoinName && <span className="text-danger">{ValidateError.CoinName}</span>}

                            {TokenPrice_Initial > 0 && <p className="form_note">Price must be less than the actual price {TokenPrice_Initial }</p>}
                            <div className="row pb-3">
                                <div className="col-12 col-sm-6">
                                    <p className="buy_desc_sm">Service fee</p>
                                </div>
                                <div className="col-12 col-sm-6 text-sm-right">
                                    <p className="buy_desc_sm_bold">{Wallet_Details.sellerfee/config.decimalvalues}% <span>{TokenPrice_Initial>0 && CoinName_Initial}{(TokenPrice_Initial==0||TokenPrice_Initial==null) && (CoinName_Initial&&CoinName_Initial)}</span></p>
                                </div>
                            </div>
                         
                            <div className="row pb-3">
                                <div className="col-12 col-sm-6">
                                    <p className="buy_desc_sm">You will get</p>
                                </div>
                                <div className="col-12 col-sm-6 text-sm-right">
                                    <p className="buy_desc_sm_bold">
                                   {token_usd(YouWillGet,1)}
                                       <span>{TokenPrice_Initial>0 && CoinName_Initial}{(TokenPrice_Initial==0) && (CoinName_Initial&&CoinName_Initial)}</span></p>
                                </div>
                            </div>

                            <div className="text-center">
                              
                                <Button
                                className="create_btn btn-block"
                                type ="button"
                                onClick={(FormSubmitLoading=='start'||FormSubmitLoading=='try')?(() => FormSubmit()):undefined}
                                disabled={(FormSubmitLoading=='processing'||FormSubmitLoading=='done'||FormSubmitLoading=='init'||FormSubmitLoading=='error')}
                                >
                            {FormSubmitLoading == 'processing' && <i className ="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                            {FormSubmitLoading == 'processing'&&'In-Progress'}
                            {FormSubmitLoading == 'init'&&'Start'}
                            {FormSubmitLoading == 'start'&&'Start'}
                            {FormSubmitLoading == 'done'&&'Done'}
                            {FormSubmitLoading == 'try'&&'Try-Again'}
                            {FormSubmitLoading == 'error'&&'Error in Entered Price'}
                                </Button>
                                <Button className="btn_outline_red btn-block cancel_btn"
                                 disabled={(FormSubmitLoading=='processing')}
                                data-dismiss="modal" aria-label="Close">Cancel</Button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
        
        
        
        <div className="modal fade primary_modal" id="price_item_modal" tabIndex="-1" role="dialog" aria-labelledby="create_item_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
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
                      {ApproveCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
                      {ApproveCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
                      {ApproveCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
                      {ApproveCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
    
     
                      <div className="media-body">
                        <p className="mt-0 approve_text">Approve</p>
                        <p className="mt-0 approve_desc">Checking balance and approving</p>
                      </div>
                    </div>
                    <div className="text-center my-3">
                      <Button className={"primary_btn btn-block"}
                        disabled={(ApproveCallStatus == 'processing' || ApproveCallStatus == 'done')}
                        onClick={ApproveCall}
                      >
                        {ApproveCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                        {ApproveCallStatus == 'init' && 'Approve'}
                        {ApproveCallStatus == 'processing' && 'In-progress...'}
                        {ApproveCallStatus == 'done' && 'Done'}
                        {ApproveCallStatus == 'tryagain' && 'Try Again'}
    
                      </Button>
                    </div>
                    <div className="media approve_media">
                     {MintCallStatus == 'init' && <i className="fas fa-check mr-3 pro_initial" aria-hidden="true"></i>}
                      {MintCallStatus == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
                      {MintCallStatus == 'done' && <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i>}
                      {MintCallStatus == 'tryagain' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>}
                      <div className="media-body">
                        <p className="mt-0 approve_text">Listing the NFT</p>
                        <p className="mt-0 approve_desc">Call contract method</p>
                      </div>
                      </div>
                      <div className="text-center my-3">
                      <Button className={"primary_btn btn-block"}
                        disabled={(ApproveCallStatus != 'done' || MintCallStatus == 'processing' || MintCallStatus == 'done')}
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
        </>
    )
})

