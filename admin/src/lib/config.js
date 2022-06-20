
let key = {};
var EnvName = 'production';
let IPFS_IMG = "https://ipfs.ipfs.io/ipfs"
var networkVersion=''
var BNBProvider="";
let Back_Url=""
let decimalValues = 1000000000000000000;
let toasterOption = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
 if(EnvName === "production") {
   
    var exchangeAddress = "";
    var adminaddress = "";
    var singleContract="0xbdaf244c61200966d4eefa028cd7594725724e4d".toLowerCase();
    var multipleContract="0xd05873bb3fa9c8a18c8d42fbff750a736e2b4f9e".toLowerCase();
    var trade = ("").toLowerCase();
    var API_URL = 'https://api.artalux.com/';
    var IMAGE_URL = 'https://api.artalux.com/images/user';
    var PORT = 2053;
    Back_Url='https://api.artalux.com/'
    networkVersion='56';
    BNBProvider="https://bsc-dataseed1.binance.org/";
    var Front_URL="https://artalux.com/xulatra"

}
else if(EnvName === "local") {
    var Front_URL="http://localhost:3001/xulatra"
    Back_Url='http://localhost:2002'
    var API_URL = 'http://localhost:2002';
    var IMAGE_URL = 'http://localhost:2002/images/user';
    // var Front_URL               =   'http://nftdemo.bimaticz.com/xulatra'; 
    // var Back_URL                =   'http://nftdemo.bimaticz.com:3000';
  
    // var API_URL = 'http://nftdemo.bimaticz.com:3000';
    // var IMAGE_URL = 'http://nftdemo.bimaticz.com:3000/images/user';
    //var Users_URL               =  'http://nftdemo.bimaticz.com:3000/user';
    
    var exchangeAddress = "0x3451A375938421a1892482A558316BA336C20Acb";
    var adminaddress = "";
    var singleContract="0x2cAD7b7618911e62cC901ee08f464d69b4aA258c";
    var multipleContract="0x65e5973C85A2eae79e0BB7E43fcd7d0948FCb2d2";
    var trade = ("0xFAF9Bc294F92F6312bbE23039128881Cf16D02e4").toLowerCase();
   
    var PORT = 2002;
   
    networkVersion='4';
   // BNBProvider="https://data-seed-prebsc-1-s1.binance.org:8545/";
    BNBProvider= "https://rinkeby.infura.io/v3/5481c483c56f4995a4f293f775f9d917";
    
}

key = {
    secretOrKey: "",
    Recaptchakey: "",
    // API:`${API_URL}:${PORT}/v1`,
    API:`${API_URL}/v1`,
    IMAGE_URL:IMAGE_URL,
    exchangeAddress:exchangeAddress,
    toasterOption:toasterOption,
    IPFS_IMG:IPFS_IMG,
    networkVersion:networkVersion,
    adminaddress:adminaddress,
    decimalValues:decimalValues,
    Back_Url:Back_Url,
    singleContract:singleContract,
    multipleContract:multipleContract,
    networkVersion:networkVersion,
    BNBProvider:BNBProvider,
    Front_URL:Front_URL,
    trade:trade
};

export default key;