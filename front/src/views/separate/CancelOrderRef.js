import React, {
    forwardRef,
    useImperativeHandle
} from 'react';

import { Button } from '@material-ui/core';
import Web3 from 'web3';
import '@metamask/legacy-web3'
import isEmpty from 'lib/isEmpty';
import { useLocation, useHistory } from 'react-router-dom'
import config from '../../lib/config';
import SINGLE from '../../ABI/SINGLE.json'
import MULTIPLE from '../../ABI/MULTIPLE.json'
import Convert from '../separate/Convert'
import {
    TokenPriceChange_update_Action,
    checkOtherPlatformDetais1155,
    token_usd
} from '../../actions/v1/token';
import { getReceipt } from 'actions/v1/getReceiptFunc';
import Trade from '../../ABI/Trade.json'
import Convert1 from '../../views/separate/Convert1'
import { useSelector } from 'react-redux'

import {toast} from 'react-toastify';
let toasterOption = config.toasterOption;




export const CancelOrderRef = forwardRef((props, ref) => {
    const Wallet_Details = useSelector(state => state.wallet_connect_context);
    const history = useHistory();
    const [FormSubmitLoading, Set_FormSubmitLoading] = React.useState('start');
    const [TokenPrice, Set_TokenPrice] = React.useState(0);
    const [Owners, Set_Owners] = React.useState({});
    const [Item_Owner, Set_Item_Owner] = React.useState({});
    const [Items, Set_Item] = React.useState({});
    const location = useLocation();

    async function FormSubmit() {
        if (Wallet_Details.providers != null) {
            Set_FormSubmitLoading('processing');
            var web3 = new Web3(Wallet_Details.providers)
            if (
                web3
            ) {
                try {
                    if (Items.contractAddress == config.singleContract ||
                        Items.contractAddress == config.multipleContract) {
                        var CoursetroContract = new web3.eth.Contract(
                            Items.type == 721 ? SINGLE : MULTIPLE,
                            Items.contractAddress)
                    }
                    else {
                        var CoursetroContract = new web3.eth.Contract(
                            Trade,
                            config.trade
                        );

                    }
                    var handle = null;
                    var receipt = null;

                    await CoursetroContract.methods
                        .cancelOrder(
                            Items.tokenCounts,
                        )
                        .send({ from: Wallet_Details.Accounts })
                        .on('transactionHash', async (transactionHash) => {
                            handle = setInterval(async () => {
                                receipt = await getReceipt(web3, transactionHash)
                                clr1();
                            }, 8000)
                        })
                }

                catch (error) {
                    Set_FormSubmitLoading('try');
                    toast.error(config.ErrorTransaction, toasterOption)
                }

            }
            async function clr1() {
                if (receipt != null) {
                    clearInterval(handle);
                    if (receipt.status == true) {
                        var postData = {
                            tokenOwner: Wallet_Details.UserAccountAddr,
                            tokenCounts: Items.tokenCounts,
                            tokenPrice: 0,
                            blockHash: receipt.blockHash,
                            transactionHash: receipt.transactionHash,
                            CoinName: '',
                            PutOnSaleType: 'cancel',
                            type: Item_Owner.type,
                            contractAddress: Items.contractAddress
                        }
                        var Resp = await TokenPriceChange_update_Action(postData)
                        ////("Resp.data", Resp.data)
                        if (Resp && Resp.data && Resp.data && Resp.data.message == 'success') {
                            Set_FormSubmitLoading('done');
                            toast.success(config.SuccessTransaction, toasterOption)
                            window.$('.modal').modal('hide');
                            setTimeout(() => {
                                if (location.pathname.includes('/info')) {
                                    // var payload = {
                                    //     curAddr: Wallet_Details.UserAccountAddr,
                                    //     tokenCounts: Items.tokenCounts,
                                    //     paramAddress: Wallet_Details.UserAccountAddr,
                                    //     contractAddress: Items.contractAddress
                                    // };
                                    // props.Refresh_page(payload)
                                    props.Refresh_page()

                                }
                                else {
                                    history.push('/info/' + Wallet_Details.UserAccountAddr + '/' + Item_Owner.contractAddress + '/' + Item_Owner.tokenCounts)
                                }
                            }, 8000);

                        }

                    }
                }
            }

        }

    }



    useImperativeHandle(
        ref,
        () => ({
            async CancelOrder_Click(item, Owner, itemOwner) {
                /**
                 * item- initial item
                 * 
                 * owner - owner detail user
                 * 
                 * item owner- itemowner db
                 */
                if (Wallet_Details.UserAccountAddr != "") {
                    var web3 = new Web3(Wallet_Details.providers)
                    var balance = await checkOtherPlatformDetais1155(item, itemOwner, item.type, web3);
                    ////('balance>>>>>>>>>', balance)
                    if (balance == 0) {
                        toast.warning("You won't buy at this moment please refresh you data", toasterOption);
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 1000);
                        return false;
                    }
                    else {

                        Set_Item(item)
                        Set_TokenPrice(0);
                        Set_Owners(Owner)
                        Set_Item_Owner(itemOwner)
                        window.$('#cancel_order_modal').modal('show');
                    }
                }
                else {
                    window.$('#connect-wallet').modal('show');
                }
            }
        }),
    )
    return (
        <div className="modal fade primary_modal" id="cancel_order_modal" tabIndex="-1" role="dialog" aria-labelledby="cancel_order_modalCenteredLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title" id="cancel_order_modalLabel">Cancel Order</h5>
                        <div className="change_price_img_div">
                            {
                                Items && Items.image &&
                                (String(Items.image).split('.').pop() == "mp4" ||
                                    (String(Items.image).split('.').pop() == "webm") ||
                                    (String(Items.image).split('.').pop() == "WEBM") ||
                                    (String(Items.image).split('.').pop() == "ogv") ||
                                    (String(Items.image).split('.').pop() == "OGV")
                                ) &&
                                <video
                                    id="my-video"
                                    className="img-fluid"
                                    autoPlay controls playsInline loop muted
                                    preload="auto"
                                >
                                    <source src={(Items.additionalImage == "" ? `${config.IPFS_IMG}/${Items.ipfsimage}` : `${config.Back_URL}/nftImg/${Items.tokenCreator}/${Items.additionalImage}`)} type="video/mp4" />
                                </video>}
                            {
                                Items
                                && Items.image
                                && ((String(Items.image).split('.').pop() == "mp3"
                                    || String(Items.image).split('.').pop() == "aac"
                                    || String(Items.image).split('.').pop() == "AAC"
                                    || String(Items.image).split('.').pop() == "FLAC"
                                    || String(Items.image).split('.').pop() == "flac")) &&
                                <>
                                    <img src={config.AudioImg} className="img-fluid" />

                                    <audio
                                        className=""
                                        // autoPlay
                                        muted
                                        controls
                                        playsInline
                                        loop
                                    >
                                        <source src={Items.additionalImage == "" ? `${config.IPFS_IMG}/${Items.ipfsimage}` : `${config.Back_URL}/nftImg/${Items.tokenCreator}/${Items.additionalImage}`} type="audio/mp3" />
                                    </audio>
                                </>
                            }
                            {Items
                                && Items.image
                                && ((String(Items.image).split('.').pop() == "webp"
                                    || String(Items.image).split('.').pop() == "WEBP"
                                    || String(Items.image).split('.').pop() == "gif"
                                    || String(Items.image).split('.').pop() == "jpg"
                                    || String(Items.image).split('.').pop() == "GIF"
                                    || String(Items.image).split('.').pop() == "JPG"
                                    || String(Items.image).split('.').pop() == "JPEG"
                                    || String(Items.image).split('.').pop() == "jpeg"
                                    || String(Items.image).split('.').pop() == "png"
                                    || String(Items.image).split('.').pop() == "PNG")) &&
                                <img src={Items.additionalImage == "" ? `${config.IPFS_IMG}/${Items.ipfsimage}` : `${config.Back_URL}/nftImg/${Items.tokenCreator}/${Items.additionalImage}`} alt="Collections" className="img-fluid" />
                            }
                        </div>
                        <p className="text-gray font_we_600 font_12">You are about to delete Instant Sale for
                            <span className="buy_desc_sm_bold pl-1 bold_red owner_break">{Items.tokenName} </span>
                            for
                            <span className="buy_desc_sm_bold pl-1 bold_red owner_break" styel={{ fontSize: 10 }}>
                                {
                                    !isEmpty(Owners)
                                        && Owners.name != ""
                                        ? <span className="word_brak_text_inline_new" title={"Owner : " + Owners.name}>{Owners.name}</span>
                                        : <span className="word_brak_text_inline_new" title={"Owner : " + Item_Owner && Item_Owner.tokenOwner}>{String(Item_Owner && Item_Owner.tokenOwner).slice(0, 10).concat("...")}</span>

                                }
                            </span>
                        </p>

                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" disabled={(FormSubmitLoading == 'processing' || FormSubmitLoading == 'done')}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body px-0 pt-0">
                        <form className="px-4 bid_form" >
                            <label htmlFor="bid">
                              {token_usd(Item_Owner.tokenPrice,1)}
                                {Item_Owner.CoinName}
                             {/* <>  ( $  {token_usd(Item_Owner.tokenPrice,Wallet_Details.token_usd_value)} )  </> */}

                                 </label>

                            <div className="text-center mt-3">
                                <Button
                                    type="button"
                                    className="primary_btn btn-block"
                                    onClick={() => (FormSubmitLoading == 'start' || FormSubmitLoading == 'try') ? FormSubmit() : ''}
                                    disabled={(FormSubmitLoading == 'processing' || FormSubmitLoading == 'done')}
                                >
                                    {FormSubmitLoading == 'processing' && <i className="fa fa-spinner mr-3 spinner_icon" aria-hidden="true" id="circle1"></i >}
                                    {FormSubmitLoading == 'processing' && 'In-Progress'}
                                    {FormSubmitLoading == 'done' && 'Done'}
                                    {FormSubmitLoading == 'start' && 'Start'}
                                    {FormSubmitLoading == 'try' && 'Try-Again'}
                                </Button>
                                <Button className="btn_outline_red btn-block cancel_btn"
                                    disabled={(FormSubmitLoading == 'processing')}
                                    data-dismiss="modal" aria-label="Close">Cancel</Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
})

