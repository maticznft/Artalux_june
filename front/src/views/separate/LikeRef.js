import React, {
    forwardRef,
    useImperativeHandle
} from 'react';

import Web3 from 'web3';
import $ from 'jquery';
import config from '../../lib/config';

import {
    AddLikeAction,
    GetLikeDataAction
} from '../../actions/v1/token';
import { useSelector } from 'react-redux';

import {toast} from 'react-toastify';

let toasterOption = config.toasterOption;

export const LikeRef = forwardRef((props, ref) => {
    const Wallet_Details = useSelector(state => state.wallet_connect_context);

    async function getLikesDataCall () {
        // var currAddr = await getCurAddr();
        if(Wallet_Details.UserAccountAddr!="") {
            var payload = {
                currAddr: Wallet_Details.UserAccountAddr
            }
            var check = await GetLikeDataAction(payload);
            if(check && check.data && check.data.records) {
                props.setLikedTokenList(check.data.records);
            }
        }
    }

    useImperativeHandle(
        ref,
        () => ({
            async getLikesData() {
                getLikesDataCall();
            },
            async hitLike(data) {
                var web3=new Web3(Wallet_Details.providers)
                if (Wallet_Details.UserAccountAddr!="") {
                {
                    var likeData = {
                        // actions:"like",
                        currAddr: Wallet_Details.UserAccountAddr,
                        tokenCounts: data.tokenCounts,
                        tokenOwner: data.tokenOwner,
                        activity:"Liked by"
                    }
                    var resp = await AddLikeAction(likeData);
                    if(resp && resp.data && resp.data.toast && resp.data.toast.msg) {
                        if(resp.data.toast.type == 'success') {
                            toast.success(resp.data.toast.msg, toasterOption);
                            if(
                                resp.data.tokenData
                                && resp.data.tokenData.record
                                && typeof resp.data.tokenData.record.likecount != 'undefined'
                            ) {
                                $('.'+data.tokenCounts+'-likecount').html(resp.data.tokenData.record.likecount);
                            }
                        }
                    }
                    getLikesDataCall();
                }
                
            }
            else{
                window.$('#connect_modal').modal('show');
            }
            }
        }),
    )
    return (
      <div></div>
    )
})

