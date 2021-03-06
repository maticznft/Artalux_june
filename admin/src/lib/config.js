
let key = {};
var EnvName = 'demo';
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
else if(EnvName === "demo") {
  
    var Front_URL               =   'http://nftdemo.bimaticz.com/xulatra'; 
    var Back_URL                =   'http://nftdemo.bimaticz.com:3000';
  
    var API_URL = 'http://nftdemo.bimaticz.com:3000';
    var IMAGE_URL = 'http://nftdemo.bimaticz.com:3000/images/user';
    var Users_URL               =  'http://nftdemo.bimaticz.com:3000/user';
    
    var exchangeAddress = "0x3451A375938421a1892482A558316BA336C20Acb";
    var adminaddress = "";
    var singleContract="0x83BD31DFa90e3652637b1782a87f80c7EFf48Ef4";
    var multipleContract="0xf3F6100d9Ee7b78cce52cA8229ed13fDcA094A63";
    var trade = ("0xFAF9Bc294F92F6312bbE23039128881Cf16D02e4").toLowerCase();
   
    var PORT = 2002;
   
    networkVersion='97';
   // BNBProvider="https://data-seed-prebsc-1-s1.binance.org:8545/";
    BNBProvider= "https://data-seed-prebsc-1-s1.binance.org:8545/";
    
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
    var singleContract="0x83BD31DFa90e3652637b1782a87f80c7EFf48Ef4";
    var multipleContract="0xf3F6100d9Ee7b78cce52cA8229ed13fDcA094A63";
    var trade = ("0xFAF9Bc294F92F6312bbE23039128881Cf16D02e4").toLowerCase();
   
    var PORT = 2002;
   
    networkVersion='97';
   // BNBProvider="https://data-seed-prebsc-1-s1.binance.org:8545/";
    BNBProvider= "https://data-seed-prebsc-1-s1.binance.org:8545/";
    
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