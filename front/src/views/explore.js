

import React, { useEffect, useState, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory,useLocation,useParams } from "react-router-dom";
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

import { useSelector,useDispatch } from 'react-redux'

// FILES
import {CollectiblesList_Home,CollectiblesList_MyItems,GetCategoryAction} from '../actions/v1/token'
import TokenCard from '../views/separate/TokenCard'
import axios from 'axios';
import config from '../lib/config';
import { CancelOrderRef } from './separate/CancelOrderRef';
import { LikeRef } from './separate/LikeRef';
import { BurnRef } from './separate/BurnRef';
import { PutOnSaleRef } from './separate/PutOnSaleRef';
import { PurchaseNowRef } from './separate/PurchaseNowRef';
import { ReportNowRef } from './separate/ReportNowRef';
import { ShareNowRef } from './separate/ShareNowRef';


let toasterOption = config.toasterOption;
const dashboardRoutes = [];
const useStyles = makeStyles(styles);


export default function Explores(props){

    const classes = useStyles();
    const history = useHistory();
  	const {Param_category} = useParams()
    const Wallet_Details = useSelector(state => state.wallet_connect_context);
    const dispatch=useDispatch();
    const location = useLocation();
   
    const { ...rest } = props;
    var LikeForwardRef = useRef();
    var PutOnSaleForwardRef = useRef();
    var PurchaseNowForwardRef = useRef();
    var BurnForwardRef = useRef();
    var CancelOrderForwardRef = useRef();
    var ReportForwardRef = useRef();
    var ShareForwardRef = useRef();
    var PlaceABidForwardRef = useRef();
    const [Explore_list, Set_Explore_List] = useState([]);
  const [LikedTokenList, setLikedTokenList] = useState([]);
  const [TokenList, setTokenList] = useState([]);
  const [CatName, setCatName] = useState('All');
  const [tabnamedata, settabnamedata] = useState("");
  const [CategoryOption, setCategoryOption] = useState([]);
 
  const [CatBasedTokenList, setCatBasedTokenList] = useState({ 'loader': false, 'All': { page: 1, list: [], onmore: true } });
 
  
 
 
    useEffect(()=>{
        TokenListCall();
      GetCategoryCall();
      
    },[])
    useEffect(()=>{
      // if (name != CatName) {
        // setCatName(name);
        if (typeof CatBasedTokenList[CatName] == 'undefined') {
          CatBasedTokenList[CatName] = { page: 1, list: [], onmore: true };
          setCatBasedTokenList(CatBasedTokenList);
          TokenListCall();
        }
        else{
          if( CatBasedTokenList[CatName].page !== 1){
            setCatBasedTokenList(CatBasedTokenList);
            TokenListCall();
          }
        }
      // }
    },[CatName])
    useEffect(()=>{

      catChange(Param_category)
     },[Param_category])


    const Refresh_page=()=>{

    }
    const onLoadMore = () => {
      CatBasedTokenList[CatName].page = CatBasedTokenList[CatName].page + 1;
      setCatBasedTokenList(CatBasedTokenList);
  
      TokenListCall({
        page: CatBasedTokenList[CatName].page + 1
      });
    }
   


    function ScrollToTopOnMount() {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      return null;
    }
    

  
    async function catChange(name) {
      if (name != CatName) {
      
        setCatName(name);
        if(name == "All"){settabnamedata("");}
        else{settabnamedata(name);}
        
        
        // if (typeof CatBasedTokenList[name] == 'undefined') {
        //   CatBasedTokenList[name] = { page: 1, list: [], onmore: true };
        //   setCatBasedTokenList(CatBasedTokenList);
        //   TokenListCall({ CatName: name, page: 1 });
        // }
      }
    }
    async function catChange1(name){
      history.push(`/explore/${name}`)
    }

    async function GetCategoryCall() {
      var resp = await GetCategoryAction()
      if (resp && resp.data && resp.data.list) {
        var CategoryOption = [];
  
        resp.data.list.map((item, index) => {
          CategoryOption.push({
            name: 'TokenCategory',
            value: item._id,
            label: item.name
          })
        })
        //("cat options ",CategoryOption);
       
        setCategoryOption(CategoryOption)
      }
    }
  
  
  
    async function TokenListCall(data = {}) {
     
      var currAddr = Wallet_Details.UserAccountAddr
      var name = CatName;
      if (data.CatName) {
       
        name = data.CatName
        //("cat name ",name);
      }
      
      var payload = {
        limit: 6,
        page: (CatBasedTokenList[name] && CatBasedTokenList[name].page) ? CatBasedTokenList[name].page : 1,
        currAddr: currAddr,
        CatName: name,
        from: 'Home',
      }
      //('payload ',payload);
      CatBasedTokenList.loader = true;
      setCatBasedTokenList(CatBasedTokenList);
       var resp = await CollectiblesList_Home(payload);
      // var resp = await CollectiblesList_MyItems(payload);
      
      CatBasedTokenList.loader = false;
      setCatBasedTokenList(CatBasedTokenList);
  
      if (resp && resp.data && resp.data.from == 'token-collectibles-list-home' && resp.data.list && resp.data.list.length > 0) {
       
        //("cat based tokenlist data check 2 ",resp.data.list)
         setTokenList(TokenList.concat(resp.data.list));
       
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
  
    const Explore_Category = async () => {
      var currAddr = Wallet_Details.UserAccountAddr;
      var payload = {
        category:Param_category,
        limit: config.limitMax,
         from: 'explore_category', 
         currAddr: currAddr, 
      }
      var resp = await CollectiblesList_Home(payload);
      if (resp && resp.data && resp.data.from == 'explore-category-token-collectibles-list-home' && resp.data.list && resp.data.list.length > 0) {
        Set_Explore_List(resp.data.list)
      }
      else {
        Set_Explore_List([])
      }
    }
  
return(
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
        <ScrollToTopOnMount/>
   <section className="navtabs pb-5 tabsheight" id="explore">
        <div className="container">
          <div className="topcreationlist">
            <h2>Explore</h2>
          </div>
          <div className="d-flex align-items-center overflow-hidden mt-5 flex_block_mob justify-content-center">

            <nav className="masonry_tab_nav items_tab_outer">
              <div className="nav nav-tabs masonry_tab primary_tab items_tab  items_tab_new pb-2 pl-2" id="nav-tab" role="tablist">
                <a className={(CatName === "All")?"nav-link active" : "nav-link"} onClick={() => catChange('All')} id="collectibles-tab" data-toggle="tab" href="#collectibles" role="tab" aria-controls="collectibles" aria-selected="false">
                  All items
                </a>
                {/* {
                  ['Art','Photo','Video','Music','Sports','Games','Collectibles','Jewellery','Virtual Worlds','VIP'].map((item) => {
                    return (
                      <a className={(CatName === item)?"nav-link active" : "nav-link"} onClick={() => catChange(item)} data-tabname={item} id={item + "tab"} data-toggle="tab" role="tab" aria-controls="all" aria-selected="true" key={Math.random()}> {item}</a>
                    )
                  })   
                } */}

                 {CategoryOption&&
                  CategoryOption.map((item) => {
                    return (
                      <>
                     
                      <a className={(CatName === item.label)?"nav-link active" : "nav-link"}  onClick={() => catChange1(item.label)} data-tabname={item.label} id={item + "tab"} data-toggle="tab" role="tab" aria-controls="all" aria-selected="true" key={Math.random()}> {item.label}</a>                   
                      </>
                    )
                  })
                }
                {/* {tabnamedata &&
                   <a className="nav-link active"   data-tabname={tabnamedata} id={tabnamedata + "tab"} data-toggle="tab" role="tab" aria-controls="all" aria-selected="true" key={Math.random()}> {tabnamedata}</a>                   
                  } */}
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
                        //("explore mappin check ",CatBasedTokenList[CatName])
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
                    <Button className="create_btn create_newbtnload mt-3 mx-auto btn-block load-more" id="onmore" onClick={onLoadMore} style={{ display: "flex" }}>
                      Load More
                    </Button>
                  </div>
                </div>) : ('')}
          </div>



        </div>
      </section>
   <Footer />
</div>
)}