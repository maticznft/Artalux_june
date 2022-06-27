import React, { useEffect, useState ,useRef } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import config from "lib/config";
import { v1_Activity } from "actions/v1/user";
import $ from 'jquery';

const dashboardRoutes = [];
const useStyles = makeStyles(styles);
// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
export default function Terms(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const Previous = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const Wallet_Details = useSelector(state => state.wallet_connect_context);

  const [sidebar, setSidebar] = useState(false);
  const [drop, setdrop] = useState(false);
  const [drop2, setdrop2] = useState(false);
  const [drop3, setdrop3] = useState(false);
  const [cngImage, setCngImage] = useState(false);
  const [Activity, setActivity] = useState([]);
  const [Filter, setFilter] = useState("purchase");
  const [Min, setMin] = useState(0);
  const [Max, setMax] = useState(0);
  const [Clicked, setClicked] = useState(false);
  const [LoadMore, setLoadMore] = useState(true);
  const [Page, setPage] = useState(1);
  const prevPage = Previous(Page)
  const prevFilter = Previous(Filter)
  const [ ShowModal,setShowModal] = useState(false)
  const [AllMineFilter,SetAllMineFilter] = useState("All") //// set "All" filter OR "userAccountAddr"

  // useEffect(()=>{
  //   changecss();
  // },[drop,drop2])

// const changecss = ()=>{
//   if(drop == true){
//     $(".fa-angle-down").addClass("angleRotate");
//    }
//    if(drop2 == true){
//     $(".fa-angle-down").addClass("angleRotate");
//    }
// }

//  if(setdrop == true){
//   $(".fa-angle-down").addClass("angleRotate");
//  }
//  if(setdrop2 == true){
//   $(".fa-angle-down").addClass("angleRotate");
//  }
  useEffect(() => {
   
    if(prevFilter !== Filter){
     
      setShowModal(true)
      GetActivity();}
    }, [Clicked, Filter,Page]);
  
    useEffect(()=>{
      GetActivity();
    },[AllMineFilter,Clicked])



    // const GetActivity = async () => {
    //   // alert("get activity call")
    //   var Arg = {
    //     Filter: Filter,
    //     Price: { min: Min, max: Max },
    //     Page: (prevFilter !== Filter)?1:Page,
    //     limit: 100
    //   };
    //   //("arg data for act page ",Arg);
    //   var Resp = await v1_Activity(Arg);
    //  // //("RespActivity", Resp.records.length);
    //   if (Resp.Success) {
    //     if (Resp.records.length > 0) {
    //       if((prevPage !== Page && Page !== 1) && prevFilter === Filter)
    //       {
    //         //("RespActivityww", prevFilter,Filter,Page,prevPage,Activity);
    //         var Act = Activity
    //         setActivity(Act.concat(Resp.records));
    //       }
    //       else{
    //         //("RespActivityww22", prevFilter,Filter,Resp.records,Activity);
    //         setActivity(Resp.records);
    //         if(prevFilter !== Filter)
    //           setPage(1)
    //       }
    //       setLoadMore(true);
    //     } else {
    //       if(prevPage === Page)
    //         setActivity(Resp.records);
    //       setLoadMore(false);
    //     }
    //     setTimeout(() => {
    //       setShowModal(false)
    //     }, 1500);
    //   } else {
    //     setActivity([]);
    //     toast.error("Error in Activity Fetch", { autoClose: 2000 });
    //   }
    // };

    const GetActivity = async () => {
       console.log("min mac val ",Min,Max)
     
      var Arg = {
        Filter: Filter,
        Price: { min: Min, max: Max },
        Page: (prevFilter !== Filter)?1:Page,
        limit: 100,
        pageFilter:AllMineFilter      // send "all" or "userwallet address"
      };
      //("arg data for act page ",Arg);
      var Resp = await v1_Activity(Arg);
     console.log("RespActivity", Resp.records.length);
      if (Resp.Success) {
        if (Resp.records.length > 0) {
          if((prevPage !== Page && Page !== 1) && prevFilter === Filter)
          {
            //("RespActivityww", prevFilter,Filter,Page,prevPage,Activity);
            var Act = Activity
            setActivity(Act.concat(Resp.records));
          }
          else{
            //("RespActivityww22", prevFilter,Filter,Resp.records,Activity);
            setActivity(Resp.records);
            if(prevFilter !== Filter)
              setPage(1)
          }
          setLoadMore(true);
        } else {
          if(prevPage === Page)
            setActivity(Resp.records);
          setLoadMore(false);
        }
        setTimeout(() => {
          setShowModal(false)
        }, 1500);
      } else {
        setActivity([]);
        toast.error("Error in Activity Fetch", { autoClose: 2000 });
      }
    };


    var CreatedTime = (Actdate) => {
      var today = new Date();
      var Christmas = new Date(Actdate);
      var diffMs = today - Christmas; // milliseconds between now & Christmas
      var diffDays = Math.floor(diffMs / 86400000); // days
      var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      return diffHrs === 0 && diffDays === 0
        ? `${diffMins} minutes ago`
        : diffDays === 0
        ? `${diffHrs} hours ago`
        : `${diffDays} days ago`;
    };
  
    function func(e) {
      var l = document.getElementById("chainbtn");
      for (var i = 0; i <= l.lenght - 1; i++) {
        var elem = e.target.children(i);
        //(elem);
        debugger;
        toggleimage();
      }
  
      var elem = e.target.children[0];
      //(elem);
      toggleimage();
    }
  
    // function changeImage(e) {
    //   //(e.target.id, document.getElementById(e.target.id + "_img").src);
    //   document.getElementById(e.target.id + "_img").src = img2;
    // }
    function toggleimage() {
      setCngImage(!cngImage);
    }
  
    function setBody() {
      setSidebar(!sidebar);
      var bodyScroll = document.getElementsByTagName("html");
      // //(usebody, "usebody home");
      for (var j = 0; j < bodyScroll.length; j++) {
        bodyScroll[j].classList.toggle("overflow_body");
      }
    }
    // var CheckImg= cngImage ? img1 : img2
    var imgeClass = sidebar
      ? " col-sm-6 col-md-4 col-lg-4"
      : " col-sm-6 col-md-4 col-lg-4";


    const setsalefilter = (filter)=>{
      //("data filter for sales ",filter);
      setFilter(filter)
      //("filter data ",Filter);
      GetActivity(filter)
    }
    

  return (
    <div className="inner_header">
     {console.log("data data data",Activity)}
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
      <ScrollToTopOnMount/>
      <div className={classes.pageHeader + " inner_pageheader"}>
        <div className={classes.container + " nft_activity"}>
            <div className="row">
           <div className="col-12 col-lg-4 col-md-4 col-sm-12">

               <div className="filter w-75 all_activity">
                    <h2>Filter</h2>
                    <div className="row">
                    <div className="status">
                        <button type="button" className="btn btn-Filter d-flex align-items-center px-0" onClick={()=>setdrop(!drop)} aria-controls="example-fade-text"
        ><h5 id="status" className={drop ? "status_rotation" :""}><span>Status</span><i class="fa fa-angle-down" aria-hidden="true"></i></h5></button>
                        <div className="status_sales" style={{height: drop ? "100%" : "0px",padding: drop ? "20px" : "0px", opacity:  drop ? "1" : "0"}}>
                            <ul class="d-flex align-items-center justify-content-start status_filter">
                                <li className={Filter == "purchase" ? "active" : " "}><button type="button" onClick={() => setFilter("purchase")}><i class="fa fa-shopping-cart" aria-hidden="true"  ></i>&nbsp;Sales</button></li>
                                <li className={Filter == "bid" ? "active" : " "}><button type="button"   onClick={() => setFilter("bid")}><i class="fa fa-gift" aria-hidden="true"></i>&nbsp;Offers</button></li>
                                <li className={Filter == "mint" ? "active" : " "}><button type="button"  onClick={() => setFilter("mint")}><i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;Mints</button></li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="price">
                    <button type="button"  className="btn btn-Filter d-flex align-items-center px-0" onClick={()=>setdrop2(!drop2)} aria-controls="example-fade-text"
        ><h5 id="price"className={drop2 ? "status_rotation" :""}><span>Price</span><i class="fa fa-angle-down" aria-hidden="true"></i></h5></button>
                 <div className="price_sales" style={{height: drop2 ? "100%" : "0px",padding: drop2 ? "20px" : "0px", opacity:  drop2 ? "1" : "0"}}>
                        <div className="price_input d-flex align-items-center justify-content-center">
                            <input type="number" className="form-control mr-auto" placeholder="Min"
                             onChange={(e) => {
                               console.log("e taeg ",e.target.value)
                              setMin(e.target.value);
                            }}/>
                            <span>to</span>
                            <input type="number" className="form-control ml-auto" placeholder="Max"
                             onChange={(e) => {
                              setMax(e.target.value);
                            }}/>
                        </div>
                        <div className="button">
                            <button type="submit" className="btn btn-default"
                            onClick={() => {
                              console.log("clicked",Min,Max)
                              setClicked(!Clicked);
                            
                            }}>Apply</button>
                        </div>
                    </div>
                </div>
                </div>
                <div className="row">
                      <div className="activity_sal w-100">
                    <button type="button" className="btn btn-Filter d-flex align-items-center px-0" onClick={()=>setdrop3(!drop3)} aria-controls="example-fade-text"
        ><h5 id="activity" className={drop3 ? "status_rotation" :""}><span>Activity</span><i class="fa fa-angle-down" aria-hidden="true"></i></h5></button>
        <div className="activity_sales" style={{height: drop3 ? "100%" : "0px",padding: drop3 ? "20px" : "0px", opacity:  drop3 ? "1" : "0"}}>
                    <ul>
                    <li  className={AllMineFilter == "All" ?"active":" "}><button onClick={()=>SetAllMineFilter("All")} className="btn btn-filter">All Activity</button></li>
                    {Wallet_Details.UserAccountAddr !== "" &&
                    <li className={AllMineFilter == Wallet_Details.UserAccountAddr ?"active":" "}><button onClick={()=>SetAllMineFilter(Wallet_Details.UserAccountAddr)} className="btn btn-filter">My Activity</button></li>
                    }
                    </ul>
                    </div>
                    </div>
                    </div>
                </div>  
           </div>
           <div className="col-12 col-lg-8 col-md-8 col-sm-12">
                <div className="table">
                    <table className="w-100">
                        <tr>
                            <th></th>
                            <th>Items</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Time</th>
                        </tr>
                        {Activity &&
                                        Activity.length > 0 &&
                                        Activity.map((Act) => {
                                          return (
                        <tr>
                          <td>
                             {(Act.action === "purchase" || Act.action === "accept") && (
                              <>
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>&emsp;Sale 
                            </>)}
                            {(Act.action === "bid") && (
                              <>
                             <i class="fa fa-shopping-cart" aria-hidden="true"></i>&emsp; Offer 
                            </>)}
                            {(Act.action === "mint") && (
                              <>
                             <i class="fa fa-shopping-cart" aria-hidden="true"></i>&emsp; Mint 
                            </>)}
                            </td>
                            <td>
                                  <Link
                                                  to={
                                                    Act.to
                                                      ? `/info/${Act.Token.Con}/${Act.to}/${Act.Token.ID}`
                                                      : Act.action === "Mint"
                                                      ? `/info/${Act.Token.Con}/${Act.from}/${Act.Token.ID}`
                                                      : Act.action === "Bid"
                                                      ? Act.From && Act.From.Url
                                                        ? `/my-items/user/${Act.From.Url}`
                                                        : `/my-items/${Act.From.Address}`
                                                      : `/info/${Act.Token.Con}/${Act.to}/${Act.Token.ID}`
                                                  }
                                                >
                                                  {console.log("file foemat check",Act.Token.image)}
                            {Act.Token &&
                                                    (Act.Token.image
                                                      .split(".")
                                                      .pop() == "mp4" || 
                                                       Act.Token.image
                                                      .split(".")
                                                      .pop() == "glb") ? (
                                                      
                                                      <img src={ Act.Token.thumb
                                                        ? `${config.Back_URL}/Thumb_compressedImage/${Act.Token.Source}/${Act.Token.thumb}`
                                                        : `${config.Back_URL}/Thumb_nftImg/${Act.Token.Source}/${Act.Token.thumb_additionalImage}`} alt="collection" className="rounded-circle" width="26" height="26"></img>
                                                    ) : 
                                                    
                                                    Act.Token.image
                                                    .split(".")
                                                    .pop() == "mp3" ? (
                                                    
                                                    <img src={ Act.Token.thumb
                                                      ? `${config.Back_URL}/Thumb_compressedImage/${Act.Token.Source}/${Act.Token.thumb}`
                                                      : `${config.Back_URL}/Thumb_nftImg/${Act.Token.Source}/${Act.Token.thumb_additionalImage}`} alt="collection" className="rounded-circle" width="26" height="26"></img>
                                                  ) :
                                                                                                     
                                                    (
                                                      <img src={ Act.Token.Thumbnail
                                                        ? `${config.Back_URL}/compressedImage/${Act.Token.Source}/${Act.Token.Thumbnail}`
                                                        : `${config.Back_URL}/nftImg/${Act.Token.Source}/${Act.Token.image}`} alt="collection" className="rounded-circle" width="26" height="26"></img> )}
                                                      &nbsp;{Act.Token.tokenName}
                                                      </Link>
                            </td>
                            <td>{(Act.amount && Act.currencySymbol)&&(
                              `${Act.amount} ${Act.currencySymbol}`
                            )}
                            {(Act.amount && !Act.currencySymbol)&&(
                              `${Act.amount} `
                            )}
                              {(!Act.amount )&&(
                              `${"---"} `
                            )}
                            </td>
                            <td>{Act.balance}</td>
                            <td>
                            <Link
                                                  to={
                                                    Act.From && Act.From.Url
                                                      ? `/my-items/user/${Act.From.Url}`
                                                      : `/my-items/${Act.From.Address}`
                                                  }
                                                ><a href="#">
                            {Act.From && Act.From.Name
                                                      ? Act.From.Name
                                                      : Act.from
                                                          .slice(0, 10)
                                                          .concat("...")}
                            </a></Link></td>
                            <td> <Link
                                                  to={
                                                    Act.To && Act.To.Url
                                                      ? `/my-items/user/${Act.To.Url}`
                                                      : `/my-items/${Act.To.Address}`
                                                  }
                                                >
                                  <a href="#"> {Act.To && Act.To.Name
                                                      ? Act.To.Name
                                                      : Act.to
                                                          .slice(0, 10)
                                                          .concat("...")}
                            </a></Link></td>
                            <td>{CreatedTime(Act.created)}</td>
                        </tr>
                            );
                                        })}
                                         
                          
                         
                      
                       
                    </table>    
                </div>
           </div>
           </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
}
