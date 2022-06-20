import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Double from 'bson';
import config from '../config/config';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var otherNft = mongoose.Schema({
    _id: {
        type: String,
        required:true,
      },
    tokenDetails: {
        type: Array,
        required: true
    },
    ownerAddress: {
        type: String,
        require: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});


otherNft.set("toJSON", {
    virtuals: true,
});

otherNft.methods.generateJWT = function (payload) {
    var token = jwt.sign(payload, config.secretOrKey);
    return `Bearer ${token}`;
};

var otherNft = mongoose.model("othernft", otherNft);
module.exports = otherNft;