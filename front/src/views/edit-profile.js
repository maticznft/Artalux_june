
/**
 * FILE		   	:	Edit-profile
 * DISPATCH		:	NiL
 * REF			  :	Nil
 * METHOD   	: editprofile, getprofile,
 * C-DATE   	: 30_01_22
 * S-DATE   	: 30-01-22
*/


import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from '@material-ui/core';
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link, useHistory } from "react-router-dom";
import prof from 'assets/images/small-profile.png'
import masonary1 from 'assets/images/masonary_04.png'
import Profile from 'assets/images/no_profile2.png'
import { useSelector } from "react-redux";
// myside
import {
  editprofile,
  getprofile,
} from '../actions/v1/user';
import config from '../lib/config';
import isEmpty from '../lib/isEmpty';

import {toast} from 'react-toastify';


let toasterOption = config.toasterOption;
const dashboardRoutes = [];
const useStyles = makeStyles(styles);
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
const initialFormValue = {
  'name': "",
  'customurl': "",
  'bio': "",
  'twitter': "",
  'photo': "",
  'email': "",
  'facebook': "",
  'youtube': "",
  'instagram': ""
}



export default function EditProfile(props) {
  const classes = useStyles();
  const Wallet_Details = useSelector(state => state.wallet_connect_context);

  const { ...rest } = props;
  const [formValue, setFormValue] = useState(initialFormValue);
  const [disablebtn, setDisablebtn] = useState(0)
  const [imageVal, setImageVal] = useState('')
  const [onchangeimg, setOnchangeimg] = useState('')
  const [validateError, setValidateError] = useState({});
  const [instagramcheck,setinstagramcheck]=useState(false)
  const [youtubecheck,setyoutubecheck]=useState(false)
  const [facebookcheck,setfacebookcheck]=useState(false)
  const [twittercheck,settwittercheck]=useState(false)
   const [Ids,setIds]=useState('');
  const [ImageVal,setImageVal1]=useState('');

  


  const history = useHistory();

  const {
    name,
    customurl,
    bio,
    twitter,
    photo,
    instagram,
    email,
    facebook,
    youtube,
   

  } = formValue

  const editprofileUI = async (data) => {
    var validateError = {};
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([A-Za-zA-Z\-0-9]+\.)+[A-Za-zA-Z]{2,}))$/;
    let imageSize = 5000000;
    let imageFormat = /\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP|gif|GIF)$/;
  
    ////("ioioioiooioioio",data)
   
    if (onchangeimg != "") {
      ////("epwopeopwope",data.imageVal,onchangeimg,onchangeimg.split('.').pop())
     if(data.imageVal!=""){
        if (imageSize < (data.imageVal).size) {
          validateError.image = "File size must be below 5mb"
        }
        if (!(/\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP|gif|GIF)$/i).test((data.imageVal).name))  {
          validateError.image = "file is invalid. only allowed JPG,PNG,WEBP,gif";
        }
      }
     
    }
    if ((data.name) == "") {
      validateError.names = "Name is Required"
    }
    if(data.name!=""){
     if((config.nameFormat).test(data.name)){
      validateError.names = "Cannot allowed smiley"
     }
    }
    if ((data.customurl) == "") {
      validateError.customurl = "customurl is Required"
    }
    if ((data.customurl) != "") {
      if((config.nameFormat).test(data.customurl)){
      validateError.customurl = "Cannot allowed smiley"
      }
    }
    if (data.email == "") {
      validateError.email = "email is Required"
    }
    if (data.email != "") {
      if (!emailRegex.test(data.email)) {
        validateError.email = "email Format is Required"
      }
    }
    if (data.youtubecheck ==true) {
      if (data.youtube=="") {
        validateError.youtube = "Youtube link is Required"
      }
    }
    if (data.instagramcheck ==true) {
      if (data.instagram=="") {
        validateError.instagram = "Instagram link is Required"
      }
    }
    if (data.facebookcheck ==true) {
      if (data.facebook=="") {
        validateError.facebook = "Facebook link is Required"
      }
    }
    if (data.twittercheck ==true) {
      if (data.twitter=="") {
        validateError.twitter = "Twitter link is Required"
      }
    }
    setValidateError(validateError)
    return validateError;
  }


  const onChange = (e) => {
    setDisablebtn(0)
    e.preventDefault();
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
  }
  useEffect(() => {
    getProfiledata();
  }, [Wallet_Details.UserAccountAddr])

  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    ////("ewriuiewruewr",Wallet_Details.UserAccountAddr)
    const currAddr = Wallet_Details.UserAccountAddr;
    let reqData = {
      imageVal,
      name,
      customurl,
      bio,
      twitter,
      photo,
      email,
      youtube,
      instagram,
      facebook,
      currAddr,
      facebookcheck,
      instagramcheck,
      youtubecheck,
      twittercheck
    }
    const custUrl= String(customurl).replace(/\s+/g, "").trim().toLowerCase();
		
    let reqData1 = {
      imageVal,
      name,
      customurl:custUrl,
      bio,
      twitter,
      photo,
      email,
      youtube,
      instagram,
      facebook,
      currAddr,
      facebookcheck,
      instagramcheck,
      youtubecheck,
      twittercheck
    }
    ////("weiqoieqwoeqw",reqData)
    editprofileUI(reqData)
    var errorUI = await editprofileUI(reqData);
    if (isEmpty(errorUI)) {
      var errors = await editprofile(reqData1);
      if (isEmpty(errors.error) || !isEmpty(errors.userValue)) {
        setDisablebtn(3)
        setDisablebtn(0)
        setValidateError("");
        toast.success('Profile has been updated', toasterOption);
        setTimeout(
          () => history.push("/my-items")
          , 3000)
        setValidateError({});
      } else {
        ////////("errre12",errors)
        setDisablebtn(1)
        setValidateError(errors);
      }
    }
    else {
      ////////("errre13",errorUI)
      setDisablebtn(1)
      setValidateError(errorUI);
    }

  }
  async function getProfiledata() {
    setDisablebtn(0)

    const currAddr = Wallet_Details.UserAccountAddr;
    let reqData = {
      currAddr
    }
    // ////////("reqData",reqData)
    var data = await getprofile(reqData);
    // ////////("!!!!!!!!!!!",data)
    if (data && data.userValue != undefined) {
      let formdata = {};
      if (data.userValue.image != '') {
        var profileimage = config.Back_URL + '/images/' + data.userValue._id + '/' + data.userValue.image;
        // setImageVal(data.userValue.image)
        setOnchangeimg(profileimage);
        setIds(data.userValue._id)
      } else {
        // ////////('else profile');
      }
      formdata['photo'] = data.userValue.image;
      formdata['bio'] = data.userValue.bio;
      formdata['curraddress'] = data.userValue.curraddress;
      formdata['customurl'] = data.userValue.customurl;
      formdata['twitter'] = data.userValue.twitter;
      formdata['name'] = data.userValue.name;
      formdata['email'] = data.userValue.email;
      formdata['youtube'] = data.userValue.youtube;
      formdata['instagram'] = data.userValue.instagram;
      formdata['facebook'] = data.userValue.facebook;
      setFormValue(formdata)
      setinstagramcheck(data.userValue.instagramcheck)
      setfacebookcheck(data.userValue.facebookcheck)
      settwittercheck(data.userValue.twittercheck)
      setyoutubecheck(data.userValue.youtubecheck)
      ////("woqpowpoqwpqw",data.userValue)
    }
    else {
      // ////////('else part @getProfiledata');
    }
  }

  const handleFile = (event) => {
    setDisablebtn(0)
    event.preventDefault();
    var reader = new FileReader()
    const { id, files } = event.target;
    setDisablebtn(0)
    if (event.target.files && event.target.files[0]) {
      var file = event.target.files[0];
      setImageVal(file)
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        if (reader.result) {
          setOnchangeimg(reader.result);
          setImageVal1(file.name)

        }
      }
    }
    let formData = { ...formValue, ...{ [id]: files[0] } };
    setFormValue(formData);
  }

  const instagramcheckonchange=async()=>{
    if(instagramcheck==true){
      setinstagramcheck(false)
    }
    else{
      setinstagramcheck(true)
    }
  }
  const youtubecheckonchange=async()=>{
    if(youtubecheck==true){
      setyoutubecheck(false)
    }
    else{
      setyoutubecheck(true)
    }
  }

  const facebookcheckonchange=async()=>{
    if(facebookcheck==true){
      setfacebookcheck(false)
    }
    else{
      setfacebookcheck(true)
    }
  }

  const twittercheckonchange=async()=>{
    if(twittercheck==true){
      settwittercheck(false)
      // alert(1)
    }
    else{
      settwittercheck(true)  
      // alert(2)
    }
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
      <ScrollToTopOnMount />
      <div className={classes.pageHeader + " inner_pageheader"}>
        <div className="container">
         
              <div className="d-flex align-items-center">
                <h3 className="section-head mb-0">Edit Profile</h3>
              </div>
        </div>
        <div className="container mt-5">
          <GridContainer>
            <GridItem xs={12} sm={3} md={3}>
              <div className="holder">
                {onchangeimg == '' &&
                  <img src={Profile} alt="logo" id="imgPreview" className="img-fluid" />
                }
                {onchangeimg != '' &&
                  <img src={onchangeimg ? onchangeimg : null} alt={onchangeimg ? onchangeimg.name : null} id="imgPreview" className="img-fluid" />
                }
                {/* <img src={require("../assets/images/profile_img.png")} alt="logo" id="imgPreview" className="img-fluid"/> */}
              </div>
              <div className="profile_edit_panel">
                <div className="profile_edit_icon">
                  <i className="fas fa-pencil-alt"></i>
                </div>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  required="true"
                  className="photo"
                  // value={onchangeimg}
                  onChange={(e) => handleFile(e)}
                />
                {validateError.image && <span className="text-danger">{validateError.image}</span>}

              </div>
            </GridItem>
            <GridItem xs={12} sm={9} md={9}>
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="primary_label" htmlFor="name">Display Name</label>
                    <input type="text"
                      className="form-control primary_inp"
                      id="name"
                      placeholder="Enter your display name"
                      onChange={onChange}
                      value={name} />
                    {validateError.names && <span className="text-danger">{validateError.names}</span>}

                  </div>
                  <div className="form-group col-md-6">
                    <label className="primary_label" htmlFor="name">Custom URL address</label>
                    <div className="input-group input_grp_style_1">

<div className="input-group-prepend">
<span className="input-group-text pl-0 min_h_45_px min_h_35" id="basic-addon2">{config.Front_URL}/</span>
</div>
<input type="text"
                      className="form-control primary_inp"
                      placeholder="Enter an unique name "
                      id="customurl"
                      onChange={onChange}
                      value={customurl}

                      defaultValue="we-nft.io/" />
</div>
                  
                    {validateError.customurl && <span className="text-danger">{validateError.customurl}</span>}

                  </div>

                </div>

                <div className="form-row">

                  <div className="form-group col-md-6">
                    <label className="primary_label" htmlFor="desccription">E-mail</label>
                    <input type="text"
                      className="form-control primary_inp"
                      id="email"
                      name="email"

                      value={email}
                      onChange={onChange}
                      placeholder="Enter your email address" />
                    {validateError.email && <span className="text-danger">{validateError.email}</span>}

                  </div>
                  <div className="form-group col-md-6">
                    <label className="primary_label" htmlFor="name">Bio</label>
                    <input type="text"
                      className="form-control primary_inp"
                      id="bio"
                      onChange={onChange}
                      value={bio} placeholder="Tell us about yourself" />
                  </div>
                </div>


                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="primary_label" htmlFor="name">Social Media Links</label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 form_ino_che">
                    <input type="text"
                      className="form-control primary_inp"
                      onChange={onChange}
                      value={twitter}
                      id="twitter" placeholder="Twitter account address" />

                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" 
                      className="custom-control-input" 
                      id="customCheck1"
                      checked={twittercheck}
                      onChange={twittercheckonchange}
                      />
                      <label className="custom-control-label" htmlFor="customCheck1"></label>
                    </div>
                    {twittercheck}
                    {validateError.twitter && <span className="text-danger">{validateError.twitter}</span>}

                  </div>
                  <div className="form-group col-md-6 form_ino_che">
                    <input type="text" 
                    className="form-control primary_inp" 
                    id="youtube"
                     placeholder="Youtube channel address"
                     onChange={onChange}
                     value={youtube}
                     />

                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" 
                      className="custom-control-input"
                       id="customCheck2" 
                       checked={youtubecheck}
                       onChange={youtubecheckonchange}
                       />
                      <label className="custom-control-label" htmlFor="customCheck2"></label>
                    </div>
                    {validateError.youtube && <span className="text-danger">{validateError.youtube}</span>}

                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 form_ino_che">
                    <input type="text" 
                    className="form-control primary_inp"
                     placeholder="Facebook account address" 
                     id="facebook"
                     onChange={onChange}
                     value={facebook}
                     />
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" 
                      className="custom-control-input" 
                      id="customCheck3" 
                     
                      checked={facebookcheck}
                      onChange={facebookcheckonchange}
                      />
                      <label className="custom-control-label" htmlFor="customCheck3"></label>
                    </div>
                    {validateError.facebook && <span className="text-danger">{validateError.facebook}</span>}

                  </div>
                  <div className="form-group col-md-6 form_ino_che">
                    <input type="text" 
                    className="form-control primary_inp"
                     placeholder="Instagram address" 
                     onChange={onChange}
                     id="instagram"
                     value={instagram}
                     />
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" 
                      className="custom-control-input"
                       id="customCheck4"
                       checked={instagramcheck}
                       
                       onChange={instagramcheckonchange}
                       />
                      <label className="custom-control-label" htmlFor="customCheck4"></label>
                    </div>
                    {validateError.instagram && <span className="text-danger">{validateError.instagram}</span>}

                  </div>
                </div>
                <div className="mt-3">
                  {disablebtn == 0 &&
                    <Button className="create_btn" onClick={handleFormSubmit}>Update Profile</Button>
                  }
                  {
                    disablebtn == 1 &&
                    <Button className="create_btn" disabled="true">Form Error</Button>
                  }
                  {
                    disablebtn == 2 &&
                    <Button className="create_btn" onClick={handleFormSubmit}>Try Again</Button>
                  }
                  {
                    disablebtn == 2 &&
                    <Button className="create_btn" disabled={true}>Try Again</Button>
                  }
                  {/* <Button className="create_btn">Update Profile</Button> */}
                </div>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
