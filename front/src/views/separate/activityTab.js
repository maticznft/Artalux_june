
import React, {useEffect,useState} from "react";
import { Link ,useHistory} from "react-router-dom";
import Countdown from "react-countdown";
import config from '../../lib/config';
import isEmpty from '../../lib/isEmpty';
import Avatars from "views/Avatar";
import moment from 'moment'
import video from 'video.js';
import ReactPlayer  from 'react-player'
import profile from '../../assets/images/small-profile.png'
export default function ActivityCard(props) {
var history=useHistory();
    var {
    item
    } = props;

    return (
      <div className="col-12 col-md-6 col-xl-4 mb-4"  >
                                <div className="card my-0 h-100 acti_card">
                                  <div className="card-body px-3">
                                    <div className="media follow_media icon_img">
                                      <div className="icon-img-div">
                                        <div className="">
                                          {/* <i className="fas fa-share-alt"></i> */}
                                        </div>
                                        <div className="img_media_new  mr-3">
                                          {
                                            item
                                            && item.to_user
                                            &&  <div onClick={() => history.push(item.to_user.customurl != "" ? `/${item.to_user.customurl}` : `/user/${item.to_user.curraddress}`)}>
                                           {item.to_user.image
                                           ? <img  alt="User" className="img-fluid" src={`${config.Back_URL}/images/${item.to_user.curraddress}/${item.to_user.image}`}/>
                                         
                                           :
                                              <Avatars  item="img-fluid" />}
                                              </div>
                                          }


                                        </div>
                                      </div>
                                      <div className="media-body flex_body">
                                        <div>
                                          {item.to_user.curraddress 
                                          && <div onClick={() => history.push(`/user/${item.to_user.curraddress}`)}>
                                            <p className="my-0 media_text" title={(item.to_user && item.to_user.name != "") ? item.to_user.name : item.to_user.curraddress}>{(item.to_user && item.to_user.name != "") ? item.to_user.name : item.to_user.curraddress && item.to_user.curraddress != "" && (String(item.to_user.curraddress).slice(0, 8).concat('...'))}</p></div>}
                                          {item.activity 
                                          && <div onClick={() => history.push(`/info/${item.tokenOwner}/${item.contractAddress}/${item.tokenCounts}`)}>
                                           <p className="mt-0 media_num mt-0">
                                            <b>{item.tokenName}</b> {item.activity}</p></div>}
                                          {item.fromField.curraddress && <div onClick={() => history.push(item.fromField.customurl?`${item.fromField.customurl}`:`/user/${item.fromField.curraddress}`)}>
                                            <p className="my-0 media_text" title={(item.fromField && item.fromField.name != "") ? item.fromField.name : (item.fromField.curraddress)}>{(item.fromField && item.fromField.name != "") ? item.fromField.name : item.fromField.curraddress != "" && String(item.fromField.curraddress).slice(0, 8).concat('...')}</p></div>}



                                        </div>

                                      </div>
                                    </div>
                                    <div className="ml-2">
                                      <p className="mt-0 media_num mb-0 dur_text">		{moment(item.created).format('MM/DD/YYYY, h:mm a')}
                                      </p>
                                    </div>

                                  </div>
                                </div>
                              </div>
          
    )
}
