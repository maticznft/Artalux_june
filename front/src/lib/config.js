import DETH_ABI from '../ABI/DETH_ABI.json';
import Loder from '../assets/images/loader.png'
import '@metamask/legacy-web3'
import AudioImg from '../assets/images/audio.png'

let EnvName                 =  'production';
const singleType            =   721;
const multipleType          =   1155;
 let currencySymbol          =   'BNB';
//let currencySymbol          =   'ETH';
let tokenSymbol             =   'BUSD';
let maxLength               =   13;
var token_usd_value         =   0
// var tokenAddr               =   {BPX: "0x8cB6Aa6e8575d87961Bd01D2ff09007c2499eC56".toLowerCase()}
var tokenAddr               =   {BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56".toLowerCase()}
var tokenABI                =   {BUSD: DETH_ABI}
let limit                   =   '8';
let Lod                     =   Loder;
let limitMax                =   '3000';
let decimalvalues           =   1000000000000000000;
let toFixed                 =   2;
var tokenFee                =   0;
var IPFS_IMG                =   "https://ipfs.io/ipfs";
var nameFormat              =   /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
var ErrorTransaction        =   "Transaction Reverted"
var SuccessTransaction      =   "Transaction Completed"
var deadAddress             =   "0x0000000000000000000000000000000000000000"
var toasterOption = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}



if (EnvName === "production") {
    var Front_URL               =   'https://artalux.com/';
    var Users_URL               =   'https://artalux.com//user';
    var Back_URL                =   'https://api.artalux.com';
    var v1Url                   =   'https://api.artalux.com/v1';
    var BNBPROVIDER             =   "https://bsc-dataseed1.binance.org/";
    var singleContract          =   "0xbdaf244c61200966d4eefa028cd7594725724e4d".toLowerCase();
    var multipleContract        =   "0xd05873bb3fa9c8a18c8d42fbff750a736e2b4f9e".toLowerCase();
    var trade                   =   ("").toLowerCase();
    var networkVersion          =   '56';
    var chainId                 =   '0x38';
    var chainIds                =   1;
    var BSCSCAN                 =   "https://bscscan.com/address/"

}

else {
    // var Front_URL               =   'http://nftdemo.bimaticz.com/ArtaluxNFT '; 
    // var Users_URL               =  'http://nftdemo.bimaticz.com:3000/user';
    // var Back_URL                =   'http://nftdemo.bimaticz.com:3000';
    // var v1Url                   =   'http://nftdemo.bimaticz.com:3000/v1';
    var Front_URL               =   'http://localhost:3000';
    var Users_URL               =   'http://localhost:3000/user';
    var Back_URL                =   'http://localhost:2002';
   var v1Url                   =   'http://localhost:2002/v1';
    // var BNBPROVIDER             =   "https://data-seed-prebsc-1-s1.binance.org:8545/";
    // var singleContract          =   "0xd2804aeAcb81a1704F990550b94dbB87d9Ff1Bc1".toLowerCase();
    // var multipleContract        =   "0xb2DB53CF39d366CF01EA79c7B25c5D3DF0Bf506D".toLowerCase();
   //var BNBPROVIDER             =  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    var BNBPROVIDER             =  "https://rinkeby.infura.io/v3/5481c483c56f4995a4f293f775f9d917";
    var singleContract          =   "0x2cAD7b7618911e62cC901ee08f464d69b4aA258c".toLowerCase();
    var multipleContract        =   "0x65e5973C85A2eae79e0BB7E43fcd7d0948FCb2d2".toLowerCase();
    var trade                   =   ("").toLowerCase();
    var networkVersion          =   '4';
    var chainId                 =   '0x4';
    var chainIds                =   1;
    var BSCSCAN                 =   "https://testnet.bscscan.com/address/"

}

let key = {
    Front_URL                   :   Front_URL,
    Back_URL                    :   Back_URL,
    v1Url                       :   v1Url,
    vUrl                        :   v1Url,
    decimalvalues               :   decimalvalues,
    toFixed                     :   toFixed,
    networkVersion              :   networkVersion,
    currencySymbol              :   currencySymbol,
    tokenSymbol                 :   tokenSymbol,
    toasterOption               :   toasterOption,
    limit                       :   limit,
    limitMax                    :   limitMax,
    singleContract              :   singleContract,
    multipleContract            :   multipleContract,
    tokenAddr                   :   tokenAddr,
    singleType                  :   singleType,
    multipleType                :   multipleType,
    IPFS_IMG                    :   IPFS_IMG,
    BNBPROVIDER                 :   BNBPROVIDER,
    tokenABI                    :   tokenABI,
    maxLength                   :   maxLength,
    Users_URL                   :   Users_URL,
    Lod                         :   Lod,
    chainId                     :   chainId,
    AudioImg                    :   AudioImg,
    nameFormat                  :   nameFormat,
    chainIds                    :   chainIds,
    trade                       :   trade,
    BSCSCAN                     :   BSCSCAN,
    ErrorTransaction            :   ErrorTransaction,
    SuccessTransaction          :   SuccessTransaction,
    deadAddress                 :   deadAddress
};
console.clear()
export default key;

// var tokenAddr               =   {BPX: "0xcdE18A0A610EBEAa37AA4aC77B167Ef77C089dce".toLowerCase()}




// port            =   3000
// mongoURI        =   "mongodb://eFWPDBx:LZw6w5L4@192.53.121.26:12743/fixdb"
// siteUrl         =   "http://localhost:3000"
// secretOrKey     =   "obmalnew"
// ipfskey         =   "284kROy1rlYPzL5nKLoE08JBXxN"
// ipfspass        =   "564ff475ec3b8e2c2fc48384d13cfdc9"
// Ipfs_path       =   "Artalux"


// port            =   2002
// mongoURI        =   "mongodb://localhost:27017/Artalux"
// siteUrl         =   "http://localhost:3000"
// secretOrKey     =   "obmalnew"
// ipfskey         =   "284kROy1rlYPzL5nKLoE08JBXxN"
// ipfspass        =   "564ff475ec3b8e2c2fc48384d13cfdc9"
// Ipfs_path       =   "Artalux"