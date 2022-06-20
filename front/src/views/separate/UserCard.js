
import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import config from '../../lib/config';
import isEmpty from '../../lib/isEmpty';
import Avatars from "views/Avatar";

import video from 'video.js';
import ReactPlayer  from 'react-player'
import profile from '../../assets/images/small-profile.png'
export default function UserCard(props) {

    var {
      User
    } = props;

    return (
            
        <div className="card my-0">
        <div className="card-body px-3">
          <div className="media follow_media">
            <div className="img_media_new  mr-3">

            {User&&User.image!=""?
                    <a href={User.customurl!=""?`${config.Front_URL}/${User.customurl}`:`${config.Front_URL}/user/${User.curraddress}`}     >
                <img src={`${config.Back_URL}/images/${User._id}/${User.image}`} alt="User" className="img-fluid" onClick={User.customurl!=""?`/${User.customurl}`:`/user/${User.curraddress}`}/>
                </a>
                :
                <a href={`${config.Front_URL}/user/${User.curraddress}`}     >
                <div  onClick={User.customurl!=""?`/${User.customurl}`:`/user/${User.curraddress}`}>
                <Avatars  item="img-fluid" /></div></a>
        }

              {/* <img src={require("../assets/images/collections_02.png")} alt="User" className="img-fluid" /> */}
            </div>
            <div className="media-body flex_body">
              <div>
              {/* <p className="mt-0 media_num font_14 mb-0">{((User.count!=0)?User.count:0)+'  Followers'}</p> */}
                    <a href={User.customurl!=""?`${config.Front_URL}/${User.customurl}`:`${config.Front_URL}/user/${User.curraddress}`}     >
                <p className="my-0 media_text" title={'User :'+User.name!=""?User.name:User.curraddress}>{User.name!=""?User.name:User.curraddress}</p></a>
        
              </div>
        
            </div>
          </div>
        
        
        </div>
        </div>
       
    )
}
