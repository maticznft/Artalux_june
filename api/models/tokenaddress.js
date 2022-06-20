var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var tokenAddressSchema = mongoose.Schema({

        token: {
                type: String,
                default: ''
        },
        address: {
                type: String,
                default: ''
        },

        timestamp: { type: Date, default: Date.now }
});
tokenAddressSchema.virtual("id").get(function () {
        return this._id.toHexString();
});
tokenAddressSchema.set("toJSON", {
        virtuals: true,
});
tokenAddressSchema.methods.generateJWT = function (payload) {
        var token = jwt.sign(payload, config.secretOrKey);
        return `Bearer ${token}`;
};
var tokenaddress = mongoose.model("tokenaddress", tokenAddressSchema);
module.exports = tokenaddress;
