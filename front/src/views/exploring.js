
/**
 * FILE		   	:	following
 * DISPATCH		:	NiL
 * REF			  :	Nil
 * METHOD   	: CollectiblesList_Follow,
 * C-DATE   	: 30_01_22
 * S-DATE   	: 30-01-22
*/


import React, { useEffect,useState,useRef } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Button, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styled from "styled-components";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link } from "react-router-dom";
// my side
import { CollectiblesList_Follow } from "actions/v1/token";
import TokenCard from './separate/TokenCard'

import { CancelOrderRef } from './separate/CancelOrderRef';
import { LikeRef } from './separate/LikeRef';
import { BurnRef } from './separate/BurnRef';
import { PutOnSaleRef } from './separate/PutOnSaleRef';
import { PurchaseNowRef } from './separate/PurchaseNowRef';

import { ReportNowRef } from './separate/ReportNowRef';
import { ShareNowRef } from './separate/ShareNowRef';
import { useSelector } from "react-redux";
const Icon = styled(props => (
  <div {...props}>
    <div className="minus">-</div>
    <div className="plus">+</div>
  </div>
))`
  & > .plus {
    display: block;
    color: #3d2524;
    font-size: 24px;
  }
  & > .minus {
    display: none;
    color: #3d2524;
    font-size: 24px;
  }
  .Mui-expanded & > .minus {
    display: flex;
  }
  .Mui-expanded & > .plus {
    display: none;
  }
`;

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function exploring(props) {
  const Wallet_Details = useSelector(state => state.wallet_connect_context);

  var LikeForwardRef = useRef();
  var PutOnSaleForwardRef = useRef();
  var PurchaseNowForwardRef = useRef();
  var BurnForwardRef = useRef();
  var CancelOrderForwardRef = useRef();
  var ReportForwardRef = useRef();
  var ShareForwardRef = useRef();
  var PlaceABidForwardRef = useRef();

  const classes = useStyles();
  const { ...rest } = props;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChangeFaq = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
const Refresh_page=()=>{
  setCollectibles([])
  getfollowing()
}

// myside
    const [collectibles, setCollectibles] = useState([]);
    const [LikedTokenList, setLikedTokenList] = useState([]);
    const [tokenCounts_Detail, Set_tokenCounts_Detail] = useState({});
    const [MyTokenBalance, Set_MyTokenBalance] = useState(0);
    const [Bids, Set_Bids] = useState([]);
    const [YouWillPay, Set_YouWillPay] = useState(0);
    const [YouWillPayFee, Set_YouWillPayFee] = useState(0);
    const [YouWillGet, Set_YouWillGet] = useState(0);
    const [AllowedQuantity, Set_AllowedQuantity] = useState({});
    const [BuyOwnerDetailFirst, Set_BuyOwnerDetailFirst] = useState({});
    const [MyTokenDetail, Set_MyTokenDetail] = useState({});
   
    useEffect(() => {
			getfollowing();
		}, [])
		const getfollowing = async (filterParam) => {
	
		if(Wallet_Details.UserAccountAddr!=""){
      var resp = await CollectiblesList_Follow({
				target :'following',
				addr : Wallet_Details.UserAccountAddr,
			 });
			
			  if (resp.data && resp.data.list!=0) {
				setCollectibles(resp.data.list)
			  }
        else{
          setCollectibles([])
        }
		}}
  


  return (
    <div className="inner_header">
        <div className={classes.pageHeader + " inner_pageheader pt-0"}>
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
          <img src={require("../assets/images/logo.svg")} alt="logo" className="img-fluid"/></Link>}
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 50,
          color: "dark"
        }}
        {...rest}
      />
      <ScrollToTopOnMount/>
      <div className={classes.pageHeader + " inner_pageheader"}>
      <section className="navtabs pb-5 tabsheight" id="explore">
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
      </section>
      </div>
      </div>
      <Footer/>
         </div>
  );
}
