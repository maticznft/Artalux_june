/**
 * FILE		   	:	  HOME
 * DISPATCH		:	  NIL
 * METHOD   	:   
 * C-DATE   	:   26_01_22
 * S-DATE   	:   26-01-22
*/

import React, { useEffect, useState, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Button } from "@material-ui/core";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactHtmlParser from 'react-html-parser';

import { useSelector, useDispatch } from 'react-redux'

// FILES
import { Account_Connect } from "actions/redux/action";
import TokenCard from '../views/separate/TokenCard'
import axios from 'axios';
import config from '../lib/config';
import {
  CollectiblesList_Home,
  NewCollectiblesList_Home,
  topCreatorsApi
} from '../actions/v1/token';
import { CancelOrderRef } from './separate/CancelOrderRef';
import { LikeRef } from './separate/LikeRef';
import { BurnRef } from './separate/BurnRef';
import { PutOnSaleRef } from './separate/PutOnSaleRef';
import { PurchaseNowRef } from './separate/PurchaseNowRef';
import { ReportNowRef } from './separate/ReportNowRef';
import { ShareNowRef } from './separate/ShareNowRef';
import { getcmslistinhome, getpromotion } from '../actions/v1/report'
import isEmpty from '../lib/isEmpty'
import Avatars from "./Avatar";



let toasterOption = config.toasterOption;
const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function Home(props) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1

  };

  var state = {
    responsive: {
      0: {
        items: 1,
      },
      575: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },

    responsiveone: {
      0: {
        items: 1,
      },
      575: {
        items: 1,
      },
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },


  };

  const classes = useStyles();
  const history = useHistory();
  const Wallet_Details = useSelector(state => state.wallet_connect_context);
  const dispatch = useDispatch();
  const { ...rest } = props;
  var PutOnSaleForwardRef = useRef();
  var PurchaseNowForwardRef = useRef();
  var BurnForwardRef = useRef();
  var CancelOrderForwardRef = useRef();
  var ReportForwardRef = useRef();
  var LikeForwardRef = useRef();
  var ShareForwardRef = useRef();
  var PlaceABidForwardRef = useRef();
  const [topcreatorsection, settopcreatorsection] = React.useState([]);
  const [LikedTokenList, setLikedTokenList] = useState([]);
  const [Categorylist, setCategorylist] = useState([]);
  const [TokenList, setTokenList] = useState([]);
  const [CatName, setCatName] = useState('All');
  const [CatBasedTokenList, setCatBasedTokenList] = useState({ 'loader': false, 'All': { page: 1, list: [], onmore: true } });
  const [Page, setPage] = useState(1);
  const [tokenCounts, Set_tokenCounts] = useState(0);
  const [tokenCounts_Detail, Set_tokenCounts_Detail] = useState({});
  const [MyTokenBalance, Set_MyTokenBalance] = useState(0);
  const [Bids, Set_Bids] = useState([]);
  const [AccepBidSelect, Set_AccepBidSelect] = useState(0);
  const [tokenBidAmt, Set_tokenBidAmt] = useState(0);
  const [NoOfToken, Set_NoOfToken] = useState(1);
  const [ValidateError, Set_ValidateError] = useState({});
  const [TokenBalance, Set_TokenBalance] = useState(0);
  const [YouWillPay, Set_YouWillPay] = useState(0);
  const [YouWillPayFee, Set_YouWillPayFee] = useState(0);
  const [YouWillGet, Set_YouWillGet] = useState(0);
  const [BidApply_ApproveCallStatus, Set_BidApply_ApproveCallStatus] = useState('init');
  const [BidApply_SignCallStatus, Set_BidApply_SignCallStatus] = useState('init');
  const [AllowedQuantity, Set_AllowedQuantity] = useState({});
  const [Time_Auction_List, Set_Time_Auction_List] = useState([]);
  const [Recent_Nft_List, Set_Recent_Nft_List] = useState([]);
  const [Promotion_List, Set_Promotion_list] = useState([])
  const [Creatorcount, setCreatorcount] = useState(0);
  const [BuyOwnerDetailFirst, Set_BuyOwnerDetailFirst] = useState({});
  const [MyTokenDetail, Set_MyTokenDetail] = useState({});
  const [getcmslistinhome1, setgetcmslistinhome1] = useState({})
  const [getcmslistinhome12, setgetcmslistinhome12] = useState({})
  const [TopSaleValue, setTopSaleValue] = useState({})
  const [home_special_category, set_home_special_category] = useState([])

  useEffect(() => {
    getInit();
  }, [])

  const Refresh_page = (payload) => {
    ////("playload",Wallet_Details,payload)
    ////("playload",payload)
    setTokenList([])
    CatBasedTokenList['All'].list = [];
    setCatBasedTokenList(CatBasedTokenList);
    Set_Time_Auction_List([])
    TokenListCall(payload.explore);
  }

  const getcmslistinhomes = async () => {
    var reqdata = {
      load: 'home'
    }
    var convers = await getcmslistinhome(reqdata);
    if (convers && convers.data) {
      setgetcmslistinhome1(convers.data)
    }
  }
  const getcmslistinhomes1 = async () => {
    var reqdata = {
      load: 'tophome'
    }
    var convers = await getcmslistinhome(reqdata);
    if (convers && convers.data) {
      setgetcmslistinhome12(convers.data)
    }
  }
  const promotionData = async () => {
    var test = await getpromotion();
    if (test && test.userValue) {
      console.log("promo data",test.userValue)
      Set_Promotion_list(test.userValue)
    }
  }



  async function getInit() {
    getcmslistinhomes();
    getcmslistinhomes1();
    promotionData();
    CategoryListCall();
    TokenListCall();
    topCreatorsFUnc();
    timeAuctionFUnc();
    ourState();
    if (Wallet_Details.UserAccountAddr != "")
      LikeForwardRef && LikeForwardRef.current && LikeForwardRef.current.getLikesData();
    // ;}

  }

  const ourState = () => {
    axios.get(`${config.vUrl}/token/show/top`)
      .then((data) => {
        console.log("ourState",data)
        if(data && data.data)
            setTopSaleValue(data.data)
      })
      .catch((e) => {
        setTopSaleValue({})
      })
  }
  const topCreatorsFUnc = async () => {
    var topCraete = await topCreatorsApi();
    if (topCraete && topCraete.data && topCraete.data.length > 0) {
      settopcreatorsection(topCraete.data)
    }
  }

  const timeAuctionFUnc = async () => {
    var currAddr = Wallet_Details.UserAccountAddr;
    var payload = {
      limit: 6, from: 'Time', currAddr: currAddr
    }
    var resp = await CollectiblesList_Home(payload);
    if (resp && resp.data && resp.data.from == 'time-auction-token-collectibles-list-home' && resp.data.list && resp.data.list.length > 0) {
      Set_Time_Auction_List(resp.data.list)
    }
    else {
      Set_Time_Auction_List([])
    }
  }
  const recentNftFUnc = async () => {
    var currAddr = Wallet_Details.UserAccountAddr

    var payload = {
      limit: 6, from: 'recent', currAddr: currAddr
    }
    var resp = await CollectiblesList_Home(payload);
    if (resp && resp.data && resp.data.from == 'recent-token-collectibles-list-home' && resp.data.list && ((resp.data.list).length != 0)) {
      Set_Recent_Nft_List(resp.data.list)
    }
    else {
      Set_Recent_Nft_List([])
    }
  }



  async function CategoryListCall() {
    axios
      .get(`${config.vUrl}/token/category/list`)
      .then(response => {
        if (response && response.data && response.data.list) {
          setCategorylist(response.data.list);
          var CatData = response.data.list.filter(item => {
            if (item.show == true)
              return item
          })
          set_home_special_category(CatData)
        }
      })
      .catch(e => console.log(e))
  }

  const onLoadMore = () => {
    CatBasedTokenList[CatName].page = CatBasedTokenList[CatName].page + 1;
    setCatBasedTokenList(CatBasedTokenList);

    TokenListCall({
      page: CatBasedTokenList[CatName].page + 1
    });
  }

  async function catChange(name) {
    if (name != CatName) {
      setCatName(name);
      if (typeof CatBasedTokenList[name] == 'undefined') {
        CatBasedTokenList[name] = { page: 1, list: [], onmore: true };
        setCatBasedTokenList(CatBasedTokenList);
        TokenListCall({ CatName: name, page: 1 });
      }
    }
  }



  async function TokenListCall(data = {}) {
    var currAddr = Wallet_Details.UserAccountAddr
    var name = CatName;
    if (data.CatName) {
      name = data.CatName
    }
    var payload = {
      limit: 6,
      page: (CatBasedTokenList[name] && CatBasedTokenList[name].page) ? CatBasedTokenList[name].page : 1,
      currAddr: currAddr,
      CatName: name,
      from: 'Home',
    }
    CatBasedTokenList.loader = true;
    setCatBasedTokenList(CatBasedTokenList);
    var resp = await CollectiblesList_Home(payload);
    CatBasedTokenList.loader = false;
    setCatBasedTokenList(CatBasedTokenList);

    if (resp && resp.data && resp.data.from == 'token-collectibles-list-home' && resp.data.list && resp.data.list.length > 0) {
      setTokenList(TokenList.concat(resp.data.list));
      setCreatorcount(resp.data.list.length);
      if (typeof CatBasedTokenList[name] == 'undefined') {
        CatBasedTokenList[name] = { page: 1, list: [] };
      }
      CatBasedTokenList[name].list = CatBasedTokenList[name].list.concat(resp.data.list);
      setCatBasedTokenList([]);
      setCatBasedTokenList(CatBasedTokenList);
    }
    else {
      CatBasedTokenList[name].onmore = false;
      setCatBasedTokenList([]);
      setCatBasedTokenList(CatBasedTokenList);
    }
  }






  return (



    <div className="home_header">
      <PurchaseNowRef
        ref={PurchaseNowForwardRef}
      />
      <PutOnSaleRef
        ref={PutOnSaleForwardRef}
        Refresh_page={Refresh_page}
      />
      <BurnRef
        ref={BurnForwardRef}
        Refresh_page={Refresh_page}
      />
      <CancelOrderRef
        ref={CancelOrderForwardRef}
        Refresh_page={Refresh_page}
      />
      <ReportNowRef
        ref={ReportForwardRef}
      />
      <LikeRef
        ref={LikeForwardRef}
        setLikedTokenList={setLikedTokenList}
      />
      <ShareNowRef
        ref={ShareForwardRef}
      />
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={<Link to="/">
          <img src={require("../assets/images/logo.svg")} alt="logo" className="img-fluid" /></Link>}
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 20,
          color: "white"
        }}
        {...rest}
      />
      <section className="body-top">
        {/* {////("Promotion_List",Promotion_List)} */}
        {Promotion_List.length == 0 ?
          <div className="container banner_sec_row_car">
            <OwlCarousel items={3}
              className="owl-theme"
              nav={true}
              margin={20} autoplay={false} responsive={state.responsiveone} dots={false}>
              <div className="row banner_sec_row">
                <div className="col-md-6">

                  <h1 className="banner-head mt-5">The first official NFT marketplace covered by real assets</h1>
                
{/* <p className="banner-parg">Retro-sci Fi Walk</p>
<p className="banner-start">Start from</p>
<p className="banner-two">2.00BNB <span>($30.570)</span></p> */}
                  <> {ReactHtmlParser(getcmslistinhome1.answer)}</>
                  {/* <button className="placeabid" onClick={() => {
                    document
                      .getElementById("explore")
                      .scrollIntoView({ behavior: "smooth" });
                  }} >Explore All</button> */}
                  <Link to="/explore/All">
                    <button className="placeabid"  >Explore All</button>
                  </Link>
                  <button className="viewitem" onClick={() => {
                    document
                      .getElementById("hotcollections")
                      .scrollIntoView({ behavior: "smooth" });
                  }}>View Item</button>


                </div>
                <div className="col-md-6">
                  <div className="banenrimage">
                    <img src={require("../assets/images/banner-image.png")} alt="logo" className="img-fluid" />
                  </div>

                </div>
              </div>

              <div className="row banner_sec_row">
                <div className="col-md-6">
                <h1 className="banner-head mt-5">The first official NFT marketplace covered by real assets</h1>
                  {/* 
                  <h1 className="banner-head mt-5">Find your own Extraordinary NFT</h1>
<p className="banner-parg">Retro-sci Fi Walk</p>
<p className="banner-start">Start from</p>
<p className="banner-two">2.00BNB <span>($30.570)</span></p> */}
                  <> {ReactHtmlParser(getcmslistinhome1.answer)}</>
                  <button className="placeabid" onClick={() => {
                    document
                      .getElementById("explore")
                      .scrollIntoView({ behavior: "smooth" });
                  }} >Explore All</button>
                  <button className="viewitem" onClick={() => {
                    document
                      .getElementById("hotcollections")
                      .scrollIntoView({ behavior: "smooth" });
                  }}>View Item</button>


                </div>
                <div className="col-md-6">
                  <div className="banenrimage">
                    <img src={require("../assets/images/banner-image.png")} alt="logo" className="img-fluid" />
                  </div>

                </div>
              </div>

              <div className="row banner_sec_row">
                <div className="col-md-6">
                <h1 className="banner-head mt-5">The first official NFT marketplace covered by real assets</h1>
                  {/* <h1 className="banner-head mt-5">Find your own Extraordinary NFT</h1>
<p className="banner-parg">Retro-sci Fi Walk</p>
<p className="banner-start">Start from</p>
<p className="banner-two">2.00BNB <span>($30.570)</span></p> */}
                  <> {ReactHtmlParser(getcmslistinhome1.answer)}</>
                  <button className="placeabid" onClick={() => {
                    document
                      .getElementById("explore")
                      .scrollIntoView({ behavior: "smooth" });
                  }} >Explore All</button>
                  <button className="viewitem" onClick={() => {
                    document
                      .getElementById("hotcollections")
                      .scrollIntoView({ behavior: "smooth" });
                  }}>View Item</button>


                </div>
                <div className="col-md-6">
                  <div className="banenrimage">
                    <img src={require("../assets/images/banner-image.png")} alt="logo" className="img-fluid" />
                  </div>

                </div>
              </div>
            </OwlCarousel>
          </div>
          :
          <div className="container banner_sec_row_car">
            <OwlCarousel
              //  items={3}
              className="owl-theme"
              nav={true}
              margin={20} autoplay={false} responsive={state.responsiveone} dots={false}>
              {Promotion_List.map((Promotion_List) => {
                return (
                  <div className="row banner_sec_row" key={Math.random()}>
                    <div className="col-md-6">

                      <h1 className="banner-head mt-5">{Promotion_List.tokenName}</h1>
                      <p className="banner-parg">{Promotion_List.tokenDesc}</p>
                      {Promotion_List.endclocktime != null ?
                        <>
                          <p className="banner-start">Timed Auction Start from</p>
                          <p className="banner-two">{Promotion_List.minimumBid}<span>{Promotion_List.CoinName}</span></p>

                        </>
                        :
                        ((Promotion_List.tokenPrice > 0) ?
                          <>
                            <p className="banner-start">SaleStart from</p>
                            <p className="banner-two">{Promotion_List.tokenPrice}<span>{Promotion_List.CoinName}</span></p>

                          </>
                          :
                          <>
                            <>
                              <p className="banner-start">Open For Bid</p>

                            </>
                          </>
                        )
                      }
                      <button className="placeabid"><Link to={"/info/" + Promotion_List.tokenOwner + '/' + Promotion_List.contractAddress + '/' + Promotion_List.tokenCounts}>Place Bid</Link></button>
                      <button className="viewitem"><Link to={"/info/" + Promotion_List.tokenOwner + '/' + Promotion_List.contractAddress + '/' + Promotion_List.tokenCounts}>View Item</Link></button>


                    </div>
                    <div className="col-md-6">
                      <div className="banenrimage">
                        <Link to={"/info/" + Promotion_List.tokenOwner + '/' + Promotion_List.contractAddress + '/' + Promotion_List.tokenCounts}>
                          <> {
                            String(Promotion_List.additionalImage).includes('.mp4') &&
                            <video
                              id="my-video"
                              className="img-fluid"
                              alt="video"
                              autoPlay playsInline loop
                              preload="auto"

                            >
                              <source
                                src={(Promotion_List.additionalImage == "" ? `${config.Back_URL}/nftImg/${Promotion_List.tokenCreator}/${Promotion_List.additionalImage}` : `${config.Back_URL}/compressedImage/${Promotion_List.tokenCreator}/${Promotion_List.image}`)}
                                type="video/mp4" />
                            </video>}

                            {
                              String(Promotion_List.additionalImage).includes('.mp3') &&
                              <>
                                <img src={Promotion_List.thumb
                                                      ? `${config.Back_URL}/Thumb_compressedImage/${Promotion_List.tokenCreator}/${Promotion_List.thumb}`
                                                      : `${config.Back_URL}/Thumb_nftImg/${Promotion_List.tokenCreator}/${Promotion_List.thumb_additionalImage}`} className="img-fluid" />
                                <audio controls controlsList="nodownload"
                                  playsInline loop hidden
                                  type="audio/mp3"
                                  autostart="off"
                                  src={(Promotion_List.additionalImage != "" ? `${config.Back_URL}/nftImg/${Promotion_List.tokenCreator}/${Promotion_List.additionalImage}` : `${config.Back_URL}/compressedImage/${Promotion_List.tokenCreator}/${Promotion_List.image}`)}

                                >
                                </audio>
                              </>
                            }

                            {
                              String(Promotion_List.additionalImage).includes('.webp')
                              &&
                              <img
                                src={(Promotion_List.additionalImage != "" ? `${config.Back_URL}/nftImg/${Promotion_List.tokenCreator}/${Promotion_List.additionalImage}` : `${config.Back_URL}/compressedImage/${Promotion_List.tokenCreator}/${Promotion_List.image}`)}
                                alt="Collections" className="img-fluid " />
                            }

                          </>
                        </Link>
                      </div>

                    </div>
                  </div>
                )
              })}
            </OwlCarousel>
          </div>}
      </section>
      <div>
        <div className="blureone1"></div>



        <section className="statss pb-5 pt-0">
          <div className="container">
            <div className="statscontent">
              <h2>Our Stats</h2>
              <div className="statsborder statborderone">
                <div className="row">
                  <div className="col-lg-3 col-xl-3 col-sm-6 col-md-6 col-12 pb-sm-3">
                    <div className="statstext">
                      {/* <h2>{TopSaleValue && TopSaleValue.totalNft  && TopSaleValue.totalNft.users_count && TopSaleValue.totalNft.users_count}</h2> */}
                      <h2>{(TopSaleValue && TopSaleValue.totalNft && TopSaleValue.totalNft.length > 0 )?TopSaleValue.totalNft[0].users_count:0}</h2>
                      <p>Total Collections</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-xl-3 col-sm-6 col-md-6 col-12 pb-sm-3">
                    <div className="statstext">
                      <h2>{TopSaleValue && TopSaleValue.totalUsers && TopSaleValue.totalUsers}</h2>
                      <p>Total Users</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-xl-3 col-sm-6 col-md-6 col-12 pb-sm-3">
                    <div className="statstext">
                      <h2>$ {Number(Wallet_Details.currency_usd_value).toFixed(2)}</h2>
                      <p>Current {config.currencySymbol} Value in USD</p> 
                    </div>
                  </div>
                  <div className="col-lg-3 col-xl-3 col-sm-6 col-md-6 col-12 pb-sm-3">
                    <div className="statstext">
                      <h2>$ {Number(Wallet_Details.token_usd_value).toFixed(2)}</h2>
                      <p>Current {config.tokenSymbol} Value in USD</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </section>
        <div className="blureone2"></div>
      </div>
      <div>
        <div className="blureone"></div>

        {topcreatorsection.length == 0 ? '' :
          <section className="topcreation">
            <div className="container">
              <div className="topcreationlist">
                <h2>Top Creators</h2>
              </div>
              <div className="topcreation_image pt-5 justify-content-center row">
                {topcreatorsection.map((item) => {
                  return <div className="createflex col-12 col-md-6 col-lg-4 col-xl-3" key={Math.random()}>
                    <div className="imagecreate" onClick={() => history.push(item.customurl == "" ? '/user/' + item.curraddress : '/' + item.customurl)}>

                      {item.image != "" ?
                        <img src={`${config.Back_URL}/images/${item._id}/${item.image}`} alt="logo" className="img-fluid rounded-circle" />
                        :
                        <Avatars item='img-fluid rounded-circle' />}
                    </div>
                    <div className="createtext">
                      <h2 title={"Top Creator : " + (item.name != "" ? item.name : item.curraddress)}>{item.name != "" ? item.name : String(item.curraddress).toLowerCase().slice(0, 10).concat("...")}</h2>
                      <p>{item.count} Collections</p>
                    </div>
                  </div>
                })}

              </div>
            </div>
          </section>
        }


      </div>


      {/* <section className="navtabs pb-5 tabsheight" id="explore">
        <div className="container">
          <div className="topcreationlist">
            <h2>Explore</h2>
          </div>
          <div className="d-flex align-items-center overflow-hidden mt-5 flex_block_mob justify-content-center">

            <nav className="masonry_tab_nav items_tab_outer">
              <div className="nav nav-tabs masonry_tab primary_tab items_tab  items_tab_new pb-2 pl-2" id="nav-tab" role="tablist">
                <a className="nav-link active" onClick={() => catChange('All')} id="collectibles-tab" data-toggle="tab" href="#collectibles" role="tab" aria-controls="collectibles" aria-selected="false">
                  All items
                </a>
                {
                  Categorylist.map((item) => {
                    return (
                      <a className="nav-link" onClick={() => catChange(item.name)} data-tabname={item.name} id={item.name + "tab"} data-toggle="tab" role="tab" aria-controls="all" aria-selected="true" key={Math.random()}> {item.name}</a>
                    )
                  })
                }
              </div>
            </nav>
          </div>
          <div className="tab-content explore_tab_content mt-0" id="nav-tabContent">
            <div className="tab-pane fade show active" id="collectibles" role="tabpanel" aria-labelledby="collectibles-tab">
              <div className="mt-3">
                <div className=" m-0">
                  <div className="row">

                    {
                      (CatBasedTokenList && CatName && CatBasedTokenList[CatName] && CatBasedTokenList[CatName].list && CatBasedTokenList[CatName].list.length > 0) ? (CatBasedTokenList[CatName].list.map((item) => {
                        return (
                          <div className="col-lg-4 col-xl-3 col-sm-6 col-md-6 col-12" key={Math.random()}>
                            <TokenCard
                              item={item}
                              LikedTokenList={LikedTokenList}
                              hitLike={LikeForwardRef.current && LikeForwardRef.current.hitLike}
                              PutOnSale_Click={PutOnSaleForwardRef.current && PutOnSaleForwardRef.current.PutOnSale_Click}
                              PurchaseNow_Click={PurchaseNowForwardRef.current && PurchaseNowForwardRef.current.PurchaseNow_Click}
                              Burn_Click={BurnForwardRef.current && BurnForwardRef.current.Burn_Click}
                              CancelOrder_Click={CancelOrderForwardRef.current && CancelOrderForwardRef.current.CancelOrder_Click}
                              SubmitReport_Click={ReportForwardRef.current && ReportForwardRef.current.SubmitReport_Click}
                              ShareSocial_Click={ShareForwardRef.current && ShareForwardRef.current.ShareSocial_Click}
                            />
                          </div>
                        )
                      })) :

                        <div className="text-center py-5 col-12">
                          <div className="text-center py-3  no_items_row">
                            <p className="not_found_text">No items found</p>
                            <p className="not_found_text_sub">Come back soon!</p>
                            <div className="mt-3">
                            </div>
                          </div>
                        </div>
                    }



                  </div></div>
              </div>

            </div>
            {
              (CatBasedTokenList && CatBasedTokenList.loader == false && CatBasedTokenList[CatName] && CatBasedTokenList[CatName].onmore == true) ? (
                <div className="text-center mt-4 w-100 ">
                  {(CatBasedTokenList.loader == true) ? <i className="fa fa-spinner spinner_icon spinner_red" aria-hidden="true" id="spin"></i> : ('')}
                  <div id="spinBut">
                    <Button className="create_btn create_newbtnload mt-3 mx-auto btn-block" id="onmore" onClick={onLoadMore} style={{ display: "flex" }}>
                      Load More
                    </Button>
                  </div>
                </div>) : ('')}
          </div>



        </div>
      </section> */}
      {home_special_category.length == 0 ? '' :
        <section className="liveauction carousel-nav" id="hotcollections">
          <div className="blureone"></div>
          <div className="container">
            <div className="mt-3">
              <div className="">
                <div className="">
                  <div className="">
                    <div className="topcreationlist">
                      <h2>Categories</h2>

                    </div>
                    <div className="hotcollectionflex pt-5 pb-5">
                      <div className="row">
                        {home_special_category.map((item) => {
                          return <div className="col-lg-4 col-xl-3 col-sm-6 col-md-6 col-12" onClick={() => history.push("/explore/" + item.name)} key={Math.random()}>
                            <div className="hotcollection">
                              <div className="collectionsimages">
                                <img src={item.image == "" ? require('../assets/images/loader.png') : config.Back_URL + '/admin/category/' + item._id + '/' + item.image} alt="logo" className="img-fluid" />
                                <h2>{item.name}</h2>
                              </div>
                            </div>
                          </div>
                        })}
                      </div>

                    </div>

                    <div className=" masonry m-0">


                    </div>

                  </div>

                </div>
              </div>


            </div>

          </div>
        </section>}
      <section className="wallets_segment">
        <div className="container">
          <div className="blureone1"></div>
          <div className="walletlist">
            <h2>Wallet Supports</h2>
            <div className="row justify-content-center wallet-width m-auto">
              <div className="col-lg-4 col-6 col-md-4 col-sm-3">
                <img src={require("../assets/images/wallet_01.png")} alt="binance wallet" />
              </div>
              <div className="col-lg-4 col-6 col-md-4 col-sm-3 mb-md-4 mb-4">
                <img src={require("../assets/images/wallet-6.png")} alt="metamask wallet" />
              </div>
              <div className="col-lg-4 col-6 col-md-4 col-sm-3 mb-md-4 mb-4">
                <img src={require("../assets/images/binance.png")} alt="wallet wallet" />
              </div>
              {/* <div className="col-lg-2 col-6 col-md-4 col-sm-3 mb-md-4 mb-4">
                <img src={require("../assets/images/wallet_06.png")} alt="coin98 wallet" />
              </div>
              <div className="col-lg-2 col-6 col-md-4 col-sm-3 mb-md-4">
                <img src={require("../assets/images/math.png")} alt="math wallet" />
              </div>
              <div className="col-lg-2 col-6 col-md-4 col-sm-3 mb-md-4">
                <img src={require("../assets/images/paypal.png")} alt="paypal wallet" />
              </div>
              <div className="col-lg-2 col-6 col-md-4 col-sm-3 ">
                <img src={require("../assets/images/safepal.png")} alt="safepal wallet" />
              </div> */}
            </div>
          </div>
          <div className="blureone2"></div>
        </div>
      </section>
      {/* <section className="mb-0 wal_sec pb-5 walletsupports">
<img src={require("../assets/images/walletbanner.png")} alt="Wallet" className="img-fluid bg_wal_ban" />

<div className="container">
<div className="row">
<div className="col-12 col-md-6 col-lg-6">
<div className="card black_card_big">
<div className="card-body">
<h2 className="heading_white_main mt-3">Wallets Support</h2>
<GridContainer className="mt-5">
<GridItem md={3} sm={4} className="text-center mb-4 mr-md-0 pl-sm-0">
<img src={require("../assets/images/wallet_01.png")} alt="Wallet" className="wallet_img" />
</GridItem>

<GridItem md={3} sm={4} className="text-center mb-4">
<img src={require("../assets/images/wallet-6.png")} alt="Wallet" className="wallet_img" />
</GridItem>



</GridContainer>
</div>
</div>

</div>
<div className="col-12 col-md-6">

</div>
</div>

</div>
</section> */}
      <Footer />

    </div>


  );

  
}
