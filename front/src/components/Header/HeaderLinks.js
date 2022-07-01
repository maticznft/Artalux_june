
/**
 * FILE		  :	  Header
 * DISPATCH	:	  Connect,Disconnect
 * METHOD   :   notifications,getSearchList
 * STATE 	  : 	notification,searchItem,usersearchItem,keyword
 * C-DATE   :   24_01_22
 * S-DATE   :   24-01-22
*/

import React, { useState, useEffect, useRef } from "react";
import { Notifications, AccountBalanceWallet, AccountCircle  } from '@material-ui/icons';
// react components for routing our app without refresh
import { Link, useHistory, useLocation } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { Scrollbars } from 'react-custom-scrollbars';
import Modal from 'react-modal';
import axios from 'axios';
//myside
import CopyToClipboard from "react-copy-to-clipboard";
import config from '../../lib/config';
import { getSearchList } from "actions/v1/user";
import Avatars from "views/Avatar";
import { notifications, notificationStatusChange } from '../../actions/v1/report';
import { acceptTerms,getcheckdata} from '../../actions/v1/user';
import Convert1 from '../../views/separate/Convert1'
import isEmpty from '../../lib/isEmpty'
import moment from 'moment'
import Convert from 'views/separate/Convert';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import {getPrivacyVal} from 'actions/v1/report';
import ReactHTMLParser from 'react-html-parser'
import {NavLink} from "react-router-dom";
//redux

import { Account_disConnect } from '../../actions/redux/action'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify';
// toast.configure();
toast.configure();
let toasterOption = config.toasterOption
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {

  const classes           =  useStyles();
  const Wallet_Details    =  useSelector(state => state.wallet_connect_context);
	const dispatch          =  useDispatch();
  const location          = useLocation();
  
  const [home_special_category, set_home_special_category] = useState([])
  const [Categorylist, setCategorylist] = useState([]);
  const [themeval, setthemeval] = useState(false);
  const [tcchecked, settcchecked] = useState(false);
  const [extra,setExtra] = useState(false);
  const [extra1,setExtra1] = useState(false);
  const [extra2,setExtra2] = useState(false);
  const [extra3,setExtra3] = useState(false);
  // if(extra == true){
  //   alert("Hai");
  //   document.getElementById("stats").classList.toggle("active");
  // }
  var pathVal='';
  if (location.pathname) {
    if (location.pathname.split('/').length >= 2) {
      pathVal = location.pathname.split('/')[1];
    }
  }
  if(extra == true){
    console.log("Set Extra",extra);
  }
//  function changeClass1() {
//   alert(1);
//     document.getElementById("stats").classList.add("active");
//   }
//   function changeClass2() {
//     alert(2);
//   }
  useEffect(() => {
    CategoryListCall();
    //getPrivacy();
   
  }, [])
  $(window).scroll(function(){
    if ($(this).scrollTop()) {
       $('header').addClass('fixedTop');
    } else {
       $('header').removeClass('fixedTop');
    }
});

  useEffect(() => {
   // CategoryListCall();
   if(Wallet_Details.UserAccountAddr){
    getPrivacy();}
   
  }, [Wallet_Details.UserAccountAddr])

  const closeTC = ()=>{
    window.$('#termsmodal').modal('hide');
    window.$("body").removeClass('modal-open');
    window.$("div").removeClass('modal-backdrop fade show')
  }





  const getPrivacy=async()=>{

    var addr = Wallet_Details.UserAccountAddr.toLowerCase()
    //("addre dtaa ",addr);
    var ischecked = await getcheckdata(addr);
    if(ischecked){//("ischecked.data ",ischecked.data);
                        settcchecked(true)}

    var loc = location.pathname
    //("locatiion name ",loc);
    
     if(!ischecked.data && loc == "/termsandconditions"){
        // window.$('#termsmodal').modal('hide');
        closeTC();
        }
     else if(!ischecked.data){
            window.$('#termsmodal').modal('show');
    }
    else{ window.$('#termsmodal').modal('hide');}
   

  }


  

  const handleterms = async()=>{
    //("check1 ,check2 ",checkbox1,checkbox2)
    if(checkbox1 == true && checkbox2 == true){
      //("check address",Wallet_Details.UserAccountAddr.toLowerCase())
      var addr = (Wallet_Details.UserAccountAddr).toLowerCase()
      var data = {"checked":true,
                  "userAddr":addr}
      var accept  = await acceptTerms(data);
      if(accept.data){
        //("accept ",accept.data)
        settcchecked(accept.data)
        window.$('#closetc').click()
      }
      
    }else{toast.error("please accept the terms & conditions")}
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
  // const toggletheme = () => {
  //   document.getElementById("root").classList.toggle('dark_theme');
  //   var usebody = document.getElementsByClassName("mobile_nav");
  //   for (var j = 0; j < usebody.length; j++) {
  //     usebody[j].classList.toggle('dark_theme')
  //   }
  // };
  const toggletheme = () => {

		document.getElementById("root").classList.toggle('dark_theme');
		var usebody = document.getElementsByClassName("mobile_nav");
		var roottheme = document.getElementById("root");
		// //(roottheme.classList.contains("light_theme"),"ROOT TYHME");
    if(roottheme.classList.contains("dark_theme"))
    {
    
      // //("dark header");
    
      localStorage.setItem("theme",'dark_theme');
     
    
    }
    else
    {
      // //("light header");
      localStorage.setItem("theme",'light_theme');
    
    }
		// //("usebody",usebody);
		for (var j = 0; j < usebody.length; j++) {
			usebody[j].classList.toggle('dark_theme')
		}



		var usebody = document.getElementsByClassName("mobile_nav");
		// //(usebody, "usebody home");
		for (var j = 0; j < usebody.length; j++) {
			usebody[j].classList.toggle('dark_theme')
		}




	


    // //(localStorage.getItem("theme"),"theme");
    if(localStorage.getItem("theme") == "light_theme")
    {
    // //("light");
    
      setTimeout(function(){
        var usebody = document.getElementsByClassName("mobile_nav");
        // //("usebody",usebody);
        for(var j=0;j<usebody.length;j++)
        {
          usebody[j].classList.remove('dark_theme')
        }
      },100);
    
    
    }
    else
    {
      // //("dark");
    
      setTimeout(function(){
        var usebody = document.getElementsByClassName("mobile_nav");
        // //("usebody",usebody);
        for(var j=0;j<usebody.length;j++)
        {
          usebody[j].classList.add('dark_theme')
        }
      },100);
    
    }

	};
  // const toggleUsermenu = () => {
  //   var useclass = document.getElementsByClassName("usemneu_dd");
  //   for (var i = 0; i < useclass.length; i++) {
  //     useclass[i].classList.toggle('d-none')
  //   }
  // }

  const [keyword, setKeyword]               = useState();
  const [searchItem, setSearchItem]         = useState([])
  const [UsersearchItem, setUserSearchItem] = useState([])
  const [notificationss, setnotificationss] = useState([])
  const [location_pathname, Set_location_pathname] = useState(pathVal);
  const [changeTheme,setChangeTheme] = useState(true);
  const [checkbox1,setcheckbox1] = useState(false);
  const [checkbox2,setcheckbox2] = useState(false);

  
  if(localStorage.theme){
    // useChangeTheme(!changeTheme);
    localStorage.setItem("theme",localStorage.theme);
    var themeChange = localStorage.getItem("theme");
    document.getElementById("root").classList.remove("light_theme");
    document.getElementById("root").classList.add(themeChange);
  }
  else{
    // useChangeTheme(!changeTheme);
    localStorage.setItem("theme","light_theme");
    var themeChange = localStorage.getItem("theme");
    document.getElementById("root").classList.remove("dark_theme");
    document.getElementById("root").classList.add(themeChange);
  }
  const history                             = useHistory();
  var tab = 'activity';
  window.$(document).ready(()=>{
    window.$('body').on('click',()=>{
      var useclass1 = document.getElementsByClassName("searchmneu_dd");
      window.$('searchmneu_dd_1').removeClass('d-none')
      for (var j = 0; j < useclass1.length; j++) {
        useclass1[j].classList.add('d-none')
      //  useclass1[j].classList.toggle('d-none')
      }
    })
  })



const handlekey = (e)=>{
  console.log("enter seccess",e.key)
  if(e.key == "Enter"){
    seachByKeyword()
  }
}




  const toggleSearchmenu = async (event) => {
    var useclass1 = document.getElementsByClassName("searchmneu_dd");
    window.$('searchmneu_dd_1').removeClass('d-none')
    for (var j = 0; j < useclass1.length; j++) {
      useclass1[j].classList.remove('d-none')
    //  useclass1[j].classList.toggle('d-none')
    }
    let keywordVal =  String(event.target.value).replace(/\s+/g, "").trim().toLowerCase();
    setKeyword(keywordVal)
    let postData = {
      limit: 3,
      keyword: keywordVal
    }
    var data = await getSearchList(postData);
    // if (data && data.searchlist && data.searchlist.items && data.searchlist.items.list) {
    //   setSearchItem(data.searchlist.items.list);
    // }
    // if (data && data.searchlist && data.searchlist.users) {
    //   setUserSearchItem(data.searchlist.users);
    // }
    if (data && data.searchlist && data.searchlist.items && data.searchlist.items.list && data.searchlist.items.list.length > 0 ) {
      //console.log("returned data ",data.searchlist.items.list)
      setSearchItem(data.searchlist.items.list);
    }
    else if(data.searchlist.items.length <= 0){setSearchItem([])}
    else if(data.searchlist.items.list.length <= 0 ){setSearchItem([])}

    if (data && data.searchlist && data.searchlist.users && data.searchlist.users.length > 0) {
      setUserSearchItem(data.searchlist.users);
    }else if(data.searchlist.users.length <= 0){setUserSearchItem([]);}
   

  }



  const seachByKeyword = () => {
    history.push({ pathname: '/Search', search: `?search=${keyword}`, key: Math.floor((Math.random() * 100) + 1) })
    if (window.location.pathname === '/Search') return true
      // window.location.reload();
  }



  const copyText = (a, b) => {
    toast.success('copied', toasterOption);

  }

  const statusChangeactivity = async (data) => {
    var reqdata = {
      currAddr: (Wallet_Details.UserAccountAddr).toLowerCase(),
      tokenCounts: data.tokenCounts,
      _id: data._id
    }
    var noti = await notificationStatusChange(reqdata)
  }

  useEffect(() => {
    // if(localStorage.theme && localStorage.theme === "light_theme"){ 
    //   var themeval = localStorage.getItem("theme")
    //   //("theme in local s ",themeval);
    //   if(themeval  && themeval === "light_theme"){ 
    //   alert("light_theme");
    //   // setChangeTheme(true)
    //   // window.
    //   $("#checkbox1").attr("checked",true);
    // }
    // else{
    //   $("#checkbox1").attr("checked",true);
    // }

    notification(Wallet_Details.UserAccountAddr)

  }, [Wallet_Details.UserAccountAddr]);

  useEffect(() => {
   
    thememanage()

  }, [themeval]);

// to manage stats highlight
  useEffect(()=>{
    var loc = location.pathname;
    if(loc == "/ranking" || loc == "/activity")
      changeextrastate();

  },[])
  const changeextrastate = async()=>{
    setExtra(true);
  }

  useEffect(()=>{
    var loc = location.pathname;
    if(loc == "/how-it-works" || loc == "/termsandconditions" || loc == "/privacy-policy")
      changeextrastate1();

  },[])
  const changeextrastate1 = async()=>{
    setExtra1(true);
  }
  useEffect(()=>{
    var loc = location.pathname;
    if(loc == "/create" || loc == "/create-single" || loc == "/create-multiple")
      changeextrastate2();

  },[])
  
  const changeextrastate2 = async()=>{
    setExtra2(true);
  }
  useEffect(() =>{
    var loc = location.pathname;
    var loc1 = loc.split('/')[1];
    console.log("Path",loc1);
    if(loc1 =="explore")
    changeextrastate3();
  },[])
  const changeextrastate3 = async()=>{
    setExtra3(true);
  }
  const thememanage = ()=>{
    if(themeval){
      //("themeval state ",themeval);
      $("#checkbox1").prop("checked",true);
    }
    else{ $("#checkbox1").prop("checked",false);}
  }


  const notification = async (currAddr) => {
     
      //("wallet address for noti ",currAddr,Wallet_Details.UserAccountAddr);
    var reqdata = {
      currAddr: currAddr,
      limit: 12
    }
    if (currAddr) {
      var noti = await notifications(reqdata)
      //("notification data ",noti);
      if (noti && noti.data && noti.data.data) {
        setnotificationss(noti.data.data)
      }
    }
  }
  // const toggleExploremenuRes = () => {
  //   var useclassresex = document.getElementsByClassName("exploremneu_dd_res");
  //   for(var m=0;m<useclassresex.length;m++)
  //   {
  //     useclassresex[m].classList.toggle('d-none')
  //   } 
  // }
  // const  toggleUsermenuRes = () => {
  //   var useclassres = document.getElementsByClassName("usemneu_dd_res");
  //   for(var l=0;l<useclassres.length;l++)
  //   {
  //     useclassres[l].classList.toggle('d-none')
  //   }
  // }
  // const  toggleResmenuRes = () => {
  //   var useclassres = document.getElementsByClassName("resmneu_dd_res");
  //   for(var l=0;l<useclassres.length;l++)
  //   {
  //     useclassres[l].classList.toggle('d-none')
  //   }
  // }
  // const  toggleThememenuRes = () => {
  //   var useclassres = document.getElementsByClassName("thememneu_dd_res");
  //   for(var l=0;l<useclassres.length;l++)
  //   {
  //     useclassres[l].classList.toggle('d-none')
  //   }
  // }
  const Disconnect = async () => {

    if (localStorage.walletconnect != null && localStorage.walletConnectType == 'wc') {
      await (Wallet_Details.providers).disconnect()
      localStorage.removeItem('walletconnect')
     }
    localStorage.removeItem('walletConnectType');
    dispatch({
      type: Account_disConnect,
      Account_Detail_Disconnect:{
          SingleContract:null,
          MultipleContract:null,
          UserAccountAddr: '',
          providers: null,
          UserAccountBal: 0,
          WalletConnected: "false",
          Accounts: '',
          AddressUserDetails: null,
          Wen_Bln: 0,
          load: "false"
    } })


        ///// changes ischecked in usertable to false ---- to conttol the terms&service popup  //////

        var addr = Wallet_Details.UserAccountAddr.toLowerCase()
        var changedata = {"checked":false,
                          "userAddr":addr}
    
          var accept  = await acceptTerms(changedata);
          console.log("data after disconnected",accept)
          if(accept.data){
          console.log("accept ",accept.data)
          settcchecked(accept.data)
          window.$('#closetc').click()
          }
   }


  return (
    <>
    <div>


      <List className={classes.list + " main_navbar"}>

       

        {/* <ListItem className={classes.listItem}>
          <a href="https://token.bidpixels.com/" target="_blank" className={classes.navLink}>Buy Token</a>
        </ListItem> */}
        {/* <ListItem className={classes.listItem+ " menu_dropdown dropdown_header_ul user_dd_ul pl-cust-user pl-cust-res"} onClick={toggleExploremenuRes}> */}
        <ListItem className={classes.listItem+ " menu_dropdown dropdown_header_ul explore_menu hover_menu user_dd_ul pl-cust-user pl-cust-res"}>
          <div className="position_relative"><a className={extra3 ? "active  pl-cust-wal but_cls_res" : "un-active pl-cust-wal but_cls_res"} href="/explore/All">Explore</a></div>
       
          {/* <div className="noti_parent noti_parnt_user exploremneu_dd_res d-none" id="exploremneu_dd_res"> */}
          <div className="noti_parent noti_parnt_user exploremneu_dd_res">
            <div className="px-0">
               <ul className="user_prof_ul pt-0 mt-0 mb-0">
               <li onClick={() => history.push(`/explore/All`)}>
                <span >All NFTs</span>
                </li>
               {home_special_category.map((item) => {
                return(
                <>
                <li onClick={() => history.push(`/explore/${item.name}`)}>
                {/* <Link to="/explore"><span>{item.name}</span></Link> */}
                <span >{item.name}</span>
                </li>
                </>
              )})}
           </ul>
              </div>
            </div>
        </ListItem>
        <ListItem className={classes.listItem+ " menu_dropdown dropdown_header_ul stats_menu hover_menu user_dd_ul pl-cust-user pl-cust-res"}>
        <div className="position_relative"><a className={extra ? "active" : "un-active"} id="stats">Stats</a></div>
          {/* <div className="noti_parent noti_parnt_user usemneu_dd_res d-none" id="usemneu_dd_res"> */}
          <div className="noti_parent noti_parnt_user usemneu_dd_res">
          <ul className="user_prof_ul pt-0 mt-0 mb-0">
              <li>
                <Link to="/ranking" ><span >Ranking</span></Link>
                </li>
              <li>
              <Link to="/activity"><span>Activity</span></Link>
                </li>
            </ul>
            </div>
        </ListItem>
        {/* <ListItem className={classes.listItem+ " menu_dropdown dropdown_header_ul user_dd_ul pl-cust-user pl-cust-res"} onClick={toggleUsermenuRes}> */}
        
        {/* <ListItem className={classes.listItem+ " menu_dropdown dropdown_header_ul res_dd_ul pl-cust-res pl-res-res"} onClick={toggleResmenuRes}> */}
       
       
        <ListItem className={classes.listItem+ " menu_dropdown dropdown_header_ul vip_menu hover_menu res_dd_ul pl-cust-res pl-res-res"}>
          {/* <a href="/vip" target="_blank" className={classes.navLink}>VIP</a> */}
          <div className="position_relative"><NavLink to="/vip">VIP</NavLink></div>
        </ListItem>
        <ListItem className={classes.listItem+ " menu_dropdown dropdown_header_ul resources_menu hover_menu res_dd_ul pl-cust-res pl-res-res"}>
        <div className="position_relative"><a className={extra1 ? "active" : "un-active"}>Resources</a></div>
          {/* <div className="noti_parent noti_parnt_res resmneu_dd_res d-none" id="resmneu_dd_res"> */}
          <div className="noti_parent noti_parnt_res resmneu_dd_res">
          <ul className="user_prof_ul pt-0 mt-0 mb-0">
              <li>
                <Link to="/how-it-works"><span>FAQ</span></Link>
                </li>
                <li>
              <Link to="/termsandconditions"><span>Terms and Conditions</span></Link>
              </li>
              <li>
              <Link to="/privacy-policy"><span>Privacy Policy</span></Link>
                </li>
            </ul>
            </div>
        </ListItem>
        <ListItem className={classes.listItem + " menu_dropdown create_menu hover_menu dropdown_header_ul res_dd_ul pl-cust-res pl-res-res"}>
          {/* <a href="/create" className={classes.navLink}>
            Create
          </a> */}
          <div className="position_relative"><Link to="/create" className={extra2 ? "active" : "un-active"}>Create</Link></div>
        </ListItem>
        <ListItem className={classes.listItem + " menu_dropdown dropdown_header_ul search_menu user_dd_ul ml-0"}>
          <div className="search_inp_group">
            <input type="text" className="search_inp" placeholder="Search collections / creators" onChange={toggleSearchmenu} onKeyDown={(e)=>handlekey(e)}/>
            <div className="search_inp_group_append">
              <i className="fas fa-search"></i>
            </div>
          </div>
          {keyword && keyword.length > 0 &&
          <div className="noti_parent noti_parnt_user searchmneu_dd d-none" id="searchmneu_dd_1">
            <Scrollbars
            // maxLength={350}
            autoHeight={true}
            className="nto_scrol_div">
              {searchItem.length != 0 && <p className="font_we_700">Items</p>}
              <ul className="noti_ul_dd">
                {
                  searchItem && searchItem.map((item) =>
                    <li className="px-3">
                      <div className="media" onClick={() => { history.push(`/info/${item.tokenowners_current.tokenOwner}/${item.contractAddress}/${item.tokenCounts}`) }}>
                        {
                          (item.image != "" && (
                            String(item.image).split('.').pop() == "mp4" ||
                            (String(item.image).split('.').pop() == "webm") ||
                            (String(item.image).split('.').pop() == "WEBM") ||
                            (String(item.image).split('.').pop() == "ogv") ||
                            (String(item.image).split('.').pop() == "OGV")
                          )) &&
                          <video
                            id="my-video"
                            className="img-fluid mr-2 user_ul_new align-self-center"
                            autoPlay playsInline loop muted
                            preload="auto"
                          >
                            <source src={(item.additionalImage == "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`) } type="video/mp4" />

                            {/* <source src={item.ipfsimage!=""?`${config.IPFS_IMG}/${item.ipfsimage}`:`${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`} type="video/mp4" /> */}
                          </video>}

                        {
                          (item.image != "" &&
                            (String(item.image).split('.').pop() == "mp3" || String(item.image).split('.').pop() == "aac" || String(item.image).split('.').pop() == "AAC" || String(item.image).split('.').pop() == "FLAC" || String(item.image).split('.').pop() == "flac")) &&
                          <>
                            <img src={config.AudioImg} className="img-fluid" />


                            <audio
                              muted
                              className="img-fluid mr-2 user_ul_new align-self-center"
                              playsInline loop muted
                              type="audio/mp3"
                              autostart="off"
                              src={(item.additionalImage == "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}

                            // src={item.ipfsimage!=""?`${config.IPFS_IMG}/${item.ipfsimage}`:`${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`}
                            >

                            </audio>
                          </>
                        }

                        {
                          (item.image != "" && (
                            String(item.image).split('.').pop() == "webp"
                            || String(item.image).split('.').pop() == "WEBP"
                            || String(item.image).split('.').pop() == "gif"
                            || String(item.image).split('.').pop() == "jpg"
                            || String(item.image).split('.').pop() == "GIF"
                            || String(item.image).split('.').pop() == "JPG"
                            || String(item.image).split('.').pop() == "JPEG"
                            || String(item.image).split('.').pop() == "jpeg"
                            || String(item.image).split('.').pop() == "png"
                            || String(item.image).split('.').pop() == "PNG") &&
                            <img
                              src={(item.additionalImage == "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}

                              //  src={item.ipfsimage!=""? `${config.IPFS_IMG}/${item.ipfsimage}`:`${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`}
                              alt="Collections" className="img-fluid mr-2 user_ul_new align-self-center" />
                          )}
                        <div className="media-body flex_body">
                          <div>
                            <p className="mt-0 banner_desc_user mb-0 font_14 not_banner_dessc mr-1">{item.tokenName}</p>
                            <p className="mt-0 banner_desc_user mb-0 font_12 not_banner_dessc mr-1">
                              {(
                                item
                                && item.tokenowners_current
                                && item.tokenowners_current.tokenPrice > 0)
                                && <span>{item.tokenowners_current.tokenPrice} {item.tokenowners_current.coinName}   </span>}
                              {(

                                item
                                && item.tokenowners_current.clocktime == null
                                && item.tokenowners_current.endclocktime == null
                                && item.tokenowners_current
                                && (item.tokenowners_current.tokenPrice == 0 || item.tokenowners_current.tokenPrice == null)
                                && <span> Open for Bid </span>)}

                              {
                                item
                                && item.tokenowners_current.clocktime != null
                                && item.tokenowners_current.endclocktime != null
                                && item.tokenowners_current.minimumBid
                                && item.tokenowners_current.minimumBid != 0
                                && <span>{item.minimumBid} {config.tokenSymbol}   </span>}

                            </p>
                          </div>
                        </div>
                      </div>

                    </li>

                  )}

              </ul>

              {UsersearchItem.length != 0 && <p className="font_we_700">Users</p>}

              <ul className="noti_ul_dd">
                {
                  UsersearchItem && UsersearchItem.map((searchUser) =>
                    searchUser&&
                    <li className="px-3" onClick={() => history.push(searchUser.customurl != "" ? `/${searchUser.customurl}` : `/user/${searchUser.curraddress}`)}>
                      <div className="media">
                        {searchUser && searchUser.image != "" ?
                          <img src={`${config.Back_URL}/images/${searchUser._id}/${searchUser.image}`} alt="User" className="img-fluid mr-2 user_ul_new align-self-center" />
                          :

                          <Avatars item="img-fluid mr-2 user_ul_new align-self-center" />

                        }
                        {/* <img src={require("../../assets/images/collections_02.png")} alt="User" className="img-fluid mr-2 user_ul_new align-self-center" /> */}
                        <div className="media-body flex_body">
                          <div>
                            <p className="mt-0 banner_desc_user mb-0 font_14 not_banner_dessc mr-1">{searchUser.name}</p>
                            {/* <p className="mt-0 banner_desc_user mb-0 font_12 not_banner_dessc">{((searchUser.count!=0)?searchUser.count:0)+'  Followers'} </p> */}
                          </div>

                        </div>
                      </div>

                    </li>
                  )}
              </ul>
             
            </Scrollbars>
           
            <div className="text-center">
            <ul className="noti_ul_dd">
              {(searchItem.length == 0 && UsersearchItem.length ==0 && keyword !== "")&& <h4 className="mt-3 mb-3" style={{color:'white'}}>No data Found</h4>}

              </ul>
              {/* <button className="btn new_btn_grad" tabIndex="0" type="button" onClick={() => { seachByKeyword() }}><span><Link to='/search'>Search</Link></span></button> */}
            </div>
          </div>}

        </ListItem>
        
        {(Wallet_Details.UserAccountAddr != "")&&
        // <ListItem className={classes.listItem+ " menu_dropdown dropdown_header_ul theme_dd_ul pl-cust-theme"} onClick={toggleThememenuRes}>
        <ListItem className={classes.listItem+ " userCircle menu_dropdown dropdown_header_ul my_items_menu hover_menu theme_dd_ul pl-cust-theme"}> 
        <a className={classes.navLink}><AccountCircle className="menu_icons"/> </a>
          <div className="noti_parent noti_parnt_user thememneu_dd_res" id="thememneu_dd_res">
            <div className="px-0">
            <ul className="user_prof_ul pt-0 mt-0 mb-0">
              <li>
                <Link to="/my-items"><span><i class="fas fa-user mr-2"></i>My Items</span></Link>
                {/* <Link to="/edit-profile"><span><i class="fas fa-user mr-2"></i>My profile</span></Link> */}
                </li>
              <li>
                <Link to="/edit-profile"><span><i class="fa fa-cog" aria-hidden="true"></i>&nbsp;&nbsp;Profile Settings</span></Link>
                {/* <Link to="/my-items"><span><i class="fas fa-file-image mr-2"></i>My items</span></Link> */}
                </li>
              
                
              
             
            </ul>

              </div>
           
           
          
           
            </div>
        </ListItem>}

        {

          Wallet_Details.UserAccountAddr != "" &&
        <ListItem className={classes.listItem +" menu_dropdown dropdown_header_ul notifications_menu hover_menu res_dd_ul bell_hover pl-res-res notify"}>
          <Link className={classes.navLink} to="#"><i class="fa fa-bell"></i>&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></Link>
          <div className="noti_parent thememneu_dd_res">
            <div className="notificationsDropdownBg">
              <p className="sub-title">Notifications</p>
              {notificationss.map((item) => {
                  return (
                    item.statusOpen == "new" &&
                    <span className="green_circle_dot"></span>
                  )
                })}


                    <ul className="noti_ul_dd">
                      {
                        notificationss.length != 0 ?
                          notificationss.map((item) => {
                            return (
                              <li className="px-3" onClick={() => statusChangeactivity(item)}>

                                <div className="media">
                                  {item.to &&
                                    <>
                                      {
                                        item
                                        && item.touserField
                                        && item.touserField.image
                                        && item.touserField.image != ""
                                        && <img onClick={() => history.push(item.touserField.customurl != "" ? `/:${item.touserField.customurl}` : `/user/${item.to}`)} src={`${config.Back_URL}/images/${item.touserField._id}/${item.touserField.image}`} alt="User" className="img-fluid mr-2 img_user_noti align-self-center" />

                                      }
                                      {
                                        item.touserField === undefined
                                        || item.touserField.image === undefined
                                        || item.touserField.image == ""
                                        && <Avatars onClick={() => history.push(item.touserField.customurl != "" ? `/:${item.touserField.customurl}` : `/user/${item.to}`)} item="img-fluid mr-2 img_user_noti align-self-center" />
                                      }
                                    </>}
                                  <div className="media-body flex_body">
                                    <div>
                                      <p className="mt-0 banner_desc_user mb-0 font_14 not_banner_dessc not_banner_dessc_new mr-1">

                                        {item.to
                                          && <span title={"User :  " + ((item.touserField && item.touserField.name != "") ? item.touserField.name : String(item.to))} className="user_noti_colr mr-1" onClick={() => history.push(item.touserField && item.touserField.customurl != "" ? `/${item.touserField.customurl}` : `/user/${item.to}`)}>
                                            @{(item.touserField && item.touserField.name != "") ? item.touserField.name : String(item.to).slice(0, 6).concat('...')}</span>
                                        }

                                        <span onClick={() => history.push(`/info/${item.contractAddress}/${item.tokenCounts}`)}>{item.tokenField && item.tokenField.tokenName != "" && item.tokenField.tokenName}</span> 	{item.activity}
                                        <span onClick={() => history.push(item.userField && item.userField.customurl != "" ? `/${item.userField.customurl}` : `/user/${item.from}`)} className="user_noti_colr mr-1" title={"Token Owner : " + ((item.userField && item.userField.name != "") ? item.userField.name : String(item.from))}
                                        > @{(item.userField && item.userField.name != "") ? item.userField.name : String(item.from).slice(0, 6).concat('...')}</span></p>
                                      <p className="mt-0 banner_user font_10 mb-0 banner_user_new mr-1">
                                        {moment(item.created).format('MMMM Do YYYY, h:mm a')}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                              </li>
                            )
                          })
                          :
                          <p className="no_noti">No new notifications</p>

                      }

                    </ul>
                 


                
              

            </div>
          </div>
        </ListItem>}
      
        
        {/* {

          Wallet_Details.UserAccountAddr != "" &&
          <ListItem className={classes.listItem + " menu_dropdown dropdown_header_ul noti_ul noti_tb_trans bell"}>
            <CustomDropdown
              noLiPadding
              buttonText={<div><Notifications className="menu_icons notif" />
                <span className="icon_txt">Notifications</span>
                {notificationss.map((item) => {
                  return (
                    item.statusOpen == "new" &&
                    <span className="green_circle_dot"></span>
                  )
                })}
              </div>}
              dropdownList={[
                <div className="noti_parent">
                  <p className="noti_head">Notifications</p>
                  <Scrollbars style={{ height: 210 }}>
                    <ul className="noti_ul_dd">
                      {
                        notificationss.length != 0 ?
                          notificationss.map((item) => {
                            return (
                              <li className="px-3" onClick={() => statusChangeactivity(item)}>

                                <div className="media">
                                  {item.to &&
                                    <>
                                      {
                                        item
                                        && item.touserField
                                        && item.touserField.image
                                        && item.touserField.image != ""
                                        && <img onClick={() => history.push(item.touserField.customurl != "" ? `/:${item.touserField.customurl}` : `/user/${item.to}`)} src={`${config.Back_URL}/images/${item.touserField._id}/${item.touserField.image}`} alt="User" className="img-fluid mr-2 img_user_noti align-self-center" />

                                      }
                                      {
                                        item.touserField === undefined
                                        || item.touserField.image === undefined
                                        || item.touserField.image == ""
                                        && <Avatars onClick={() => history.push(item.touserField.customurl != "" ? `/:${item.touserField.customurl}` : `/user/${item.to}`)} item="img-fluid mr-2 img_user_noti align-self-center" />
                                      }
                                    </>}
                                  <div className="media-body flex_body">
                                    <div>
                                      <p className="mt-0 banner_desc_user mb-0 font_14 not_banner_dessc not_banner_dessc_new mr-1">

                                        {item.to
                                          && <span title={"User :  " + ((item.touserField && item.touserField.name != "") ? item.touserField.name : String(item.to))} className="user_noti_colr mr-1" onClick={() => history.push(item.touserField && item.touserField.customurl != "" ? `/${item.touserField.customurl}` : `/user/${item.to}`)}>
                                            @{(item.touserField && item.touserField.name != "") ? item.touserField.name : String(item.to).slice(0, 6).concat('...')}</span>
                                        }

                                        <span onClick={() => history.push(`/info/${item.contractAddress}/${item.tokenCounts}`)}>{item.tokenField && item.tokenField.tokenName != "" && item.tokenField.tokenName}</span> 	{item.activity}
                                        <span onClick={() => history.push(item.userField && item.userField.customurl != "" ? `/${item.userField.customurl}` : `/user/${item.from}`)} className="user_noti_colr mr-1" title={"Token Owner : " + ((item.userField && item.userField.name != "") ? item.userField.name : String(item.from))}
                                        > @{(item.userField && item.userField.name != "") ? item.userField.name : String(item.from).slice(0, 6).concat('...')}</span></p>
                                      <p className="mt-0 banner_user font_10 mb-0 banner_user_new mr-1">
                                        {moment(item.created).format('MMMM Do YYYY, h:mm a')}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                              </li>
                            )
                          })
                          :
                          <p className="no_noti">No new notifications</p>

                      }

                    </ul>
                  </Scrollbars>


                </div>
              ]}
            />
          </ListItem>} */}

        {((
          Wallet_Details.UserAccountAddr == ""
        )
        ) ?
          <ListItem className={classes.listItem}>
            <Button className={classes.navLink + " create_btn ml-2 btn_connect_new"} data-toggle="modal" data-target="#connect_modal">
              <div >Connect</div>
            </Button>
          </ListItem>
          :
          (
          // <ListItem className={classes.listItem + " dropdown_header_ul user_dd_ul wallet"} onClick={toggleUsermenu}>
          <ListItem className={classes.listItem + " dropdown_header_ul user_dd_ul wallet wallet_menu hover_menu"}>
            <Button color="transparent" className={classes.navLink + " pl-cust-wal"}>
              <AccountBalanceWallet className="menu_icons wallet" />
              <span className="icon_txt">Wallet</span>
            </Button>
            <div className="noti_parent noti_parnt_user usemneu_dd " id="usemneu_dd">
            <p className="noti_head pt-4 px-2 mb-0">
                <span title={!isEmpty(Wallet_Details.AddressUserDetails) ? (Wallet_Details.AddressUserDetails.name!=""?Wallet_Details.AddressUserDetails.name:''):''}>{!isEmpty(Wallet_Details.AddressUserDetails) ? (Wallet_Details.AddressUserDetails.name!=""?Wallet_Details.AddressUserDetails.name:undefined):undefined}
                </span>
              </p>
              <p className="noti_head pt-4 px-2 mb-0">
                <span >{Wallet_Details.Wallet_Type}
                </span>

              </p>
              <p className="noti_head pt-4 px-2 mb-0">
                <span title={Wallet_Details.UserAccountAddr != "" && (Wallet_Details.UserAccountAddr)}>{Wallet_Details.UserAccountAddr != "" && (Wallet_Details.UserAccountAddr).substring(0, 8).concat('.....')}
                  <CopyToClipboard text={Wallet_Details.UserAccountAddr} onCopy={() => copyText('invite link', Wallet_Details.UserAccountAddr)}>
                    <i className="fas fa-sticky-note notes_fa cur_pointer"></i>
                  </CopyToClipboard>
                </span>

              </p>
              
              <div className="rounded-0 px-2">
                {/* <p className="info_des">oxc4c16ab5ac7d...b21a<i className="fas fa-sticky-note notes_fa cur_pointer"></i></p> */}
                <div className="media header_media pt-3">
                  <img src={require("../../assets/images/BNB.png")} alt="User" className="img-fluid mr-3 coin_header" />
                  <div className="media-body flex_body">
                    <div>
                      <p className="mt-0 media_num">BNB Balance</p>
                      <p className="balance_txt_header pt-0 mb-0">
                        <span>{(Wallet_Details.UserAccountBal != "" || Wallet_Details.UserAccountBal != 0) ?
                          <> {Number(Wallet_Details.UserAccountBal).toFixed(config.toFixed)} {config.currencySymbol}
                            ( $ <Convert1
                              item={Wallet_Details.UserAccountBal}
                              convertVal={Wallet_Details.currency_usd_value}
                            />)
                          </>
                          : <>0 BNB ($ 0 USD) </>
                        }
                        </span>
                      </p>

                    </div>

                  </div>
                </div>
                <div className="media header_media pt-3">
                  <img src={require("../../assets/images/Wen.png")} alt="User" className="img-fluid mr-3 coin_header" />
                  <div className="media-body flex_body">
                    <div>
                      <p className="mt-0 media_num">{config.tokenSymbol} Balance</p>
                      <p className="balance_txt_header pt-0 mb-0">
                        <span>{Wallet_Details.Wen_Bln != 0 && isNaN(Wallet_Details.Wen_Bln)==false ?

                          <>  <Convert
                            item={Number(Wallet_Details.Wen_Bln)}
                            convertVal={1}
                            coinName={config.tokenSymbol}
                          />
                            {config.tokenSymbol}
                            ($ <Convert1
                              item={Number(Wallet_Details.Wen_Bln)}
                              convertVal={Number(Wallet_Details.token_usd_value)}
                            /> USD)
                          </>
                          : <> 0 {config.tokenSymbol} ( $ 0 USD) </>
                        }

                        </span>
                      </p>

                    </div>

                  </div>
                </div>
                <ul className="user_prof_ul mt-4">
                  {/* <li>
                    <Link to="/my-items"><span><i className="fas fa-user mr-2"></i>My profile</span></Link>
                  </li>
                  <li>
                    <Link to="/edit-profile"><span><i className="fas fa-file-image mr-2"></i>Profile Settings</span></Link>
                  </li> */}

                  <li >
                   <div onClick={Disconnect} className="disconnect"> <Link to="/"><span><i className="fas fa-sign-out-alt mr-2"></i>Disconnect</span></Link></div>
                  </li>
                </ul>
              </div>
            </div>
          </ListItem>
         
          )}
           <ListItem className="theme_changer">
            <li className="swithcj_li">
              <div className="d-flex justify-content-between align-items-center heade_switch">
                {/* <div>
                <span className="hsder_ul_spn">
                  <i class="fas fa-lightbulb mr-2"></i>
                  Light / Dark</span>
                </div> */}
                <label className="switch toggle_custom">
                  <input type="checkbox" id="checkbox1" className=""
                  onChange={(e)=>{
                    if(localStorage.theme =="light_theme"){
                    localStorage.setItem("theme","dark_theme");
                    if(window.innerWidth<1279){
                    document.getElementsByClassName("mobile_nav")[0].classList.add("dark_theme");
                    document.getElementsByClassName("mobile_nav")[0].classList.remove("light_theme");
                    }
                    setthemeval(true)
                    }
                    else{
                      document.getElementById("root").classList.remove("dark_theme");
                      if(window.innerWidth<1279){
                      document.getElementsByClassName("mobile_nav")[0].classList.add("light_theme");
                      document.getElementsByClassName("mobile_nav")[0].classList.remove("dark_theme");
                      }
                      localStorage.setItem("theme","light_theme")
                      setthemeval(false)
                    }
                    setChangeTheme(!changeTheme)}}
                    checked={themeval} />
                  <span className="slider" ></span>
                </label>
              </div>
                
                </li>
          </ListItem>
      </List>
  
      <div>


  
      {Wallet_Details.UserAccountAddr=='' && Wallet_Details.load == 'true' &&
           (
                location_pathname == 'my-items'
             || location_pathname == 'user'
             || location_pathname == 'info'
             || location_pathname == 'following'
             || location_pathname == 'activity'
             || location_pathname == 'edit-profile'
             || location_pathname == 'create-single'
             || location_pathname ==  'create-multiple'
             || location_pathname ==  ''
           
         ) &&
        <Modal
          isOpen={true}
          ariaHideApp={false}
          style={{
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
            },}}
          contentLabel="Example Modal"
        >
          <>
         
          <>
          <div className="text-center"><h5 className="modal-title react_modal_title" id="wallet_connect_modalLabel_1">Network Loading</h5></div>
          <div className="modal-body">
            <div className="text-center icon_coin_net">
            </div>
            <div className="update_cover_div_1" id="update_cover_div_1">
              <p className="mt-0 approve_desc text-center mb-0">Waiting For Network</p>
            </div>
            <div className="loader-1"></div>

          </div></>
         
          </>

        </Modal>
      }
        {Wallet_Details.UserAccountAddr=='' && Wallet_Details.load=='false'&&
           (
            location_pathname == 'my-items'
             || location_pathname == 'following'
             //|| location_pathname == 'activity'
             || location_pathname == 'edit-profile'
           
         ) &&
        
        <Modal
          isOpen={true}
          ariaHideApp={false}
          style={{
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
            },}}
          contentLabel="Example Modal"
        >
         
         
        
          <div className="text-center"><h5 className="modal-title react_modal_title" id="wallet_connect_modalLabel_1">Connect Network</h5></div>
          <div className="modal-body">
            <div className="text-center icon_coin_net">
            </div>
            <div className="update_cover_div_1" id="update_cover_div_1">
              <p className="mt-0 approve_desc text-center mb-0">Please Connect to Wallet</p>
            </div>
            <div className="loader-1"></div>

          </div>
        
          

        </Modal>}

        {Wallet_Details.load==='wrong'&&
             (
              location_pathname == 'my-items'
              || location_pathname == 'user'
               || location_pathname == 'info'
               || location_pathname == 'following'
               || location_pathname == 'activity'
               || location_pathname == 'edit-profile'
               || location_pathname  == 'create-single'
               || location_pathname  ==  'create-multiple'
               || location_pathname ==  ''
             
           ) &&
        <Modal
          isOpen={true}
          ariaHideApp={false}
          style={{
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
            },}}
          contentLabel="Example Modal"
        >
          <>
         
          <>
          <div className="text-center"><h5 className="modal-title react_modal_title" id="wallet_connect_modalLabel_1">Wrong Network </h5></div>
          <div className="modal-body">
            <div className="text-center icon_coin_net">
            </div>
            <div className="update_cover_div_1" id="update_cover_div_1">
              <p className="mt-0 approve_desc text-center mb-0">Please Connect to Binance Network</p>
            </div>
            <div className="loader-1"></div>
            {/* <div className="text-center">
              <Button className="create_btn btn-block">Switch Network</Button>
            </div> */}
          </div></>
          </>

        </Modal>
        }
 
    </div>
    </div>
    
      {/* <div class="modal fade" id="TermsOf_Service_modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Atalux Terms of Service</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>Please take a few minutes to read and understand atalux terms of service.To continue, you'll need to accept the terms of service by checking the box.</p>
              <div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="customCheck1" /><label class="custom-control-label" for="customCheck1"></label>&emsp;I am atleast 18years old</div>
              <div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="customCheck2" /><label class="custom-control-label" for="customCheck2"></label>&emsp;I accept the artalux<a href="#">&nbsp;Terms Of Service</a></div>
              <div className="form-group">

              </div>
            </div>
            <div class="modal-footer">
            <button class="MuiButtonBase-root MuiButton-root MuiButton-text create_btn btn-block" tabindex="-1" type="button" disabled=""><span class="MuiButton-label">Proceed</span></button>
            <button class="MuiButtonBase-root MuiButton-root MuiButton-text btn_outline_red btn-block" tabindex="0" type="button" data-dismiss="modal" aria-label="Close"><span class="MuiButton-label">Cancel</span><span class="MuiTouchRipple-root"></span></button>
            </div>
          </div>
        </div>
      </div> */}
    
      <div className="modal fade primary_modal" id="termsmodal" tabIndex="-1" role="dialog" aria-labelledby="create_item_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
				<div className="modal-dialog modal-dialog-centered modal-sm" role="document">
					<div className="modal-content">
        
						<div className="modal-header text-center">
             
							<h5 className="modal-title" >Artalux Terms Of Service</h5>
              
							<button type="button" className="close" data-dismiss="modal" aria-label="Close" class = "d-none" id="closetc" onClick={()=>closeTC()}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
            {/* <p>{ReactHTMLParser(contents.answer)} </p> */}
							<p className="text-justify">Please take a few minutes to read and understand <Link to="/termsandconditions">Artalux terms of service</Link>.&nbsp;To continue, you'll need to accept the terms of service by checking the box.</p>
              <div className="my-4">
              <div class="check pl-4">
                    <input type="checkbox" class="form-check-input" value="" checked={checkbox1} onChange={()=>{setcheckbox1(!checkbox1)}}/>I am atleast 18 years old
                </div>
                <div class="check pl-4">
                    <input type="checkbox" class="form-check-input" value="" checked={checkbox2} onChange={()=>{setcheckbox2(!checkbox2)}}/> I accept Artalux terms and service.
                </div>
                </div>
            </div>
            <div class="modal-footer d-block">
            <button class="MuiButtonBase-root MuiButton-root MuiButton-text create_btn btn-block d-block w-100 mb-4" tabindex="-1" type="button" disabled="" onClick={()=>handleterms()}><span class="MuiButton-label">Proceed</span></button>
            {/* <button class="MuiButtonBase-root MuiButton-root MuiButton-text btn_outline_red btn-block d-block w-100 h-auto py-2" tabindex="0" type="button" data-dismiss="modal" aria-label="Close"><span class="MuiButton-label">Cancel</span><span class="MuiTouchRipple-root"></span></button> */}
            </div>
					</div>
				</div>
			</div>
</>
    );
}




