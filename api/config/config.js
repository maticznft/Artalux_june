import dotenv from 'dotenv';
dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` })

var EnvName             =    process.env.NODE_ENV;
console.log('EnvName : api : ', EnvName);

var key = {
    limitMax: 1000,
    limitPage: 10,
    errorOccured: 'Error occured, Please try again.'
}
let currencySymbol      =   'BNB';
let tokenSymbol         =   'WBNB';
var IPFS_IMG            =   "https://ipfs.io/ipfs/";
key.port                =   process.env.port;
key.mongoURI            =   process.env.mongoURI;
key.secretOrKey         =   process.env.secretOrKey;
key.ipfskey             =   process.env.ipfskey;
key.ipfspass            =   process.env.ipfspass;
key.currencySymbol      =   currencySymbol;
key.tokenSymbol         =   tokenSymbol;
key.MoralisserverUrl    =   process.env.MoralisserverUrl;
key.MoralisappId        =   process.env.MoralisappId
key.MoralisChain        =   process.env.MoralisChain
var tokenAddress        =    ["0x02953B010A2C203C25e11552B95F6e1efC28832C".toLowerCase(),
                                "0xEd4A4Dab84272CE45C6790C49F653C1ca721bbf1".toLowerCase(),
                                "0x245fB436cc3eb66762A551139713b63ee068d8E1".toLowerCase(),
                                "0x1938f408543A19EF6d6d60C3b8A806eBD4E69236".toLowerCase(),
                                "0xdb9faaf1d12d26fccb178a778f47c0406deec06d".toLowerCase(),
                                "0xc2dde9d465e044661f865b0bcbddd11353fef0eb".toLowerCase(),
                                "0x8D43916d784759B46255c0F47e3b67E1c8375e40".toLowerCase(),//live
                                "0x1419c94D6560B81F16486A4c57C7c66f1253Cf20".toLowerCase(),//live
                                "0x008505ac19add467B1a6177A27D8D383A078dA26".toLowerCase(),//live
                                "0x1938f408543A19EF6d6d60C3b8A806eBD4E69236".toLowerCase()//live,
                              
                             ]
key.tokenAddress        =   tokenAddress
key.Ipfs_path           =   process.env.Ipfs_path
console.log('EnvName : db : ', key.mongoURI,key.ipfskey,key.ipfspass,key.MoralisChain);
var keyEnvBased         =   {};

if (EnvName === 'demo') {
    keyEnvBased = {
        emailGateway: {
            fromMail: "",
            nodemailer: {
                host: "",
                port: 465,
                secure: true,
                auth: {
                    user: '',
                    pass: '',
                },
            }
        }
    };
} else if (EnvName === 'production') {
    keyEnvBased = {
        emailGateway: {
            fromMail: "support@artalux.com",
            nodemailer: {
                host: "smtp.zoho.eu",
                port: 587,
                secure: false,
                auth: {
                    user: 'support@artalux.com',
                    pass: 'nSDh9R0TRnwY',
                },
            }
        }
    };
}

else if (EnvName === 'local') {
    keyEnvBased = {
        emailGateway: {
            fromMail: "support@artalux.com",
            nodemailer: {
                host: "smtp.zoho.eu",
                port: 587,
                secure: false,
                auth: {
                    user: 'support@artalux.com',
                    pass: 'nSDh9R0TRnwY',
                },
            }
        }
    };
}

key             =    {...key, ...keyEnvBased};

export default key;
