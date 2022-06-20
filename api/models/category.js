import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image:{
    type:String,
    default:''
  },
  deleted: {
    type: Number,
    default: 1, // 1 Active 0 Deleted
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  show:{
    type:Boolean,
    default:false
  }
});

CategorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CategorySchema.set("toJSON", {
  virtuals: true,
});

CategorySchema.methods.generateJWT = function (payload) {
  var token = jwt.sign(payload, config.secretOrKey);
  return `Bearer ${token}`;
};

module.exports = mongoose.model("category", CategorySchema, "category");
