import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/config';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var otherNftToken = mongoose.Schema({
    ownerAddress: {
        type: String,
        require: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

otherNftToken.virtual("id").get(function () {
    return this._id.toHexString();
});

otherNftToken.set("toJSON", {
    virtuals: true,
});

otherNftToken.methods.generateJWT = function (payload) {
    var token = jwt.sign(payload, config.secretOrKey);
    return `Bearer ${token}`;
};

var otherNftToken = mongoose.model("otherNftToken", otherNftToken);
module.exports = otherNftToken;