/**
 * FILE		   	:	SHARENOW - MODAL
 * DISPATCH		:	NIL
 * REF			:	ShareNowRef
 * METHOD   	:   NIL
 * C-DATE   	:   30_01_22
 * S-DATE   	:   30-01-22
*/

import React, {
    forwardRef,
    useImperativeHandle
} from 'react';
import '@metamask/legacy-web3';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share'
import config from '../../lib/config';
import { useSelector } from 'react-redux';




export const ShareNowRef = forwardRef((props, ref) => {
    const Wallet_Details = useSelector(state => state.wallet_connect_context);

    const [item, Set_Item] = React.useState({});
    const [onwer_price, set_onwer_price] = React.useState({});

    useImperativeHandle(
        ref,
        () => ({
            async ShareSocial_Click(items, onwer_price) {
                if (items) {
                    Set_Item(items)
                    set_onwer_price(onwer_price)
                    window.$('#share_modal').modal('show');

                }
            }
        }),
    )

    return (
        <div>
            <div className="modal fade primary_modal" id="share_modal" tabIndex="-1" role="dialog" aria-labelledby="share_modalCenteredLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title" id="share_modalLabel">Share link to this page</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {Wallet_Details.shareTag!=null&&
                        <div className="modal-body  px-0">

                            <div className="row justify-content-center mx-0">
                                <div className="col-12 col-sm-6 col-lg-3 px-1">
                                    <div className="text-center icon_div">

                                        <TwitterShareButton
                                            title={`${item.tokenName}  NFT`}
                                            url={`${config.Front_URL}/info/${onwer_price.tokenOwner}/${item.contractAddress}/${onwer_price.tokenCounts}` + " " +`${Wallet_Details.shareTag[0]}`+" "+`${Wallet_Details.shareTag[1]}` +" " +`${(Wallet_Details.shareTag[2])}`}
                                          
                                        >
                                            <i className="fab fa-twitter"></i>
                                            <p>Twitter</p>


                                        </TwitterShareButton>

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-3 px-1">
                                    <div className="text-center icon_div">

                                        <TelegramShareButton
                                            title={`${item.tokenName}  NFT`}
                                            url={`${config.Front_URL}/info/${onwer_price.tokenOwner}/${item.contractAddress}/${onwer_price.tokenCounts}` + " " +`${Wallet_Details.shareTag[0]}`+" "+`${Wallet_Details.shareTag[1]}` +" " +`${(Wallet_Details.shareTag[2])}`}
                                        
                                        >

                                            <i className="fab fa-telegram-plane"></i>
                                            <p>Telegram</p>

                                        </TelegramShareButton>

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-3 px-1">
                                    <div className="text-center icon_div">
                                        <FacebookShareButton
                                            quote={`${item.tokenName} NFT`}
                                            // title={`${item.tokenName}  NFT`}
                                            url={`${config.Front_URL}/info/${onwer_price.tokenOwner}/${item.contractAddress}/${onwer_price.tokenCounts}` + " " +`${Wallet_Details.shareTag[0]}`+" "+`${Wallet_Details.shareTag[1]}` +" " +`${(Wallet_Details.shareTag[2])}`}
                                        
                                        //     via={`${config.Front_URL}`}
                                        >
                                            <i className="fab fa-facebook-f"></i>
                                            <p>Facebook</p>
                                        </FacebookShareButton>

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-3 px-1">
                                    <div className="text-center icon_div">
                                        <WhatsappShareButton
                                           title={`${item.tokenName}  NFT`}
                                           url={`${config.Front_URL}/info/${onwer_price.tokenOwner}/${item.contractAddress}/${onwer_price.tokenCounts}` + " " +`${Wallet_Details.shareTag[0]}`+" "+`${Wallet_Details.shareTag[1]}` +" " +`${(Wallet_Details.shareTag[2])}`}
                                         >
                                            <i className="fab fa-whatsapp"></i>
                                            <p>Whatsapp</p>
                                        </WhatsappShareButton>

                                    </div>
                                </div>
                            </div>



                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
})

