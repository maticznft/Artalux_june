import React, { useEffect,useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
// import HeaderLinksCommunity from "components/Header/HeaderLinksCommunity.js";

import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link,useLocation } from "react-router-dom";
// import HeaderLinks from "components/Header/HeaderLinks";
import {getPrivacyVal} from '../actions/v1/report';
import ReactHTMLParser from 'react-html-parser'
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function Privacypolicy(props) {
  
  const classes = useStyles();
  const { ...rest } = props;
  const location =useLocation();
  const[contents,setContents]=useState({})
  // var location_name = ( location.pathname == "/privacy-policy" ) ? "privacypolicy" : "aboutus";
  var location_name = ( location.pathname == "/privacy-policy" ) ? 
  "privacypolicy" :
  ( location.pathname == "/aboutus" )?"aboutus":
  ( location.pathname == "/contact" )?"contact":
  ( location.pathname == "/how_it_works" )?"howitworks":"TermsAndConditions";

  useEffect(()=>{
    getPrivacy();
  },[location.pathname])

  const getPrivacy=async()=>{

    var reqdata={
      location:location_name
    }
    var test=await getPrivacyVal(reqdata)    
    if(test&&test.data&&test.data.userValue){
      setContents(test.data.userValue)
    }

  }

  return (
    <div className="inner_header">
     <div className={classes.pageHeader + " inner_pageheader pt-0 privacy"}>
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
        
        <div className="container mt-0 cms_content pb-4">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <div className="meAdded">  {ReactHTMLParser(contents.answer)} </div>
                      </GridItem>
          </GridContainer>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
}
