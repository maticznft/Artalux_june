import React, { useEffect } from "react";

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
      <div className={classes.pageHeader + " inner_pageheader"}>
        <div className={classes.container+ " full_width_container"}>
          <GridContainer >
            <GridItem xs={12} sm={12} md={12} className="px-0">
              <div className="d-flex align-items-center">               
              <h3 className="section-head mb-0 px-0">Terms & Conditions</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div className="container mt-4">
          <GridContainer spacing={4}>
            <GridItem xs={12} sm={12} md={12}>
            <p className="info_title">Terms of Service</p>

            <p className="terms_des">WE-NFT is an NFT marketplace and it will serve as a portal where artists can sell their digital and/or physical artwork.
</p>
<p className="terms_des">WE-NFT may at any time remove an NFT from marketplace if it is decided to violate rules of good taste and common decency. NFTs depicting pornography, excessive nudity, violence, weapon reference or symbols with negative connotation, will be removed. This list is not finite and may be amended at any time.
</p>
<p className="terms_des">Artists minting or selling NFTs that fall into the aforementioned category may be permanently banned from using the marketplace.
</p>
            
            <p className="info_title">Artists</p>
            <p className="terms_des">Every artist contributing to this portal (selling their artwork, music or video) declares that their artwork, music or video is genuine and not a copy or partial copy of other artwork, music or video or combination of them.
</p>
           

            <p className="info_title">Payments and currencies</p>
            <p className="terms_des">Payments on WE-NFT will be facilitated and paid via “Wenlambo” with the BSC smart contract address 0xd8a31016cd7da048ca21ffe04256c6d08c3a2251.
</p>
<p className="terms_des">WE-NFT will never hold artists earnings. They will automatically be transferred to the crypto wallet selected by the artist when minting the item or adding to the marketplace.
</p>
<p className="info_title">Content</p>
            <p className="terms_des">Every NFT on the WE-NFT platform is created by users. WE-NFT makes no representations or warranties as to the quality, origin, or ownership of any content found in the Offerings. WE-NFT shall not be liable for any errors or misrepresentations, nor for the availability of any content. WE-NFT shall not be liable for any damages, losses, injuries, inability to purchase, display, or misuse of content

.</p>
           
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
