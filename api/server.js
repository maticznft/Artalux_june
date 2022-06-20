// import packages
import express from 'express';
import cors from 'cors';
// import https from 'https';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import methodoveride from 'method-override';
import config from './config/config';
import fileupload from 'express-fileupload';
import v1 from './v1/routesFrontend/v1.routes';
// ssl congiguration

var fs = require('fs');
const https = require('https');
var ip = require('ip');
const app = express();
//added ip address
var myip = ip.address();
// if (myip == '49.37.220.174') {
//     console.log('ok here')
//     const options = {
//         key: fs.readFileSync('/var/www/sslkeys/we-nft.io.key'),
//         cert: fs.readFileSync('/var/www/sslkeys/we-nft.io.csr'),
//         requestCert: false
//     };
//     var server = https.createServer(options, app);
// } else {
    var server = http.createServer(app);
// }

// compress responses
app.use(morgan("dev"))
app.options('*', cors());
app.use(fileupload())

app.use(methodoveride())
// app.use(express.multiparty())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');  
   // res.header('Access-Control-Allow-Origin','https://api.we-nft.io');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    res.header('no-referrer-when-downgrade', '*');
    res.header('no-referrer', '*');
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
// include passport stratagy
require("./v1/admin/config/passport").usersAuth(passport)
require("./v1/admin/config/passport").adminAuth(passport)
const cacheTime = 86400000 * 30

app.use('/', express.static(path.join(__dirname, 'public'),{ 
    maxAge: '1d'}))

// Database connection
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>
    console.log('MongoDB successfully connected.')
).catch(err => console.log(err));

app.use("/v1", v1);
// app.use("/admin",admin);
app.get('/', (req, res) => {
    return res.send("User Service Working")
})
app.disable('etag');

server.listen(config.port, function () {
    console.log(`server is running on port ${config.port}`)
});