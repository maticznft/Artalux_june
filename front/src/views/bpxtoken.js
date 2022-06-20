import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import ApexCharts from 'apexcharts'
// import ReactApexChart from "react-apexcharts";
import Binance from "binance-api-node";
import config from '../lib/config';

import { CandleStickChart } from "./chart/candlestickChart";
import axios from "axios";
import Web3 from "web3";
import DETH_ABI from 'ABI/DETH_ABI.json'
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
let toasterOption = config.toasterOption;
const dashboardRoutes = [];
const useStyles = makeStyles(styles);
export default function Bpxtoken(props) {
 
    const options= {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }
  
  
    const Wallet_Details = useSelector(state => state.wallet_connect_context);
  
  const classes = useStyles();
  const { ...rest } = props;
  var LikeForwardRef = useRef();
  const [token_data,set_token_data]=useState({})
  const [wallet_support,set_wallet_support]=useState([])
  const [market_status,set_market_status] =useState({})
  const [CHart_data,set_CHart_data] = useState([])
const [volume,set_volume] = useState(0)


  const market_status_fun=async()=>{
      var payload = {"ids":["0x8cb6aa6e8575d87961bd01d2ff09007c2499ec56-bsc"]}
          axios.post('https://api.dex.guru/v2/tokens/',payload)
          .then((data)=>{
            set_market_status(data.data.data[0])
          }).catch((E)=>{
            set_market_status([])
          })
        }
        const chart=async()=>{
          axios.get(config.vUrl+'/token/cron/service')
              .then((datas)=>{
                ////("chart datachart data",datas);
                var jus=[]
                if(datas&&datas.data){
                 var chrtva = []
                 datas.data.map((item,i)=>{
                 chrtva.push({x:new Date(item.timeInterval.day).getTime(),y:[Number(item.open),Number(item.high),Number(item.low),Number(item.close)]})
                })
                jus.push({data:chrtva})
                set_CHart_data(jus)
                set_volume(datas.data[datas.data.length-1].volume)
              }
              else
              set_CHart_data(jus)
              })
            }
        
       

  useEffect(()=>{
    // chart()
    contractCall()
    market_status_fun()
  },[])

  const contractCall=async()=>{
     axios.get(config.vUrl+'/admin/panel/gettokenLists')
     .then((data)=>{
       ////("data.uservalue",data)
       if(data&&data.data&&data.data.length>0){
       set_token_data(data.data[data.data.length-1])
       set_wallet_support(data.data)
       }
     })
  }
  // //(" CHart_data[0]&&CHart_data[0].data&&CHart_data[0].data[CHart_data[0].data.length-1].y[0].close", CHart_data[0]&&CHart_data[0].data&&CHart_data[0].data[CHart_data[0].data.length-1].y);
  return (
   
    <div>
       <div className="home_header">
       

        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand={<Link to="/">
            <img src={require("../assets/images/logo.svg")} alt="logo" className="img-fluid" /></Link>}
          rightLinks={<HeaderLinks />}
          changeColorOnScroll={{
            height: 20,
            color: "white"
          }}
          {...rest}
        />
         <div className="body-top pagetop">
        <section className="">
          <div className="container">
          <div className="row sectionone "> 
            <div className="col-12 col-lg-12 col-xl-5 col-md-12 mb-3">
                <div className="infotoken pt-2 pb-2">
                <div className="row p-4">
                <div className="col-12 col-lg-2 col-xl-2 col-md-12">
                <img src={require("../assets/images/loader.png")} alt="logo" className="img-fluid loaderbpxtoken" />
                    </div>
                    <div className="col-12 col-lg-10 col-xl-10 col-md-12">
                    {/* */}
                        <h2 className="bidpixeldet">{token_data.tokenName?token_data.tokenName:'No Token Name name available'}<span>on {token_data.network?token_data.network:'Network'}</span></h2>
                        <p className="bidpixelpara">{token_data.tokenContents?token_data.tokenContents:'No Token Contents name available here'} </p>
                        {/* <p className="bidpixelpara"></p> */}
                        <p className="contract conta_word_brk">Contract: <span>{token_data.tokenAddress?token_data.tokenAddress:config.deadAddress} </span></p>
                        <div className="tokenbutton mb-3">
                        <a href="https://bscscan.com/token/0x8cb6aa6e8575d87961bd01d2ff09007c2499ec56" target="_blank" className="bidpixelstoken">Token</a>
                        <a  href="https://bscscan.com" target="_blank"  className="bidpixelstoken ml-3">Binance Smart Chain</a>
                        <a href="#" className="bidpixelstoken ml-3">Bep 20</a>
                        </div>
                          <a  href="https://token.bidpixels.com/" target="_blank"  className="bidpixelstokens mt-3">Buy Token From token.bidpixels.com</a>
                        {/* <p className="contract pt-2 mb-0">Same Token:</p>
                        <a href="https://bscscan.com/address/0xC3b4680cF7f7c176466a0A1AC4E096A11FF77EaA" target="_blank" >   <p className="contract mb-0">Baby Sphynx (BPX): <span> (0xC3b4680cF7f7c176466a0A1AC4E096A11FF77EaA)</span></p></a>
                        <a href="https://bscscan.com/address/0xa04bea3786c7ad96ded5f5c86342bf46da397ca7" target="_blank" > <p className="contract mb-0"> Black Phoenix (BPX): <span>(0xa04bea3786c7ad96ded5f5c86342bf46da397ca7)  </span></p></a> */}
                    </div>
                </div>
                </div>
            </div>
            <div className="col-12 col-lg-12 col-xl-7 col-md-12">
              <div className="row">
            <div className="col-12 col-lg-6 col-xl-6 col-md-12 mb-3">
            <div className="infotoken  p-3">
            <ul className="pt-3 pb-0 mb-0">
               <li><span>Date Deployed:</span><span className="dateand">{token_data.date_deploy?token_data.date_deploy:'--'}</span></li>
               <li><span>Total Supply:</span><span className="dateand">{token_data.totalsupply?token_data.totalsupply:'--'}</span></li>
               <li><span>Circulating Supply:</span><span className="dateand">	{token_data.circulating_Supply?token_data.circulating_Supply:'--'}</span></li>
               <li><span>Decimals:</span><span className="dateand">{token_data.Decimals?token_data.Decimals:'--'}</span></li>
               {/* <li><span>Holders:</span><span className="dateand text-left">{token_data.Holders?token_data.Holders:'--'}</span></li> */}
               <li className="pb-0"><span>Exchange:</span> 
               <span className="dateand">
              <a href="https://pancakeswap.finance/swap" target="_blank"> <span className="spanimage my-1"><img src={require("../assets/images/bidpixels_trba/pancakeswap.png")} alt="logo" className="img-fluid rounded-circle mr-2"  />Pancakeswap.finance</span></a>
                     <a href="https://flooz.trade/swap  " target="_blank">
                <span className="spanimage mr-2 my-1"><img src={require("../assets/images/bidpixels_trba/flooztrade.png")} alt="logo" className="img-fluid rounded-circle mr-2"  />Flooz.Trade
                </span></a>
            
                 </span></li>
               
            </ul>
            </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-6 col-md-12 mb-3">
<div className="stats p-3 h-100">
  <h2>BPX Price and Market Stats</h2>
<ul className="mb-0">
  {/* {//("market status",market_status&&market_status.id)} */}
   <li><span>BPX Liquidity (in $):	</span><span className="dateand">{market_status.liquidityUSD} </span></li>
   <li><span>BPX Price (in $):</span><span className="dateand">{Wallet_Details.token_usd_value} </span></li>
   <li className="pb-0"><span>Market Cap (in $):</span><span className="dateand">{market_status.marketCap} </span></li>
   {/* <li><span>Trading Volume 24h:</span><span className="dateand">{market_status.volume24h} $</span></li>
   <li><span>Transactions 24h:</span><span className="dateand text-left">{market_status.txns24h}</span></li> */}
   {/* <li><span>Last Volume:</span><span className="dateand">{volume}</span></li>
   <li><span>Last High:</span><span className="dateand">{ CHart_data[0]&&CHart_data[0].data&&CHart_data[0].data[CHart_data[0].data.length-1]&&CHart_data[0].data[CHart_data[0].data.length-1].y&&CHart_data[0].data[CHart_data[0].data.length-1].y.length>0&&CHart_data[0].data[CHart_data[0].data.length-1].y[1]}</span></li>
   <li><span>Last Low:</span><span className="dateand">{ CHart_data[0]&&CHart_data[0].data&&CHart_data[0].data[CHart_data[0].data.length-1]&&CHart_data[0].data[CHart_data[0].data.length-1].y&&CHart_data[0].data[CHart_data[0].data.length-1].y.length>0&&CHart_data[0].data[CHart_data[0].data.length-1].y[2]}</span></li>
   <li><span>Last Open:</span><span className="dateand">{ CHart_data[0]&&CHart_data[0].data&&CHart_data[0].data[CHart_data[0].data.length-1]&&CHart_data[0].data[CHart_data[0].data.length-1].y&&CHart_data[0].data[CHart_data[0].data.length-1].y.length>0&&CHart_data[0].data[CHart_data[0].data.length-1].y[0]}</span></li>
   <li><span>Last Close:</span><span className="dateand text-left">{ CHart_data[0]&&CHart_data[0].data&&CHart_data[0].data[CHart_data[0].data.length-1]&&CHart_data[0].data[CHart_data[0].data.length-1].y&&CHart_data[0].data[CHart_data[0].data.length-1].y.length>0&&CHart_data[0].data[CHart_data[0].data.length-1].y[3]}</span></li>  */}
{/* <li><span>Changes for 7d:</span><span className="dateand text-left">0.00%</span></li> */}
</ul>
</div>
</div>
</div>
              </div>
        
          </div>
         
          <div className="row pt-0">
            {wallet_support.length>0&&
          <div className="col-12 col-lg-12 col-xl-6 col-md-12">
          <h2 className="coinexchange">BidPixels (BPX) Coin listings at exchanges</h2>
            <div className="exchanges table-responsive responsive-table">
              
              <table id="customers" className="table mb-0">
                  <tbody>
  <tr>
    <th>S.no</th>
    <th>Exchange</th>
    <th>Last Price</th>
    <th>Listing Date</th>
  </tr>
  
  {/* {wallet_support.map((item,i)=>{
    return(
       */}
  {/* <tr>
    <td>{i+1}</td>
    <td> <span> <img src={config.Back_URL + '/admin/bpxtoken/exchange/' + item.ex_img} alt="logo" className="img-fluid rounded-circle pr-2" /></span> 
    <span>{item.ex_name}</span></td>
    <td>{item.ex_last}</td>
    <td>{item.ex_list}</td>
  </tr> */}
 
 {/* )
})} */}
  <tr>
    <td>1</td>
    <td> <span> <img src={require('../assets/images/bidpixels_trba/pancakeswap.png')} alt="logo" className="img-fluid rounded-circle pr-2" /></span> 
    <span>Pancakeswap v2</span></td>
    <td>${Wallet_Details.token_usd_value}</td>
    <td>Jan-22-2022 11:06 GMT</td>
  </tr>
  </tbody>
</table>


            </div>
          </div>
}
      {wallet_support.length>0&&
          <div className="col-12 col-lg-12 col-xl-6 col-md-12">
          <h2 className="coinexchange">Wallet support Bidpixels (BPX) BEP-20</h2>
         <div className="row">
          {wallet_support.map((item)=>{return(
            item.wl_name!=''&&
            <div className="col-12 col-lg-6 col-xl-6 col-md-6">
              <div className="exchangescard">
                  <span>
                    <div className="bpximagetoken">
                    <img src={config.Back_URL + '/admin/bpxtoken/wallet/' + item.wl_img} alt="logo" className="img-fluid" />
                    </div>
                    </span>
                   
                  <span className="ml-3">{item.wl_name}</span>
              </div>
            </div>
            )})}
           </div>
          </div>
}
          </div>
          </div>
        </section>
        
        
        </div>

        <Footer />

         </div>

    </div>
  );
}
