/**
 * FILE		   	:	  BURNREF - MODAL
 * DISPATCH		:	  NIL
 * REF			:		Burn_Click
 * METHOD   	:   BurnField,checkOtherPlatformDetais1155,getReceipt
 * C-DATE   	:   28_01_22
 * S-DATE   	:   26-01-22
*/

import React, {
	forwardRef,
	useImperativeHandle, useState, useEffect
} from 'react';

import { Button } from '@material-ui/core';
import Web3 from 'web3';
import config from '../../lib/config';
import Link,{ useLocation, useHistory } from 'react-router-dom'
import { BurnField, checkOtherPlatformDetais1155 } from '../../actions/v1/token';
import { useSelector } from 'react-redux';

import { getReceipt } from '../../actions/v1/getReceiptFunc';
import SINGLE from 'ABI/SINGLE.json';
import MULTIPLE from 'ABI/MULTIPLE.json'
import {toast} from 'react-toastify';

let toasterOption = config.toasterOption;

export const BurnRef = forwardRef((props, ref) => {
	const [burnLoading, setBurnLoading] = useState('empty');
	const [ValidateError, Set_ValidateError] = useState({});
	const [Items, Set_Items] = useState({})
	const [noofitems, setnoofitem] = useState(0)
	const [MyTokenDetail, set_MyTokenDetail] = useState({})
	const Wallet_Details = useSelector(state => state.wallet_connect_context);
	const history = useHistory();
	const location = useLocation();
	useImperativeHandle(
		ref,
		() => ({
			async Burn_Click(item, MyTokenDetail) {
				if (Wallet_Details.UserAccountAddr != "") {
					var web3 = new Web3(Wallet_Details.providers)
					var balance = await checkOtherPlatformDetais1155(item, MyTokenDetail, item.type, web3);
					////('balance>>>>>>>>>', balance)
					if (balance == 0) {
						toast.warning("You won't buy at this moment please refresh you data", toasterOption);
						setTimeout(() => {
							window.location.href = "/"
						}, 1000);
						return false;
					}
					else {


						Set_Items(item)
						setnoofitem(MyTokenDetail.balance)
						set_MyTokenDetail(MyTokenDetail)
						Set_ValidateError({});
						window.$('#burn_token_modal').modal('show');
					}
				}
				else {
					window.$('#connect_modal').modal('show');
				}
			}
		}),
	)


	async function FormSubmit(data, MyTokenDetail) {
		var receipt = null;
		var handle = null;
		if (Wallet_Details.UserAccountBal < 0) {
			toast.error('Enter vaid balance');
			return false;
		}
		if (Wallet_Details.providers) {
			var web3 = new Web3(Wallet_Details.providers)
			if (
				web3
			) {
				setBurnLoading('processing');
				var CoursetroContract = null;
				var callcontract = null;
				try {
					var CoursetroContract = new web3.eth.Contract(Items.type==1155?MULTIPLE:SINGLE,Items.contractAddress)
					if(Items.type==721)
					{
					 callcontract =	CoursetroContract.methods
					.burnToken(
					
						data.tokenCounts,
						Wallet_Details.UserAccountAddr
					)}
					else{
						callcontract=	CoursetroContract.methods
						.burnToken(
						 Wallet_Details.UserAccountAddr,
							data.tokenCounts,
							noofitems
						)}
						await callcontract
						.send({ from: Wallet_Details.Accounts })
						.on('transactionHash', async (transactionHash) => {
							handle = setInterval(async () => {
								receipt = await getReceipt(web3, transactionHash)
								clr1();
							}, 2000)
						})


				}
				catch (error) {
					setBurnLoading('try');
					toast.error('Transaction Error occured : '+error.toString(), toasterOption)
				}

				async function clr1() {

					if (receipt != null) {
						clearInterval(handle);
						if (receipt.status == true) {
							var postData = {
								tokenOwner: Wallet_Details.UserAccountAddr,
								tokenCounts: data.tokenCounts,
								blockHash: receipt.blockHash,
								transactionHash: receipt.transactionHash,
								contractAddress: data.contractAddress,
								type: data.type,
								balance: noofitems,
								currAddr: Wallet_Details.UserAccountAddr,
								quant: MyTokenDetail.balance


							}
							setBurnLoading('done');
							var updateBurnField = await BurnField(postData)
							if (updateBurnField) {
								toast.success('Burned successfully', toasterOption)
								document.getElementById('closeburn').click()
								setTimeout(() => { 
									if(location.pathname=='/'){
									var payload = {
										time:{limit: 6, from: 'Time', currAddr: Wallet_Details.UserAccountAddr},
										explore:{
											limit: 6,
											page:  1,
											currAddr: Wallet_Details.UserAccountAddr,
											CatName: 'All',
											from: 'Home',
										  }
			

									  }
									  props.Refresh_page(payload)
									}
									else{
										history.push('/')
									}
								
								   }, 2000);
							
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


	const inputChange = (e) => {
		if (e.target && e.target.value)
			if (MyTokenDetail.balance >= e.target.value) {
				setnoofitem(e.target.value)
				setBurnLoading('init');
			}
			else if (e.target.value == 0) {
				setBurnLoading('zero');
			}
			else if (e.target.value == "") {
				setBurnLoading('empty');
			}
			else if (e.target.value == undefined) {
				setBurnLoading('empty');
			}
			else {
				setBurnLoading('errors');
			}

	}

	return (

		<div className="modal fade primary_modal" id="burn_token_modal" tabIndex="-1" role="dialog" aria-labelledby="burn_token_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			<div className="modal-dialog modal-dialog-centered modal-sm" role="document">
				<div className="modal-content">
					<div className="modal-header text-center">
						<h5 className="modal-title" id="burn_token_modalLabel">Burn token</h5>
						<button type="button" id="closeburn" className="close" data-dismiss="modal" aria-label="Close"
							disabled={(burnLoading == 'processing')}

						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body px-0">
						<form className="bid_form">
							<div className="px-4">
								<p className="checkout_text_light_white text-center" style={{ color: 'black', fontWeight: 'bold' }}>{MyTokenDetail.balance} Tokens Available</p>
							</div>
							<div className="px-4">
								<p className="checkout_text_light_white">Are you sure to burn this token? This action cannot be undone. Token will be transfered to zero address</p>
							</div>
							<div className="px-4 mt-4 pt-2">
								<input
									id="burn"
									name="burn"
									className="form-control"
									onChange={(e) => { inputChange(e) }}
								/>
								<div className="text-center mt-3">
									<Button
										className="burn_btn_red primary_btn btn-block"
										onClick={(burnLoading == 'init' || burnLoading == 'try') ? (() => FormSubmit(Items, MyTokenDetail)):undefined}
										disabled={(burnLoading == 'done' || burnLoading == 'processing' || burnLoading == 'zero' || burnLoading == 'errors' || burnLoading == 'empty')}
									>
										{burnLoading == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
										{burnLoading == 'init' && 'Continue'}
										{burnLoading == 'processing' && 'In-progress...'}
										{burnLoading == 'done' && 'Done'}
										{burnLoading == 'try' && 'Try Again'}
										{burnLoading == 'errors' && 'Check Balance'}
										{burnLoading == 'zero' && "Qty can't be Zero"}
										{burnLoading == 'empty' && "Qty can't be Empty"}

									</Button>
									<Button className="btn_outline_grey cancel_btn btn-block" data-dismiss="modal" aria-label="Close">Cancel</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
})

