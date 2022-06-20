import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var chartDataSchema = mongoose.Schema({
        data    : { type: Array, default: null},
        created: { type: Number, default: 0},
        timestamp: { type: Date, default: null},
});

var chartData = mongoose.model("chartData", chartDataSchema);
module.exports = chartData;
