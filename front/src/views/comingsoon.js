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
    <div className="inner_header">
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
      
        <div className="container mt-4 coming_soon_sec">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <div className="text-center">
            <img src={require("../assets/images/logo.svg")} alt="logo" className="img-fluid" />
            </div>
            <p className="mb-2 com_text">Coming Soon!</p>
            <div className="text-center">
            <button className="btn create_btn coming_soon_btn" tabIndex="0" type="button"><span className="text_back"><Link to="/">
          Back to home</Link></span></button>
            </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
