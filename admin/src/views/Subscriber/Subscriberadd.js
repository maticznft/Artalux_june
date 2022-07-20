import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Flip, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import Select from "react-select";
//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from '../../lib/isEmpty';

import { addfaq, sendSubscriberMail } from '../../actions/users';
import { CKEditor } from 'ckeditor4-react';
import { Slide } from "@material-ui/core";
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
	'question': "",
	'answer': "",

}

const useStyles = makeStyles(styles);

export default function UserProfile() {

	const Wallet_Details = useSelector(state => state.wallet_connect_context);

	const classes = useStyles();
	const history = useHistory();
	const [validateError, setValidateError] = useState({});
	const [categoryname, setCategoryname] = useState('');
	const [categorytype, setCategorytype] = useState([]);
	const [subject, setsubject] = useState("");
	const [mailData, setMailData] = useState("");


	useEffect(() => {
		//getCategorytype()
	}, [])
	// function

	const onChange = (e) => {
		setsubject(e.target.value)
		// console.log("question", question)

	}
	const onEditorChange = (evt) => {
		var description_text = evt.editor.getData()
		console.log("setanswer", description_text)
		setMailData(description_text);
	}

	const handleFormSubmit = async (e) => {
		
		e.preventDefault();
		const id = toast("Sending Mail.. Please wait",{className:"text-center",autoClose:120000, isLoading:true,type:"info",position:'top-center',transition:Flip})
		var type = categoryname.categoryname;
		let reqData = {
			subject : subject,
			boc : mailData

		}
		console.log("data to send ",reqData)
		let sentSubMail = await sendSubscriberMail(reqData);
		if (sentSubMail && sentSubMail.data && sentSubMail.data && sentSubMail.data.Success) {
			toast.update(id, {render: "Mail Successfully Sent",type:"success",autoClose: 2500,isLoading:false});
				setTimeout(() => {
					window.location.reload();
				},2000);
		} else {
			toast.update(id, {render: "Mail Failed to Send",type:"error",autoClose: 2500,isLoading:false});
		}
	}

	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<form className={classes.form} noValidate onSubmit={handleFormSubmit}>
							<CardHeader color="primary">
								<h4 className={classes.cardTitleWhite}>News Letter</h4>
								<p className={classes.cardCategoryWhite}>Create a NewsLetter</p>
							</CardHeader>
							<CardBody>
								<GridContainer>
									<GridItem xs={12} sm={12} md={3}>
										<CustomInput
											labelText="Subject"
											onChange={onChange}
											id="subject"
											value={subject || ''}
											formControlProps={{
												fullWidth: true
											}}
										/>
										{
											validateError.question && <span className="text-danger">{validateError.question}</span>
										}
									</GridItem>

								</GridContainer>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}>
										<CKEditor
											value={mailData || ''}
											data=""
											onChange={onEditorChange}
										/>

										{
											validateError.answer && <span className="text-danger">{validateError.answer}</span>
										}
									</GridItem>
								</GridContainer>
							</CardBody>
							<CardFooter>
								{(Wallet_Details.UserAccountAddr==Wallet_Details.ownget) &&
								<Button color="primary" type="submit">Send</Button>
}
							</CardFooter>
						</form>
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	);
}
