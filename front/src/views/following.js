
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
import styled from "../../node_modules/styled-components";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link } from "react-router-dom";
// my side
import { CollectiblesList_Follow } from "actions/v1/token";
import TokenCard from '../views/separate/TokenCard'

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

export default function Following(props) {
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
      
		}, [Wallet_Details.UserAccountAddr])
		const getfollowing = async (filterParam) => {
      //("getr foll call form useeffect ",Wallet_Details.UserAccountAddr);
	
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
        <div className="bg_red_1">
        <div className="container">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className="d-flex align-items-center">
                <h2 className="inner_title">Following</h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        </div>
        <div className="container mt-3 navtabs ">
        <div className="row m-0 ma_no_gap">
        {
						collectibles && collectibles.map((item) =>{
              return(
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
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
              })					
            }
                </div>

        </div>
      </div>
      </div>
      <Footer/>
         </div>
  );
}
