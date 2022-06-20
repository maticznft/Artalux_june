import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import config from '../../lib/config';
import isEmpty from '../../lib/isEmpty';
import Avatars from "views/Avatar";
import ReactPlayer   from "react-player";
import video from 'video.js';
export default function TokenCard(props) {
    async function showAllwithPro(data) {
    }
    async function buyToken() {
        ////////('buyToken')
    }
    var {
        item,
        LikedTokenList,
        hitLike,
        UserAccountAddr,
        UserAccountBal,
        PutOnSale_Click,
        PurchaseNow_Click,
        Burn_Click,
        CancelOrder_Click,
        WalletConnected,
        ShareSocial_Click,
        SubmitReport_Click
    } = props;

    const renderer = ({ days, Month, Year, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span></span>
        } else {
            return <span>{days}d  {hours}h {minutes}m {seconds}s left</span>;
        }
    };
    ////////("check owner",item)
    return (
        (item.tokenOwner) ?
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 masonry mb-4">
                   
        <div className="item">
            <div className="card_inner_item">
                {/* <div className="item_details_top">
                        <p className="sold_text">Sold to @mikebasker</p>
                      </div>            */}


                <div className="item_inner_img">
                    <Link to={"/info/" +item.tokenOwner+'/'+item.contractAddress+'/'+ item.tokenCounts}>
                    {
                            item.image!=""&&(
                               ( String(item.image).split('.').pop() == "mp4" )||
                               (String(item.image).split('.').pop() == "mp4")||
                               (String(item.image).split('.').pop() == "webm")||
                               (String(item.image).split('.').pop() == "WEBM")||
                               (String(item.image).split('.').pop() == "ogv")||
                               (String(item.image).split('.').pop() == "OGV"))&&
                                    <video
                            id="my-video"
                            className="img-fluid"
                            autoPlay  playsInline loop
                            preload="auto"
                            // width="640"
                            // height="264"
                            // poster={item.ipfsimage!=""?`${config.IPFS_IMG}/${item.ipfsimage}`:`${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`}
                            // data-setup="{}"
                            >   
                     <source 
                     src={item.additionalImage==""?`${config.IPFS_IMG}/${item.ipfsimage}`:`${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`}
                      
                    //  src={item.ipfsimage!=""?`${config.IPFS_IMG}/${item.ipfsimage}`:`${config.Back_URL}/nftImg/${item.tokenCreator}/${item.image}`}
                      type="video/mp4" />
                    </video>}
                   
                    {
                    item && item.image && item.image != ""
                     && ((String(item.image).split('.').pop() == "mp3"||String(item.image).split('.').pop() == "aac"||String(item.image).split('.').pop() == "AAC"||String(item.image).split('.').pop() == "FLAC"||String(item.image).split('.').pop() == "flac") ) &&
                     <>
                    {
                     <>
                      
                         
                   <audio
                    controls
                    controlsList="nodownload"
                    muted       
                     alt='audio'
                     id="audio_play"
                      playsInline loop 
                      type="audio/mp3"
                      autostart="off"

                      src={item.ipfsimage != "" ? `${config.IPFS_IMG}/${item.ipfsimage}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`}
                    >
                    </audio>
                    {/* <img src={AudioImg} onClick="document.getElementById('audio_play').play(); "  className="img-fluid"/> */}
{/* <p>sadasd</p> */}
                    </>
                   
                    }
                    </>
                    }
                    {
                        (
                            String(item.image).split('.').pop() == "webp"
                          ||String(item.image).split('.').pop() == "WEBP"
                          ||String(item.image).split('.').pop() == "gif"
                          ||String(item.image).split('.').pop() == "jpg"
                          ||String(item.image).split('.').pop() == "GIF"
                          ||String(item.image).split('.').pop() == "JPG"
                          ||String(item.image).split('.').pop() == "JPEG"
                          ||String(item.image).split('.').pop() == "jpeg"
                          ||String(item.image).split('.').pop() == "png"
                          ||String(item.image).split('.').pop() == "PNG")&&
                                  <img 
                                    src={item.additionalImage==""? `${config.IPFS_IMG}/${item.ipfsimage}`:`${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`} 
                                     alt="Collections" className="img-fluid " />
                              }
                        

                    </Link>
                    </div>
                   

                <div className="item_details_bot">
                {(item && item.clocktime != null && item.endclocktime != null) ?
                                (
                                <badge className="badge badge-dark badge-timer mb-3">
                                    <Countdown 
                                    // date={Date.now()+100000000000}
                                    date={new Date(item.endclocktime)}
                                        autoStart={true}
                                        onStart={() => new Date(item.clocktime)}
                                        renderer={renderer}
                                    >
                                    </Countdown>
                                    <i className="fas fa-fire ml-2"></i>
                                </badge>
                              ) : ('')} 
                <Link to={"/info/" +item.tokenOwner+'/'+item.contractAddress+'/' +item.tokenCounts}>
                 <h2>{item.tokenName}</h2></Link>
                {/* {item.tokenowners_current.tokenOwner == UserAccountAddr && <h4 className="text-left">My Collections</h4> }     */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="media follow_media">
                            <div className="img_tick_div">
                                {/* <img src={require("../assets/images/small-profile.png")} alt="User" className="img-fluid mr-2 img_user_new_sm" /> */}
                                {/* owner */}
                                {
                                    item
                                        && item.type == 1155
                                        && item.tokenowners_current_count
                                        && item.tokenowners_current_count.count
                                        && item.tokenowners_current_count.count > 1
                                        ?
                                        ('')
                                        :
                                        (!isEmpty(item.tokenOwnerInfo) && item.tokenOwnerInfo.curraddress && item.tokenOwnerInfo.image!="")
                                            ?
                                            <a href={item&&item.tokenOwnerInfo&&item.tokenOwnerInfo.customurl!=""?`${config.Front_URL}/${item.tokenOwnerInfo.customurl}`:`${config.Front_URL}/user/${item.tokenOwnerInfo.curraddress}`} title={`Owner : ${item.tokenOwnerInfo.name}`}>
                                                <img src={`${config.Back_URL}/images/${item.tokenOwnerInfo._id}/${item.tokenOwnerInfo.image}`} alt="Owner" className="img-fluid mr-2 img_user_new_sm" />
                                            </a>
                                            :
                                            <a href={`${config.Front_URL}/user/${item.tokenOwner}`} title={`Owner : ${item.tokenOwner}`}>
                                                {/* <img src={`${config.Back_URL}/images/noimage.png`} alt="Owner" className="img-fluid mr-2 img_user_new_sm" /> */}
                                                {/* <Avatars item={item.tokenowners_current.tokenOwner} className="img-fluid mr-2 img_user_new_sm"/> */}
                                                <Avatars  item="img-fluid mr-2 img_user_new_sm" />
                                            </a>
                                }

                            </div>
                            <div className="media-body flex_body">
                                <p className="mt-0 media_text mt-0 mb-0"  style={{"wordBreak":"break-all"}} title={item.tokenOwnerInfo.name!=""?item.tokenOwnerInfo.name:(item.tokenowners_current.tokenOwner)}>@{item.tokenOwnerInfo.name!=""?item.tokenOwnerInfo.name:((item.tokenowners_current.tokenOwner).slice(0,8).concat('....'))}</p>
                            </div>
                        </div>
                        <div>
                            
                        <h3 className="mb-0" >
                   {(item.PutOnSale == true && item.PutOnSaleType=='FixedPrice' && item.tokenowners_current.tokenPrice > 0) && <span>{item.tokenowners_current.tokenPrice} {config.currencySymbol} </span>}
                    {(item.PutOnSale == true && item.PutOnSaleType=='TimedAuction') && <span>{item.minimumBid} {config.tokenSymbol} </span>}
                    {(item.PutOnSale == true && item.PutOnSaleType=='UnLimitedAuction') && <span>Open for Bids </span>}
                    {item.tokenowners_current.balance} of {item.tokenowners_current.quantity} 
                </h3>
                            {/* <h3    >{item.tokenowners_current.tokenPrice > 0 && <span>{item.tokenowners_current.tokenPrice} {config.currencySymbol} </span>} </h3> */}
                        </div>
                    </div>

                </div></div>

        </div>
        </div> 
        : ('')  
    )
}