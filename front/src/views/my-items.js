/**
 * FILE		   	:	  My-items
 * DISPATCH		:	  NIL
 * METHOD   	:   
 * C-DATE   	:   26_01_22
 * S-DATE   	:   26-01-22
*/

import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { useSelector } from "react-redux";
// myside
import CopyToClipboard from "react-copy-to-clipboard";
import moment from 'moment'
import {
  Link,
  useParams,
  useHistory
} from "react-router-dom";
import isEmpty from "lib/isEmpty";
import {
  getprofile,
  getFollowers,
  followUnfollow,
  checkFollower,
  changeReceiptStatus_Action,
  ParamAccountAddr_Detail_Get,
  coverimagevalidations,
  coverImage,
} from '../actions/v1/user';
import Web3 from 'web3';
import config from '../lib/config';
import Avatars from './Avatar';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share'
import Modal from 'react-modal'
import {
  CollectiblesList_MyItems,
  getNFTDetails,
  getNftCollectionData

} from '../actions/v1/token';
import { ActivityCall } from "../actions/v1/report";
import { LikeRef } from './separate/LikeRef';
import { PutOnSaleRef } from './separate/PutOnSaleRef';
import { PurchaseNowRef } from './separate/PurchaseNowRef';
import ActivityCard from "./separate/activityTab";
import Banner from "../assets/images/banner.jpg";
import ConnectWallet from './separate/Connect-Wallet';
import TokenCard from './separate/TokenCard';
import { BurnRef } from './separate/BurnRef';
import { CancelOrderRef } from './separate/CancelOrderRef';
import { ReportNowRef } from './separate/ReportNowRef';
import { ShareNowRef } from './separate/ShareNowRef';
import {  notificationStatusChange } from '../actions/v1/report';
import {toast} from 'react-toastify'
let toasterOption = config.toasterOption;
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
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function Myitems(props) {
  const Wallet_Details = useSelector(state => state.wallet_connect_context);

  const classes = useStyles();
  const { ...rest } = props;
  const history = useHistory();
  var LikeForwardRef = useRef();
  var PutOnSaleForwardRef = useRef();
  var PurchaseNowForwardRef = useRef();
  var BurnForwardRef = useRef();
  var CancelOrderForwardRef = useRef();
  var ReportForwardRef = useRef();
  var ShareForwardRef = useRef();
  var PlaceABidForwardRef = useRef();
  var { paramUsername, paramAddress, activity } = useParams();
  if (typeof paramUsername == 'undefined') { paramUsername = ''; }
  if (typeof paramAddress == 'undefined') { paramAddress = ''; }
  const [ParamAccountCustomUrl, Set_ParamAccountCustomUrl] = React.useState(paramUsername);
  const [ParamAccountAddr, Set_ParamAccountAddr] = React.useState(paramAddress);
  const [UserNotFound, Set_UserNotFound] = React.useState(false);
  const [showingLoader, setshowingLoader] = React.useState(false);
  const [chooseimage, setchooseimage] = React.useState(false);
  const [validateError, setvalidateError] = React.useState({});
  const [followButton, setFollowButton] = useState('Follow')
  const [MyItemAccountAddr, Set_MyItemAccountAddr] = React.useState('');
  const [MyItemAccountAddr_Details, Set_MyItemAccountAddr_Details] = React.useState({});
  const [profile, setProfile] = useState({});
  const [coverimage, setcoverphoto] = React.useState(Banner);
  const [HitItem, Set_HitItem] = useState({});
  const [LikedTokenList, setLikedTokenList] = React.useState([]);
  const [OnSale_Count, Set_OnSale_Count] = useState(0);
  const [OnSale_List, Set_OnSale_List] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [Collectibles_Count, Set_Collectibles_Count] = useState(0);
  const [Collectibles_List, Set_Collectibles_List] = useState([]);

  const [Created_Count, Set_Created_Count] = useState(0);
  const [Created_List, Set_Created_List] = useState([]);

  const [Owned_Count, Set_Owned_Count] = useState(0);
  const [Owned_List, Set_Owned_List] = useState([]);

  const [Liked_Count, Set_Liked_Count] = useState(0);
  const [Liked_List, Set_Liked_List] = useState([]);

  const [Burned_Count, Set_Burned_Count] = useState(0);
  const [Burned_List, Set_Burned_List] = useState([]);
  const [Service_Fee, set_Service_Fee] = useState(0);
  const [Wen_Bln, set_Wen_Bln] = useState(0);
  const [tokenCounts, Set_tokenCounts] = useState(0);
  const [item, Set_item] = useState({});
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
  const [BuyOwnerDetailFirst, Set_BuyOwnerDetailFirst] = useState({});
  const [MyTokenDetail, Set_MyTokenDetail] = useState({});
  const [providerss, set_providers] = useState(null)
  const [Activity_Item, Set_Activity_Item] = useState([])
  const [convertVal, setConvertVal] = React.useState(0);
  const [userCollection, setUserCollection] = useState({});
  const [UserCollectionCount,setUserCollectionCount]=useState(0)
 
  async function CorrectDataGet(Resp, Target) {
    var RetData = { count: 0, list: [] }
    if (
      Resp
      && Resp.data
      && Resp.data.Target
      && Resp.data.list
      && Resp.data.list[0]
    ) {
      if (Resp.data.Target == 'Count' && Resp.data.list[0].count) {
        RetData.count = Resp.data.list[0].count;
      }
      else if (Resp.data.Target == 'List' && Resp.data.list[0]) {
        RetData.list = Resp.data.list;
      }
    }
    if (
      Resp
      && Resp.data
      && Resp.data.Target
      && Resp.data.changeStatusList) {
      changeReceiptStatus_Call(Resp.data.changeStatusList);
    }
    return RetData;
  }

  async function changeReceiptStatus_Call(list) {
    var web3 = new Web3(providerss);
    list.map(async (item) => {
      if (item && typeof item.checkAdd != "undefined" && item.checkAdd.hashValue) {
        try {
          var data = await web3.eth.getTransactionReceipt(item.checkAdd.hashValue);
          var hashValue = item.checkAdd.hashValue;
          if (data == null) {
          } else {
            if (data.status == '0x0') {
            } else {
              var payload = {
                status: 'true',
                hashValue: hashValue
              }
              await changeReceiptStatus_Action(payload);
            }
          }
        }
        catch (err) {
        }
      }
    })
  }
  const copyText = (a, b) => {
    toast.success('Address Copied', toasterOption);

  }
  
  const Refresh_page = () => {
   

  }
  
  async function Tab_Click(TabName) {
    await Tab_Data_Call('List', TabName, true);
    await Tab_Data_Call('Count', TabName, true);
  }
  async function Tab_Data_Call(Target, TabName, init) {
  
    if (MyItemAccountAddr != "") {
      var ReqData = {
        Addr: MyItemAccountAddr,
        MyItemAccountAddr: MyItemAccountAddr,
        ParamAccountAddr: ParamAccountAddr,
        UserAccountAddr: Wallet_Details.UserAccountAddr,
        Target: Target,
        TabName: TabName,
        init: init,
        from: 'My-Items'
      };

      var Resp = {};
      Resp = await CollectiblesList_MyItems(ReqData);
      var RespNew = await CorrectDataGet(Resp);

      if (
        (Target == 'Count' && typeof RespNew.count != 'undefined')
        ||
        (Target == 'List' && RespNew.list)
      ) {
        if (TabName == 'collectibles') {
          if (Target == 'Count') { Set_Collectibles_Count(RespNew.count); }
          if (Target == 'List') { Set_Collectibles_List(RespNew.list); }
        }
        else if (TabName == 'onsale') {
          if (Target == 'Count') { Set_OnSale_Count(RespNew.count); }
          if (Target == 'List') { Set_OnSale_List(RespNew.list); }
        }
        else if (TabName == 'created') {
          //////////////("check vala", RespNew.count)
          //////////////("check vala", RespNew.list)
          if (Target == 'Count') { Set_Created_Count(RespNew.count); }
          if (Target == 'List') { Set_Created_List(RespNew.list); }
        }
        else if (TabName == 'owned') {
          if (Target == 'Count') { Set_Owned_Count(RespNew.count); }
          if (Target == 'List') { Set_Owned_List(RespNew.list); }
        }
        else if (TabName == 'liked') {
          if (Target == 'Count') { Set_Liked_Count(RespNew.count); }
          if (Target == 'List') { Set_Liked_List(RespNew.list); }
        }
      }
    }
    return true;
  }


  useEffect(() => {
    window.$('body').removeClass("modal-open")
    window.$('div').removeClass("modal-backdrop")
    getInit();
    
  }, [paramAddress,paramUsername,Wallet_Details.UserAccountAddr,ParamAccountCustomUrl,MyItemAccountAddr]);


  const Get_MyItemAccountAddr_Details = async (payload) => {
    if(Wallet_Details.UserAccountAddr!=""||paramAddress!=""){
    var Resp = await ParamAccountAddr_Detail_Get(payload);
     if (
      Resp
      && Resp.data
      && Resp.data.User
      && Resp.data.User.curraddress
    ) {
      Set_MyItemAccountAddr(Resp.data.User.curraddress);
      if (Resp.data.User) {
        Set_MyItemAccountAddr_Details(Resp.data.User);
        getProfileData(Resp.data.User.curraddress);
      }
    }
    else {
      toast.warning('User not found', toasterOption);
      Set_UserNotFound(true);
    }
  }
  }

  const getInit = async () => {
    var currAddr = Wallet_Details.UserAccountAddr;
    var payload = {}


    if (paramAddress != "" || paramUsername != "") {
      if (paramAddress && paramAddress.toString() === currAddr.toString()) {
        Set_MyItemAccountAddr(paramAddress);
        payload.addr = paramAddress
      }
      else {
        if (paramAddress != "") {

          payload.addr = paramAddress;
        }
        else if (paramUsername != "") {
          payload.customurl = paramUsername;
        }
      }
    }
    else {
      Set_MyItemAccountAddr(currAddr);
      payload.addr = currAddr
    }
    await Get_MyItemAccountAddr_Details(payload);
    window.$('#AfterWalletConnected_two').click();
  }
  //  check

  const getProfileData = async (addrchk) => {
    // var addrchk = Wallet_Details.UserAccountAddr
    const currAddr = isEmpty(paramAddress) ? addrchk : paramAddress;
    let reqData = {
      currAddr
    }
    var data = await getprofile(reqData);
    setProfile(data.userValue);
    ////////("sasasasasasas",data.userValue)
    if (data.userValue) {
      if (data.userValue.coverimage != "") {
        let coverimage = `${config.Back_URL}/images/coverimages/${data.userValue._id}/${data.userValue.coverimage}`;
        setcoverphoto(coverimage);
      }
    }
  }

  async function AfterWalletConnected_two() {

    await ActivityTab('mine');
    await checkFollowUser();
    await getfollowers1();
    await getfollowing();
    await Tab_Data_Call('Count', 'onsale', 'true');
    await Tab_Data_Call('List', 'onsale', 'true');
    await Tab_Data_Call('Count', 'created', 'true');
    await Tab_Data_Call('Count', 'collectibles', 'true');
    await Tab_Data_Call('Count', 'owned', 'true');
    await Tab_Data_Call('Count', 'liked', 'true');
    LikeForwardRef&&LikeForwardRef.current.getLikesData();
    
    // await getOtherNFT('argument');
  }


  const getOtherNFT = async (data) => {
    var currAddr = Wallet_Details.UserAccountAddr;
    
    if(currAddr){
      var req = {
        useraddress: currAddr.toLowerCase(),
        refresh : true,
        senddata:data
      }
  }
  else{
    var req = {
      useraddress: currAddr.toLowerCase(),
      refresh : false,
        senddata:data
    }
  }
  ////("get User Account@123", req)
  var getNFTJson = await getNFTDetails(req);
  // //("getNFTJson",getNFTJson)
  if(getNFTJson&&getNFTJson.data&&getNFTJson.data.soci&&getNFTJson.data.soci.result){
    toast.success('Meta data refreshed,Please wait few moment')
  }
  await Tab_Click_Collectibles('count')
}
  const handleFile = async (e) => {

    var reader = new FileReader()
    var file = e.target.files[0];
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setcoverphoto(reader.result)
    }.bind(this);


    let addr = MyItemAccountAddr;
    var reqdata = {
      file,
      currAddr: addr,
    }

    const { error } = await coverimagevalidations(reqdata)

    if (error != undefined) {
     
      if (isEmpty(error.errors)) {
        setchooseimage(true)

        setvalidateError('')
        var coverimg = await coverImage(reqdata)
        if (coverimg && coverimg.userValue != undefined) {
          window.$('#edit_cover_modal').modal('hide');
          getProfileData();
          
          setchooseimage(false)
          setTimeout(() => {
            window.$('.modal').modal('hide');
            // window.location.reload();
          }, 500);
        } else {
          setcoverphoto(Banner)
        }
      } else {
        setchooseimage(false)
      
        setvalidateError(error.errors)

      }
    } else {
      if (isEmpty(error)) {
        setchooseimage(true)
        setvalidateError('')
        var coverimg = await coverImage(reqdata)
        if (coverimg && coverimg.userValue != undefined) {
          document.getElementById('edit_cover_modal_close').click()
         
          setTimeout(() => {
            window.$('.modal').modal('hide');
            // window.location.reload();
          }, 500);
        } else {
          setcoverphoto(Banner)
        }

      } else {
    
        setchooseimage(false)
        setvalidateError(error.errors)
      }
    }
  }
  const followFun = async (followerAddress) => {
    const currAddr = MyItemAccountAddr_Details.curraddress;
    let reqData = {
      curraddress: currAddr,
      followeraddress: followerAddress
    }
    var data = await followUnfollow(reqData);
    //////////("okjkjkkpopo",data)
    if (data && data.follower && data.follower.success === true) {
      if (data.follower.message)
        toast.success(data.follower.message, toasterOption)
    }
    checkFollowUser();

  }
  const checkFollowUser = async () => {
    const currAddr = MyItemAccountAddr_Details.curraddress;
    let reqData = {
      curraddress: currAddr,
      followeraddress: Wallet_Details.UserAccountAddr
    }
    var data = await checkFollower(reqData);
    if (data && data.follower && data.follower.success === true) {
      if (data.follower.message) {
        setFollowButton(data.follower.message)
        //////////////("<<<<<dd>>>>>",data)
      }
    }
  }
  const getfollowers1 = async () => {
    const currAddr = MyItemAccountAddr;
    let reqData = {

      curraddress: currAddr,
      tab: "follower"
    }
    var data = await getFollowers(reqData);
    // //////////////("opopopopopop",(data.follower.list).length)

    if (data && data.follower && (data.follower.list).length != 0) {
      setFollowList(data.follower.list);
    }
  }


  const getfollowing = async () => {
    // var addrchk = getCurrAddr
    const currAddr = MyItemAccountAddr;
    let reqData = {
      curraddress: currAddr,
      tab: "following"
    }
    var data = await getFollowers(reqData);
    ////////////("follower lisisisisisit",data.follower);
    if (data && data.follower && (data.follower.list).length != 0) {
      setFollowingList(data.follower.list);
    }
    else {
      setFollowingList([])
    }
  }
  //  //////////////("checkkkk",MyItemAccountAddr_Details.curraddress)
  const statusChangeactivity = async (data) => {
    // ////////alert('vanthutan',Wallet_Details.UserAccountAddr)
    var reqdata = {
      currAddr: (Wallet_Details.UserAccountAddr).toLowerCase(),
      tokenCounts: data.tokenCounts,
      _id: data._id
    }
    var noti = await notificationStatusChange(reqdata)
    ////////////////("qweiqwueiqwueiouqeuqw", noti)
  }

  const ActivityTab = async (data) => {
    //("soci1",data)
    var reqdata = {
      tabName: data,
      currAddr: MyItemAccountAddr,
      limit: config.limit,
      page: 1,
    }
   //("soci1",reqdata)

    var activitys = await ActivityCall(reqdata)
    if (activitys && activitys.data && activitys.data.list && (activitys.data.list).length > 0) {
      //("activities ",activitys)
      Set_Activity_Item(activitys.data.list)
      // Set_load_more(activitys.data)
    }
    else {
      Set_Activity_Item([])
    }

  }

  async function Tab_Click_Collectibles(data) {
    //("<>><><><><><><><><><><><><")
    await getNftCollection(data);
}
const getNftCollection = async (data) => {
    const currAddr = MyItemAccountAddr
    let reqData = {
            curraddress: currAddr,
            senddata:data
    }
    var data = await getNftCollectionData(reqData);
    if (data && data.respData&& data.respData.data&& data.respData.data.list) {
      setUserCollection(data.respData.data.list);
      //  //("NFTLength",data.respData.data.list)
    } 
    else if (data && data.respData&& data.respData.data&&data.respData.data.data) {
              setUserCollectionCount(data.respData.data.data);
    }
}


  return (
   
      <div className="inner_header">
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

      <div id="AfterWalletConnected_two" onClick={() => AfterWalletConnected_two()}></div>
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
     
 
     <div className={classes.pageHeader + " inner_pageheader items_header my_items"}>
        <div>
          <GridContainer className="mx-0">
            <GridItem xs={12} sm={12} md={12} className="px-0">
              <div className="items_bg">
                <img src={coverimage} alt="profile" className="img-fluid" />
                <div className="container edit_cover_container">
                  {
                    Wallet_Details.UserAccountAddr == MyItemAccountAddr_Details.curraddress &&
                    <p className="edit_cover_text" data-toggle="modal" data-target="#edit_cover_modal">Edit cover</p>
                  }
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div>
          <GridContainer className="mx-0">
            <GridItem xs={12} sm={12} md={12} className="px-0">
              <div className="items_bg_pink">
                <div className="item_prof">
                  <div className="item_prof_img">
                    {MyItemAccountAddr_Details && MyItemAccountAddr_Details.image != "" &&
                      <img src={`${config.Back_URL}/images/${MyItemAccountAddr_Details._id}/${MyItemAccountAddr_Details.image}`} alt="profile" className="img-fluid items_profile" />}
                    {
                      MyItemAccountAddr_Details && MyItemAccountAddr_Details.image == "" &&
                      <Avatars item="img-fluid items_profile" />
                      //  <Avatars classValue="img-fluid items_profile"/>
                    }

                  </div>

                </div>
                <p className="text-center">
                  <span className="address_text">{MyItemAccountAddr_Details && MyItemAccountAddr_Details.curraddress}</span>
                  <span>
                    <CopyToClipboard text={MyItemAccountAddr_Details.curraddress} onCopy={() => copyText('invite link', MyItemAccountAddr_Details.curraddress)}>

                      <i className="fas fa-sticky-note notes_fa cur_pointer"></i>
                    </CopyToClipboard>

                  </span>
                </p>
                {(MyItemAccountAddr_Details && MyItemAccountAddr_Details.name) && <p className="text-center bio_desc">
                  {MyItemAccountAddr_Details.name}
                </p>}
                <p className="text-center bio_desc">
                  {MyItemAccountAddr_Details && MyItemAccountAddr_Details.bio}
                </p>

                <div className="mt-3  ">

                  <p className="mb-1">
                    {(MyItemAccountAddr_Details.instagramcheck == true && MyItemAccountAddr_Details.instagram && MyItemAccountAddr_Details.instagram != "") ?
                    <a target="_blank" href={(MyItemAccountAddr_Details.instagram).includes('https://www.instagram.com')? MyItemAccountAddr_Details.instagram : 'https://www.instagram.com/'+MyItemAccountAddr_Details.instagram}>
                      <i className="fab fa-instagram notes_fa mr-2"></i>
                        {MyItemAccountAddr_Details.instagram}</a> : null}
                    {(MyItemAccountAddr_Details.twittercheck == true && MyItemAccountAddr_Details.twitter && MyItemAccountAddr_Details.twitter != "") ? 
                   <a target="_blank" href={(MyItemAccountAddr_Details.twitter).includes('https://twitter.com/')? MyItemAccountAddr_Details.twitter : 'https://twitter.com/'+MyItemAccountAddr_Details.twitter}>
                    <span className="pl-3">
                  <i className="fab fa-twitter notes_fa mr-2"></i>
                      {MyItemAccountAddr_Details.twitter}</span></a> : null}

                    {(MyItemAccountAddr_Details.facebookcheck == true && MyItemAccountAddr_Details.facebook && MyItemAccountAddr_Details.facebook != "") ?

<a target="_blank" href={(MyItemAccountAddr_Details.facebook).includes('https://www.facebook.com/')? MyItemAccountAddr_Details.facebook : 'https://www.facebook.com/'+MyItemAccountAddr_Details.facebook}>

<span> <i className="fab fa-facebook-f notes_fa mr-2"></i>
                        {MyItemAccountAddr_Details.facebook}</span> </a> : null}
                    {(MyItemAccountAddr_Details.youtubecheck == true && MyItemAccountAddr_Details.youtube && MyItemAccountAddr_Details.youtube != "") ?
                   <a target="_blank" href={(MyItemAccountAddr_Details.youtube).includes('https://www.youtube.com/')? MyItemAccountAddr_Details.youtube : 'https://www.youtube.com/'+MyItemAccountAddr_Details.youtube}>
                      <span className="pl-3">
                      <i className="fab fa-youtube  notes_fa mr-2"></i>
                      {MyItemAccountAddr_Details.youtube}</span></a> : null
                    }
                  </p>
                </div>


                <div className="mt-3">
                  {
                    (MyItemAccountAddr_Details.curraddress == Wallet_Details.UserAccountAddr) ?
                      <Link className="btn_outline_red" to="/edit-profile">Edit Profile</Link>
                      :
                      <Button className='btn_outline_red' onClick={() => followFun(Wallet_Details.UserAccountAddr)}>
                        {followButton}
                      </Button>
                  }
                   {/* {
             (Wallet_Details.UserAccountAddr == MyItemAccountAddr) &&
             <Button className={'btn_outline_red ml-2'} onClick={() => getOtherNFT("refresh")}> 
              Refresh Meta
             </Button>
            } */}


                  <span className="bg_red_icon cur_poinet" data-toggle="modal" data-target="#share_modal1">
                    <i className="fas fa-share-alt"></i>
                  </span>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div className="container">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <nav className="masonry_tab_nav mt-4 mb-5 items_tab_outer">
                <div className="nav nav-tabs masonry_tab primary_tab items_tab justify-content-center items_tab_new image_detailstab pb-2 pl-2" id="nav-tab" role="tablist">
                  <a className="nav-link active" id="onsale-tab" data-toggle="tab" href="#onsale" role="tab" aria-controls="onsale" aria-selected="true" onClick={() => Tab_Click('onsale')}>
                    <div className="tab_head">On Sale</div>
                    <div className="tab_count">{OnSale_List && OnSale_List.length}</div>
                  </a>
                  <a className="nav-link" id="collectibles-tab" data-toggle="tab" href="#collectibles" role="tab" aria-controls="collectibles" aria-selected="false" onClick={() => Tab_Click('collectibles')}>
                    <div className="tab_head">Collectibles</div>
                    <div className="tab_count">{Collectibles_Count}</div>
                  </a>
                  <a className="nav-link" id="created-tab" data-toggle="tab" href="#created" role="tab" aria-controls="created" aria-selected="false" onClick={() => Tab_Click('created')}>
                    <div className="tab_head">Created</div>
                    <div className="tab_count">{Created_Count}</div>
                  </a>
                  <a className="nav-link" id="liked-tab" data-toggle="tab" href="#liked" role="tab" aria-controls="liked" aria-selected="false" onClick={() => Tab_Click('liked')}>
                    <div className="tab_head">Liked</div>
                    <div className="tab_count">{Liked_Count}</div>
                  </a>
                  <a className="nav-link" id="activity-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false">
                    <div className="tab_head"> My Activity</div>
                    <div className="tab_count">{Activity_Item && Activity_Item.length}</div>
                  </a>
                  <a className="nav-link" id="following-tab" data-toggle="tab" href="#following" role="tab" aria-controls="following" aria-selected="false" onClick={getfollowing}>
                    <div className="tab_head">Following</div>
                    <div className="tab_count">{followingList && (followingList.length == 0 ? 0 : followingList.length)}</div>
                  </a>
                  <a className="nav-link" id="followers-tab" data-toggle="tab" href="#followers" role="tab" aria-controls="followers" aria-selected="false" onClick={getfollowers1}>
                    <div className="tab_head">Followers</div>
                    <div className="tab_count">{followList && followList.length == 0 ? 0 : followList.length}</div>
                  </a>
                  {/* {
                    MyItemAccountAddr== Wallet_Details.UserAccountAddr&&
                                    <a className="nav-link" id="NewCollectibles_tab" data-toggle="tab" href="#NewCollectibles" role="tab" aria-controls="NewCollectibles" aria-selected="false" onClick={() => Tab_Click_Collectibles('list')}>
                    <div className="tab_head">User Collectibles</div>
                    <div className="tab_count">{UserCollectionCount}</div>
                  </a>} */}
                 
                </div>
              </nav>
              <div className="tab-content explore_tab_content mt-2 navtabs" id="nav-tabContent">
                <div className="tab-pane fade show active" id="onsale" role="tabpanel" aria-labelledby="onsale-tab">
                  <div className="proposal_panel_overall">
                    {(OnSale_Count == 0) ? (

                      <div className="text-center py-5">
                        <p className="not_found_text">No items found</p>
                        <p className="not_found_text_sub">Come back soon!</p>
                        <div className="mt-3">
                          {/* <Button className="create_btn"><Link to="/">Browse Marketplace</Link></Button> */}

                        </div>
                      </div>) :


                      (<div className="row m-0 ma_no_gap">
                        {
                          OnSale_List.map((item) => {

                            return (

                              <div className="item col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" key={Math.random()}>

                                <TokenCard
                                item={item}
                                LikedTokenList={LikedTokenList}
                                hitLike={LikeForwardRef.current && LikeForwardRef.current.hitLike}
                                PutOnSale_Click={PutOnSaleForwardRef.current && PutOnSaleForwardRef.current.PutOnSale_Click}
                                PurchaseNow_Click={PurchaseNowForwardRef.current && PurchaseNowForwardRef.current.PurchaseNow_Click}
                                PlaceABid_Click={PlaceABidForwardRef.current && PlaceABidForwardRef.current.PlaceABid_Click}
                                Set_Bids={Set_Bids}
                                Bids={item.myBid}
                                Set_BuyOwnerDetailFirst={Set_BuyOwnerDetailFirst}
                                Set_tokenCounts_Detail={Set_tokenCounts_Detail}
                                Set_MyTokenBalance={Set_MyTokenBalance}
                                Set_MyTokenDetail={Set_MyTokenDetail}
                                Set_AllowedQuantity={Set_AllowedQuantity}
                                Set_YouWillPay={Set_YouWillPay}
                                Set_YouWillPayFee={Set_YouWillPayFee}
                                Set_YouWillGet={Set_YouWillGet}
                                Burn_Click={BurnForwardRef.current && BurnForwardRef.current.Burn_Click}
                                CancelOrder_Click={CancelOrderForwardRef.current && CancelOrderForwardRef.current.CancelOrder_Click}
                                SubmitReport_Click={ReportForwardRef.current && ReportForwardRef.current.SubmitReport_Click}
                                ShareSocial_Click={ShareForwardRef.current && ShareForwardRef.current.ShareSocial_Click}
                              />
                              </div>

                            )
                          })}</div>
                      )}

                  </div></div>

                <div className="tab-pane fade" id="collectibles" role="tabpanel" aria-labelledby="collectibles-tab">
                  <div className="proposal_panel_overall">
                    {(Collectibles_Count == 0) ? (

                      <div className="text-center py-5">
                        <p className="not_found_text">No items found</p>
                        <p className="not_found_text_sub">Come back soon!</p>
                        <div className="mt-3">
                          {/* <Button className="create_btn"><Link to="/">Browse Marketplace</Link></Button> */}

                        </div>
                      </div>) :


                      (<div className="row m-0 ma_no_gap">
                        {
                          Collectibles_List.map((item) => {

                            return (

                              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" key={Math.random()}>

                                <TokenCard
                                item={item}
                                LikedTokenList={LikedTokenList}
                                hitLike={LikeForwardRef.current && LikeForwardRef.current.hitLike}
                                PutOnSale_Click={PutOnSaleForwardRef.current && PutOnSaleForwardRef.current.PutOnSale_Click}
                                PurchaseNow_Click={PurchaseNowForwardRef.current && PurchaseNowForwardRef.current.PurchaseNow_Click}
                                PlaceABid_Click={PlaceABidForwardRef.current && PlaceABidForwardRef.current.PlaceABid_Click}
                                Set_Bids={Set_Bids}
                                Bids={item.myBid}
                                Set_BuyOwnerDetailFirst={Set_BuyOwnerDetailFirst}
                                Set_tokenCounts_Detail={Set_tokenCounts_Detail}
                                Set_MyTokenBalance={Set_MyTokenBalance}
                                Set_MyTokenDetail={Set_MyTokenDetail}
                                Set_AllowedQuantity={Set_AllowedQuantity}
                                Set_YouWillPay={Set_YouWillPay}
                                Set_YouWillPayFee={Set_YouWillPayFee}
                                Set_YouWillGet={Set_YouWillGet}
                                Burn_Click={BurnForwardRef.current && BurnForwardRef.current.Burn_Click}
                                CancelOrder_Click={CancelOrderForwardRef.current && CancelOrderForwardRef.current.CancelOrder_Click}
                                SubmitReport_Click={ReportForwardRef.current && ReportForwardRef.current.SubmitReport_Click}
                                ShareSocial_Click={ShareForwardRef.current && ShareForwardRef.current.ShareSocial_Click}
                              />
                              </div>

                            )
                          })}</div>
                      )}

                  </div>
                </div>
                <div className="tab-pane fade navtabs" id="created" role="tabpanel" aria-labelledby="created-tab">
                  <div className="proposal_panel_overall">
                    {(Created_Count == 0) ? (

                      <div className="text-center py-5">
                        <p className="not_found_text">No items found</p>
                        <p className="not_found_text_sub">Come back soon!</p>
                        <div className="mt-3">
                          {/* <Button className="create_btn"><Link to="/">Browse Marketplace</Link></Button> */}

                        </div>
                      </div>) :


                      (<div className="row ">
                        {
                          Created_List.map((item) => {

                            return (

                              <div className="item col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" key={Math.random()}>

                                <TokenCard
                                item={item}
                                LikedTokenList={LikedTokenList}
                                hitLike={LikeForwardRef.current && LikeForwardRef.current.hitLike}
                                PutOnSale_Click={PutOnSaleForwardRef.current && PutOnSaleForwardRef.current.PutOnSale_Click}
                                PurchaseNow_Click={PurchaseNowForwardRef.current && PurchaseNowForwardRef.current.PurchaseNow_Click}
                                PlaceABid_Click={PlaceABidForwardRef.current && PlaceABidForwardRef.current.PlaceABid_Click}
                                Set_Bids={Set_Bids}
                                Bids={item.myBid}
                                Set_BuyOwnerDetailFirst={Set_BuyOwnerDetailFirst}
                                Set_tokenCounts_Detail={Set_tokenCounts_Detail}
                                Set_MyTokenBalance={Set_MyTokenBalance}
                                Set_MyTokenDetail={Set_MyTokenDetail}
                                Set_AllowedQuantity={Set_AllowedQuantity}
                                Set_YouWillPay={Set_YouWillPay}
                                Set_YouWillPayFee={Set_YouWillPayFee}
                                Set_YouWillGet={Set_YouWillGet}
                                Burn_Click={BurnForwardRef.current && BurnForwardRef.current.Burn_Click}
                                CancelOrder_Click={CancelOrderForwardRef.current && CancelOrderForwardRef.current.CancelOrder_Click}
                                SubmitReport_Click={ReportForwardRef.current && ReportForwardRef.current.SubmitReport_Click}
                                ShareSocial_Click={ShareForwardRef.current && ShareForwardRef.current.ShareSocial_Click}
                              />
                              </div>

                            )
                          })}</div>
                      )}

                  </div>
                </div>

                <div className="tab-pane fade navtabs" id="liked" role="tabpanel" aria-labelledby="liked-tab">
                  <div className="proposal_panel_overall">
                    {(Liked_Count == 0) ? (

                      <div className="text-center py-5">
                        <p className="not_found_text">No items found</p>
                        <p className="not_found_text_sub">Come back soon!</p>
                        <div className="mt-3">
                          {/* <Button className="create_btn"><Link to="/">Browse Marketplace</Link></Button> */}

                        </div>
                      </div>) :


                      (<div className="row ">
                        {
                          Liked_List.map((item) => {

                            return (

                              <div className="item col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">

                                <TokenCard
                                item={item}
                                LikedTokenList={LikedTokenList}
                                hitLike={LikeForwardRef.current && LikeForwardRef.current.hitLike}
                                PutOnSale_Click={PutOnSaleForwardRef.current && PutOnSaleForwardRef.current.PutOnSale_Click}
                                PurchaseNow_Click={PurchaseNowForwardRef.current && PurchaseNowForwardRef.current.PurchaseNow_Click}
                                PlaceABid_Click={PlaceABidForwardRef.current && PlaceABidForwardRef.current.PlaceABid_Click}
                                Set_Bids={Set_Bids}
                                Bids={item.myBid}
                                Set_BuyOwnerDetailFirst={Set_BuyOwnerDetailFirst}
                                Set_tokenCounts_Detail={Set_tokenCounts_Detail}
                                Set_MyTokenBalance={Set_MyTokenBalance}
                                Set_MyTokenDetail={Set_MyTokenDetail}
                                Set_AllowedQuantity={Set_AllowedQuantity}
                                Set_YouWillPay={Set_YouWillPay}
                                Set_YouWillPayFee={Set_YouWillPayFee}
                                Set_YouWillGet={Set_YouWillGet}
                                Burn_Click={BurnForwardRef.current && BurnForwardRef.current.Burn_Click}
                                CancelOrder_Click={CancelOrderForwardRef.current && CancelOrderForwardRef.current.CancelOrder_Click}
                                SubmitReport_Click={ReportForwardRef.current && ReportForwardRef.current.SubmitReport_Click}
                                ShareSocial_Click={ShareForwardRef.current && ShareForwardRef.current.ShareSocial_Click}
                              />
                              </div>

                            )
                          })}</div>
                      )}

                  </div>
                </div>
                <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                  <div className="proposal_panel_overall">
                    {(Activity_Item.length == 0) ?

                      <div className="text-center py-5">
                        <p className="not_found_text">No items found</p>
                        <p className="not_found_text_sub">Come back soon!</p>
                        <div className="mt-3">
                          {/* <Button className="create_btn"><Link to="/">Browse Marketplace</Link></Button> */}

                        </div>
                      </div> :
                      <div className="followers_overall py-1" >

                        <div className="row" >{
                          Activity_Item.map((item) => {
                            return (

                              <ActivityCard key={Math.random()}
                              item={item}
                              />
                            )
                          })}
                        </div>
                      </div>
                    }</div>
                </div>
                <div className="tab-pane fade" id="following" role="tabpanel" aria-labelledby="following-tab">
                  {followingList && followingList.length == 0 ?
                    <div className="text-center py-5">
                      <p className="not_found_text">No items found</p>
                      <p className="not_found_text_sub">Come back soon!</p>
                      <div className="mt-3">
                        {/* <Button className="create_btn"><Link to="/">Browse Marketplace</Link></Button> */}

                      </div>
                    </div> :
                    <div className="followers_overall py-1">
                      <div className="row">
                        {followingList && followingList.map((User) => {
                          ////////////("opopopopoppo",User)
                          return (
                            <div className="col-12 col-md-6 col-xl-4 mb-4" key={Math.random()}>
                              <div className="card my-0">
                                <div className="card-body">
                                  <div className="media follow_media">
                                    <div className="img_media_new  mr-3">

                                      {User && User.user && !isEmpty(User.user) && User.user.image && User.user.image != "" ?
                                        <a href={(User.user.customurl && User.user.customurl != "") ? config.Front_URL + '/' + User.user.customurl : config.Front_URL + '/user/' + User.user.curraddress}>
                                          <img src={`${config.Back_URL}/images/${User.user._id}/${User.user.image}`} alt="User" className="img-fluid" onClick={User.user.customurl != "" ? `/${User.user.customurl}` : `/user/${User.user.curraddress}`} />
                                        </a>
                                        :
                                        <a href={(User.user.customurl && User.user.customurl != "") ? config.Front_URL + '/' + User.user.customurl : config.Front_URL + '/user/' + User.user.curraddress}>

                                          <div className="img-fluid">
                                            <Avatars item="img-fluid" /></div>

                                        </a>
                                      }{
                                        User && User.user && isEmpty(User.user) &&


                                        <div className="img-fluid">
                                          <a href={config.Front_URL + '/user/' + User.followerAddress}>
                                            <Avatars item="img-fluid" />  </a></div>

                                      }
                                    </div>
                                    <div className="media-body flex_body"
                                    >
                                      <div>
                                        {

                                          User && User.user && !isEmpty(User.user) && <>
                                            <p className="mt-0 media_num font_14 mb-0">You Started Following</p>
                                            <a href={(User.user.customurl && User.user.customurl != "") ? config.Front_URL + '/' + User.user.customurl : config.Front_URL + '/user/' + User.user.curraddress}>

                                              <p className="my-0 media_text" title={'User :' + (User.user.name != "" ? User.user.name : User.user.curraddress)}>{(User.user.name != "" ? User.user.name : User.user.curraddress != "" && String(User.user.curraddress).slice(0, 10).concat("..."))}</p>
                                            </a>
                                          </>

                                        }
                                        {
                                          User && User.user && isEmpty(User.user) && <>

                                            <p className="mt-0 media_num font_14 mb-0">You Started Following  </p>
                                            <a href={config.Front_URL + '/user/' + User.followerAddress}>
                                              <p className="my-0 media_text" title={'User :' + User.followerAddress}>{(User.followerAddress).slice(0, 10).concat("...")}</p>

                                            </a> </>}
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          )
                        })}

                      </div>

                    </div>}</div>
                <div className="tab-pane fade" id="followers" role="tabpanel" aria-labelledby="followers-tab">
                  <div className="proposal_panel_overall">
                    {followList && followList.length == 0 ?
                      <div className="text-center py-5">
                        <p className="not_found_text">No items found</p>
                        <p className="not_found_text_sub">Come back soon!</p>
                        <div className="mt-3">
                          {/* <Button className="create_btn"><Link to="/">Browse Marketplace</Link></Button> */}

                        </div>
                      </div> :
                      <div className="followers_overall py-1">
                        <div className="row">
                          {followList && followList.map((User) => {
                            //("opopopopoppo",User)
                            return (
                              <div className="col-12 col-md-6 col-xl-4 mb-4" key={Math.random()}>
                                <div className="card my-0">
                                  <div className="card-body">
                                    <div className="media follow_media">
                                      <div className="img_media_new  mr-3">

                                        {User && User.user && !isEmpty(User.user) && User.user.image && User.user.image != "" ?
                                          <a href={(User.user.customurl && User.user.customurl != "") ? config.Front_URL + '/' + User.user.customurl : config.Front_URL + '/user/' + User.user.curraddress}>
                                            <img src={`${config.Back_URL}/images/${User.user._id}/${User.user.image}`} alt="User" className="img-fluid" onClick={User.user.customurl != "" ? `/${User.user.customurl}` : `/user/${User.user.curraddress}`} />
                                          </a>
                                          :
                                          <a href={(User.user.customurl && User.user.customurl != "") ? config.Front_URL + '/' + User.user.customurl : config.Front_URL + '/user/' + User.user.curraddress}>

                                            <div className="img-fluid">
                                              <Avatars item="img-fluid" /></div>

                                          </a>
                                        }{
                                          User && User.user && isEmpty(User.user) &&


                                          <div className="img-fluid">
                                            <a href={config.Front_URL + '/user/' + User.userAddress}>
                                              <Avatars item="img-fluid" />  </a></div>

                                        }
                                      </div>
                                      <div className="media-body flex_body"
                                      >
                                        <div>
                                          {

                                            User && User.user && !isEmpty(User.user) && <>
                                              {/* <p className="mt-0 media_num font_14 mb-0">You Started Following</p> */}
                                              <a href={(User.user.customurl && User.user.customurl != "") ? config.Front_URL + '/' + User.user.customurl : config.Front_URL + '/user/' + User.user.curraddress}>

                                                <p className="my-0 media_text" title={'User :' + (User.user.name != "" ? User.user.name : User.user.curraddress)}>{(User.user.name != "" ? User.user.name : User.user.curraddress != "" && String(User.user.curraddress).slice(0, 10).concat("..."))}</p>
                                                <p className="mt-0 media_num font_14 mb-0">Started Following you</p>
                                              </a>
                                            </>

                                          }
                                          {
                                            User && User.user && isEmpty(User.user) && <>

                                              <p className="mt-0 media_num font_14 mb-0">You Started Following  </p>
                                              <a href={config.Front_URL + '/user/' + User.userAddress}>
                                                <p className="my-0 media_text" title={'User :' + User.userAddress}>{(User.userAddress).slice(0, 10).concat("...")}</p>

                                              </a> </>}
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            )
                          })}

                        </div>

                      </div>}

                  </div>
                </div>
                
                <div className="tab-pane fade navtabs" id="NewCollectibles" role="tabpanel" aria-labelledby="NewCollectibles-tab">
                  <div className="proposal_panel_overall">
                    {(UserCollectionCount == 0) ? (

                      <div className="text-center py-5">
                        <p className="not_found_text">No items found</p>
                        <p className="not_found_text_sub">Come back soon!</p>
                        <div className="mt-3">
                       </div>
                      </div>) :
                      (<div className="row">
                        {
                          ((userCollection.nft)||[]).map((item, index) => {

                            return (
                              (item.metadata != null) &&
                                <div className="item col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
                                  <div className="item itemd_heih_adj">
                                    <div className="card_inner_item">
                                    <div className="d-flex justify-content-between">
                        <div className="d-flex creators_details mb-2">
                         
                        {
                               <a href={`${config.Front_URL}/user/${(item.owner_of)}`} title={`Owner : ${(item.owner_of)}`}>
                                   {MyItemAccountAddr_Details && MyItemAccountAddr_Details.image != "" &&
                      <img src={`${config.Back_URL}/images/${MyItemAccountAddr_Details._id}/${MyItemAccountAddr_Details.image}`} alt="profile" className="img-fluid align-self-center" />}
                    {
                      MyItemAccountAddr_Details && MyItemAccountAddr_Details.image == "" &&
                      <Avatars item="img-fluid align-self-center" />
                    }
                                </a>
                        }
                                  </div>    
                                  <div className="pl-2">    
                                    <div className="dropdown ">
                            <button className="drop-down" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ....
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      
                      <div className="menu_itm dropdown-item" id={"BurnCollectible" + item.tokenCounts} data-toggle="modal" data-target="#share_modal" onClick={() =>
                        { 
                          var item={
                            tokenName:userCollection.meta[index].name,
                            contractAddress:userCollection.nft[index].token_address,
                            tokenCounts:Number(userCollection.nft[index].token_id),
                            
                          }
                          var tokenowners_current={
                            tokenCounts:Number(userCollection.nft[index].token_id),
                            tokenOwner: userCollection.nft[index].owner_of,
                            contractAddress:userCollection.nft[index].token_address,

                        
                          }
                          ShareForwardRef.current.ShareSocial_Click(item,tokenowners_current)}}>
                            <span>Share</span>
                        </div>
                    </div>
                      

                           
                         
                           </div>
                      </div>
                          
                        </div>
                                      <div className="remaintime">
                                        <div className="item_inner_img  my_itens_sec_img">
                                          <Link to={"/info/" + userCollection.nft[index].owner_of +"/"+ userCollection.nft[index].token_address+"/"+ userCollection.nft[index].token_id}>
                                            <> 
                                            {
                                                            (((userCollection.meta[index].image).includes('ipfs://')==true||(userCollection.meta[index].image).includes('ipfs://ipfs/')==true)
                                                            ?(
      
                                                              <object type="image/webp" data={"https://ipfs.io/ipfs/"+(((userCollection.meta[index].image).split('ipfs://').pop()).split('ipfs/').pop())}
                                                              >
                                                            </object>
                                                              
                                                            )
                                                            :
      
                                                            (userCollection.meta[index].image != ""&&
                                                            
                                                              <object type="image/webp" data={userCollection.meta[index].image}
                                                               >
                                                              </object>
                                                            ))}
                                           
                                             
                                            </>
                                          </Link>
                                        </div>
                                        </div>
                                      <Link to={"/info/" + item.owner_of +"/"+ item.token_address+"/"+ item.token_id}>
                                        <h2>{userCollection.meta[index].name}</h2></Link>
                                      <div className="d-flex justify-content-between align-items-center">
                                      <h3 className="mb-0" >{userCollection.nft[index].amount} of {userCollection.nft[index].amount}</h3>
                                        {/* <div className="masonry_likes" onClick={() => {
                                          var reqdata={tokenCounts:item.token_id,tokenOwner:item.owner_of}
                                          // LikeForwardRef.current &&
                                           LikeForwardRef.current.hitLike(reqdata)}}>
                                          <span className={item.tokenCounts + '-likecount'}>{item.likecount}</span>
                                           {
                                            (LikedTokenList.findIndex(tokenCounts => (tokenCounts.tokenCounts === item.token_id)) > -1) ?
                                              (<i className="fas fa-heart ml-2 liked"></i>) :
                                              (<i className="far fa-heart ml-2"></i>)
                                          }
                                        </div> */}
                                      </div>

                                    </div></div>
                                </div>
                                
                            )
                          })}</div>
                      )}

                  </div>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
     
     
      
      <Footer />
      {/* edit_cover Modal */}
      <div className="modal fade primary_modal" id="edit_cover_modal" tabIndex="-1" role="dialog" aria-labelledby="edit_cover_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title" id="edit_cover_modalLabel_1">Update cover</h5>
              <h5 className="modal-title" id="edit_cover_modalLabel_2">Follow Steps</h5>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="update_cover_div_1" id="update_cover_div_1">
                <p className="mt-0 approve_desc text-center mb-4">Upload new cover for your profile page. We recommended to upload images in 1140×260 resolution</p>
                <form className="text-center">
                  <Button className="file_btn btn primary_btn" disabled={chooseimage}>Choose image
                    <input className="inp_file"
                      type="file"
                      name="coverimage"
                      id="coverphoto"
                      onChange={(e) => handleFile(e)}
                    />
                  </Button>


                </form>
                <div className="text-center mb-2">
                  {
                    validateError.file && <span className="text-danger">{validateError.file}</span>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* end edit_cover modal */}
      <div className="modal fade primary_modal" id="share_modal1" tabIndex="-1"
        role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="share_modalCenteredLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-module">
              <div className="modal-header text-center">
                <h5 className="modal-title" id="share_modalLabel">Share this NFT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

              </div>
              <div className="modal-body px-0">
              {Wallet_Details.shareTag!=null&&
                <div className="row justify-content-center mx-0">
                  <div className="col-12 col-sm-6 col-lg-3 px-1">
                    <div className="text-center icon_div">

                      <TwitterShareButton

                        title={`${(MyItemAccountAddr_Details.name != "") ? MyItemAccountAddr_Details.name : MyItemAccountAddr_Details.curraddress}` + " " + `NFT`}
                        url={`${config.Front_URL}/user/${MyItemAccountAddr_Details.curraddress}` + " " + `${Wallet_Details.shareTag[0]}` + " " + `${Wallet_Details.shareTag[1]}` + " " + `${(Wallet_Details.shareTag[2])}`}
                      >
                        <i className="fab fa-twitter"></i>
                        <p>Twitter</p>


                      </TwitterShareButton>

                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 px-1">
                    <div className="text-center icon_div">

                      <TelegramShareButton
                        title={`${(MyItemAccountAddr_Details.name != "") ? MyItemAccountAddr_Details.name : MyItemAccountAddr_Details.curraddress}` + " " + `NFT`}
                        url={`${config.Front_URL}/user/${MyItemAccountAddr_Details.curraddress}` + " " + `${Wallet_Details.shareTag[0]}` + " " + `${Wallet_Details.shareTag[1]}` + " " + `${(Wallet_Details.shareTag[2])}`}
                      >

                        <i className="fab fa-telegram-plane"></i>
                        <p>Telegram</p>

                      </TelegramShareButton>

                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 px-1">
                    <div className="text-center icon_div">
                      <FacebookShareButton
                        quote={`${(MyItemAccountAddr_Details.name != "") ? MyItemAccountAddr_Details.name : MyItemAccountAddr_Details.curraddress}` + " " + `NFT`}
                        url={`${config.Front_URL}/user/${MyItemAccountAddr_Details.curraddress}` + " " + `${Wallet_Details.shareTag[0]}` + " " + `${Wallet_Details.shareTag[1]}` + " " + `${(Wallet_Details.shareTag[2])}`}
                      >
                        <i className="fab fa-facebook-f"></i>
                        <p>Facebook</p>
                      </FacebookShareButton>

                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 px-1">
                    <div className="text-center icon_div">
                      <WhatsappShareButton
                        title={`${(MyItemAccountAddr_Details.name != "") ? MyItemAccountAddr_Details.name : MyItemAccountAddr_Details.curraddress}` + " " + `NFT`}
                        url={`${config.Front_URL}/user/${MyItemAccountAddr_Details.curraddress}` + " " + `${Wallet_Details.shareTag[0]}` + " " + `${Wallet_Details.shareTag[1]}` + " " + `${(Wallet_Details.shareTag[2])}`}
                      >
                        <i className="fab fa-whatsapp"></i>
                        <p>Whatsapp</p>
                      </WhatsappShareButton>

                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>


      </div>
  );
}
