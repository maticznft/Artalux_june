import React, { useEffect,useState } from "react";

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
import {faqlists} from '../actions/v1/report'
import ReactHTMLParser from 'react-html-parser'

const Icon = styled(props => (
  <div {...props}>
    <div className="minus">-</div>
    <div className="plus">+</div>
  </div>
))`
  & > .plus {
    display: block;
    color: #a30726;
    font-size: 24px;
  }
  & > .minus {
    display: none;
    color: #a30726;
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

export default function HowItWorks(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChangeFaq = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [faqlist,setfalist]=useState([])
  useEffect(()=>{
    faqlistfunc()
  },[])
  const faqlistfunc=async()=>{
    var fql=await faqlists()
    //////("ksaldjjsadkls",fql.data.soci)
    if(fql&&fql.data&&fql.data.soci){
      setfalist(fql.data.soci)
    }
  }

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
        <div className="bg_red_1">
        <div className="container">

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className="d-flex align-items-center">
                <h2 className="inner_title">FAQ</h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        </div>
        <div className="container mt-3">
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <div className="faq_panel">
              {faqlist.map((item,ind)=>{
                    if(ind%2 == 0){
                  return(
                <Accordion expanded={expanded === 'panel1'+(ind+1)} onChange={handleChangeFaq('panel1'+(ind+1))} className="mt-5">
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <div className="accordian_head"><h2>{item.question}</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>{ReactHTMLParser(item.answer)}</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
)}
})}
                
               
              </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <div className="faq_panel">
                
              {faqlist.map((item,ind)=>{
                    if(ind%2 != 0){
                  return(
                <Accordion expanded={expanded === 'panel1'+(ind+1)} onChange={handleChangeFaq('panel1'+(ind+1))} className="mt-5">
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <div className="accordian_head"><h2>{item.question}</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>{ReactHTMLParser(item.answer)}</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
)}
})}
                  
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
