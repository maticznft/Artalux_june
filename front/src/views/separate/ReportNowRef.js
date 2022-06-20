/**
 * FILE		   	:	REPORTNOW - MODAL
 * DISPATCH		:	NIL
 * REF			:	ReportNowRef
 * METHOD   	:   reportFunc
 * C-DATE   	:   30_01_22
 * S-DATE   	:   30-01-22
*/

import React, {
    forwardRef,
    useImperativeHandle
} from 'react';
import { Button } from '@material-ui/core';
import '@metamask/legacy-web3'
import { useSelector } from 'react-redux';
import config from '../../lib/config';
import {
    reportFunc
  } from 'actions/v1/report';
import isEmpty  from 'lib/isEmpty';

import {toast} from 'react-toastify';
let toasterOption = config.toasterOption;

export const ReportNowRef = forwardRef((props, ref) => {
	const Wallet_Details = useSelector(state => state.wallet_connect_context);

    const [description, setdescription] = React.useState("");
    const [item, Set_item] = React.useState({});
    const [reports,setreports]=React.useState("");
    const [reportSubmit,setreportSubmit]=React.useState(false);
    const [token_owner_detail,set_token_owner_detail]=React.useState({});
    
 
    useImperativeHandle(
        ref,
        () => ({
            async SubmitReport_Click(item,tokenOwn) {
                if (item) {
                    Set_item(item);
                    set_token_owner_detail(tokenOwn)
                    window.$('#report_modal').modal('show');
                }
            }
        }),
    )

    // ===============================report ==========================
    const reporttoken=async()=>{
        if(!isEmpty(reports)){
          setreportSubmit(false)
        var postdata={
          currAddr:Wallet_Details.UserAccountAddr,
          imageOwner:token_owner_detail.tokenOwner,
          imageName:item.tokenName,
          imagehash:item.ipfsimage,
          report:reports,
          imageContractAddress:item.contractAddress,
          imageType:item.type,
          imageId:item.tokenCounts,
          noofitems:token_owner_detail.balance ,
          burnToken: token_owner_detail.burnToken    
        }
        var reportdata=await reportFunc(postdata)
        if(reportdata.data){
          toast.success('reported successfully',toasterOption)
          document.getElementById('closereport').click()
         }
        else{
          toast.success('Please try again some other time',toasterOption)
        }
        }
        else{
         setreportSubmit(true)
          document.getElementById('reportmessage').innerHTML="Message Can't be empty"
        }
      }
    return (
        <div>
            <div className="modal fade primary_modal" id="report_modal" tabIndex="-1" role="dialog" aria-labelledby="report_modalCenteredLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title" id="report_modalLabel">Report This Profile?</h5>
                            <button type="button" className="close" id="closereport" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <p className="font_14 font_600 line_20 mb-1 text_drk_bl">Tell us how this user violates the rules of the site</p>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-12">

                                        <label className="primary_label" htmlFor="name">Message</label>
                                        <textarea
                                        value={description} 
                                        className="form-control primary_inp"
                                         id="report"
                                         name="report"
                                         value={reports}
                                         rows="3" 
                                         placeholder="Tell us some details"
                                         onChange={(e)=>{setreports(e.target.value);
                                           setreportSubmit(false)
                                           }}
                                          placeholder="Tell us some details"></textarea>
                                      
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <Button  disabled={reportSubmit} className="primary_btn  btn_white btn_big_white w-100"  onClick={()=>reporttoken()}>Report</Button>
                                    <p className="text-danger" id="reportmessage"></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

