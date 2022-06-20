import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Double from 'bson';
import config from '../config/config';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var TokenOwnerSchema = mongoose.Schema({
    tokenCounts: {
        type: String, //changed
        required: true,
    },
    tokenOwner: {
        type: String,
        required: true,
    },
    tokenCreator: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    hashValue: {
        type: String,
        required: true,
    },
    tokenPrice: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Number,
        default: 1, // 1 Active 0 Deleted
    },
    balance: {
        type: Number,
        default: 1
    },
    quantity: {
        type: Number,
        default: 1
    },
    contractAddress: {
        type: String,
        default: 1
    },
    type: {
        type: Number,
        default: 1
    },
    burnToken:{
        type: Number,
        default: 0
    },

    CoinName: {
        type: String,
        default:''
    },

    symbol: {
        type: String,
        default:''
    },
    clocktime:{
        type:Date,
        default:null
    } ,
    endclocktime:{
        type:Date,
        default:null
    } ,
    minimumBid:{
        type: String,
        default:0
    },
    promotion: {
        type: String,
        default: "hide", // 1 Active 0 Deleted
    },
    timestamp: { type: Date, default: Date.now }
});

TokenOwnerSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

TokenOwnerSchema.set("toJSON", {
    virtuals: true,
});

TokenOwnerSchema.methods.generateJWT = function (payload) {
    var token = jwt.sign(payload, config.secretOrKey);
    return `Bearer ${token}`;
};

var tokenOwner = mongoose.model("tokenOwner", TokenOwnerSchema);
module.exports = tokenOwner;
