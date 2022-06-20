import React, { useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link } from "react-router-dom";
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



export default function Create(props) {
  const classes = useStyles();
  const { ...rest } = props;


  return (
    <div className="inner_header" >
       <div className={classes.pageHeader + " inner_pageheader pt-0"}>
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
        <div className={" container"}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className="d-flex align-items-center">
                <Link to="/">
                    <i className="fas fa-arrow-left mr-3 arrow_back"></i>
                  {/* <img src={require("../assets/images/arrow_icon.png")} alt="logo" className="arrow_icon"/> */}
                </Link>
                <h3 className="section-head mb-0">Create collectible</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div className="container mt-4">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <p className="create_para">Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one collectible multiple times</p>
              <div className="create_box_panel">
                <Link to="/create-single" className="create_box">
                  <h2>Single</h2>
                  <img src={require("../assets/images/single_icon.png")} alt="logo" className="img-fluid"/>
                </Link>
                <Link to="/create-multiple" className="create_box create_box_red">
                  <h2>Multiple</h2>
                  <img src={require("../assets/images/multiple_icon.png")} alt="logo" className="img-fluid"/>
                </Link>
              </div>
              <p className="create_para mt-3">We do not own your private keys and cannot access your funds without your confirmation</p>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
}
