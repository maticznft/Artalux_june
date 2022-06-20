import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import isEmpty from '../../lib/isEmpty';
import {  addcategory } from '../../actions/users';
import config from '../../lib/config'
import Loader from '../../assets/img/artimage.png'

import '@metamask/legacy-web3';
const useStyles     = makeStyles(styles);
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

// toaster config
toast.configure();
let toasterOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const initialFormValue = {
  'name': "",
  'image':''
}

export default function AddCategory() {
  const history                   = useHistory();
  const classes                   = useStyles();
  const dispatch                  = useDispatch();
  const [userdet, setUser]        = useState();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});
  
  const [image_preview,Set_img_preview] = useState(Loader)
  

  const handleFile = (e) => {
    e.preventDefault();
    const { id, files } = e.target;
    let formData = { ...formValue, ...{ [id]: files[0] } }
    setFormValue(formData)


    var validExtensions = ["png", 'gif', 'webp', 'mp4', 'PNG', 'jpg', 'JPEG', 'JPG']; //array of valid extensions
		if (e.target && e.target.files) {
			var reader = new FileReader()
			var file = e.target.files[0];
			var fileName = file.name;
			var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
			// if (window.$.inArray(fileNameExt, validExtensions) == -1) {
        // if(file.name.includes(validExtensions)==false){
        if(validExtensions.includes(String(file.name).split('/').pop()) == true){
        toast.error("Only these file types are accepted : " + validExtensions.join(', '), toasterOption);
				return false;
			}
			const fileSize = file.size;
			if (5000000 < fileSize) {
				toast.error("File size exceeds 30 MB", toasterOption);
				return false;
			}
			else {
				
				var url = reader.readAsDataURL(file);
				reader.onloadend = function (e) {
					if (reader.result) {
						Set_img_preview(reader.result);
					}
				}.bind(this);
				// setTokenFilePreUrl(e.target.value);
			}
		}



  };

  const onChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
  }

    const {
        name,image
    } = formValue

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let reqData = {
      name,
      image
    }

    const {error} = await addcategory(reqData);
    //console.lo("error",error)
      if (isEmpty(error)) {
      toast.success('Category details added', toasterOption);
        setTimeout(
        ()=> window.location.href='/xulatra/categorylist'
        ,1000)
     
    } else {
      setValidateError(error);
    }
   
  }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add Category</h4>
                
              </CardHeader>
              <CardBody>
                <GridContainer>                 
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Category name"
                      onChange={onChange}
                      id="name"
                      value={name}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                        validateError.name && <span className="text-danger">{validateError.name}</span>
                    }
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Image"
                      onChange={handleFile}
                      id="image"
                      type="file"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {

                      validateError.photo && <span className="text-danger">{validateError.photo}</span>
                    }
                  </GridItem>
                  
                  <GridItem xs={12} sm={12} md={4}>
                    <div className="text-center mt-3">
                      <label>Image Preview</label>
                      <br/>
                  <img src={image_preview} alt="category image" style={{maxHeight:100,maxWidth:100}}/></div>
                  </GridItem>
                </GridContainer>
              
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">Add</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>       
      </GridContainer>
    </div>
  );
}
