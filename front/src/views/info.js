
/**
 * FILE		   	:	INFO.js
 * DISPATCH		:	NiL
 * REF			  :	PlaceAndAcceptBidRef,PurchaseNowRef,PutOnSaleRef,LikeRef , CancelOrderRef , BurnRef , TransferRef
 * METHOD   	: TokenCounts_Get_Detail_Action,setTokenCounts_Get_Detail_Action
 * C-DATE   	: 30_01_22
 * S-DATE   	: 30-01-22
*/


import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from '@material-ui/core';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
// myside
import config from '../lib/config';
import isEmpty from "../lib/isEmpty";
import moment from 'moment';
import Convert from 'views/separate/Convert'
import Loader from './Loader'
import {
  TokenCounts_Get_Detail_Action,
  setTokenCounts_Get_Detail_Action,
  token_usd
} from '../actions/v1/token';
import { PlaceAndAcceptBidRef } from './separate/PlaceAndAcceptBidRef';
import { PurchaseNowRef } from "./separate/PurchaseNowRef";
import { PutOnSaleRef } from './separate/PutOnSaleRef';
import { LikeRef } from './separate/LikeRef';
import { CancelOrderRef } from './separate/CancelOrderRef';
import { BurnRef } from './separate/BurnRef';
import { ReportNowRef } from './separate/ReportNowRef';
import { ShareNowRef } from './separate/ShareNowRef';
import { TransferRef } from './separate/TransferRef';
import ReactMarkdown from 'react-markdown';
import { toast } from "react-toastify";
import Convert1 from '../views/separate/Convert1'
import Avatars from "./Avatar";

// imgvidaud
import ImgVidAud from "./separate/imgVidAud";


let toasterOption = config.toasterOption;

// let toasterOption = config.toasterOption;
// let toasterOption = config.toasterOption;



const dashboardRoutes = [];

const useStyles = makeStyles(styles);

// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}



export default function Info(props) {
  const classes = useStyles();
  const history = useHistory();
  const Wallet_Details = useSelector(state => state.wallet_connect_context);

  const { ...rest } = props;
  function hideDetail() {
    document.getElementById("image_div").classList.toggle('expand_img');
    document.getElementById("img_des").classList.toggle('show_des');
    document.getElementById("detai_div").classList.toggle('hide_detail');
    document.getElementById("arrow_icon").classList.toggle('fa-shrink');

  }

  function hideDetailowner() {
    document.getElementById("image_div_owner").classList.toggle('expand_img');
    document.getElementById("img_des_owner").classList.toggle('show_des');
    document.getElementById("detai_div_owner").classList.toggle('hide_detail');
    document.getElementById("arrow_icon_owner").classList.toggle('fa-shrink');
  }

  const LikeForwardRef = useRef();
  const PlaceABidForwardRef = useRef();
  const PutOnSaleForwardRef = useRef();
  const PurchaseNowForwardRef = useRef();
  const CancelOrderForwardRef = useRef();
  const location = useLocation();
  var BurnForwardRef = useRef();
  var ReportForwardRef = useRef();
  var ShareForwardRef = useRef();
  const TransferForwardRef = useRef();
  const [locationname, Setlocationname] = useState(location.pathname)
  async function BidApply_ApproveCall() {
    PlaceABidForwardRef.current.BidApply_ApproveCall();
  }
  async function BidApply_SignCall() {
    PlaceABidForwardRef.current.BidApply_ApproveCall();
  }
  var { owneraddress, collectionaddress, tokenidval } = useParams();

  const initial_state=()=>{
    Set_AllowedQuantity(0)
    setTokenUsers(0)
    Set_item({})
    Set_tokenCounts_Detail({})
    Set_MyTokenBalance(0)
    Set_MyTokenDetail(0)
    Set_Bids({})
    Set_BuyOwnerDetailFirst({})
    set_onwer_price({})
    Set_OwnersDetailFirst({})
    set_token_owner_detail_first({})
  }
  // wallet related : common state
  const [AllowedQuantity, Set_AllowedQuantity] = useState(0);
  const [tokenUsers, setTokenUsers] = useState({})

  const [item, Set_item] = useState({});
  const [tokenCounts_Detail, Set_tokenCounts_Detail] = useState({});
  const [MyTokenBalance, Set_MyTokenBalance] = useState(0);
  const [MyTokenDetail, Set_MyTokenDetail] = useState(0);
  const [Bids, Set_Bids] = useState({});
  const [LikedTokenList, setLikedTokenList] = React.useState([]);
  const [BuyOwnerDetailFirst, Set_BuyOwnerDetailFirst] = useState({});
  const [OwnersDetailFirst, Set_OwnersDetailFirst] = useState({});
  const [showingLoader, setshowingLoader] = React.useState(false);
  const [onwer_price, set_onwer_price] = useState({})
  const [token_owner_detail_first, set_token_owner_detail_first] = useState({})
  const [unlockcontent,set_unlockcontent]=useState('')
  const vidRef = useRef()

	const[play_set,set_play] = useState(false)
  useEffect(() => {
    setshowingLoader(true)
  
    var curAddr = Wallet_Details.UserAccountAddr
    var payload = {
      curAddr: curAddr,
      tokenCounts: String(tokenidval),
      paramAddress: String(owneraddress).toLowerCase(),
      contractAddress: String(collectionaddress).toLowerCase()
    };
    
    /*
      Save moralis data
    (async () => {
    
      if (Wallet_Details.UserAccountAddr != "") {

        var tokenentry = await setTokenCounts_Get_Detail_Action(payload)
        // ////("settokencount",curAddr)
        if (tokenentry && tokenentry.data && tokenentry.data.RespType == 'success') {
        }
      }
    })();
    */
    TokenCounts_Get_Detail_Call(payload);
  }, [Wallet_Details.UserAccountAddr,owneraddress,tokenidval])

 
  useEffect(() => {

    if(location&&location.state&&location.state.from == 'asset')
      Refresh_page();
  }, [location.state])

 
  const Refresh_page=()=>{
    window.$("body").removeClass('modal-open');
    window.$("div").removeClass('modal-backdrop fade show')
    setshowingLoader(true)
    initial_state();
    setTimeout(() => {
      var payload = {
        curAddr: Wallet_Details.UserAccountAddr,
        tokenCounts: String(tokenidval),
        paramAddress: String(owneraddress).toLowerCase(),
        contractAddress: String(collectionaddress).toLowerCase()
      };
      TokenCounts_Get_Detail_Call(payload)
         }, 1000);
  
   
  }

  const TokenCounts_Get_Detail_Call = async (payload) => {
    var curAddr = payload.curAddr;
   
    var Resp;
     Resp = await TokenCounts_Get_Detail_Action(payload)
     ////("tokencount_dtail_list",Resp)
    if (payload.refresh == "refresh") {
      toast.success("You are Refresh the meta data, Please wait few minutes", toasterOption)
    }
    setTimeout(() => {
      setshowingLoader(false)
    }, 3000);

    if (Resp && Resp && Resp.data && Resp.data.Detail && Resp.data.Detail.Resp) {

      var TokenResp = Resp.data.Detail.Resp;
      if (
        TokenResp
        && TokenResp.Token
        && TokenResp.Token[0]
        && TokenResp.Token[0].tokenowners_current
      ) {
        var sum = 0
        sum = (TokenResp.Token[0].tokenowners_current).reduce((a, b) => a + (b["balance"] || 0), 0);
        Set_AllowedQuantity(sum)
        ////("Set_AllowedQuantity", TokenResp.Token[0].tokenowners_current, sum)
        for (let i = 0; i < (TokenResp.Token[0].tokenowners_current).length; i++) {
          const element = TokenResp.Token[0].tokenowners_current[i];
          set_onwer_price(element)
          if (element.tokenPrice > 0 && element.tokenOwner != curAddr) {
            Set_BuyOwnerDetailFirst(element);
            break;
          }
          if (element.tokenOwner != curAddr) {
            break;
          }
          if (element.tokenPrice > 0 && element.tokenOwner == curAddr) {
            Set_OwnersDetailFirst(element);

            break;
          }
        }
      }
      set_unlockcontent(TokenResp.unlockcontent)
      Set_tokenCounts_Detail(TokenResp);
     if (TokenResp.Bids) {
        Set_Bids(TokenResp.Bids);
      }

      var IndexVal = -1;
      var tokenOwnInf = {};
      if (TokenResp.Token[0] && TokenResp.Token[0].tokenowners_all && curAddr) {
        var tokenowners_all = TokenResp.Token[0].tokenowners_all;
        IndexVal = tokenowners_all.findIndex(val => (val.tokenOwner.toString() == curAddr.toString() && val.balance > 0));
      }
       if (IndexVal > -1) {
        Set_MyTokenBalance(tokenowners_all[IndexVal].balance);
        Set_MyTokenDetail(tokenowners_all[IndexVal])
        var addrs = TokenResp.Token[0].tokenOwnerInfo.curraddress[IndexVal]
        tokenOwnInf.curraddress = addrs;
        tokenOwnInf.name = TokenResp.Token[0].tokenOwnerInfo.name[IndexVal]
        set_token_owner_detail_first(tokenOwnInf)
      }
      else {
        Set_MyTokenDetail({});
        Set_MyTokenBalance(0);
      }

      if (TokenResp.Token && TokenResp.Token[0]) {
        Set_item(TokenResp.Token[0]);
        setTokenUsers(TokenResp.Tusers);
      }

    }

  }

  var renderer = ({ days, Month, Year, hours, minutes, seconds, completed }) => {
    if (completed) {

      return <span>Waiting for Owner To Accept</span>
    } else {
      return <span>{days}d  {hours}h {minutes}m {seconds}s left</span>;
    }
  };

  return (
    
    
    showingLoader == true ?
      <Loader />
      :
      (onwer_price.balance==0 ?
      
      <div>
          <div id="loader_div_modal" className="popup_loader">  
          <img src={config.Lod} className="logo_load_modal spin_round" id="logo_spin_modal" /> 
        

      <p style={{marginTop:70,marginLeft:-100}}>No NFT Tokens Available here..</p>
      <Button className="primary_btn" onClick={()=>{history.push('/')}}>Browse on market place</Button>
        </div>  
    </div>
      :
      <div className="inner_header info">
        <PurchaseNowRef
          ref={PurchaseNowForwardRef}
         Refresh_page={Refresh_page}       

        />
        <PutOnSaleRef
          ref={PutOnSaleForwardRef}
        Refresh_page={Refresh_page}       
        />
        <BurnRef
          ref={BurnForwardRef}
        //Refresh_page={Refresh_page}
        />
        <LikeRef
          ref={LikeForwardRef}
          setLikedTokenList={setLikedTokenList}
        />
        <CancelOrderRef
          ref={CancelOrderForwardRef}
        Refresh_page={Refresh_page}
        />
        <ReportNowRef
          ref={ReportForwardRef}
        />
        <ShareNowRef
          ref={ShareForwardRef}
        />


        <PlaceAndAcceptBidRef
          ref={PlaceABidForwardRef} 
          Set_tokenCounts_Detail={Set_tokenCounts_Detail}
          Set_MyTokenBalance={Set_MyTokenBalance}        
          tokenCounts_Detail={tokenCounts_Detail}
          MyTokenBalance={MyTokenBalance}
          AllowedQuantity={AllowedQuantity}
          Refresh_page={Refresh_page}  
        />

        <TransferRef
          ref={TransferForwardRef}
          Refresh_page={Refresh_page}  
        />
        <>
          <Header
            color="transparent"
            routes={dashboardRoutes}
            brand={<Link to="/">
              <img src={require("../assets/images/logo.svg")} alt="logo" className="img-fluid" /></Link>}
            rightLinks={<HeaderLinks />}
            changeColorOnScroll={{
              height: 50,
              color: "dark"
            }}
            {...rest}
          />
          <ScrollToTopOnMount />
          <div className={classes.pageHeader + " inner_pageheader info_header"}>
            {/* info row */}
            <div className="row info_row mx-0 buyer_div">
              <div className="col-12 col-lg-8" id="image_div">

                <div className="flex_center py-5">
                  <div className="float-right arrow_expand" onClick={hideDetail}>
                    <i className="fas fa-arrows-alt" aria-hidden="true" id="arrow_icon"></i>
                  </div>
                  <div className="clearfix"></div>
                  <div className="mid-cont">
                    {/* {
                      (String(item.image).includes('.mp4')) &&
                      <>{
                        MyTokenDetail.tokenOwner != Wallet_Details.UserAccountAddr ?

                          <video
                            id="my-video"
                            className="img-fluid"
                            muted
                            controlsList="nodownload"
                            playsInline loop
                            controls
                            autoPlay
                            alt="video"

                          >
                            <source 											src={ (item.additionalImage == "" ?  `${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.additionalImage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`)}
 type="video/mp4" />
                          </video>
                          :
                          <video
                            id="my-video"
                            className="img-fluid"
                            muted
                            playsInline loop
                            controls
                            autoPlay
                            controlsList={onwer_price.tokenOwner != Wallet_Details.UserAccountAddr && "nodownload"}
                            // preload="auto"
                            alt="video"

                          >
                            <source
                            											src={ (item.additionalImage == "" ?  `${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.additionalImage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`)}
                                                  type="video/mp4" />
                          </video>}</>
                    }
                    {
                     String(item.image).includes('.mp3') &&  <>
                        <img src={config.AudioImg} className="img-fluid" />
                        {play_set?
											<i className="fas fa-pause" onClick={()=>{
												set_play(false)
												vidRef.current.pause()}} ></i>:
											<i className="fas fa-play" onClick={()=>{
												set_play(true)
												vidRef.current.play()}} ></i>}
                        {
                          MyTokenDetail.tokenOwner != Wallet_Details.UserAccountAddr ?
                            <>


                              <audio
                              	ref={vidRef}
                                controls
                                controlsList="nodownload"
                               
                                alt='audio'
                                id="audio_play" hidden
                                playsInline loop
                                type="audio/mp3"
                                autostart="off"

                                src={ (item.additionalImage == "" ?  `${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.additionalImage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`)}
                                >
                              </audio>
                             
                            </>
                            :
                            <>
                              <audio controls
                                	ref={vidRef}
                                alt='audio'
                                className="img-fluid"
                                playsInline loop
                                type="audio/mp3"
                                autostart="off"
                                id="audio_play"
                                hidden
                                src={ (item.additionalImage == "" ?  `${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.additionalImage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`)}
                                >
                              </audio>
                            </>
                        }
                      </>
                    }

                    {
                      String(item.image).includes('.webp') &&
                      <img 
                      src={ (item.additionalImage == "" ?  `${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.additionalImage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`)}
                      alt="Collections" className="img-fluid " />
                    } */}
                <ImgVidAud 
								 file	=	{`${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.image}`} //original image
								 thumb	=	{item.thumb	?	`${config.Back_URL}/Thumb_compressedImage/${item.tokenCreator}/${item.thumb}`	:	`${config.Back_URL}/Thumb_nftImg/${item.tokenCreator}/${item.thumb_additionalImage}`} //thumb image
								 vidAud	=	{`${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.additionalImage}`}
								 type	=	{item.image}
								 class_name	=	{"img-fluid"}
								/>
                  </div>
                  <div className="img_des" id="img_des">
                    <p className="info_title">{item && item.tokenName}</p>
                    <h3 className="info_h3">by<span className="px-2">{item && (isEmpty(item.usersinfo) ? item.tokenOwner : item.usersinfo.name)}</span>on<span className="pl-2">NFT</span></h3>

                  </div>
                </div>

              </div>
              <div className="col-12 col-lg-4 bg_pink" id="detai_div">
                <div className="">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="info_title">{item && item.tokenName}</span>
                    </div>
                    <div className="masonry_likes">
                      {/* {
                        //  MyTokenDetail.tokenOwner==Wallet_Details.UserAccountAddr&&
                        <i className="fas fa-redo pr-3 refresh_icon" aria-hidden="true" onClick={() => {
                          var payload = {
                            curAddr: Wallet_Details.UserAccountAddr,
                            tokenCounts: tokenidval,
                            paramAddress: String(owneraddress).toLowerCase(),
                            contractAddress: String(collectionaddress).toLowerCase(),
                            refresh: "refresh"
                          };
                          TokenCounts_Get_Detail_Call(payload);
                        }}></i>
                      } */}
                      {
                        (LikedTokenList.findIndex(tokenCounts => (tokenCounts.tokenCounts === item.tokenCounts)) > -1)
                          ? (<i className="fas fa-heart mr-2 liked" onClick={() => LikeForwardRef.current.hitLike(item)} style={{ cursor: 'pointer' }}></i>)
                          : (<i className="far fa-heart mr-2" onClick={() => LikeForwardRef.current.hitLike(item)} style={{ cursor: 'pointer' }}></i>)
                      }
                      {/* <i className="fas fa-heart mr-2"></i> */}
                      <span className={item && item.tokenCounts + '-likecount mr-2' + "badge badge_pink mr-2"}>{item && item.likecount}</span>
                      <div className="dropdown dd_info_inline">
                        <button className="drop-down" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          ....
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                          {
                            MyTokenDetail && MyTokenDetail.balance > 0 &&
                            (((String(MyTokenDetail.contractAddress).toLowerCase()) == (String(config.singleContract).toLowerCase())) || ((String(MyTokenDetail.contractAddress).toLowerCase()) == (String(config.multipleContract).toLowerCase()))) &&
                            <a className="dropdown-item" data-toggle="modal" data-target="#" onClick={() => BurnForwardRef.current.Burn_Click(item, MyTokenDetail)}>Burn Token</a>

                          }
                          {
                            MyTokenDetail && MyTokenDetail.balance > 0 &&
                            (((String(MyTokenDetail.contractAddress).toLowerCase()) == (String(config.singleContract).toLowerCase())) || ((String(MyTokenDetail.contractAddress).toLowerCase()) == (String(config.multipleContract).toLowerCase())))

                            && item
                            && item.clocktime == null
                            && item.endclocktime == null &&
                            <a className="dropdown-item" data-toggle="modal" data-target="#"
                              onClick={() => TransferForwardRef.current.Transfer_Click(item, MyTokenDetail)}>Transfer Token
                            </a>
                          }

                          {(MyTokenDetail
                            && MyTokenDetail.balance > 0
                            && (MyTokenDetail.tokenPrice == 0)
                            && MyTokenDetail.tokenOwner == Wallet_Details.UserAccountAddr) 
                            && MyTokenDetail.endclocktime == null &&
                            <a className="dropdown-item" data-toggle="modal" data-target="#" onClick={() => PutOnSaleForwardRef.current.PutOnSale_Click(item, item.tokenuser, item.tokenowners_current, 'putonsale')}>
                              Put on sale
                            </a>
                          }
                      {MyTokenDetail
                            && MyTokenDetail.balance > 0
                            && (MyTokenDetail.tokenPrice == 0)
                            && MyTokenDetail.tokenOwner == Wallet_Details.UserAccountAddr
                            && MyTokenDetail.endclocktime != null 
                            && new Date(item.tokenowners_current.endclocktime) < Date.now() &&
                            <a className="dropdown-item" data-toggle="modal" data-target="#" onClick={() => PutOnSaleForwardRef.current.PutOnSale_Click(item, item.tokenuser, item.tokenowners_current, 'putonsale')}>
                            Put on sale
                            </a>
                          }
                             
                          {
                            MyTokenDetail 
                            && MyTokenDetail.balance > 0 
                            && (MyTokenDetail.tokenPrice > 0) &&
                            <> <>
                              <a className="dropdown-item" data-toggle="modal" data-target="#" onClick={() => PutOnSaleForwardRef.current.PutOnSale_Click(item, token_owner_detail_first, MyTokenDetail)}>Lower Price</a>

                            </>
                              <>
                                <a className="dropdown-item" data-toggle="modal" data-target="#" onClick={() => CancelOrderForwardRef.current.CancelOrder_Click(item, token_owner_detail_first, MyTokenDetail)}>Cancel Order</a>

                              </></>
                          }
                          <a className="dropdown-item" data-toggle="modal" data-target="#report_page_modal"
                            onClick={() => ReportForwardRef.current.SubmitReport_Click(item, onwer_price)}
                          >Report</a>
                          <a className="dropdown-item" data-toggle="modal" data-target="#share_modal"
                            onClick={() => ShareForwardRef.current.ShareSocial_Click(item, onwer_price)}
                          >Share</a>
                        </div>
                      </div>
                    </div>

                  </div>
                  <h3 className="info_h3"><span className="pr-2">
                    {
                      item
                     
                        && onwer_price.clocktime == null
                        && onwer_price.endclocktime == null
                        ?

                        (onwer_price &&
                          (
                            onwer_price.tokenPrice
                              && onwer_price.tokenPrice != null
                              && onwer_price.tokenPrice != 0 ? <>
                              {token_usd(onwer_price.tokenPrice,1)}
                           
                              {' ' + onwer_price.CoinName}
                              {/* ($ 
                                {token_usd(onwer_price.tokenPrice,(((String(onwer_price.CoinName).toLowerCase()) != (String(config.tokenSymbol).toLowerCase()))) ? Wallet_Details.currency_usd_value: Wallet_Details.token_usd_value )}) */}
                              </>
                              : 'Not for Sale'

                          ))
                        :
                        <>
                          {onwer_price.minimumBid + ' ' + onwer_price.CoinName}
                          {token_usd(onwer_price.minimumBid,1)}
{/* 
                          ($ {token_usd(onwer_price.minimumBid,(((String(onwer_price.CoinName).toLowerCase()) != (String(config.tokenSymbol).toLowerCase()))) ? Wallet_Details.currency_usd_value: Wallet_Details.token_usd_value )}

                          ) */}

                        </>

                    }</span>
                    {onwer_price.balance} <> </> of {item.tokenQuantity}</h3>

                  {(onwer_price && onwer_price.clocktime != null && onwer_price.endclocktime != null) &&
                    (new Date(onwer_price.endclocktime) > Date.now()) ?
                    <>
                      <div className="text-center">
                        <badge className="badge badge-dark badge-timer my-3 badge_red">
                          <Countdown
                            date={new Date(onwer_price.endclocktime)}
                            autoStart={true}
                            onStart={() => new Date(onwer_price.clocktime)}
                            renderer={renderer}
                          >
                          </Countdown>
                          <i className="fas fa-fire ml-2"></i>
                        </badge>
                      </div>  </> : ('')}

                  <p className="info_des">{item.tokenDesc}</p>
                  {/* {item.unlockcontent} */}
                  {MyTokenDetail &&
                    MyTokenDetail.tokenOwner
                    &&
                    MyTokenDetail.tokenOwner == Wallet_Details.UserAccountAddr
                    &&
                    item.unlockcontent != ''
                    && <p className="info_des">
                       <ReactMarkdown children={unlockcontent} />
                    </p>}
                  <nav className="masonry_tab_nav items_tab_outer mt-4 mb-3">
                    <div className="nav nav-tabs masonry_tab primary_tab items_tab d-block items_tab_new pb-2 pl-2" id="nav-tab" role="tablist">
                      <a className="nav-link active" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="true"><div className="tab_head ">Info</div></a>
                      <a className="nav-link" id="owners-tab" data-toggle="tab" href="#owners" role="tab" aria-controls="active" aria-selected="false"><div className="tab_head">Owners</div></a>
                      <a className="nav-link" id="bid-tab" data-toggle="tab" href="#bid" role="tab" aria-controls="bid" aria-selected="false"><div className="tab_head">Bid</div></a>

                    </div>
                  </nav>
                  <div className="tab-content explore_tab_content mt-2" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
                      <div className="proposal_panel_overall">
                        <div className="inner_div_info">

                          {
                            item
                            && item.tokenowners_current
                            &&
                            <div className="media follow_media info_media">
                              <div className="info_media_img_div mr-3">

                                {item.tokenCreatorInfo.image[0] != '' ?
                                  <a href={item && item.tokenCreatorInfo && (item.tokenCreatorInfo.customurl[0] != "" ? `${config.Front_URL}/${item.tokenCreatorInfo.customurl[0]}` : `${config.Front_URL}/user/${item.tokenCreator}`)} title={`Creator : ${item.tokenCreatorInfo.name[0] != "" ? item.tokenCreatorInfo.name[0] : item.tokenCreator}`}>

                                    <img src={`${config.Back_URL}/images/${item.tokenCreatorInfo._id[0]}/${item.tokenCreatorInfo.image[0]}`} alt="Owner" className="img-fluid" />
                                  </a>
                                  :
                                  <a href={`${config.Front_URL}/user/${item.tokenCreator}`} title={`Owner : ${item.tokenCreator}`}>

                                    <Avatars item="img-fluid"></Avatars>
                                  </a>
                                }
                              </div>
                              <div className="media-body flex_body flex_body_blk_mob">
                                <div>
                                  <p className="mt-0 media_num">Creator</p>
                                  <p className="mt-0 media_text  mb-0" title={item.tokenCreatorInfo.name[0] != "" ? item.tokenCreatorInfo.name[0] : item.tokenCreator}>{item.tokenCreatorInfo.name[0] != "" ? item.tokenCreatorInfo.name[0] : String(item.tokenCreator).slice(0, 8).concat('...')}</p>

                                </div>
                                <div className="ml-2 ml-cus">
                                  <div className="card owner_card my-0 border-0">
                                    <div className="card-body p-2">
                                      <div className="flex_txt">
                                        <div className="media_num">{item.tokenRoyality}%</div>
                                        <p className="mb-0 price_1 ml-1"> Royalty to the Creator</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          }
                        </div>

                      </div>
                    </div>
                    <div className="tab-pane fade" id="owners" role="tabpanel" aria-labelledby="owners-tab">
                      <div className="proposal_panel_overall">
                        <div className="inner_div_info">
                          {tokenUsers && tokenUsers.length > 0 && tokenUsers.map((itemCur, i) => {
                            return (<div className="media follow_media info_media">
                              <div className="info_media_img_div mr-3">
                                {(itemCur && itemCur.tusers.image != '') ?
                                  <a href={itemCur
                                    && itemCur.tusers
                                    && itemCur.tusers.customurl != ""
                                    ? `${config.Front_URL}/${itemCur.tusers.customurl}`
                                    : `${config.Front_URL}/user/${itemCur.tusers.curraddress}`} title={`Owner : ${itemCur.tusers.name}`}>
                                    <img src={`${config.Back_URL}/images/${itemCur.tusers._id}/${itemCur.tusers.image}`} alt="Owner" className="img-fluid" />
                                  </a>
                                  :
                                  <a href={`${config.Front_URL}/user/${itemCur.tusers.curraddress}`} title={`Owner : ${itemCur.tusers.curraddress}`}>
                                    <Avatars item="img-fluid" />
                                 
                                  </a>
                                }

                              </div>
                              <div className="media-body flex_body">
                                <div>
                                  <p className="mt-0 media_num">Owned by</p>
                                  <p className="mt-0 media_text  mb-0">
                                    {
                                      (itemCur.tusers.name != ''
                                        ? itemCur.tusers.name
                                        :
                                        <span title={itemCur.tokenOwner}>{(itemCur.tokenOwner).slice(0, 8).concat('....')}</span>
                                      )
                                    }
                                  </p>

                                  {
                                    itemCur.tokenPrice > 0
                                    && <p className="mt-0 media_text mb-0">
                                      {itemCur.balance}/{itemCur.quantity} on sale for
                                      {token_usd(itemCur.tokenPrice,1)}
                                     {itemCur.CoinName}
                                      {/* ($
                                        {token_usd(itemCur.tokenPrice,(String(itemCur.CoinName).toLowerCase() != String(config.tokenSymbol).toLowerCase()) ? Wallet_Details.currency_usd_value:Wallet_Details.token_usd_value)}
                                      ) */}
                                      {itemCur.quantity > 0 && 'each'}</p>}
                                  {itemCur.tokenPrice <= 0
                                    && <p className="mt-0 media_text mb-0">
                                      {itemCur.balance}/{itemCur.quantity} Not for sale</p>}
                                  {
                                    itemCur.tokenPrice > 0
                                    && itemCur.balance > 0
                                    && itemCur.tokenOwner != Wallet_Details.UserAccountAddr &&
                                    <Button className="btn_outline_red ml-2 mb-2" onClick={() => PurchaseNowForwardRef.current.PurchaseNow_Click(item, itemCur)} >Buy Now</Button>
                                  }
                               
                                </div>

                              </div>
                            </div>)
                          })}
                        </div>

                      </div>
                    </div>



                    <div className="tab-pane fade" id="bid" role="tabpanel" aria-labelledby="bid-tab">
                      <div className="proposal_panel_overall">
                        <div className="inner_div_info">
                          {
                            Bids && Bids.pending && Bids.pending.length > 0 && Bids.pending.map((curBid) => {
                              //("curbid mapping ",curBid);
                              return (
                                <div className="media follow_media info_media">
                                  <div className="info_media_img_div mr-3">
                                    {curBid.bidUsers && <div className="img_prgo_re">
                                      <a href={curBid.bidUsers !== undefined && (curBid.bidUsers.customurl != "" ? `${config.Front_URL}/${curBid.bidUsers.customurl}` : `${config.Front_URL}/user/${curBid.tokenBidAddress}`)}>
                                        {
                                          curBid.bidUsers.image != "" && <img src={`${config.Back_URL}/images/${curBid.bidUsers._id}/${curBid.bidUsers.image}`} alt="User" className="img-fluid" />

                                        }
                                        {
                                          curBid.bidUsers.image == "" &&

                                          <Avatars item="img-fluid" />

                                        }
                                      </a>
                                    </div>}
                                  </div>
                                  <div className="media-body flex_body">
                                    <div>
                                      <p className="mt-0 media_num mt-0 word_break_all">
                                        {token_usd(curBid.tokenBidAmt,1)}
                                       
                                        {curBid.CoinName}<> </>
                                        {/* ($                                         {token_usd(curBid.tokenBidAmt,Wallet_Details.token_usd_value)} ) */}

                                       
                                         by   <span title={curBid.bidUsers !== undefined && (curBid.bidUsers.name != "" ? curBid.bidUsers.name : curBid.tokenBidAddress)}>{curBid.bidUsers !== undefined && (curBid.bidUsers.name != "" ? curBid.bidUsers.name : <span className="word_brak_txt">{curBid.tokenBidAddress}</span>)}</span> {AllowedQuantity > 0 && (<span>for {curBid.pending}/{curBid.NoOfToken} edition</span>)}</p>
                                      <p className="my-0 media_text">{moment(curBid.timestamp).format('MMMM Do YYYY, h:mm a')}</p>

                                      {Wallet_Details.UserAccountAddr
                                        && Wallet_Details.UserAccountAddr != curBid.tokenBidAddress
                                        && item
                                        && item.tokenowners_current
                                        && item.tokenowners_current.findIndex(e => e.tokenOwner == Wallet_Details.UserAccountAddr) > -1
                                        &&
                                        <div className="ml-2 ml-cus">
                                          {item
                                           
                                            && onwer_price.clocktime != null
                                            && onwer_price.endclocktime != null
                                            && (new Date(onwer_price.endclocktime) > Date.now()) ?
                                            (<Button className="primary_btn mb-2">You Can't Accept The Bid Until Auction Complete</Button>) :

                                            <Button className="primary_btn mb-2" onClick={() => PlaceABidForwardRef.current.AcceptBid_Select(item, curBid)}>Accept</Button>

                                          }    </div>
                                      }

                                      {Wallet_Details.UserAccountAddr
                                        && Wallet_Details.UserAccountAddr == curBid.tokenBidAddress
                                        && item
                                        && item.tokenBid == true
                                        &&
                                        <Button className="create_btn  ml-1 mb-2" onClick={() => PlaceABidForwardRef.current.CancelBid_Select(item,curBid)}>Cancel</Button>
                                      }
                                    </div>
                                  </div>
                                </div>
                              )
                            })}</div>
                      </div>
                    </div>
                  </div>
                  <div className="card info_big_card mb-0">
                    <div className="card-body">
                      {(Bids.highestBid && Bids.highestBid.tokenBidAmt > 0) &&
                        <>
                          <div className="media follow_media">
                            <div className="info_media_img_div mr-3">

                              {Bids.highestBid.bidUsers && Bids.highestBid.bidUsers.image != ""
                                &&
                                <img src={`${config.Back_URL}/images/${Bids.highestBid.bidUsers._id}/${Bids.highestBid.bidUsers.image}`} alt="User" className="img-fluid" />}

                              {
                                Bids.highestBid.bidUsers && Bids.highestBid.bidUsers.image == "" &&

                                <Avatars item="img-fluid" />}


                            </div>
                            <div className="media-body flex_body">
                              <div>
                                <p className="mt-0 media_text_big_1">Highest bid by <span className="text_blk" title={(Bids.highestBid.bidBy && Bids.highestBid.bidBy.name) ? Bids.highestBid.bidBy.name : (Bids.highestBid.tokenBidAddress)}>
                                  {(Bids.highestBid && Bids.highestBid.bidUsers && Bids.highestBid.bidUsers.name) ? Bids.highestBid.bidUsers.name : (Bids.highestBid.tokenBidAddress).slice(0, 8).concat('....')}
                                </span></p>
                                <p className="mt-0 mb-0 media_text_big_2">
                                  {token_usd( Bids.highestBid.tokenBidAmt,1)}
                                
                                  {" " + Bids.highestBid.CoinName}
                                  {/* ($                                   {token_usd( Bids.highestBid.tokenBidAmt,Wallet_Details.token_usd_value)} */}
)
                                  <span className="text_blk">


                                  </span></p>
                              </div>


                            </div>
                          </div></>}

                      <div className="mt-3 text-center">
                        {
                          BuyOwnerDetailFirst
                          && BuyOwnerDetailFirst.tokenOwner != Wallet_Details.UserAccountAddr
                          && BuyOwnerDetailFirst.tokenPrice > 0
                          && <Button className="create_btn mb-2" onClick={() => PurchaseNowForwardRef.current.PurchaseNow_Click(item, BuyOwnerDetailFirst)} >Buy Now</Button>}
                        {MyTokenDetail && MyTokenDetail.tokenOwner == Wallet_Details.UserAccountAddr && MyTokenDetail.tokenPrice > 0
                          ? <Button className="create_btn mb-2" onClick={() => CancelOrderForwardRef.current.CancelOrder_Click(item, token_owner_detail_first, MyTokenDetail)}>Cancel Order</Button>
                          :
                          MyTokenDetail
                          && MyTokenDetail.tokenOwner
                          && item
                        
                          && onwer_price.clocktime != null
                          && onwer_price.endclocktime != null
                          &&
                          ((new Date(item.endclocktime)) > (Date.now())) &&
                          <Button className="create_btn mb-2">
                            Auction Not Complete Yet
                          </Button>}
                          {/* {(Wallet_Details.UserAccountAddr != ""
										&& (item.tokenowners_current.tokenPrice ==0 )
										&& item.tokenowners_current.tokenOwner == Wallet_Details.UserAccountAddr) &&
										item.tokenowners_current.endclocktime != null &&
										new Date(item.tokenowners_current.endclocktime) < Date.now()&&
										<div className="dropdown-item" id={"editnotshow" + item.tokenCounts} onClick={() => PutOnSale_Click(item, item.tokenuser, item.tokenowners_current,'putonsale')}>
											<span> Put on sale</span>
										</div>
									} */}
                    
                        {
                          MyTokenDetail
                          && MyTokenDetail.tokenOwner
                          && (MyTokenDetail.tokenPrice == 0)
                          && item                       
                          && onwer_price.clocktime == null
                          && onwer_price.endclocktime == null
                          &&
                          <Button className="create_btn mb-2 ml-1"
                            onClick={() => PutOnSaleForwardRef.current.PutOnSale_Click(item, token_owner_detail_first, MyTokenDetail,'putonsale')}>
                            Put on Sale
                          </Button>
                        }
                         {
                          (item
                            && onwer_price.clocktime != null
                            && onwer_price.endclocktime != null
                            && (new Date(onwer_price.endclocktime) < Date.now()) ?
                            (
                              !isEmpty(Bids.highestBid) ?
                                (Bids && !isEmpty(Bids.highestBid) &&
                                  Wallet_Details.UserAccountAddr
                                  && Wallet_Details.UserAccountAddr != Bids.highestBid.tokenBidAddress
                                  && item
                                  && item.tokenowners_current
                                  && item.tokenowners_current.findIndex(e => e.tokenOwner == Wallet_Details.UserAccountAddr) > -1
                                  ?
                                  <Button className="btn_outline_red ml-2 mb-2" onClick={() => PlaceABidForwardRef.current.AcceptBid_Select(item, Bids.highestBid)}>
                                    Accept
                                  </Button>
                                  :
                                  <Button className="btn_outline_red ml-2 mb-2">
                                    Waiting for owner to accept the bid
                                  </Button>)
                                // <p className="btn_outline_red ml-2 mb-2">Waiting for owner to Accept</p>                     
                                :
                                <p className="btn_outline_red ml-2 mb-2">Timed auction ended</p>
                            )
                            :
                            // MyTokenBalance>0 ?
                            (AllowedQuantity > MyTokenBalance ?
                              Bids
                                && Bids.myBid
                                && !Bids.myBid.status
                                ?
                                <Button className="btn_outline_red ml-2 mb-2" onClick={() => PlaceABidForwardRef.current.PlaceABid_Click(item, onwer_price, Bids)}>
                                  Bid now
                                </Button>
                                :
                                Bids
                                && Bids.myBid
                                && Bids.myBid.status
                                && (Bids.myBid.status == 'pending' ?
                                  <Button className="btn_outline_red ml-2 mb-2" onClick={() => PlaceABidForwardRef.current.PlaceABid_Click(item, onwer_price, Bids)}>
                                    Edit a bid
                                  </Button>
                                  :
                                  Bids
                                  && Bids.myBid
                                  && Bids.myBid.status
                                  && Bids.myBid.status == 'partiallyCompleted'
                                  &&
                                  <Button className="btn_outline_red ml-2 mb-2" onClick={() => PlaceABidForwardRef.current.CancelBid_Select(item,Bids.myBid)}>
                                    Cancel a bid
                                  </Button>)
                              : ''))

                        }

                      </div>
                      {(onwer_price.tokenPrice > 0) &&
                        <p className="mt-0 media_text_big_1 text-center">Service fee {Wallet_Details.buyerfee / config.decimalvalues}%,
                                  {token_usd(onwer_price.tokenPrice,1)}
                        
                          {onwer_price.CoinName}
{/* 
                          <>($ 
                            {token_usd(onwer_price.tokenPrice,String(onwer_price.CoinName).toLowerCase() == String(config.currencySymbol).toLowerCase()) ? Wallet_Details.currency_usd_value:Wallet_Details.token_usd_value}
                          
                         )</> */}
                        </p>}
                    </div>
                  </div>
                  {/* {"currency_usd_value",Wallet_Details.currency_usd_value} */}
                </div>

              </div>
            </div>
            {/* end info row */}


          </div>
          <Footer />
        </>
      </div>)
  );
}
