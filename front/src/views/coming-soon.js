import React, { useEffect, useState ,useRef } from "react";

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

const dashboardRoutes = [];
const useStyles = makeStyles(styles);
// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
export default function ComingSoon(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const Previous = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }


  const [sidebar, setSidebar] = useState(false);
  const [drop, setdrop] = useState(false);
  const [drop2, setdrop2] = useState(false);
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


  useEffect(() => {
    if(prevFilter !== Filter)
      setShowModal(true)
      GetActivity();
    }, [Clicked, Filter,Page]);



    const GetActivity = async () => {
      // alert("get activity call")
      var Arg = {
        Filter: Filter,
        Price: { min: Min, max: Max },
        Page: (prevFilter !== Filter)?1:Page,
        limit: 100
      };
      //("arg data for act page ",Arg);
      var Resp = await v1_Activity(Arg);
     // //("RespActivity", Resp.records.length);
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
      <div className={classes.pageHeader + " inner_pageheader vip"}>
        <div className={classes.container + " coming_soon"}>
            <h1 className="text-center text-light d-flex align-items-center justify-content-center">Coming Soon</h1>
      </div>
      </div>
      <Footer/>
    </div>
  );
}
