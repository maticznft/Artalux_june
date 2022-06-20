
/**
 * FILE		   	:	search
 * DISPATCH		:	NiL
 * REF			  :	Nil
 * METHOD   	: CollectiblesList_Follow,
 * C-DATE   	: 30_01_22
 * S-DATE   	: 30-01-22
*/



import React,
{ useEffect, useState, useRef } from "react";
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
// myside
import { getSearchList } from "actions/v1/user";
import config from '../lib/config';
import isEmpty from "lib/isEmpty";
import TokenCard from "./separate/TokenCard"
import UserCard from './separate/UserCard'
import { CancelOrderRef } from './separate/CancelOrderRef';
import { LikeRef } from './separate/LikeRef';
import { BurnRef } from './separate/BurnRef';
import { PutOnSaleRef } from './separate/PutOnSaleRef';
import { PurchaseNowRef } from './separate/PurchaseNowRef';
import { ReportNowRef } from './separate/ReportNowRef';
import { ShareNowRef } from './separate/ShareNowRef';
import { PlaceAndAcceptBidRef } from './separate/PlaceAndAcceptBidRef';

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

export default function Activity(props) {
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

  // myside
  const [searchItem, setSearchItem] = useState([])
  const [UsersearchItem, setUserSearchItem] = useState([])
  const [LikedTokenList, setLikedTokenList] = useState([]);

 const [item, Set_item] = useState({});
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
    searchCall();
  }, [props.location.search])

  const Refresh_page=()=>{
    setSearchItem([])
    setUserSearchItem([])
    searchCall();
  }

  const searchCall = async () => {
    if (isEmpty(props.location.search))
      return false;
    const search = props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const keyword = params.get('search')

    let postData = {
      keyword: keyword,
      limit: parseInt(config.limitMax)
    }
    var data = await getSearchList(postData);

    if (data && data.searchlist && data.searchlist.items && data.searchlist.items.list) {
      setSearchItem(data.searchlist.items.list);
    }
    if (data && data.searchlist && data.searchlist.users) {
      setUserSearchItem(data.searchlist.users);
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
      <div className={classes.pageHeader + " inner_pageheader"}>

        <div className="container mt-3">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <nav className="masonry_tab_nav items_tab_outer text-center">
                <div className="nav nav-tabs masonry_tab primary_tab items_tab  items_tab_new pb-2 pl-2 text-center" id="nav-tab" role="tablist">
                <a className="nav-link active" id="items-tab" data-toggle="tab" href="#items" role="tab" aria-controls="all" aria-selected="true">
                    <span className="tab_head p-2">Items</span>
                  </a>

                 <a className="nav-link" id="users-tab" data-toggle="tab" href="#users" role="tab" aria-controls="following" aria-selected="false">
                    <span className="tab_head p-2">Users</span>
                  </a>
                  
                </div>
              </nav>
              <div className="tab-content explore_tab_content mt-2 navtabs" id="nav-tabContent">
                <div className="tab-pane fade show active" id="items" role="tabpanel" aria-labelledby="items-tab">
                  <div className="proposal_panel_overall">
                  {searchItem.length==0 ?
                    <div className="text-center py-5 ">
                      <p className="not_found_text">No items found</p>
                      <p className="not_found_text_sub">Come back soon! Or try to browse something for you on our marketplace</p>
                      <div className="mt-3">
                             {/* <Button className="create_btn"><Link to="/">Browse Marketplace</Link></Button> */}
                      
                      </div>
                    </div>
                    :
                    <div className="row mt-5">
                      {
                        searchItem.map((item,index) => 
                        {
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

                          )}
                      )}
                     
                    
                    </div>

                  }
                  </div>
                </div>


                <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
                  <div className="proposal_panel_overall">
                  {UsersearchItem.length==0?
                    <div className="text-center py-5">
                      <p className="not_found_text">No users found</p>
                      <p className="not_found_text_sub">Come back soon! Or try to browse something for you on our marketplace</p>
                      <div className="mt-3">
                        <Link to="/explore/All">
                        <Button className="create_btn">Browse Marketplace</Button>
                        </Link>
                      </div>
                    </div>:
                    <div className="followers_overall mt-5">
                      <div className="row">
                        {UsersearchItem.map((User)=>{return(
                        <div className="col-12 col-md-6 col-xl-4 mb-4">
                        <UserCard
                        User={User}
                        />
                         </div>
                        )})}
                      </div>
                    </div>}
                  </div>
                </div>
            
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
     </div>
  );
}
