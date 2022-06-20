// import package
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SubscriberSchema = new Schema({
	email : {
        type : String,
        default : ''
    },
    maySent : {
        type : Boolean,
        default : true
    },
    created : {
        type: Date,
        default: Date.now,
    }
});

SubscriberSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

SubscriberSchema.set("toJSON", {
	virtuals: true,
});

SubscriberSchema.methods.generateJWT = function (payload) {
	var token = jwt.sign(payload, config.secretOrKey);
	return `Bearer ${token}`;
};

module.exports = mongoose.model("subscribers", SubscriberSchema, "subscribers");