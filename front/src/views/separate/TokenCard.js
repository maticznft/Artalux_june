import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import config from '../../lib/config';
import isEmpty from '../../lib/isEmpty';
import Avatars from "views/Avatar";
import Convert from 'views/separate/Convert'
import Convert1 from '../separate/Convert1'
import Twodot from '../../assets/images/twodot.png'
import { useSelector } from "react-redux";

// 
import ImgVidAud from "./imgVidAud";

export default function TokenCard(props) {
	const Wallet_Details = useSelector(state => state.wallet_connect_context);

	var {
		item,
		LikedTokenList,
		hitLike,
		PutOnSale_Click,
		PurchaseNow_Click,
		Burn_Click,
		CancelOrder_Click,
		ShareSocial_Click,
		SubmitReport_Click,
	} = props;
	const vidRef = useRef()

	const[play_set,set_play] = useState(false)

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return <span></span>
		} else {
			return <span>{days}d  {hours}h {minutes}m {seconds}s left</span>;
		}
	};
	return (
		(item.tokenowners_current) ?
			<div className="item itemd_heih_adj">
				<div className="card_inner_item m-0">
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex creators_details mb-2">
							{/* collection */}
							<a href={`${config.BSCSCAN}${item.contractAddress}`} target='_blank' title={"Collection   :   " + item.symbol}>
								{!isEmpty(item.usercontract) && item.usercontract.conAddr ?
									<img src={`${config.Back_URL}/userContract/${item.usercontract.conAddr}/${item.usercontract.imageUser}`} alt="Collection" className="img-fluid align-self-center" />
									:
									<img src={config.Lod} alt="Collection" className="img-fluid align-self-center" title={"Collection : Artalux"} />
								}
							</a>
							{/*creator  */}
							{
								item
								&& item.tokenCreatorInfo
								&&
								<Link to={item.tokenCreatorInfo.customurl != "" ? `/${item.tokenCreatorInfo.customurl}` : `/user/${item.tokenCreatorInfo.curraddress}`} data-toggle="tooltip" data-placement="top" title={`Creator : ${item.tokenCreatorInfo.name != "" ? item.tokenCreatorInfo.name : item.tokenCreatorInfo.curraddress}`}>
									{item.tokenCreatorInfo.image != "" ?
										<div className="img-fluid align-self-center">
											<img src={`${config.Back_URL}/images/${item.tokenCreatorInfo._id}/${item.tokenCreatorInfo.image}`} alt="Creator" className="img-fluid align-self-center" />
										</div>
										:
										<div className="img-fluid align-self-center">
											<Avatars item="img-fluid align-self-center" />
										</div>}

								</Link>

							}
							{/* owner */}
							{
								item
								&& item.tokenuser
								&& !isEmpty(item.tokenuser)
								&& item.tokenowners_current_count
								&& item.tokenowners_current_count.count
								&&
								(item.tokenuser.image && item.tokenuser.image != ''
									?
									<a href={item.tokenuser.customurl != "" ? `${config.Front_URL}/${item.tokenuser.customurl}` : `${config.Users_URL}/${item.tokenuser.curraddress}`} title={`Owner : ${item.tokenuser.name}`}>
										<div className="img-fluid align-self-center">
											<img src={`${config.Back_URL}/images/${item.tokenuser._id}/${item.tokenuser.image}`} alt="Owner" className="img-fluid align-self-center" />
										</div>

									</a>
									:
									<a href={`${config.Front_URL}/user/${item.tokenowners_current.tokenOwner}`} title={`Owner : ${item.tokenowners_current.tokenOwner}`}>
										<div className="img-fluid align-self-center">
											<Avatars item="img-fluid align-self-center" />
										</div>
									</a>)


							}
						</div>
						<div>
							{item.tokenowners_current.balance > 0 &&
								<div className="dropdown">
									<button className="drop-down" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										{/* <img src={Twodot} alt="Wallet" className="img-fluid mb-3" /> */}
										<i class="fas fa-ellipsis-h"></i>
									</button>
									<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

									{Wallet_Details.UserAccountAddr != "" &&
										<>
										 {(item.tokenowners_current.tokenPrice ==0 )
											&& item.tokenowners_current.tokenOwner == Wallet_Details.UserAccountAddr &&
											item.tokenowners_current.endclocktime==null&&
											<div className="dropdown-item" id={"editnotshow" + item.tokenCounts} onClick={() => PutOnSale_Click(item, item.tokenuser, item.tokenowners_current,'putonsale')}>
												<span> Put on sale</span>
											</div>
										}
										{(item.tokenowners_current.tokenPrice ==0 )
										&& item.tokenowners_current.tokenOwner == Wallet_Details.UserAccountAddr &&
										item.tokenowners_current.endclocktime != null &&
										new Date(item.tokenowners_current.endclocktime) < Date.now()&&
										<div className="dropdown-item" id={"editnotshow" + item.tokenCounts} onClick={() => PutOnSale_Click(item, item.tokenuser, item.tokenowners_current,'putonsale')}>
											<span> Put on sale</span>
										</div>
									}
										{
											(	 item.tokenowners_current
												&& item.tokenowners_current.tokenOwner
												&& item.tokenowners_current.tokenOwner == Wallet_Details.UserAccountAddr)
											&&
											item.tokenowners_current.tokenPrice > 0
											&&
										
											<div className="dropdown-item" id={"editnotshow" + item.tokenCounts} onClick={() => PutOnSale_Click(item, item.tokenuser, item.tokenowners_current)}>
												<span>	Lower Price	</span>
											</div>
										}
										{( item.tokenowners_current && item.tokenowners_current.tokenOwner && item.tokenowners_current.tokenOwner == Wallet_Details.UserAccountAddr) && (item.tokenowners_current.tokenPrice > 0) &&
											<div className="menu_itm dropdown-item" id={"cancelorder" + item.tokenCounts} onClick={() => CancelOrder_Click(item, item.tokenuser, item.tokenowners_current)}>
												<span >Cancel Order</span>
											</div>
										}
										{( item.tokenowners_current && item.tokenowners_current.tokenOwner && item.tokenowners_current.tokenOwner == Wallet_Details.UserAccountAddr) &&
											<div className="menu_itm dropdown-item" id={"BurnCollectible" + item.tokenCounts} onClick={() => Burn_Click(item, item.tokenowners_current)}>
												<span >Burn</span>
											</div>
										}

										{( item.tokenowners_current && (item.tokenowners_current.tokenPrice > 0) && item.tokenowners_current.tokenOwner && item.tokenowners_current.tokenOwner != Wallet_Details.UserAccountAddr) &&
											<div className="menu_itm dropdown-item" onClick={() => PurchaseNow_Click(item, item.tokenowners_current)}>
												<span >Purchase Now</span>
											</div>
										}
										{(item.tokenowners_current && item.tokenowners_current.tokenOwner && item.tokenowners_current.tokenOwner != Wallet_Details.UserAccountAddr) &&
											<div className="menu_itm dropdown-item" data-toggle="modal" data-target="#report_modal" onClick={() => SubmitReport_Click(item, item.tokenowners_current)}>
												<span>Report</span>
											</div>
										}

										{(item.tokenowners_current && item.tokenowners_current.tokenOwner) &&
											<div className="menu_itm dropdown-item" id={"BurnCollectible" + item.tokenCounts} data-toggle="modal" data-target="#share_modal" onClick={() => ShareSocial_Click(item, item.tokenowners_current)}>
												<span>Share</span>
											</div>
										
										}
												</>}
									</div>
								</div>
							}</div>
					</div>

					<div className="remaintime">
						<div className="item_inner_img">
							<Link to={"/info/" + item.tokenOwner + '/' + item.contractAddress + '/' + item.tokenCounts}>
								{/* <> {
									(String(item.additionalImage).includes('.mp4') &&
									<video
										id="my-video"
										className="img-fluid"
										autoPlay playsInline loop muted
										preload="auto"
										alt="video"
									>
										<source
											src={ (item.additionalImage == "" ?  `${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.image}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}
											type="video/mp4" />
									</video>)}


									{
											String(item.additionalImage).includes('.webp') &&
										<img
										src={ (item.additionalImage == "" ?  `${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.image}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}
										alt="Collections" className="img-fluid " />
									}
								</> */}
									<ImgVidAud
								 file	=	{`${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.image}`} //original image
								 thumb	=	{item.thumb	?	`${config.Back_URL}/Thumb_compressedImage/${item.tokenCreator}/${item.thumb}`	:	`${config.Back_URL}/Thumb_nftImg/${item.tokenCreator}/${item.thumb_additionalImage}`} //thumb image
								 vidAud	=	{`${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.additionalImage}`}
								 type	=	{item.image}
								 class_name	=	{"img-fluid"}
								/>
							</Link>

							{/* {
									String(item.additionalImage).includes('.mp3') &&
										<>
											<img src={config.AudioImg} className="img-fluid" 
											/>
												<audio controls controlsList="nodownload"
												ref={vidRef}
												// poster={'assets/images/audio.png'}
												alt='audio'
												playsInline loop  hidden
												type="audio/*"
												autostart="off"
												src={ (item.additionalImage == "" ?  `${config.Back_URL}/compressedImage/${item.tokenCreator}/${item.image}` : `${config.Back_URL}/nftImg/${item.tokenCreator}/${item.additionalImage}`)}
												>
											</audio>
											{play_set?
											<i className="fas fa-pause" onClick={()=>{
												set_play(false)
												vidRef.current.pause()}} ></i>:
											<i className="fas fa-play" onClick={()=>{
												set_play(true)
												vidRef.current.play()}} ></i>}
										</>
									} */}
						</div>
						<div className="headingCard d-flex">				
						<Link to={"/info/" + item.tokenOwner + '/' + item.contractAddress + '/' + item.tokenCounts} className="mr-auto">
					<h2 className="exploreheading">{item.tokenName}</h2> </Link>
					<div className="masonry_likes ml-auto" onClick={() => hitLike(item)}>
								{
									(LikedTokenList.findIndex(tokenCounts => (tokenCounts.tokenCounts === item.tokenCounts)) > -1) ?
										(<i className="fas fa-heart  liked"></i>) :
										(<i className="far fa-heart "></i>)
								}
								{/* <i className="fas fa-heart"></i> */}
								<span className={item.tokenCounts + '-likecount'}>{item.likecount}</span>  
								</div>
								</div>
						<div className="exploreprice">
							{(item
								&& item.tokenowners_current.clocktime != null
								&& item.tokenowners_current.endclocktime != null
								&& item.tokenowners_current.minimumBid != 0) ?
								<p>MinimumBid : <span>  <Convert
									item={Number(item.tokenowners_current.minimumBid)}
									coinName={item.tokenowners_current.CoinName}
									convertVal={1}
								/>
									
								</span> {item.tokenowners_current.CoinName}</p>:''
								}
								
									{(item
										&& item.tokenowners_current.clocktime == null
										&& item.tokenowners_current.endclocktime == null
										&&item.tokenowners_current.minimumBid==0
										&& item.tokenowners_current.tokenPrice == 0)?
										
										<p> <span>Open For Bid</span> </p>:''
									}
									{(item
										&& item.tokenowners_current.clocktime == null
										&& item.tokenowners_current.endclocktime == null
										&&item.tokenowners_current.minimumBid==0
										&& item.tokenowners_current.tokenPrice > 0)?
										
										<p>Price : <span> {<Convert
											item={Number(item.tokenowners_current.tokenPrice)}

											coinName={item.tokenowners_current.CoinName}

											convertVal={1}
										/>}</span> {item.tokenowners_current.CoinName}</p>:''
									}
								
						</div>
						<div className="priceButton d-flex">
						<div className="exploreprice mr-auto">
							<p>In Stock : <span> {item.tokenowners_current.balance}</span></p>
						</div>
						<div className="remaintime ml-auto">
								<>

										<div className="badge badge-dark badge-timer mb-3">
										{(item && item.tokenowners_current.clocktime != null && item.tokenowners_current.endclocktime != null) ?
										(new Date(item.tokenowners_current.endclocktime) > Date.now()) ?
												<>
											<Countdown
												date={new Date(item.tokenowners_current.endclocktime)}
												autoStart={true}
												onStart={() => new Date(item.tokenowners_current.clocktime)}
												renderer={renderer}
											>
											</Countdown>
											<i className="fas fa-fire ml-2"></i></>
												: <p className="pl-2 timedAuction">Timed Auction Completed</p>
												: (

													(item
														&& item.tokenowners_current.clocktime == null
														&& item.tokenowners_current.endclocktime == null
														&&item.tokenowners_current.minimumBid==0
														&& item.tokenowners_current.tokenPrice > 0)? <p className="pl-2">Fixed Price</p>: <p className="pl-2">Open For Bid</p>)
														}
										
										</div>

									</>
								
						</div>
						</div>
					</div></div>
			</div>
			: ('')
	)
}