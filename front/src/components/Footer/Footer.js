/*eslint-disable*/
import React,{useState,useEffect} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/footerStyle.js";
import {sociallinksfunction} from '../../actions/v1/report';
import { Link,useLocation } from "react-router-dom";
import { subscriberAction } from "actions/v1/token";
import { toast } from 'react-toastify';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux'
import config from "lib/config";

const useStyles = makeStyles(styles);

export default function Footer(props) {
 
  const classes           =  useStyles();
  const Wallet_Details    =  useSelector(state => state.wallet_connect_context);

  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const[sociallinks,setsociallinks]=useState({})
  const[Footer_Link,Set_Footer_link]=useState([])

  const [Categorylist, setCategorylist] = useState([]);
  const [home_special_category, set_home_special_category] = useState([])

  const [mail, setmail] = useState('');   //newsletter mail
  
  
  useEffect(()=>{
    sociallinksfunct()
    CategoryListCall()
    },[])
  
  const sociallinksfunct=async()=>{
    var soci= await sociallinksfunction()
    if(soci.data){
      console.log("social obj data",soci.data);
      setsociallinks(soci.data)
    }
    // if(soci&&soci.data&&soci.data.soci&&soci.data.soci[0]&&soci.data.soci[0].social.length>0){
    //   //("social links ",soci.data.soci[0].social);
    //   setsociallinks(soci.data.soci[0].social)
    // }
    else{

      setsociallinks({})
    }
  }





  async function CategoryListCall() {
   
    axios
      .get(`${config.vUrl}/token/category/list`)
      .then(response => {
      
        if (response && response.data && response.data.list) {
          console.log("data catfooter",response.data.list)
          setCategorylist(response.data.list);
          var CatData = response.data.list.filter(item => {
            if (item.show == true)
              return item
          })
          set_home_special_category(CatData)
        }
      })
      .catch(e => console.log(e))
  }


 
  const toggleUsermenu = () => {
    var useclass = document.getElementsByClassName("usemneu_dd");
    for(var i=0;i<useclass.length;i++)
    {
      useclass[i].classList.toggle('d-none')
    } 
  }



  const newmailadd = async () => {
    console.log("mail>>>>",mail);
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([A-Za-zA-Z\-0-9]+\.)+[A-Za-zA-Z]{2,}))$/;
    if (mail != "") {
     if (!emailRegex.test(mail)) {
       return toast.error("Enter valid email")
       setTimeout(() => {
        window.location.reload()
      }, 2000);
     }
   }else if(mail == ""){return toast.error(" Email cannot be empty")}

   var newmailData = await subscriberAction({ email: mail });
   console.log("newmailData",newmailData)
   if (newmailData && newmailData.data && newmailData.data && newmailData.data.success && newmailData.data.success == true) {
 
     toast.success(newmailData.data.message);
     setmail('');
     setTimeout(() => {
      window.location.reload()
    }, 2000);
   }
   console.log(">>>>newmailData",newmailData);
 }


 const mailstate = (e) => {
   
  console.log("Mialllll",e.target.value)
      setmail(e.target.value)
    }

  
 
  var location=useLocation();
  return (
    <div>
   
    <footer className={footerClasses}>
    <div className="container">
    <div className="row pb-4">
        <div className="col-12 col-md-12 col-lg-1 col-xl-1 mt-3 mt-lg-0 left-footer-sec">
                <a href="#"><span className="img-fluid logo_przn mt-4" alt="Shape"></span></a>
            </div>
           <div className="col-12 col-md-12 col-lg-3 col-xl-3 mt-3 mt-lg-0">
           <p className="footer_big_text mt-3">The world's best digital marketplace for crypto collectibles and non-fungible tokens (NFTs) backed by real assets.Buy, sell and discover exclusive digital items with real value.</p>  
            <div className="newsletter">
            <p className="subHeading">Subscribe Newsletter</p>
              <div className="news d-flex align-items-center pl-3 pr-2 py-1 my-3">
                <input type="text" className="form-control" placeholder="Enter your mail-id"  onChange={mailstate}/>
                  <button type="button" className="btn btn-primary" id="news_submit" onClick={() => { newmailadd() }} ><i class="fa fa-arrow-right" aria-hidden="true"  ></i>
                  </button>
              </div>
            </div>
            </div> 
        <div className="col-12 col-md-6 col-lg-2 col-xl-2 mt-3 mt-lg-4">
        <p className="footer_heade">Martketplace</p>
                    <ul className="footer_ul">
                        <li><Link to="/explore/All">All NFTs</Link></li>
                        {/* <li><Link to="#">Art</Link></li>
                        <li><Link to="#">Video</Link></li> */}
                          {home_special_category.map((item) => {
                            return(
                              <li><Link to={"/explore/"+item.name}>{item.name}</Link></li>
                            )
                            })}
                    </ul>
                </div>
                <div className="col-12 col-md-6 col-lg-2 col-xl-2 mt-3 mt-lg-4">
                    <p className="footer_heade">My Account</p>
                    <ul className="footer_ul pb-3">
                        <li><Link to="/edit-profile">Profile</Link></li>
                        {/* <li><Link to="#">Favourites</Link></li> */}
                        <li><Link to="/my-items">My Collections</Link></li>
                        <li><Link to="/ranking">Ranking</Link></li>
                        <li><Link to="/activity">Activity</Link></li>
                    </ul>
                </div>
                <div className="col-12 col-md-6 col-lg-2 col-xl-2 mt-3 mt-lg-4">
                    <p className="footer_heade">Resources</p>
                    <ul className="footer_ul">
                        <li><Link to="/terms_conditions">Terms and Conditions</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>  
                    </ul>
                </div>
                <div className="col-12 col-md-4 col-lg-2 col-xl-2 mt-3 mt-lg-4">
                    <p className="footer_heade">Artalux</p>
                    <ul className="footer_ul">
                     
                        <li>
                            <Link to="#" data-toggle="modal" data-target="#connect_modal">Connect wallet</Link>
                        </li>
                        <li>
                            <Link to="/create">Create</Link>
                        </li>
                        <li>
                            <Link to="/aboutus">About Us</Link>
                        </li>
                        <li>
                            <Link to="/how_it_works">How it works</Link>
                        </li>
                    </ul>
                    <div className="socialIcons mt-3 mt-sm-4">
                    <p className="footer_heade">Social Links</p>
                      <ul className="d-flex align-items-center soc">
                        <li><a href={sociallinks.Facebook}><i className="fab fa-facebook"></i></a></li>
                        <li><a href={sociallinks.twitter}><i className="fab fa-twitter"></i></a></li>
                        <li><a href={sociallinks.Instagram}><i className="fab fa-instagram"></i></a></li>
                      </ul>
                    </div>
                </div>
        {/* <div className="col-12 col-md-12 col-lg-9 col-xl-9 mt-3 mt-lg-0">
            <div className="row footer_row_new justify-content-center">
                <div className="col-12 col-md-4 col-lg-4 col-xl- mt-3 mt-lg-4">
                    <p className="footer_heade">Bid Pixels</p>
                    <ul className="footer_ul">
                      {Wallet_Details.UserAccountAddr==""?
                        <li>
                            <Link to="#" data-toggle="modal" data-target="#connect_modal">Connect wallet</Link>
                        </li>
                        :
                         <li>
                         <Link to="#" onClick={()=>toggleUsermenu()} >Connect wallet</Link>
                     </li>}
                        <li>
                            <Link to="/create">Create</Link>
                        </li>
                    </ul>
                </div>
                    </div>
                </div> */}
                </div>  
               
            </div>
    </footer>
    <hr className="hr_hrey my-0"></hr>
                <footer className="jss58 py-0 mt-0 footer_bottom">
                  <div className="containera m-auto">
                    <div className="footerbottom py-4 justify-content-center">
                    
                        <p className="copyright_txt mb-md-0 text-center">
                          <span className="mb-0 text-white font_w_600 font_14 text-center">Copyright © Artalux | All Rights Reserved</span></p>
                        {/* <p className="copyright_txt mb-md-0">We use cookies for better service.Accept</p> */}
                    
                        </div>
                        </div>
                        </footer>
</div>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
