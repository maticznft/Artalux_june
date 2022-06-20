

/**
 * FILE		   	:	TRANSFERNOW - MODAL
 * DISPATCH		:	NiL
 * REF			  :	TransferRef
 * METHOD   	: 	Transfer_Complete_Action,	checkOtherPlatformDetais1155
 * C-DATE   	: 30_01_22
 * S-DATE   	: 30-01-22
*/


import React, {
	useEffect,
	forwardRef,
	useState,
	useImperativeHandle
} from 'react';
import {
	useHistory
} from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import Web3 from 'web3';
import '@metamask/legacy-web3'
import { useSelector } from 'react-redux';
import SINGLE from '../../ABI/SINGLE.json';
import MULTIPLE from '../../ABI/MULTIPLE.json';
import config from '../../lib/config';
import {toast} from 'react-toastify';
import {
	Transfer_Complete_Action,
	checkOtherPlatformDetais1155
} from '../../actions/v1/token';


import isEmpty from 'lib/isEmpty';
import { getReceipt } from '../../actions/v1/getReceiptFunc'
toast.configure();;
let toasterOption = config.toasterOption;

export const TransferRef = forwardRef((props, ref) => {

	const history = useHistory();
	const Wallet_Details = useSelector(state => state.wallet_connect_context);
	const [FormSubmitLoading, Set_FormSubmitLoading] = useState('init');
	const [ValidateError, Set_ValidateError] = useState({});
	const [TokenPrice, Set_TokenPrice] = useState(0);
	const [New_TokenOwners, Set_TokenOnwers] = useState("");
	const [TokenPrice_Initial, Set_TokenPrice_Initial] = React.useState(0);
	const [Owner_Details, Set_Owner_Details] = React.useState({});
	const [NoOFItems, Set_NoOFItems] = React.useState(1);
	const [items, set_item] = React.useState({});

	const inputChange = (e) => {
		if (e && e.target && e.target.name) {
			var value = e.target.value;
			switch (e.target.name) {
				case 'TokenPrice':
					Set_TokenOnwers(String(value).toLowerCase());
					ItemValidation({ New_TokenOwners: value });
					break;
				case 'NoOFItems':
					Set_NoOFItems(value);
					ItemValidation({ NoOFItems: value });
					break;
				default:
			}
		}
	}

	const ItemValidation = async (data = {}) => {
		var ValidateError = {};

		var Chk_TokenOwners = (typeof data.New_TokenOwners != 'undefined') ? data.New_TokenOwners : New_TokenOwners;

		if (Chk_TokenOwners == '') {
			ValidateError.New_TokenOwners = '"Token Owner" is not allowed to be empty';
		}
		else if (data.NoOFItems == '') {
			ValidateError.NoOFItems = '"No of items " is not allowed to be empty';
		}
		else if (data.NoOFItems == 0) {
			ValidateError.NoOFItems = '"No of items" is not allowed to be zero';
		}
		else if (data.NoOFItems > Owner_Details.balance) {
			ValidateError.NoOFItems = '"No of items" is not greater than balance';
		}
		else {
			delete ValidateError.New_TokenOwners;
			Set_FormSubmitLoading('start')
		}
		Set_ValidateError(ValidateError);
		return ValidateError;
	}

	async function FormSubmit() {
		Set_FormSubmitLoading('start');
		var errors = await ItemValidation();
		var errorsSize = Object.keys(errors).length;
		if (errorsSize != 0) {
			Set_FormSubmitLoading('error');
			toast.error("Form validation error. Fix mistakes and submit again", toasterOption);
			return false;
		}

		var receipt = null;
		var handle = null;
		if (Wallet_Details.UserAccountAddr != "") {
			var web3 = new Web3(Wallet_Details.providers)
			if (web3) {

				try {
					Set_FormSubmitLoading('processing');
					var CoursetroContract	 = new web3.eth.Contract(
						items.type == 721?SINGLE:MULTIPLE,
						items.contractAddress
					);
					if (items.type == 721) {
						
						await CoursetroContract.methods
							.safeTransferFrom(
								Wallet_Details.UserAccountAddr,
								New_TokenOwners,
								items.tokenCounts,
							)
							.send({ from: Wallet_Details.Accounts, value: Wallet_Details.swapFee })
							.on('transactionHash', async (transactionHash) => {
								handle = setInterval(async () => {
									receipt = await getReceipt(web3, transactionHash)
									clr1();
								}, 2000)
							})
					}
					else {
					
						await CoursetroContract.methods
							.safeTransferFrom(

								Wallet_Details.UserAccountAddr,
								New_TokenOwners,
								items.tokenCounts,
								NoOFItems,
								'0x'

							)
							.send({ from: Wallet_Details.Accounts, value: Wallet_Details.swapFee })
							.on('transactionHash', async (transactionHash) => {
								handle = setInterval(async () => {
									receipt = await getReceipt(web3, transactionHash)
									clr1();
								}, 2000)
							})
					}

				}

				catch (e) {
					Set_FormSubmitLoading('try');
					toast.error('Transaction Reverted'+e, config.toasterOption)
				}


				async function clr1() {

					if (receipt != null) {
						clearInterval(handle);
						if (receipt.status == true) {
							Set_FormSubmitLoading('done');
							var postData = {
								tokenOwner: Owner_Details.tokenOwner, // old owner
								UserAccountAddr: New_TokenOwners, // new owner
								tokenCounts: items.tokenCounts,
								tokenType: items.type,
								NoOfToken: NoOFItems,
								transactionHash: receipt.transactionHash,
								tokenBid: true,
								tokenPrice: Owner_Details.previousPrice,
								contractAddress: Owner_Details.contractAddress,
								tokenCreator: Owner_Details.tokenCreator
							}
							var Resp = await Transfer_Complete_Action(postData);
							if (Resp.data) {
								toast.success("Transaction Completed", config.toasterOption)
								window.$('#Transfer_modal').modal('hide');
								setTimeout(() => {
									props.Refresh_page();
									// history.push('/info/'+Wallet_Details.UserAccountAddr+'/'+items.contractAddress+'/'+items.tokenCounts)
									 }, 8000);
							}

						}
					}
				}
			}
		}
	}

	useEffect(() => {
		Set_ValidateError({});
	}, []);

	useImperativeHandle(
		ref,
		() => ({
			async Transfer_Click(item, ownerdetail) {
				if (Wallet_Details.UserAccountAddr != "") {
					var web3 = new Web3(Wallet_Details.providers)
					var balance = await checkOtherPlatformDetais1155(item, ownerdetail, item.type, web3);
					// //('balance>>>>>>>>>',balance)
					if (balance == 0) {
						toast.warning("You won't buy at this moment please refresh you data", toasterOption);
						setTimeout(() => {
							window.location.href = "/"
						}, 1000);
						return false;
					}
					else {
						set_item(item)
						Set_TokenPrice(ownerdetail.tokenPrice);
						Set_TokenPrice_Initial(ownerdetail.tokenPrice);
						Set_Owner_Details(ownerdetail)
						Set_ValidateError({});
						window.$('#Transfer_modal').modal('show');
					}
				}
				else {
					window.$('#connect_modal').modal('show');
				}
			}
		}),
	)
	return (
		<div className="modal fade primary_modal" id="Transfer_modal" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="accept_modalCenteredLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered modal-sm" role="document">
				<div className="modal-content">
					<div className="modal-header text-center">
						<h5 className="modal-title" id="accept_modalLabel">Transfer Token</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close9">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body px-0">
						<div className="img_accept text-center">
							{/* <LazyLoad height={200} placeholder={<LazyLoader/>} offset={[-200, 0]} debounce={500}>   */}
							{
							(String(items.image).includes('.mp4')) &&
								<video
									id="my-video"
									className="img-fluid accept_img"
									autoPlay muted playsInline loop
									preload="auto"
								>
									<source
								                                    src={items.additionalImage == "" ? `${config.Back_URL}/compressedImg/${items.tokenCreator}/${items.image}` : `${config.Back_URL}/nftImg/${items.tokenCreator}/${items.additionalImage}`} type="video/mp4" />
																	
								</video>
							}
							
							{
								(String(items.image).includes('webp')) &&
								<img
								src={items.additionalImage == "" ? `${config.Back_URL}/compressedImg/${items.tokenCreator}/${items.image}` : `${config.Back_URL}/nftImg/${items.tokenCreator}/${items.additionalImage}`} 
									alt="Collections" className="img-fluid accept_img" />
							}
							{/* </LazyLoad> */}
						</div>
						<p className="text-center accept_desc px-3" >
							<span className="buy_desc_sm" styel={{ fontSize: 12 }}>You are about to Place Order for</span>
							<span className="buy_desc_sm_bold pl-1 bold_red owner_break">{items.tokenName}</span>
							<span className="buy_desc_sm pl-2" styel={{ fontSize: 12 }} >for</span><br />
							<span className="buy_desc_sm_bold pl-1 bold_red owner_break" styel={{ fontSize: 10 }}>
								<span className="word_brak_text_inline_new">{!isEmpty(items.tokenOwnersInfo) && items.tokenOwnersInfo.name != "" && items.tokenOwnersInfo.name}</span>
								{!isEmpty(Owner_Details) && <span className="word_brak_text_inline_new">{Owner_Details.tokenOwner}</span>}
								{/* } */}
							</span>
						</p>
						<form className="bid_form" action="#">
							<div className="bor_bot_modal mb-3 px-4 ">
								<div className="mx-0 pb-3"></div>
								<label htmlFor="qty">Enter User</label>
								<div className="mb-3 input_grp_style_1">
									<input
										type="text"
										className="form-control primary_inp text-center"
										name="TokenPrice"
										id="TokenPrice"
										onChange={inputChange}
										placeholder="0x0..."
										autoComplete="off"
									/>
									{ValidateError.New_TokenOwners && <span className="text-danger">{ValidateError.New_TokenOwners}</span>}
								</div>
							</div>
							{Owner_Details.balance != 1 && <div className="bor_bot_modal mb-3 px-4 ">
								<div className="mx-0 pb-3"></div>
								<label htmlFor="qty">Enter No Of Tokens</label>
								<div className="mb-3 input_grp_style_1">
									<input
										type="text"
										className="form-control primary_inp text-center"
										name="NoOFItems"
										id="NoOFItems"
										onChange={inputChange}
										placeholder="0"
										autoComplete="off"
									/>
									{ValidateError.NoOFItems && <span className="text-danger">{ValidateError.NoOFItems}</span>}
								</div>
							</div>}
						</form>
						<div className="row mx-0 pb-3">
							<div className="col-12 col-sm-6 px-4">
								<p className="buy_desc_sm">Swap fee</p>
							</div>
							<div className="col-12 col-sm-6 px-4 text-sm-right">
								<p className="buy_desc_sm_bold">{((Wallet_Details.swapFee) / (config.decimalvalues))}  <span>{config.currencySymbol}</span></p>
							</div>
						</div>

						<form className="px-4">
							<div className="text-center">
								<Button
									type="button"
									className="create_btn btn-block"
									onClick={(FormSubmitLoading == 'start' || FormSubmitLoading == 'try') ? (() => FormSubmit()):''}
									disabled={(FormSubmitLoading == 'processing' || FormSubmitLoading == 'done' || FormSubmitLoading == 'init' || FormSubmitLoading == 'error')}
								>
									{FormSubmitLoading == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
									{FormSubmitLoading == 'processing' && 'In-Progress'}
									{FormSubmitLoading == 'init' && 'Start'}
									{FormSubmitLoading == 'start' && 'Start'}
									{FormSubmitLoading == 'done' && 'Done'}
									{FormSubmitLoading == 'try' && 'Try-Again'}
									{FormSubmitLoading == 'error' && 'Error in Entered Price'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
})

