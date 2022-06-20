
/**
 * FILE		  :	  Header
 * DISPATCH	:	  Connect,Disconnect
 * METHOD   :   notifications,getSearchList
 * STATE 	  : 	notification,searchItem,usersearchItem,keyword
 * C-DATE   :   24_01_22
 * S-DATE   :   24-01-22
*/

import React, { useState, useEffect, useRef } from "react";
import { Notifications, AccountBalanceWallet } from '@material-ui/icons';
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

//myside
import CopyToClipboard from "react-copy-to-clipboard";
import config from '../../lib/config';
import { getSearchList } from "actions/v1/user";
import Avatars from "views/Avatar";
import { notifications, notificationStatusChange } from '../../actions/v1/report';
import Convert1 from '../../views/separate/Convert1'
import isEmpty from '../../lib/isEmpty'
import moment from 'moment'
import Convert from 'views/separate/Convert';
import 'react-toastify/dist/ReactToastify.css';

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
  var pathVal='';
  if (location.pathname) {
    if (location.pathname.split('/').length >= 2) {
      pathVal = location.pathname.split('/')[1];
    }
  }

  

  const toggletheme = () => {

    document.getElementById("root").classList.toggle('dark_theme');
    var usebody = document.getElementsByClassName("mobile_nav");
    for (var j = 0; j < usebody.length; j++) {
      usebody[j].classList.toggle('dark_theme')
    }


  };
  const toggleUsermenu = () => {
    var useclass = document.getElementsByClassName("usemneu_dd");
    for (var i = 0; i < useclass.length; i++) {
      useclass[i].classList.toggle('d-none')
    }
  }

  const [keyword, setKeyword]               = useState();
  const [searchItem, setSearchItem]         = useState([])
  const [UsersearchItem, setUserSearchItem] = useState([])
  const [notificationss, setnotificationss] = useState([])
  const [location_pathname, Set_location_pathname] = useState(pathVal);
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
    if (data && data.searchlist && data.searchlist.items && data.searchlist.items.list) {
      setSearchItem(data.searchlist.items.list);
    }
    if (data && data.searchlist && data.searchlist.users) {
      setUserSearchItem(data.searchlist.users);
    }
   

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

    notification(Wallet_Details.UserAccountAddr)

  }, []);


  const notification = async (currAddr) => {

    var reqdata = {
      currAddr: currAddr,
      limit: 12
    }
    if (currAddr) {
      var noti = await notifications(reqdata)
      if (noti && noti.data && noti.data.data) {
        setnotificationss(noti.data.data)
      }
    }
  }

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
   }


  return (
    <div>


      <List className={classes.list + " main_navbar"}>

        <ListItem className={classes.listItem + " menu_dropdown dropdown_header_ul user_dd_ul ml-0"}>
          <div className="search_inp_group">
            <input type="text" className="search_inp" placeholder="Search collections / creators" onChange={toggleSearchmenu} />
            <div className="search_inp_group_append">
              <i className="fas fa-search"></i>
            </div>
          </div>
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
              {(searchItem.length == 0 && UsersearchItem.length ==0 )&& <h4 className="mt-3 mb-3" style={{color:'white'}}>No data Found</h4>}

              </ul>
              <button className="btn new_btn_grad" tabIndex="0" type="button" onClick={() => { seachByKeyword() }}><span><Link to='/search'>Search</Link></span></button>
            </div>
          </div>

        </ListItem>

        <ListItem className={classes.listItem}>
          <a href="https://token.bidpixels.com/" target="_blank" className={classes.navLink}>Buy Token</a>
        </ListItem>

        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} to="/token-BPX-BSC-0x8cb6aa6e8575d87961bd01d2ff09007c2499ec56">Token Info</Link>
        </ListItem>

        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} to="/my-items">My items</Link>
        </ListItem>

        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} to="/following">Following</Link>
        </ListItem>

        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} to="/activity">Activity</Link>
        </ListItem>

        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} to="/how-it-works">How It Works</Link>
        </ListItem>


        <ListItem className={classes.listItem}>
          <Link to="/create"> <Button className={classes.navLink + " create_btn"}>
            Create
          </Button></Link>
        </ListItem>
        {

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
          </ListItem>}

        {((
          Wallet_Details.UserAccountAddr == ""
        )
        ) ?
          <ListItem className={classes.listItem}>
            <Button className={classes.navLink + " create_btn ml-2"} data-toggle="modal" data-target="#connect_modal">
              <div >Connect</div>
            </Button>
          </ListItem>
          :
          (<ListItem className={classes.listItem + " dropdown_header_ul user_dd_ul wallet"} onClick={toggleUsermenu}>
            <Button color="transparent" className={classes.navLink + " pl-cust-wal"}>
              <AccountBalanceWallet className="menu_icons wallet" />
              <span className="icon_txt">Wallet</span>
            </Button>
            <div className="noti_parent noti_parnt_user usemneu_dd d-none" id="usemneu_dd">
            <p className="noti_head pt-4 mb-0">
                <span title={!isEmpty(Wallet_Details.AddressUserDetails) ? (Wallet_Details.AddressUserDetails.name!=""?Wallet_Details.AddressUserDetails.name:''):''}>{!isEmpty(Wallet_Details.AddressUserDetails) ? (Wallet_Details.AddressUserDetails.name!=""?Wallet_Details.AddressUserDetails.name:undefined):undefined}
                </span>
              </p>
              <p className="noti_head pt-4 mb-0">
                <span >{Wallet_Details.Wallet_Type}
                </span>

              </p>
              <p className="noti_head pt-4 mb-0">
                <span title={Wallet_Details.UserAccountAddr != "" && (Wallet_Details.UserAccountAddr)}>{Wallet_Details.UserAccountAddr != "" && (Wallet_Details.UserAccountAddr).substring(0, 8).concat('.....')}
                  <CopyToClipboard text={Wallet_Details.UserAccountAddr} onCopy={() => copyText('invite link', Wallet_Details.UserAccountAddr)}>
                    <i className="fas fa-sticky-note notes_fa cur_pointer"></i>
                  </CopyToClipboard>
                </span>

              </p>
              <div className="px-3">
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
                  <li>
                    <Link to="/edit-profile"><span><i className="fas fa-user mr-2"></i>My profile</span></Link>
                  </li>
                  <li>
                    <Link to="/my-items"><span><i className="fas fa-file-image mr-2"></i>My items</span></Link>
                  </li>

                  <li >
                   <div onClick={Disconnect}> <Link to="/"><span><i className="fas fa-sign-out-alt mr-2"></i>Disconnect</span></Link></div>
                  </li>
                </ul>
              </div>
            </div>
          </ListItem>
          )}
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
             || location_pathname == 'activity'
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
    
    );
}
