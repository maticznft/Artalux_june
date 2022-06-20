import axios from "axios";
import config from '../../lib/config';
import Single from 'ABI/SINGLE.json';
import Multiple from 'ABI/MULTIPLE.json';
import DETH_ABI from 'ABI/DETH_ABI.json'
import Web3 from "web3";
import { TokenExitsOrNotFunc } from "./getReceiptFunc";
export const CancelBid_Action = async (payload) => {
  try {
    let Resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/bid/cancel`,
      data: payload
    });
    // ToastShow(Resp.data);
    return {
      data: Resp.data
    }
  }
  catch (err) {
  }
}

export const acceptBId_Action = async (payload) => {
  try {
    let Resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/bid/accept`,
      data: payload
    });
    // ToastShow(Resp.data);
    return {
      data: Resp.data
    }
  }
  catch (err) {
  }
}

export const BidApply_ApproveAction = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/bid/apply`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export const TokenCounts_Get_Detail_Action = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/tokenCounts`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export const PurchaseNow_Complete_Action = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/purchase/complete`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export const TokenPriceChange_update_Action = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/price/change`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}
export const TokenCount_Get_Action = async (payload) => {
  try {
    let resp = await axios({
      'method': 'get',
      'url': `${config.vUrl}/token/count/get`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export const TokenAddItemAction = async (payload) => {
  //("payload",payload)
  try {
    var formData = new FormData();
    formData.append('Thumb',payload.Thumb)
    formData.append('thumb_ipfs',payload.thumb_ipfs)
    if (payload.Image) { formData.append('Image', payload.Image); }
    if (payload.ipfsimage) { formData.append('ipfsimage', payload.ipfsimage); }
    if (payload.Name) { formData.append('Name', payload.Name); }
    if (payload.Count) { formData.append('Count', payload.Count); }
    if (payload.Description) { formData.append('Description', payload.Description); }
    if (payload.Price) { formData.append('Price', payload.Price); }
    if (payload.Royalities) { formData.append('Royalities', payload.Royalities); }
    if (payload.Category_label) { formData.append('Category_label', payload.Category_label); }
    formData.append('Bid', payload.Bid);
    if (payload.Properties) { formData.append('Properties', payload.Properties); }
    if (payload.Owner) { formData.append('Owner', payload.Owner); }
    if (payload.Creator) { formData.append('Creator', payload.Creator) }
    if (payload.CategoryId) { formData.append('CategoryId', payload.CategoryId) }
    if (payload.Quantity) { formData.append('Quantity', payload.Quantity) }
    if (payload.Balance) { formData.append('Balance', payload.Balance) }
    if (payload.ContractAddress) { formData.append('ContractAddress', payload.ContractAddress) }
    if (payload.Status) { formData.append('Status', payload.Status) }
    if (payload.HashValue) { formData.append('HashValue', payload.HashValue) }
    if (payload.Type) { formData.append('Type', payload.Type) }
    if (payload.MinimumBid) { formData.append('MinimumBid', payload.MinimumBid) }
    if (payload.EndClocktime) { formData.append('EndClocktime', payload.EndClocktime) }
    if (payload.Clocktime) { formData.append('Clocktime', payload.Clocktime) }
    if (payload.UnLockcontent) { formData.append('UnLockcontent', payload.UnLockcontent) }

    // if (payload.PutOnSale)
     { formData.append('PutOnSale', payload.PutOnSale) }
    if (payload.PutOnSaleType) { formData.append('PutOnSaleType', payload.PutOnSaleType) }
    if (payload.swapPrice) { formData.append('swapPrice', payload.swapPrice) }
    if (payload.CoinName) { formData.append('CoinName', payload.CoinName) }
    if (payload.symbol) { formData.append('symbol', payload.symbol) }
    if (payload.Status) { formData.append('Status', payload.Status) }


    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/add/item`,
      'headers': {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    });

    return { data: respData.data }
  }
  catch (err) {
    return { error: err }
  }
}



export const CreateTokenValidationAction = async (payload) => {
  ////////console..log('payload', payload);
  try {
    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/add/item/validation`,
      data: payload
    });
    return {
      data: respData.data
    }
  }
  catch (err) {
  }
}

export const GetCategoryAction = async (payload) => {
  try {
    let respData = await axios({
      'method': 'get',
      'url': `${config.vUrl}/token/category/list`,
      data: payload
    });
    return {
      data: respData.data
    }
  }
  catch (err) {
  }
}

export const GetLikeDataAction = async (payload) => {
  try {
    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/like/list`,
      data: payload
    });
    return {
      data: respData.data
    }
  }
  catch (err) {
  }
}

export const AddLikeAction = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/like`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}



export const CollectiblesList_MyItems = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/collectibles/list/myitems`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export const CollectiblesList_Home = async (payload) => {///collectibles/list/myitems
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/collectibles/list/home`,
      data: payload
    });
    //("resp data check list ",resp.data)
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}
export const NewCollectiblesList_Home = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/collectibles/list/newHome`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export const CollectiblesList_Follow = async (payload) => {
  console.log("getfollwing axios payloasd ",payload);
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/collectibles/list/follow`,
      data: payload
    });
    console.log("response list of follwer nft ",resp);
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export async function activityUpdate(data) {
  try {
    let checkAddr = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/test/activityUpdate`,
      'data': data
    })
    return {
      data: checkAddr.data
    }
  }
  catch (err) {
    return {
      // error: err.response.data
    }
  }
}

// convert
export const convertionValue = async (data) => {
  // //////console..log("datra" + JSON.stringify(data))
  try {
    let respData = await axios({
      'method': 'get',
      'url': 'https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD',

    });
    return {

      data: respData.data
    }
  }
  catch (err) {
    return {

    }
  }
}

export const tokenConvertionValue = async (data) => {
  // //////console..log("datra" + JSON.stringify(data))
  try {
    let respData = await axios({
      'method': 'get',
      'url': 'https://min-api.cryptocompare.com/data/price?fsym=BUSD&tsyms=USD',

    });
    return {

      data: respData.data
    }
  }
  catch (err) {
    return {

    }
  }
}

export const tokensUsdValue = async (data) => {
  //("getusd of token data ",data.token);
  // //////console..log("datra" + JSON.stringify(data))
  var url = 'https://min-api.cryptocompare.com/data/price?fsym='+data.token+'&tsyms=USD'
  //("url ",url);
  try {
    let respData = await axios({
      'method': 'get',
      'url':url
      //'url': 'https://min-api.cryptocompare.com/data/price?fsym=WBNB&tsyms=USD',

    });
    return {

      data: respData.data
    }
  }
  catch (err) {
    return {

    }
  }
}



export const WenlamboConvert = async (data) => {
  // //////console..log("datra" + JSON.stringify(data))
  try {
    let respData = await axios({
      'method': 'get',
      'url': `${config.vUrl}/token/test/wenlamboConvert`,
      params:data
    });
    ////("get val",respData);
    return {

      data: respData
    }
  }
  catch (err) {
    return {
      // error: err.response.data
    }
  }
}
export const topCreatorsApi = async (data) => {
  try {
    let respData = await axios({
      'method': 'get',
      'url': `${config.vUrl}/token/home/topCreatorsApi`,

    });
    return {

      data: respData.data
    }
  }
  catch (err) {
    return {
      // error: err.response.data
    }
  }
}

export const ipfsImageHashGet = async (payload) => {
  var formData = new FormData();
  if (payload.Image) { formData.append('Image', payload.Image); }
  if (payload.name) { formData.append('name', payload.name); }
  if (payload.desc) { formData.append('desc', payload.desc); }
  formData.append('Thumb',payload.Thumb)
  try {
    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/create/ipfsImageHashGet`,
      data: formData,

    });
    return {
      data: respData.data
    }
  }
  catch (err) {
    return {
      // error: err.response.data
    }
  }
}


export const BurnField = async (data) => {
  // ////////console..lo(data,"dataaaaaaaaaaaaaaaaaaaa")
  try {

    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/admin/panel/BurnField`,

      data: data
    });
    return {
      loading: false,

    }

  }
  catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    }
  }
}


export const null_time_auction = async (data) => {
  // ////////console..lo(data,"dataaaaaaaaaaaaaaaaaaaa")
  try {

    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/null_time_auction`,

      data: data
    });
    return {
      loading: false,

    }

  }
  catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    }
  }
}


export const activityAdd = async (data) => {
  // ////////console..lo(data,"dataaaaaaaaaaaaaaaaaaaa")
  try {

    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/activityAdd`,

      data: data
    });
    return {
      loading: false,

    }

  }
  catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    }
  }
}

export const getActivitys = async (data) => {
  // ////////console..lo(data,"dataaaaaaaaaaaaaaaaaaaa")
  try {

    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/getActivitys`,

      data: data
    });
    return {
      loading: false,

    }

  }
  catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    }
  }
}

export const toFixedFunc = async (x) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += (new Array(e + 1)).join('0');
    }
  }
  //////////("DataChecking"+x)
  return x;

}

export const ipfsmetadatafunciton = async (payload) => {

  var formData = new FormData();
  // if(payload.Image) { formData.append('Image', payload.Image); }
  if (payload.name) { formData.append('name', payload.name); }
  if (payload.image) { formData.append('image', payload.image); }

  if (payload.desc) { formData.append('desc', payload.desc); }
  // if(payload.description) { formData.append('description', payload.description); }

  try {
    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/ipfsmetadata`,
      data: formData,

    });
    return {
      data: respData.data
    }
  }
  catch (err) {
    return {
      // error: err.response.data
    }
  }
}

export const Transfer_Complete_Action = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/tranfer/complete`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export const checkOtherPlatformDetais1155 = async (item, itemCur, type, web3) => {
  try {
    ////("checkOtherPlatformDetais1155",item,itemCur,type,web3)
    var currentOwner = itemCur.tokenOwner;
    var tokenCounts = itemCur.tokenCounts;
    var contractAddress = itemCur.contractAddress
    var owner = null;
    var balance = 0;
    // //("check other balan", itemCur, type)
    if (type == 1155) {
      var CoursetroContract = new web3.eth.Contract(
        Multiple,
        contractAddress
      );
      balance = await CoursetroContract.methods
        .balanceOf(
          currentOwner,
          (tokenCounts)
        ).call();
        // //("check other balan 2", balance)

      }

    else if (type == 721) {
      var CoursetroContract = new web3.eth.Contract(
        Single,
        contractAddress
      );

      owner = await CoursetroContract.methods
        .ownerOf(
          tokenCounts
        ).call();
      if ((String(owner).toLowerCase()) == (String(currentOwner).toLowerCase())) { return true; }
      else {
        balance = 0
      }

    }

    if (balance!==undefined &&( balance !== null || balance != 0)) {
      let payload = {
        currentOwner,
        owner,
        tokenCounts,
        balance:Number(balance),
        contractAddress
      }
      await findAndUpdateBalance(payload);
      // //("check other balan 3", payload)


    }
    return balance;
  }
  catch (e) {
    return 0
    ////("ewurwe",e)
  }
}
const findAndUpdateBalance = async (payload) => {
  ////('>>>>>>>>payload',payload);
  var data = await findAndUpdateBalanceAction(payload);
  if (data && data.data) {
    ////('>>>>>data', data.data.success);
  }
}

const findAndUpdateBalanceAction = async (payload) => {
  try {
    let resp = await axios({
      method: 'post',
      url: `${config.vUrl}/token/findAndUpdataBalance`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
    ////(">>>>fberror",err);
    return {
      data: [],
      error: 'Error : Oops something went to wrong'
    }
  }
}
export const getNFTDetails = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/getOtherNft`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}
export const getNftCollectionData = async (data) => {
  try {
    let respData = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/getCollections`,
      data
    });
    return {
      respData
    }
  }
  catch (err) {
    return {
      loading: false,
      error: err
    }
  }
}
export const setTokenCounts_Get_Detail_Action = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/settokenCounts`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}

export const PurchaseNow_Complete_Action_Meta = async (payload) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/updateusermeta`,
      data: payload
    });
    return {
      data: resp.data
    }
  }
  catch (err) {
  }
}



export const token_usd_value_from_function=async(web3)=>{

    // const txtAddress = "0x18fB791B917fbD372F872605243BeA7f0554Cd04";
    // const busdAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
    // const lpAddress = "";  //pair
  
    const txtAddress = "0x8cB6Aa6e8575d87961Bd01D2ff09007c2499eC56"; //token
    const busdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; //busd
    const lpAddress = "0x15c1fcb5d1ab3d61d5d0b6488e949bd90fa1b30e";  //pair

    const Txt = await new web3.eth.Contract(DETH_ABI, txtAddress)
    const BUSD = await new web3.eth.Contract(DETH_ABI, busdAddress)
    
    const txt = await Txt.methods.balanceOf(lpAddress).call()
    const busd = await BUSD.methods.balanceOf(lpAddress).call()
  
  
     
    // //("cake===========", txt)
    // //("busd===========", busd)
    
    const txtPrice = Number(busd / txt);
    // //("Txtprice cake===========:",txtPrice)
    return txtPrice 

  
}

const test=async()=>{
  return "rest"
}

export  function token_usd(num, CoinName) {
  var digits=5;
  var si = [
    { value: 1, symbol: "   " },
    { value: 1E3, symbol: " k " },
    { value: 1E6, symbol: " M " },
    { value: 1E9, symbol: " B " },
    { value: 1E12, symbol: " T " },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  var bl=((num / si[i].value)*CoinName).toFixed(digits).replace(rx, "$1") + si[i].symbol
  // if(CoinName){
   // //("coinname",CoinName,bl);
    return bl
    // if(CoinName == config.tokenSymbol){
      
      // var web3 = new Web3(config.BNBPROVIDER)

      // var convert = await token_usd_value_from_function(web3)
      // return bl*convert
      // async function newOne(){

      //   var data = await test()
      //   return data
      // }
      // newOne()
      // (async()=>{
      // })()
      // //("data data",fun)
      // return fun
      // // .then((data)=>{
       
      // })
      // var convert =  token_usd_value_from_function(web3).then(convert=>{
      //  return convert
      // })

    //   let myPromise = new Promise(async function(myResolve, myReject) {
    //     var data =await token_usd_value_from_function(web3)
    //     if(data){
    //       myResolve(data)
    //     }
    //     else
    //     myReject("")
    //   });
      
    //  var getdata = myPromise.then(
    //     function(value) { return myDisplayer(value);},
    //     function(error) {return myDisplayer(error);}
    //   );
        // var getdata= Promise.all().then(async(convert)=>{
        //   var data =await token_usd_value_from_function(web3)
        //   return data
        // })
        // //("getdata",getdata);
      // }
      // else{

      //         Promise.all((TokenExitsOrNotFunc(CoinName).then(tokenAddress=>{
                
      //           var wenlamboconvertion = await WenlamboConvert({address:tokenAddress})
      //           if(wenlamboconvertion&&wenlamboconvertion.data&&wenlamboconvertion.data.data&&wenlamboconvertion.data.data.value){
      //             return bl*(wenlamboconvertion.data.data.value)
      //           }
      //           else{
      //             return bl
      //           }
      //         }))
      // }
  // }
  // else
  // return bl;
}



// nesletter


export const subscriberAction = async (payload) => {
  console.log("data mamil ",payload)
  
  try {
    let resp = await axios({
      'method': 'post',
      'url': `${config.vUrl}/token/subscriber`,
      data: payload
    });
    console.log("new response ", resp.data);
    return {
      success: true,
      data: resp.data
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}
