// var package
import mongoose from  'mongoose';
import jwt from  'jsonwebtoken';
import moment from 'moment';
// var lib
import config from '../../../config/config';

const Schema = mongoose.Schema;

const bpxtokenSchema = new Schema({
    tokenName: {
        //
        type: String,
        default: ""
    },
    tokenAddress: {
        //
        type: String,
        default: ""
    },
    tokenContents : {
        //
        type: String,
        default: ""
    },
    network: {

        type: String,
        default: ""
    },
  
    wl_img : {
        type: String,
        default:""
    },
    wl_name: {
        type: String,
        default:""
    },
    ex_img: {
            type: String,
            default:""
    },
    ex_name: {
        type: String,
        default:""
    },
    ex_last: {
        type: String,
        default:""
    },
    ex_list: {
        type: String,
        default:""
    },
    date_deploy: {
        type: String,
        default:""
    },
    totalsupply: {
        type: String,
        default:""
    },
    circulating_Supply: {
        type: String,
        default:""
    },
    Decimals: {
        type: String,
        default:""
    },
    Holders: {
        type: String,
        default:""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

bpxtokenSchema.methods.generateJWT = function (payload) {
    var token = jwt.sign(payload, config.secretOrKey);
    console.log("checkkk model",token)
    return `Bearer ${token}`;
};

const bpxtoken = mongoose.model("bpxtoken", bpxtokenSchema, "bpxtoken");
export default bpxtoken;