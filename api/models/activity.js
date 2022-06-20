


import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var ActivitySchema = mongoose.Schema({
        action: { type: String },
        from: { type: String },
        to: { type: String },
        tokenCounts: { type: String }, //changed
        amount: { type: Number },
        fee: { type: Number },
        total: { type: Number },
        currencySymbol: { type: String },
        tokenSymbol: { type: String },
        activity:{type:String},
        status: { type: String, default: 'new' },
        statusOpen: { type: String, default: 'new' },
        created: { type: Date, default: Date.now },
        balance: { type: Number , default : 0 },
        hashValue    :{type:String , default:''},
        for     :       {type:String,default:'f'},
        usdprice:{type:Number}
        // updated: { type: Date, default: Date.now },
});

var activityModal = mongoose.model("activity", ActivitySchema);
module.exports = activityModal;
