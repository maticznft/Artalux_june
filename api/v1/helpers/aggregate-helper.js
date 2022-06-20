const mongoose = require("mongoose");
const path = require("path");

exports.aggregate = async function(data={}){
    var retRes = {};
    try{
        var collection = (data.collection)?data.collection:'';
        var query = (data.query)?data.query:[{}];
        var records = await collection.aggregate(query)
        retRes.Success = true;
        retRes.records = records;
    } catch(err) {
        retRes.err = err;
        retRes.Success = false;
        retRes.msg = 'Error occured, please try again.';
    }
    return retRes;
}