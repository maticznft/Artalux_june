import e from 'express';
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose';
import { userInfo } from 'os';
import UserDb from '../../models/User'
import settings from '../admin/Model/settings'
import FAQS from './../admin/Model/faq';
import Activity from '../../models/activity'
import isEmpty from '../../config/isEmpty'
import FollowerDB from '../../models/follower';
import cmsnew from '../admin/Model/cmsnew';
import * as axios from 'axios';
import Binance from 'binance-api-node'

const async = require("async");
const ObjectId = mongoose.Types.ObjectId;
const Config = require(path.resolve('./config/config')).default;
const CategoryDb = require(path.resolve('./models/category'));
const TokenDb = require(path.resolve('./models/Token'));
const FollowDb = require(path.resolve('./models/follower'));
const BiddingDb = require(path.resolve('./models/bid'));
const MyItemAddrDb = require(path.resolve('./models/myItemAddr'));
const TokenOwnerDb = require(path.resolve('./models/TokenOwner'));
const LikeDb = require(path.resolve('./models/like'));
const TokenIdtableDb = require(path.resolve('./models/tokenIdtable'));
const reports = require(path.resolve('./models/reports'));
const NFTCollection = require(path.resolve('./models/otherNft'))
const subscriber = require(path.resolve('./models/subscriber'));
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath)
var compress_images = require('compress-images');
const sharp = require("sharp");
const gify = require("gify");
const https = require('https');
const request = require('request');

const Moralis = require('moralis/node');
const fetch = require('node-fetch');
var Url = require('url')
// ipfs
import ipfsClient, { CID } from 'ipfs-http-client';
import { config } from 'dotenv';
import Tokenaddress from '../../models/tokenaddress';
import { timeStamp } from 'console';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', method: 'POST', auth: `${Config.ipfskey}:${Config.ipfspass}` });

const MongooseHelper = require('../helpers/mongoose-helper');
const ActivityHelper = require('../helpers/activity-helper');






/**
 * ROUTE			:	  /token/bid/cancel
 * METHOD 		:	  POST
 * C-DATE   	:   30_01_22
 * S-DATE   	:   30-01-22
*/

export const BidCancel = async (req, res) => {
  var ReqBody = req.body;
  var RetData = {}
  var FindData = {
    tokenBidAddress: ReqBody.tokenBidAddress,
    tokenCounts: String(ReqBody.tokenCounts) //changed
  };

  FindData['$and'] = [
    { status: { $ne: 'cancelled' } },
    { status: { $ne: 'partiallyCancelled' } },
    { status: { $ne: 'completed' } }
  ];

  var AlreadyChk = await BiddingDb.findOne(FindData).exec();
  if (AlreadyChk) {
    var status = AlreadyChk.status;
    var FindData = { _id: AlreadyChk._id };
    var UpdateData = {};
    if (status == 'pending') {
      UpdateData.status = 'cancelled';
    }
    else if (status == 'partiallyCompleted') {
      UpdateData.status = 'partiallyCancelled';
    }
    BiddingDb.findOneAndUpdate(
      FindData,
      { $set: UpdateData },
      { new: true }
    )
      .exec(async function (err, data) {
        if (data) {
          RetData.type = 'success';
          RetData.toast = {
            type: 'success',
            message: 'Bid successfully cancelled'
          }
        }
        else {
          RetData.type = 'error';
          RetData.toast = {
            type: 'error',
            message: 'Bid not cancelled'
          }
        }
        var checkLa = await ActivityHelper.save({
          createData: {
            action: 'bid',
            activity: 'Bid Cancelled by',
            from: ReqBody.tokenBidAddress,
            to: ReqBody.tokenBidAddress,
            hashValue : '',
            tokenCounts: String(ReqBody.tokenCounts), //changed
          }
        });
        //////////////console.log("=========================================================================================================================================================================", checkLa)


        return res.status(200).json(RetData);
      });
  }
  else {
    RetData.type = 'error';
    RetData.toast = {
      type: 'error',
      message: 'Active bid not found'
    }
    return res.status(200).json(RetData);
  }
}

export const BidAccept = async (req, res) => {
  var RetData = {};
  RetData.toast = {};
  var ReqBody = req.body;
  var UserAccountAddr_byaccepter = ReqBody.UserAccountAddr_byaccepter;
  var tokenBidAddress = ReqBody.tokenBidAddress;
  console.log("tokens array ",ReqBody.tokenAddArr);
  var FindData = {
    tokenBidAddress: ReqBody.tokenBidAddress,
    tokenCounts: String(ReqBody.tokenCounts),//changed
    '$and': [
      { status: { '$ne': 'completed' } },
      { status: { '$ne': 'cancelled' } }
    ]
  };
  if (ReqBody.transactionHash && ReqBody.transactionHash != '') {
    var hashValue = ReqBody.transactionHash;
  }
  else {
    RetData.toast.type = 'error';
    RetData.toast.msg = 'Transaction not completed';
    return res.json(RetData);
  }

  var NoOfToken = ReqBody.NoOfToken;
  var AlreadyChk = await BiddingDb.find(FindData).exec();
  if (AlreadyChk && AlreadyChk.length > 0) {
    var Already = AlreadyChk[0];

    var UpdateData = {};
    if (Already.completed > 0) {
      UpdateData.completed = Already.completed + NoOfToken;
    }
    else {
      UpdateData.completed = NoOfToken;
    }

    UpdateData.pending = Already.pending - NoOfToken;

    if (UpdateData.pending == 0) {
      UpdateData.status = 'completed';
    }
    else if (UpdateData.pending > 0) {
      UpdateData.status = 'partiallyCompleted';
    }



    var tokenusd = ReqBody.tokenAddArr.filter(item=>String(item.label).toLowerCase()===String(Already.CoinName).toLowerCase())
   // console.log("tokenusd",tokenusd);
    var usdprice = tokenusd[0].usd*Already.tokenBidAmt;
   // console.log("tokenusd price and multiplied bid amount ",tokenusd,usdprice);

    BiddingDb.findOneAndUpdate(
      FindData,
      { $set: UpdateData },
      { new: true }
    )
      .exec(async function (err, data) {
        if (data) {
          RetData.toast = { type: 'success', msg: 'Bid accept successfully' }
          TokenOwnerDb.findOne(
            {
              tokenOwner: UserAccountAddr_byaccepter,
              tokenCounts: String(ReqBody.tokenCounts), //changed
            },
            {
              _id: 0,
              timestamp: 0,
              __v: 0
            }
          ).exec(async function (err, respOfPur) {
            var UpdateData = {};
            if (
              (respOfPur.type == 721)
              ||
              (respOfPur.type == 1155 && respOfPur.balance == NoOfToken)
            ) {
              UpdateData.balance = 0;
              UpdateData.status = 'afterbid';
            }
            else if (respOfPur.type == 1155 && respOfPur.balance > NoOfToken) {
              UpdateData.balance = respOfPur.balance - NoOfToken;
              // UpdateData.status='afterbid';
            }

            if (UpdateData.balance == 0) {
              UpdateData.tokenPrice = 0;
            }


            

            TokenOwnerDb.findOneAndUpdate(
              {
                tokenOwner: UserAccountAddr_byaccepter,
                tokenCounts: String(ReqBody.tokenCounts), //changed
              },
              { $set: UpdateData },
              { new: true }
            )
              .exec(async function (err, UpdResp) {
                if (err) {
                  RetData.toast.type = 'error';
                  RetData.toast.msg = Config.errorOccured;
                  return res.json(RetData);
                }
                else if (UpdResp == null) {
                  RetData.toast.type = 'error';
                  RetData.toast.msg = 'Collectible bid accept failed';
                  return res.json(RetData);
                }
                else {
                  if (respOfPur.type == 721) {
                    var newBalance = 1;
                    NoOfToken = 1;
                    respOfPur.status = "afterbid"
                  }
                  else {
                    var newBalance = NoOfToken;
                    respOfPur.status = "afterbid"
                  }
                  await neworoldownerupdate(
                    respOfPur,
                    tokenBidAddress,
                    newBalance,
                    hashValue,
                    NoOfToken,
                    'afterbid'
                  );


                  var checkLa = await ActivityHelper.save({
                    createData: {
                      action: 'accept',
                      activity: 'Bid Accept by',
                      from: UserAccountAddr_byaccepter,
                      to: tokenBidAddress,
                      tokenCounts: String(ReqBody.tokenCounts), //changed
                      amount:Already.tokenBidAmt,
                      currencySymbol:Already.CoinName,
                      hashValue :  ReqBody.transactionHash,
                      balance:NoOfToken,
                      usdprice:Number(usdprice)
                    }
                  });
                   return res.json(RetData);
                }
              });


          })
        }
        else {
          ////////////console.log('err : ', err);
          RetData.toast = { type: 'error', msg: 'Bid not accepted' }
          res.json(RetData);
        }
      })
  }
  else {
    RetData.toast = { type: 'error', msg: 'Bid not found' }
    res.json(RetData);
  }
}

/**
 * ROUTE			:	  /token/bid/apply
 * METHOD 		:	  POST
 * C-DATE   	:   30_01_22
 * S-DATE   	:   30-01-22
*/
export const BidApply = async (req, res) => {
  var ReqBody = req.body;
  var FindData = {
    tokenBidAddress: ReqBody.tokenBidAddress,
    tokenCounts: String(ReqBody.tokenCounts), //changed
    '$or': [
      { status: 'pending' },
      { status: 'partiallyCompleted' }
    ]
  };
  var AlreadyChk = await BiddingDb.find(FindData).exec();
  if (AlreadyChk && AlreadyChk.length > 0) {
    var UpdateData = {
      tokenBidAmt: ReqBody.tokenBidAmt,
      tokenBidAddress: ReqBody.tokenBidAddress,
      tokenCounts: String(ReqBody.tokenCounts), //changed
      NoOfToken: ReqBody.NoOfToken,
      pending: ReqBody.NoOfToken,
      timestamp: new Date(),
      CoinName:ReqBody.CoinName
    }
    BiddingDb.findOneAndUpdate(
      FindData,
      { $set: UpdateData },
      { new: true }
    )
      .exec(async function (err, data) {
        if (data) {
          var checkLa = await ActivityHelper.save({
            createData: {
              action: 'editbid',
              activity: 'Bid edited by',
              from: ReqBody.tokenBidAddress,
              to: ReqBody.owner,
              tokenCounts: String(ReqBody.tokenCounts), //changed
              hashValue : ReqBody.transactionHash,
              amount  : ReqBody.tokenBidAmt,
              currencySymbol  : ReqBody.CoinName,
              balance : ReqBody.NoOfToken,

            }
          });
            res.json({ "type": "success", data: data });
        }
        else {
          res.json({ "type": "fail", e: e });
        }
      })
  }
  else {
    var NewBidAdd = new BiddingDb({
      tokenBidAmt: ReqBody.tokenBidAmt,
      tokenBidAddress: ReqBody.tokenBidAddress,
      tokenCounts: String(ReqBody.tokenCounts), //changed
      NoOfToken: ReqBody.NoOfToken,
      pending: ReqBody.NoOfToken,
      CoinName:ReqBody.CoinName
    })
    NewBidAdd.save()
      .then(async (data) => {
        var checkLa = await ActivityHelper.save({
            createData: {
              action: 'bid',
              activity: 'Bid  by',
              from: ReqBody.tokenBidAddress,
              to: ReqBody.owner,
              tokenCounts: String(ReqBody.tokenCounts), //changed
              hashValue : ReqBody.transactionHash,
              amount  : ReqBody.tokenBidAmt,
              currencySymbol  : ReqBody.CoinName,
              balance : ReqBody.NoOfToken,
            }
        });
         res.json({ "type": "success", data: data });
      })
      .catch((e) => {
        res.status(200).json({ "type": "fail", e });
      })
  }
}

export const TokenCounts = async (req, res) => {

  var RetData = {};
  RetData.toast = {};
  var ReqBody = req.body;
  var tokenCounts = String(req.body.tokenCounts) //changed

  var Detail = {
    Resp: {}
  };

  // console.log("otherNFTCollectionVa >>>>>>>>>.", otherNFTCollectionVa)
  var getdt = await TokenOwnerDb.find({ tokenCounts: tokenCounts })
  if (getdt.length > 0) {
    var Tdata = await TokenOwnerDb.aggregate([
      {
        $match: {
          tokenCounts: tokenCounts,
          balance: { $ne: 0 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'tokenOwner',
          foreignField: 'curraddress',
          as: 'tusers'
        }
      },
      {
        $unwind: {
          path: '$tusers',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $sort: { timestamp: 1 }
      }
    ]);
    async.waterfall([
      function (done) {
        var Query =
         [
          { $match: { tokenCounts: tokenCounts } },
          {
            $lookup:
            {
              from: "tokenowners",
              localField: "tokenCounts",
              foreignField: "tokenCounts",
              as: "tokenowners_all"
            },
          },
          {
            $lookup:
            {
              from: "tokenowners",
              let: { tC: "$tokenCounts" },
              pipeline: [
                {
                  $match:
                  {
                    $expr:
                    {
                      $and:
                        [
                          { $eq: ["$tokenCounts", "$$tC"] },
                          { $gt: ["$balance", 0] }
                        ]
                    }
                  }
                },
                { $project: { _id: 0 } }
              ],
              as: "tokenowners_current"
            }
          },
          {
            $lookup:
            {
              from: "tokenowners",
              let: { tC: "$tokenCounts" },
              pipeline: [
                {
                  $match:
                  {
                    $expr:
                    {
                      $and:
                        [
                          { $eq: ["$tokenCounts", "$$tC"] },
                          { $eq: ["$status", 'true'] },
                          { $gt: ["$tokenPrice", 0] },
                          { $gt: ["$balance", 0] }
                        ]
                    }
                  }
                },
                { $project: { _id: 0 } }
              ],
              as: "OnSaleOwner"
            }
          },

          {
            $lookup: {
              from: "users",
              localField: "tokenCreator",
              foreignField: "curraddress",
              as: "tokencreatorinfo"
            },
          },
          {
            $lookup: {
              from: "contracts",
              localField: "contractAddress",
              foreignField: "conAddr",
              as: "usercontract"
            },
          },
          {
            $unwind: {
              path: '$usercontract',
              preserveNullAndEmptyArrays: true,
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "tokenowners_all.tokenOwner",
              foreignField: "curraddress",
              as: "tokenuser"
            }
          },
          {
            $project: {
              _id: 1,
              tokenPrice: 1,
              tokenCategory: 1,
              tokenCharity: 1,
              image: 1,
              tokenCounts: 1,
              tokenName: 1,
              tokenDesc: 1,
              tokenBid: 1,
              tokenOwner: 1,
              tokenCreator: 1,
              tokenRoyality: 1,
              status: 1,
              hashValue: 1,
              type: 1,
              additionalImage: 1,
              balance: 1,
              tokenQuantity: 1,
              contractAddress: 1,
              minimumBid: 1,
              endclocktime: 1,
              clocktime: 1,
              likecount: 1,
              PutOnSale: 1,
              PutOnSaleType: 1,
              ipfsimage: 1,
              unlockcontent: 1,
              tokenowners_current: 1,
              coinname: 1,
              tokenowners_all: 1,
              OnSaleOwner: 1,
              thumb: 1,                               // thumbnail data
              thumb_ipfs: 1,
              thumb_additionalImage : 1,
              tokenOwnerInfo: {
                _id: "$tokenuser._id",
                image: "$tokenuser.image",
                name: "$tokenuser.name",
                curraddress: "$tokenuser.curraddress",
                customurl: "$tokenuser.customurl"
              },
              tokenCreatorInfo: {
                _id: "$tokencreatorinfo._id",
                image: "$tokencreatorinfo.image",
                name: "$tokencreatorinfo.name",
                curraddress: "$tokencreatorinfo.curraddress",
                customurl: "$tokencreatorinfo.customurl"
              },
              usercontract: {
                imageUser: "$usercontract.imageUser",
                type: "$usercontract.type",
                name: "$usercontract.name",
                url: "$usercontract.url",
                conAddr: "$usercontract.conAddr"
              },
            }
          }
        ];
        TokenDb.aggregate(Query).exec(async function (err, resp) {
          if (err) {
            RetData.toast.type = 'error';
            RetData.toast.msg = Config.errorOccured;
            return res.json(RetData);
          }
          else {
            Detail.Resp.Token = resp;
            (resp[0].tokenowners_all).filter(item=>{if(item==ReqBody.curAddr)
              Detail.Resp.unlockcontent=item.unlockcontent
            })
            
            
            Detail.Resp.Tusers = Tdata;
            done();
          }
        });
      },
      function (done) {
      
        var aggregateData = [
          {
            $match: {
              tokenCounts: tokenCounts,
            }
          },
          {
            $match: {
              '$or': [
                { status: 'pending' },
                { status: 'partiallyCompleted' }
              ]
            }
          },
          {
            $sort: { tokenBidAmt: -1 }
          },
          {
            $lookup: {
              from: "users",
              localField: "tokenBidAddress",
              foreignField: "curraddress",
              as: "bidUsers"
            }
          },
          {
            $unwind: {
              path: '$bidUsers',
              preserveNullAndEmptyArrays: true,
            }
          },
        ];

        BiddingDb.aggregate(aggregateData)
          .exec(async function (err, resp) {
            if (err) {
              RetData.toast.type = 'error';
              RetData.toast.msg = Config.errorOccured;
              return res.json(RetData);
            }
            else {
              Detail.Resp.Bids = { pending: [], completed: [], highestBid: {}, myBid: {} };
              Detail.Resp.Bids.pending = resp;

              if (resp.length > 0) {
                Detail.Resp.Bids.highestBid = resp[0];
                if (resp && resp.length > 0) {
                  var IndexVal = resp.findIndex(val => val.tokenBidAddress == ReqBody.curAddr);
                  if (IndexVal > -1) {
                    Detail.Resp.Bids.myBid = resp[IndexVal];
                  }
                }
              }

              var findData = {
                tokenCounts: tokenCounts,
                '$or': [
                  { status: 'completed' },
                  { status: 'partiallyCancelled' },
                  { status: 'partiallyCompleted' }
                ]
              }
              var resp = await BiddingDb.find(findData).exec();
              Detail.Resp.Bids.completed = resp;
              done();
            }
          });
      },
      function (done) {

        var OnSaleBalance = 0;
        var TotalQuantity = 0;

        if (Detail.Resp.Token && Detail.Resp.Token[0]) {
          if (Detail.Resp.Token[0].tokenowners_all) {
            TotalQuantity = Detail.Resp.Token[0].tokenQuantity;
            var tokenowners_all = Detail.Resp.Token[0].tokenowners_all
            for (let i = 0; i < tokenowners_all.length; i++) {
              const element = tokenowners_all[i];
              if (element.balance > 0 && element.tokenPrice > 0) {
                OnSaleBalance = OnSaleBalance + element.balance;
              }
            }
          }
        }

        Detail.Resp.OnSaleBalance = OnSaleBalance;
        Detail.Resp.TotalQuantity = TotalQuantity;
        done();
      },
      function (done) {
        RetData.Detail = Detail;
       return res.json(RetData);
      }
    ], function (err, result) {
      if (err) return false;
    });
  }
}


/**
 * ROUTE			:	  /token/purchase/complete
 * METHOD 		:	  POST
 * C-DATE   	:   30_01_22
 * S-DATE   	:   30-01-22
*/

export const PurchaseComplete = async (req, res) => {
  var RetData = {};
  RetData.toast = {};
  var ReqBody = req.body;
  var tokenOwner = ReqBody.tokenOwner;
  var UserAccountAddr = ReqBody.UserAccountAddr;
  var tokenCounts = ReqBody.tokenCounts;
  var tokenType = ReqBody.tokenType;
  var NoOfToken = 1;
  var contractAddress = ReqBody.contractAddress;
 
  var usdprice = ReqBody.usdval;
  console.log("token usd price for activity helper ",usdprice);
  console.log("owners details ",tokenOwner,UserAccountAddr)
  
  if (ReqBody.NoOfToken) {
    NoOfToken = ReqBody.NoOfToken;
  }

  if (ReqBody.transactionHash && ReqBody.transactionHash != '') {
    var hashValue = ReqBody.transactionHash;
  }
  else {
    RetData.toast.type = 'error';
    RetData.toast.msg = 'Transaction not completed';
    return res.json(RetData);
  }
  async.waterfall([
    function (done) {
      TokenDb.findOne({
        tokenCounts: tokenCounts,
        type: tokenType
      }).exec(async function (err, resp) {
        if (err) {
          RetData.toast.type = 'error';
          RetData.toast.msg = Config.errorOccured;
          return res.json(RetData);
        }
        else if (resp == null) {
          RetData.toast.type = 'error';
          RetData.toast.msg = 'Collectible not found';
          return res.json(RetData);
        }
        else {
            done();
        }
      });
    },
    function (done) {
      TokenOwnerDb.findOne(
        {
          tokenOwner: tokenOwner,
          tokenCounts: tokenCounts,
          type: tokenType,
          contractAddress:contractAddress
        },
        {
          _id: 0,
          timestamp: 0,
          __v: 0
        }
      ).exec(async function (err, respOfPur) {
         if (err) {
          RetData.toast.type = 'error';
          RetData.toast.msg = Config.errorOccured;
          return res.json(RetData);
        }
        else if (respOfPur == null) {
          RetData.toast.type = 'error';
          RetData.toast.msg = 'Collectible not found';
          return res.json(RetData);
        }
        else {
          if (respOfPur.balance == 0) {
            RetData.toast.type = 'error';
            RetData.toast.msg = 'Collectible sale already completed';
            return res.json(RetData);
          }
          else if (respOfPur.type == 721 && respOfPur.balance == 1) {
            done('', respOfPur);
          }
          else if (respOfPur.type == 1155) {
            if (respOfPur.balance >= NoOfToken) {
              done('', respOfPur);
            }
            else {
              RetData.toast.type = 'error';
              RetData.toast.msg = 'Collectible sale already completed';
              return res.json(RetData);
            }
          }
        }
      });
    },
    function (respOfPur, done) {
      var UpdateData = {};
      if (
        (respOfPur.type == 721)
        ||
        (respOfPur.type == 1155 && respOfPur.balance == NoOfToken)
      ) {
        UpdateData.tokenPrice = 0;
        UpdateData.balance = 0;
        UpdateData.status = 'afterpurchase';
        UpdateData.timestamp = new Date();
        UpdateData.CoinName='';
      }
      else if (respOfPur.type == 1155 && respOfPur.balance > NoOfToken) {
        UpdateData.balance = respOfPur.balance - NoOfToken;

      }
      TokenOwnerDb.findOneAndUpdate(
        {
          tokenOwner: tokenOwner,
          tokenCounts: tokenCounts
        },
        { $set: UpdateData },
        { new: true }
      )
        .exec(async function (err, UpdResp) {
          if (err) {
            RetData.toast.type = 'error';
            RetData.toast.msg = Config.errorOccured;
            return res.json(RetData);
          }
          else if (UpdResp == null) {
            RetData.toast.type = 'error';
            RetData.toast.msg = 'Collectible purchase failed';
            return res.json(RetData);
          }
          else {
            if (respOfPur.type == 721) {
              var newBalance = 1;
              NoOfToken = 1;
              respOfPur.status = "afterpurchase"
            }
            else {
              var newBalance = NoOfToken;
              respOfPur.status = "afterpurchase"
            }

            await neworoldownerupdate(
              respOfPur,
              UserAccountAddr,
              newBalance,
              hashValue,
              NoOfToken,
              'afterpurchase'

            );

            RetData.toast.type = 'success';
            RetData.toast.msg = 'Collectible purchase successfully';
            var checkLa = await ActivityHelper.save({
              createData: {
                action: 'purchase',
                activity: 'purchased by',
                from: tokenOwner,          //seller
                to: UserAccountAddr,       //buyer
                tokenCounts: tokenCounts,
                amount:respOfPur.tokenPrice,
                currencySymbol:respOfPur.CoinName,
                balance : ReqBody.NoOfToken,
                hashValue : hashValue,
                usdprice:Number(usdprice)
              }
            });
            
                 return res.json(RetData);
            // Notes : Need to delete bidding data
          }
        })
    }
  ], function (err, result) {
    if (err) return false;
  });
}
async function neworoldownerupdate(respOfPur, UserAccountAddr, newBalance, hashValue, NoOfToken, from) {
  try {
    var IsOldItem = await TokenOwnerDb.findOne(
      {
        tokenCounts: String(respOfPur.tokenCounts), //changed
        tokenOwner: UserAccountAddr,
        contractAddress:String(respOfPur.contractAddress).toLowerCase(),
        type:respOfPur.type
      }
    ).exec();
    if (IsOldItem == null) {
      var NewData = {
        tokenCounts: String(respOfPur.tokenCounts), //changed
        tokenOwner: UserAccountAddr,
        tokenPrice: 0,
        balance: newBalance,
        quantity: newBalance,
        contractAddress: String(respOfPur.contractAddress).toLowerCase(),
        hashValue: hashValue,
        status: 'not-list',
        type: respOfPur.type,
        tokenCreator: respOfPur.tokenCreator,
        burnToken: 0,
        CoinName: "",
        timestamp: new Date()
      }
      var TokenOwnerNew = new TokenOwnerDb(NewData);
      TokenOwnerNew.save();
      return true;
    }
    else {
      var UpdData = {
        tokenCounts: String(respOfPur.tokenCounts), //changed
        tokenOwner: UserAccountAddr,
        contractAddress: String(respOfPur.contractAddress).toLowerCase(),
        hashValue: hashValue,
        status: respOfPur.status,
        type: respOfPur.type,
        tokenCreator: respOfPur.tokenCreator,
        CoinName: respOfPur.CoinName
      };

      var newbalance = parseInt(newBalance) + parseInt(IsOldItem.balance);
      UpdData.balance = newbalance;
      UpdData.timestamp = new Date();
      var newquantity = 0;

      if (parseInt(IsOldItem.quantity) == 0) {
        newquantity = parseInt(newBalance);
        UpdData.quantity = newquantity;
      }
      else if (parseInt(IsOldItem.quantity) == parseInt(IsOldItem.balance)) {
        newquantity = parseInt(IsOldItem.quantity) + parseInt(newBalance);
        UpdData.quantity = newquantity;
      }
      else if (parseInt(IsOldItem.quantity) > parseInt(IsOldItem.balance)) {
        var diff = parseInt(IsOldItem.quantity) - parseInt(IsOldItem.balance);
        if (diff < NoOfToken) {
          UpdData.quantity = UpdData.balance;
        }
      }

      await TokenOwnerDb.findOneAndUpdate(
        {
          tokenCounts: String(respOfPur.tokenCounts), //changed
          tokenOwner: UserAccountAddr,
          contractAddress:String(respOfPur.contractAddress).toLowerCase(),
          type:respOfPur.type
        },
        {
          $set: UpdData
        }
      ).exec();

      return true;
    }
  }
  catch (err) {
    return false;
  }
}


/**
 * ROUTE			:	  /token/price/change,
 * METHOD 		:	  POST
 * C-DATE   	:   28_01_22
 * S-DATE   	:   27-01-22
*/


export const TokenPriceChange = async (req, res) => {
  var RetData = {};
  var ReqBody = req.body;
  var tokenOwner = ReqBody.tokenOwner;
  var tokenCounts = String(ReqBody.tokenCounts); //changed
  var tokenPrice = ReqBody.tokenPrice;
  var CoinName = ReqBody.CoinName;
  var Clocktime=ReqBody.Clocktime;
  var EndClocktime=ReqBody.EndClocktime;
  var MinimumBid=ReqBody.MinimumBid;
  var contractAddress=ReqBody.contractAddress;
  var PutOnSaleType=ReqBody.PutOnSaleType;
  var type=ReqBody.type
  var updatedata={}

if(PutOnSaleType =='FixedPrice'){
  updatedata={
    "tokenPrice": Number(tokenPrice),
    "CoinName": String(CoinName),
    "timestamp": new Date(),
    "status": "list",
    "MinimumBid":0,
    "clocktime":Clocktime,
    "endclocktime":EndClocktime
  }
}
if(PutOnSaleType =='TimedAuction'){
  updatedata={
    "tokenPrice": 0,
    "CoinName": String(CoinName),
    "timestamp": new Date(),
    "status": "list",
    "MinimumBid":Number(MinimumBid),
    "clocktime":Clocktime,
    "endclocktime":EndClocktime
  }
}
if(PutOnSaleType =='UnLimitedAuction'){
  updatedata={
    "tokenPrice": 0,
    "CoinName": '',
    "timestamp": new Date(),
    "status": "list",
    "MinimumBid":0,
    "clocktime":null,
    "endclocktime":null
  }
}

if(PutOnSaleType =='cancel')
{
  updatedata={
    "tokenPrice": 0,
    "CoinName": '',
    "timestamp": new Date(),
    "status": "list",
    "MinimumBid":0,
    "clocktime":null,
    "endclocktime":null
  }
}
if(PutOnSaleType =='lower'){
  updatedata={
    "tokenPrice": Number(tokenPrice),
    "CoinName": CoinName,
    "timestamp": new Date(),
    "status": "list",
    "MinimumBid":0,
    "clocktime":null,
    "endclocktime":null
  }
}

  TokenOwnerDb
    .findOneAndUpdate(
      {
        "tokenOwner": tokenOwner,
        "tokenCounts": tokenCounts,
        "contractAddress":contractAddress,
        "type":type

      },
      {
        $set:updatedata
      }
    ).then(async (data) => {
      RetData.RetType = 'success';
      var activitys = ""
      if (PutOnSaleType == 'cancel') {
        activitys = "token Cancelled by"
      }
      else if(PutOnSaleType == 'lower') {
        activitys = "Price Changed  by"
      }
     
      else if(PutOnSaleType =='FixedPrice') {
        activitys = "Nft for Sale"
      }
      else if(PutOnSaleType =='TimedAuction') {
        activitys = "Nft for On Timed Auction"
      }
      else if(PutOnSaleType =='UnLimitedAuction') {
        activitys = "Nft for open bid"
      }

      var checkLa = await ActivityHelper.save({
        createData: {
          action: 'changeprice',
          activity: activitys,
          from: tokenOwner,
          tokenCounts: String(tokenCounts), //changed
          to: tokenOwner,
          amount: tokenPrice,
          currencySymbol: String(CoinName),
          balance:1,
          status: "true",
          hashValue : ReqBody.transactionHash
        }
      });
        res.json({message:RetData.RetType});
    }).catch(e => {
      RetData.RetType = 'error';
      res.json({message: RetData.RetType});
    })
}


export const CountGet = async (req, res) => {
  var counts = await TokenIdtableDb.findOne({}).sort({ tokenId: -1 });
  if (counts == null) {
    var tok = new TokenIdtableDb({
      tokenId: 20000
    })
    await tok.save()
      .then(data => {
        res.json(data);
      })
  }
  else {
    TokenIdtableDb.findOneAndUpdate({ "tokenId": counts.tokenId }, { "$set": { "tokenId": counts.tokenId + 1 } })
      .then((data) => {
        res.json(data);
      })
      .catch((e) => {
        return res.json(e);
      })
  }
}


export const LikeList = async (req, res) => {
  var retRes = {};
  retRes.toast = {};
  var reqBody = req.body;
  let useraddress = reqBody.currAddr;

  var data = {};
  data.tableName = LikeDb;
  data.findData = { "useraddress": useraddress }
  data.selectData = { "tokenCounts": 1 };
  var resp = await MongooseHelper.find(data);
  retRes = resp;
  ////////////console.log("lkjkkljljluiouoiuuotrrttetrffdsfdscxcxvcx",retRes)
  return res.json(retRes);
}

export const Like = async (req, res) => {
  var retRes = {};
  retRes.toast = {};
  var reqBody = req.body;
  var tokenOwner = reqBody.tokenOwner;
  var tokenCounts = String(reqBody.tokenCounts); //changed
  var useraddress = reqBody.currAddr;

  var data = {};
  data.tableName = LikeDb;
  data.findData = { "tokenCounts": tokenCounts, "useraddress": useraddress }
  var resp = await MongooseHelper.findOne(data);

  if (typeof resp.record == 'undefined') {
    res.json(resp);
  }
  else if (resp.record == null) {
    retRes.likeOrUnlike = 'like';

    var data = {};
    data.tableName = LikeDb;
    data.createData = { "tokenCounts": tokenCounts, "useraddress": useraddress }
    var resp = await MongooseHelper.save(data);
    retRes.likeData = resp;

    if (resp.record) {
      var data = {};
      data.tableName = TokenDb;
      data.findData = { tokenCounts: tokenCounts, tokenOwner: tokenOwner }
      data.updateData = { $inc: { likecount: 1 } };
      data.newormulti = { new: true };
      var resp = await MongooseHelper.findOneAndUpdate(data);
      if (resp.record) {
        retRes.tokenData = resp;
        retRes.toast.type = 'success';
        retRes.toast.msg = 'Token like successfully';

        await ActivityHelper.save({
          createData: {
            action: retRes.likeOrUnlike,
            from: tokenOwner,
            to: useraddress,
            activity: 'Token liked by',
            tokenCounts: tokenCounts
          }
        });
        return res.json(retRes);
      }
      else {
        return res.json(retRes);
      }
    }
    else {
      return res.json(retRes);
    }
  }
  else {
    retRes.likeOrUnlike = 'unlike';

    var data = {};
    data.tableName = LikeDb;
    data.findData = { "tokenCounts": tokenCounts, "useraddress": useraddress }
    var resp = await MongooseHelper.findOneAndRemove(data);
    retRes.likeData = resp;

    if (resp.record) {
      var data = {};
      data.tableName = TokenDb;
      data.findData = { tokenCounts: tokenCounts, tokenOwner: tokenOwner }
      data.updateData = { $inc: { likecount: -1 } }
      data.newormulti = { new: true };
      var resp = await MongooseHelper.findOneAndUpdate(data);
      if (resp.record) {
        retRes.tokenData = resp;
        retRes.toast.type = 'success';
        retRes.toast.msg = 'Token unlike successfully';
        await ActivityHelper.save({
          createData: {
            action: retRes.likeOrUnlike,
            from: tokenOwner,
            to: useraddress,
            tokenCounts: tokenCounts,
            activity: 'Unliked by'
          }
        });

        //////////////console.log("dsajhdkjashdkjsahdsadsadhkjashdhaskjdhkjasdkasdksadhksaj", checkLa)
        return res.json(retRes);
      }
      else {
        return res.json(retRes);
      }
    }
    else {
      return res.json(retRes);
    }
  }
}

export const TokenHashStatusChange = async (req, res, Addr) => {
  try {
    var a = await MyItemAddrDb.aggregate([
      {
        $match: {
          "currAddress": Addr,
          'status': { '$ne': 'true' }
        }
      },
      {
        $lookup:
        {
          from: "tokens",
          localField: "currAddress",
          foreignField: "tokenCreator",
          as: "checkAdd"
        },
      },
      {
        $unwind: {
          path: '$checkAdd',
          preserveNullAndEmptyArrays: true,
        }
      },

      {
        $project: {
          id: 1,
          currAddress: 1,
          createdAt: 1,
          deleted: 1,
          checkAdd: "$checkAdd"
        }
      }
    ]);
  }
  catch (err) {
    ////////////console.log('err', err);
    return [];
  }
}

export const MyItems_CollectiblesList = async (req, res) => {
  var RetData = {};
  var ReqBody = req.body;

  var Addr = ReqBody.Addr;
  var Target = ReqBody.Target;
  var TabName = ReqBody.TabName;

  if (ReqBody.init == true) {
    var changeStatusList = await TokenHashStatusChange(req, res, Addr);
    RetData.changeStatusList = changeStatusList;
  }

  let limit = ReqBody.limit ? parseInt(ReqBody.limit) : Config.limitMax;
  let page = ReqBody.page ? parseInt(ReqBody.page) : 1;
  let skip = (page - 1) * limit;

  var data = {};
  data.limit = limit;
  data.skip = skip;
  data.initial = {
    // status: 'true',
    // balance:{'$gt':0}
  };
  data.sorts = {
    'tokenowners_current.timestamp': -1
  }
  data.tokenowners_current = {
    'tokenowners_current.balance': { '$gt': 0 },
    'tokenowners_current.deleted': { $gt: 0 }
  }

  if (TabName == 'onsale') {
    data.tokenowners_current['tokenowners_current.tokenOwner'] = String(Addr);
    data.tokenowners_current['tokenowners_current.tokenPrice'] = { '$gt': 0 };
  }
  else if (TabName == 'collectibles') {
    data.tokenowners_current['$or'] = [
      // { 'tokenowners_current.tokenCreated': String(Addr) },
      { 'tokenowners_current.tokenOwner': String(Addr) }
    ];
  }

  else if (TabName == 'created') {
    data.initial['tokenCreator'] = String(Addr);
  }
  else if (TabName == 'owned') {
    data.tokenowners_current['tokenowners_current.tokenOwner'] = String(Addr);
  }
  else if (TabName == 'liked') {
    var passdata = {};
    passdata.tableName = LikeDb;
    passdata.findData = { "useraddress": String(Addr) }
    passdata.selectData = {
      "tokenCounts": 1,
      _id: 0
    };
    var resp = await MongooseHelper.find(passdata);
    if (resp.records && resp.records.length > 0) {
      data.initial['$or'] = resp.records;
    }
    else {
      return res.json({
        from: 'My-Items',
        Target: Target,
        success: true,
        list: [],
      });
    }
  }

  data.ReqBody = ReqBody;
  RetData = await ItemDetailList(data);
  RetData.from = 'My-Items';
  return res.json(RetData);
}

async function ItemDetailList(data) {
  if (data.from == 'Home') {
    var limitSortQuery = { $limit: 1 };
  }
  else {
    var limitSortQuery = { $sort: { _id: 1 } };
  }
  var Query = [
    { $match: data.initial },
    {
      $lookup:
      {
        from: "tokenowners",
        let: { tC: "$tokenCounts" },
        pipeline: [
          {
            $match:
            {
              $expr:
              {
                $and: [{
                  $and:
                    [
                      { $eq: ["$tokenCounts", "$$tC"] },
                      { $gt: ["$balance", 0] },
                    ]
                }]
              }
            },
          },
          {
            $count: "count",
          }
        ],
        as: "tokenowners_current_count"
      }
    },
    {
      $unwind: {
        path: '$tokenowners_current_count',
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $lookup:
      {
        from: "tokenowners",
        let: { tC: "$tokenCounts" },
        pipeline: [
          {
            $match:
            {
              $expr:
              {
                $and: [{
                  $and:
                    [
                      { $eq: ["$tokenCounts", "$$tC"] },
                      { $gt: ["$balance", 0] }
                    ]
                }]
              }
            },
          },
          limitSortQuery
        ],
        as: "tokenowners_current"
      }
    },
    {
      $unwind: {
        path: '$tokenowners_current',
        preserveNullAndEmptyArrays: true,
      }
    },
    { $match: data.tokenowners_current },
    { $sort: data.sorts },
    { $skip: data.skip },
    { $limit: data.limit },
    {
      $lookup: {
        from: "users",
        localField: "tokenCreator",
        foreignField: "curraddress",
        as: "tokencreatorinfo"
      },
    },
    {
      $unwind: {
        path: '$tokencreatorinfo',
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $lookup: {
        from: "contracts",
        localField: "contractAddress",
        foreignField: "conAddr",
        as: "usercontract"
      },
    },
    {
      $unwind: {
        path: '$usercontract',
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "tokenowners_current.tokenOwner",
        foreignField: "curraddress",
        as: "tokenuser"
      },
    },
    {
      $unwind: {
        path: '$tokenuser',
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $lookup: {
        from: "bidings",
        let: { tC1: "$tokenCounts" },

        pipeline: [
          {
            $match:
            {
              $expr:
              {
                $and: [{
                  $and:
                    [
                      { $eq: ["$tokenCounts", "$$tC1"] },
                    ]
                },
                {
                  $and:
                    [
                      { $ne: ['$status', "cancelled"] },
                      { $ne: ['$status', "completed"] }
                    ]
                }]
              }
            },
          },
          {
            "$sort": {
              "tokenBidAmt": -1
            }
          },
          { $limit: 1 }
        ],
        as: "higheBd"
      },
    },
    {
      $unwind: {
        path: '$higheBd',
        preserveNullAndEmptyArrays: true,
      }
    },

    {
      $lookup: {
        from: "bidings",
        let: { tC1: "$tokenCounts" },

        pipeline: [
          {
            $match:
            {
              $expr:
              {
                $and: [{
                  $and:
                    [
                      { $eq: ["$tokenCounts", "$$tC1"] },
                      { $eq: ["$tokenBidAddress", data.ReqBody.currAddr] },

                    ]
                },
                {
                  $and:
                    [
                      { $ne: ['$status', "cancelled"] },
                      { $ne: ['$status', "completed"] }
                    ]
                }]
              }
            },
          },
        ],
        as: "myBid"
      },
    },
    {
      $unwind: {
        path: '$myBid',

        preserveNullAndEmptyArrays: true,
      }
    },

    {
      $project: {
        _id: 1,
        tokenPrice: 1,
        tokenCategory: 1,
        image: 1,
        tokenCounts: 1,
        tokenName: 1,
        tokenBid: 1,
        tokenOwner: 1,
        tokenCreator: 1,
        status: 1,
        hashValue: 1,
        type: 1,
        balance: 1,
        ipfsimage: 1, additionalImage: 1,
        tokenQuantity: 1,
        contractAddress: 1,
        minimumBid: 1,
        endclocktime: 1,
        clocktime: 1,
        likecount: 1,
        PutOnSale: 1,
        PutOnSaleType: 1,
        tokenowners_current: 1,
        tokenRoyality: 1,
        CoinName: 1,
        tokenowners_current_count: 1,
        tokenuser: 1,
        symbol:1,
        ipfsimage: 1, additionalImage: 1,
        thumb: 1,
        thumb_ipfs: 1,
        thumb_additionalImage : 1,
        
        tokenOwnerInfo: {
          _id: "$tokenuser._id",
          image: "$tokenuser.image",
          name: "$tokenuser.name",
          curraddress: "$tokenuser.curraddress",
          customurl: "$tokenuser.customurl"
        },
        tokenCreatorInfo: {
          _id: "$tokencreatorinfo._id",
          image: "$tokencreatorinfo.image",
          name: "$tokencreatorinfo.name",
          curraddress: "$tokencreatorinfo.curraddress",
          customurl: "$tokencreatorinfo.customurl"
        },
        usercontract: {
          imageUser: "$usercontract.imageUser",
          type: "$usercontract.type",
          name: "$usercontract.name",
          url: "$usercontract.url",
          conAddr: "$usercontract.conAddr"
        },
        myBid: {
          status: "$myBid.status",
          NoOfToken: "$myBid.NoOfToken",
          completed: "$myBid.completed",
          cancelled: "$myBid.cancelled",
          pending: "$myBid.pending",
          tokenBidAmt: "$myBid.tokenBidAmt",
          tokenBidAddress: "$myBid.tokenBidAddress",
          tokenCounts: "$myBid.tokenCounts"
        },
        higheBd: {
          status: "$higheBd.status",
          NoOfToken: "$higheBd.NoOfToken",
          completed: "$higheBd.completed",
          cancelled: "$higheBd.cancelled",
          pending: "$higheBd.pending",
          tokenBidAmt: "$higheBd.tokenBidAmt",
          tokenBidAddress: "$higheBd.tokenBidAddress",
          tokenCounts: "$higheBd.tokenCounts"
        },
      }
    }
  ];





  var Target = '';
  if (data.ReqBody && data.ReqBody.Target) {
    Target = data.ReqBody.Target;
  }
  if (Target == 'Count') {
    Query.push({ $count: "count" });
  }

  try {
    var data = await TokenDb.aggregate(Query);
    // var bidList = await TokenDb.aggregate(biddetails);
    if (Target == 'Count') {
      if (typeof data[0] == 'undefined' || typeof data[0].count == 'undefined') {
        var data = [{ count: 0 }];
      }
    }
    ////////////console.log("eurewtewrweyweu",data)
    return {
      Target: Target,
      success: true,
      list: data,
    };
  }
  catch (err) {
    ////////////console.log("___________________________________________________",err)
    return {
      err: err,
      success: false,
      msg: "Error on server",
    };
  }
}


/**
 * ROUTE			:	  /collectibles/list/home
 * METHOD 		:	  POST  - time,recent,explore
 * C-DATE   	:   26_01_22
 * S-DATE   	:   26-01-22
*/

export const Home_CollectiblesList = async (req, res) => {
  var RetData = {};
  var ReqBody = req.body;
  var data = {}
  if (ReqBody.from == 'Time') {
    data.limit = 8;
    data.skip = 0;
    data.initial = {
      "$and": [
        {
          "$and": [
            {

              'endclocktime': { '$ne': null },
              'endclocktime': { '$gt': new Date() }
            },

          ]
        }]

    };
    data.sorts = {
      'endclocktime': 1
    }
    data.tokenowners_current = {
      '$and': [{ 'tokenowners_current.balance': { '$gt': 0 } },
      { 'tokenowners_current.status': { '$eq': "list" } },
      { "tokenowners_current.deleted": { "$gt": 0 } }
      ]

    }
    data.ReqBody = ReqBody;

    RetData = await ItemDetailList(data);
    RetData.from = 'time-auction-token-collectibles-list-home';
  }
  else if (ReqBody.from == 'explore_category') {
    console.log("reqdata",ReqBody)
    data.limit = Number(ReqBody.limit);
    data.skip = 0;
    data.initial = {
     "tokenCategory":{"$eq":ReqBody.category}
    };
    data.sorts = {
      'timestamp': -1
    }
    data.tokenowners_current = {
      '$and': [{ 'tokenowners_current.balance': { '$gt': 0 } },
      { 'tokenowners_current.status': { '$eq': "list" } },
      { "tokenowners_current.deleted": { "$gt": 0 } }
      ]

    }
    data.ReqBody = ReqBody;

    RetData = await ItemDetailList(data);
    console.log("REtdata",RetData)
    RetData.from = 'explore-category-token-collectibles-list-home';
  }
  else if (ReqBody.from == 'recent') {
    data.limit = 8;
    data.skip = 0;
    data.sorts = {
      'tokenowners_current.timestamp': -1
    }
    data.initial = {
    
    };
    data.tokenowners_current = {
      "$and": [
        { 'tokenowners_current.status': { '$eq': "list" } }
        , {
          "$and": [{
            'tokenowners_current.balance': { '$gt': 0 }
          },
          { 'tokenowners_current.tokenPrice': { '$gt': 0 } },
          { "tokenowners_current.deleted": { "$gt": 0 } }

          ],
        }
      ]
    }

    data.ReqBody = ReqBody;
    RetData = await ItemDetailList(data);
    RetData.from = 'recent-token-collectibles-list-home';
  }
  else {
    let CatName = (ReqBody.CatName && ReqBody.CatName != 'All') ? ReqBody.CatName : '';

    let limit = ReqBody.limit ? parseInt(ReqBody.limit) : Config.limitMax;
    let page = ReqBody.page ? parseInt(ReqBody.page) : 1;
    let skip = (page - 1) * limit;

    data.sorts = {
      'tokenowners_current.timestamp': -1
    }
    data.limit = limit;
    data.skip = skip;
    data.initial = {
      "$and": [
        {
          "$and": [
            {
            
              'tokenCategory': CatName ? CatName : { '$ne': '' }
            }
          ]
        }
      ]
    };
    data.tokenowners_current = {
      '$and': [{
        'tokenowners_current.balance': { '$gt': 0 }
      }, {
        'tokenowners_current.status': { '$eq': 'list' }
      },
      { "tokenowners_current.deleted": { "$gt": 0 } }
      ]

    }
    data.ReqBody = ReqBody;

    RetData = await ItemDetailList(data);
    RetData.from = 'token-collectibles-list-home';
  

  }

  return res.json(RetData);
}



export const timeAuctionFunction = async (req, res) => {

}


export const Follow_CollectiblesList = async (req, res) => {
  console.log("follow call req.params ",req.params)
 var RetData = {};
  var ReqBody = req.body;
  var addr = req.body.addr ? String(req.body.addr) : { $ne: '' };
  var usedata = await FollowerDB.aggregate(
    [
      {
        "$match": {
          "followerAddress": { "$eq": addr }
        }
      },
      {
        "$project": {
          userAddress: 1,
          followerAddress: 1
        }
      }

    ])
    .then(async (val) => {
      if (val.length == 0) {
        res.json({ list: [] });
      }
      else {
        var newAddr = [];
        for (let i = 0; i < val.length; i++) {
          const element = val[i];
          newAddr.push(element.userAddress);
        }
        let limit = ReqBody.limit ? parseInt(ReqBody.limit) : Config.limitMax;
        let page = ReqBody.page ? parseInt(ReqBody.page) : 1;
        let skip = (page - 1) * limit;

        var data = {};
        data.limit = limit;
        data.skip = skip;
        data.sorts = {
          'timestamp': -1
        }
        data.initial = {};
        data.tokenowners_current = {
          $and: [
            {
              'tokenowners_current.deleted': { '$gt': 0 },
            },
           {
            'tokenowners_current.tokenOwner': { '$in': newAddr }
          },
           {
            'tokenowners_current.status': { '$eq': 'list' }
          }
        ]
        }
        data.ReqBody = ReqBody;
        //////////console.log("???????????????????oqwueoiqweuowiquewioqueqwioueoiqwuieuiqowuieuoqwueouoqwuoeuqw",data)
        RetData = await ItemDetailList(data);
        RetData.from = 'Following-collectibles-list-FollowingPage';
       console.log("oqwueoiqweuowiquewioqueqwioueoiqwuieuiqowuieuoqwueouoqwuoeuqw",RetData,newAddr,data,JSON.stringify(data.tokenowners_current))

        return res.json(RetData);
      }


    })

  //////////console.log("ieiwqieiuwyquye213123213",usedata)

}

export const CategoryList = async (req, res) => {
  var retJson = {};
  var reqQuery = req.query;
  let limit = reqQuery.limit ? parseInt(reqQuery.limit) : Config.limitMax;

  CategoryDb.find({ deleted: 1 })
    .limit(limit)
    .exec(function (err, data) {
      if (err) {
        retJson = {
          success: false,
          msg: "Error on server",
          from: 'tokenCategoryList'
        };
        return res.status(200).json(retJson);
      } else {
        retJson = {
          success: true,
          list: data,
          from: 'tokenCategoryList'
        };
        return res.status(200).json(retJson);
      }
    });
}
export const CategoryList1 = async (req, res) => {

  CategoryDb.find({ deleted: 1 })
    .limit(limit)
    .exec(function (err, data) {
      if (err) {
        retJson = {
          success: false,
          msg: "Error on server",
          from: 'tokenCategoryList'
        };
        return res.status(200).json(retJson);
      } else {
        retJson = {
          success: true,
          list: data,
          from: 'tokenCategoryList'
        };
        return res.status(200).json(retJson);
      }
    });
}



export const Home_New_CollectiblesList = async (req, res) => {
  var RetData = {};
  var ReqBody = req.body;

  let limit = ReqBody.limit ? parseInt(ReqBody.limit) : Config.limitMax;
  let page = ReqBody.page ? parseInt(ReqBody.page) : 1;
  let skip = (page - 1) * limit;

  var data = {};
  data.limit = 4;
  data.skip = skip;
  data.initial = {

  };
  data.sorts = {
    'timestamp': -1
  }
  data.tokenowners_current = {
    'tokenowners_current.balance': { '$gt': 0 },
    'tokenowners_current.deleted': { '$gt': 0 },
    // "tokenowners_current.tokenOwner": {"$eq" : ReqBody.currAddr}
  }
  data.ReqBody = ReqBody;

  RetData = await ItemDetailList(data);
  RetData.from = 'token-collectibles-list-home';
  ////////////console.log(RetData)
  return res.json(RetData);
}


/**
 * ROUTE			:	  /token/home/topCreatorsApi
 * METHOD 		:	  GET
 * C-DATE   	:   26_01_22
 * S-DATE   	:   26-01-22
*/

export const topCreatorsApi = async (req, res) => {
  UserDb.aggregate([

    {
      $lookup: {
        from: 'tokenowners',
        localField: 'curraddress',
        foreignField: 'tokenCreator',
        as: 'NFT'
      }
    },
    {$match:{
      $and:[
      {'NFT.balance':{$gt:0}},
      {'NFT.deleted':{$gt:0}}]
    }},
        
    {
      $project: {
        _id: 1,
        name: 1,
        curraddress: 1,
        image: 1,
        customurl:1,
        count: { $sum: '$NFT.balance' }
      }
    },
    { $match: { count: { $gt: 0 } } },
    {
      $sort: { count: -1 }
    },
    { $limit: 4 }
  ],
    (err, data) => {
      res.json(data)
    })

}

/**
 * ROUTE			:	  /token/create/ipfsImageHashGet
 * METHOD 		:	  POST
 * C-DATE   	:   25_01_22
 * S-DATE   	:   25-01-22
*/




const ipfsadd = async(data) =>{
  var value = await ipfs.add(data)
   .then((res) => {
     return res.cid.string;
   })
   .catch((e) => {
     return res
   })
   return value
 }

 
export const ipfsImageHashGet = async (req, res) => {
  var ReqFiles = req.files;
  //const file = { path: "BidPixels", content: Buffer.from(req.files.Image.data) }

  const file = { path: "Artalux", content: Buffer.from(req.files.Image.data) }
  if(ReqFiles.Thumb &&  ReqFiles.Thumb.data){
    var file_thumb = { path: "Artalux", content: Buffer.from(ReqFiles.Thumb.data) }}

    if(ReqFiles.Image){
      var originalFile = await ipfsadd(file)
      if(ReqFiles.Thumb &&  ReqFiles.Thumb.data) var thumbFile   = await ipfsadd(file_thumb)
    
      if(originalFile){
        var metadata  = {
          name  : req.body.name,
          image : "https://ipfs.io/ipfs/" + originalFile,
          description : req.body.desc,
        }
      }
     if(thumbFile){
        var metadata  = {
          name  : req.body.name,
          image : "https://ipfs.io/ipfs/" + thumbFile,
          animation_url : "https://ipfs.io/ipfs/" + originalFile,
          description : req.body.desc,
        }
      }
    
      if(metadata && (originalFile  ||  thumbFile)){
        const file_meta = { path: 'BidPixels', content: Buffer.from(JSON.stringify(metadata)) }
        var meta   = await ipfsadd(file_meta)
        if(meta)
          res.status(200).json({ ipfsval: meta, ipfs_img_val: originalFile, thumbFile:thumbFile, "message": "success" })
        else
          res.status(400).json({ 'message': 'fail' })
      }
      else{
        res.status(400).json({ 'message': 'fail' })
    
      }
      }



  // ipfs.add(file).then((filesAdd)=>{
  //   var ipfsimage = filesAdd.cid.string;
  //   if(ipfsimage){
  //    var newmetadata = {
  //     name: req.body.name,
  //     image: "https://ipfs.io/ipfs/"+ipfsimage,
  //     description: req.body.desc,
  //   }
  //   // const file_meta = { path:'BidPixels', content: Buffer.from(JSON.stringify(newmetadata)) }
  //   const file_meta = { path:'Artalux', content: Buffer.from(JSON.stringify(newmetadata)) }
  //   ipfs.add(file_meta)
  //   .then((filesAdd_meta)=>{
  //     var ipfsmetadata = filesAdd_meta.cid.string;
  //     res.status(200).json({ ipfsval: ipfsmetadata,ipfs_img_val:ipfsimage ,"message":"success"})
  //   })
  //   .catch((e)=>{

  //     res.status(400).json({'message':'fail'})
  //   })
  // }
  // }).catch((e)=>{
  // res.status(400).json({'message':'fail'})
  // })

}

export const reportFunc = async (req, res) => {

  var imageName = req.body.imageName;
  var imagehash = String(req.body.imagehash);
  var currAddr = req.body.currAddr;
  var imageOwner = req.body.imageOwner;
  var imageContractAddress = String(req.body.imageContractAddress).toLowerCase()
  var imageType = parseInt(req.body.imageType)
  var imageId = req.body.imageId;
  var noofitems = req.body.noofitems;
  ////////////console.log("djgfhdsgfjdgfgsdgfsdf",req.body)
  var report = req.body.report;
  var burnToken = req.body.burnToken;
  var findVa = await reports.findOne({ "currAddr": currAddr, "imageOwner": imageOwner, "imageId": imageId, "imageType": imageType })
  if (isEmpty(findVa)) {
    var took1 = new reports({
      imageName: imageName,
      imagehash: imagehash,
      currAddr: currAddr,
      imageOwner: imageOwner,
      report: report,
      imageContractAddress: imageContractAddress,
      imageType: imageType,
      imageId: imageId,
      noofitems: parseInt(noofitems),
      burnToken: burnToken,
      Links: req.body.Links,
    })
    ////////////console.log(took1)
    took1.save()
      .then((data) => {
        ////////////console.log("varuthu")
        res.json({ "success": "updated", data });
        //////////////console.log("save ah", data)
      })
      .catch((e) => {
        //////////////console.log("save ah ila", e)
        return res.status(200).json({ "success": "fail", "errors": e });
      })
  }
  else {
    ////////////console.log("varala",findVa)
    var findVa = await reports.findOneAndUpdate(
      { "currAddr": currAddr, "imageOwner": imageOwner, "imageId": imageId, "imageType": imageType },
      {
        $set: {
          "imageName": imageName,
          "imagehash": imagehash,
          "report": report,
          "imageContractAddress": imageContractAddress
          , "noofitems": findVa.noofitems,
          "burnToken": parseInt(findVa.burnToken),
          "Links": req.body.Links,
          "burnToken": req.body.burnToken
        }
      }, { new: true })
    res.json({ "success": "updated", findVa })

  }
}


export const sociallinksfunction = async (req, res) => {

  var soci = await settings.find({})
  if (soci) {
   

    var data = soci[0].social
    console.log("obtained dta",data)

    var socialObj = {};

    data.map((item)=>{
      
      var keyArr = Object.keys(item)
      var valueArr = Object.values(item)
      
      socialObj[keyArr[0]] = valueArr[0];

    })

    console.log("social object",socialObj)



    res.json({ soci: socialObj })
  }
  else {
    res.json({})
  }
}

export const faqlists = async (req, res) => {
console.log("inside faq list ");
  var soci = await FAQS.find({ deleted: 1 })
  //////////////console.log("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", soci)
  if (soci) {
    console.log("faq list ",soci);
    res.json({ soci: soci })
  }
  else {
    res.json([])
  }
}


export const null_time_auction = async (req, res) => {
  //////////////console.log("=============================================================", req.body)
  var check = await TokenDb.findOneAndUpdate({
    "tokenOwner": req.body.UserAccountAddr_byaccepter,
    "tokenCreator": req.body.UserAccountAddr_byaccepter,
    "tokenCounts": String(req.body.tokenCounts), //changed
    "clocktime": { $ne: null },
    "endclocktime": { $ne: null }
  },
    { $set: { "clocktime": null, "endclocktime": null } }, { new: true })
  ////////////console.log(check)
}


export const notifications = async (req, res) => {
  var addr = req.body.currAddr;
  var limits = req.body.limit ? req.body.limit : Config.limitMax;
  try {
    //    if(req.body.tab=="load"){
    var countsVal = await Activity.find({ "from": String(addr) }).count();
    //    }

    // if()
    //
    var test = {
      "tokenownerField.tokenOwner": addr
    }

    //////console.log("555555%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",addr)
    var checkAllVal = await Activity.aggregate([
      {
        $match: {
          "$or": [
            { "from": String(addr) },
            { "to": String(addr) }
          ]
        }
      },
      {
        $limit: limits
      },
      {
        $sort: {
          "created": -1
        }
      },
      
      {
        $lookup: {
          from: "tokens",
          localField: "tokenCounts",
          foreignField: 'tokenCounts',
          as: 'tokenField'
        }
      },
      {
        $unwind: {
          path: '$tokenField',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $lookup: {
          from: "tokenowners",
          localField: "tokenCounts",
          foreignField: 'tokenCounts',
          as: 'tokenownerField'
        }
      },
      {
        $unwind: {
          path: '$tokenownerField',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: "from",
          foreignField: 'curraddress',
          as: 'userField'
        }
      },
      {
        $unwind: {
          path: '$userField',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: "to",
          foreignField: 'curraddress',
          as: 'touserField'
        }
      },
      {
        $unwind: {
          path: '$touserField',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $match:
          test
      },
      {
        $project: {
          from: 1,
          to: 1,
          activity: 1,
          action: 1,
          status: 1,
          statusOpen: 1,
          tokenCounts: 1,
          currencySymbol: 1,
          created: 1,
          tokenField: {
            tokenName: "$tokenField.tokenName",
            tokenPrice: "$tokenField.tokenPrice",
            balance: "$tokenField.balance",
          },
          tokenownerField: {
            tokenPrice: "$tokenownerField.tokenPrice",
            balance: "$tokenownerField.balance",
          }
          ,
          userField: {
            name: "$userField.name",
            curraddress: "$userField.curraddress",
            customurl: "$userField.customurl",
            image: "$userField.image",
            _id: "$userField._id"
          },
          touserField: {
            name: "$touserField.name",
            curraddress: "$touserField.curraddress",
            customurl: "$touserField.customurl",
            image: "$touserField.image",
            _id: "$touserField._id"
          }

        }
      }

    ], (err, data) => {
      // if(err) ////////console.log(err)


    })
    // }
    //////////console.log("1111111111111111111111111111ahdjkhaskjdhjaksdhasdkjhaskdjhasjkhdjkashjdhkasjhdjashkdj_____________________",checkAllVal)

    return res.json({ data: checkAllVal, count: countsVal })
  }
  catch (e) {
    ////////////console.log("err------------------99999999999999999999999999",e)
  }
}

export const notificationStatusChange = async (req, res) => {
  ////////////console.log("notification status change=============================================================", req.body)
  var checkAll = await Activity.findOne(
    { "tokenCounts": String(req.body.tokenCounts), "from": req.body.currAddr, _id: req.body._id }) //changed
  var checkAllVal = await Activity.findOneAndUpdate(
    { "tokenCounts": String(req.body.tokenCounts), "from": req.body.currAddr, "_id": req.body._id }, //changed
    { $set: { "statusOpen": "open" } }, { new: true })
  ////////////console.log("ahdjkhaskjdhjaksdhasdkjhaskdjhasjkhdjkashjdhkasjhdjashkdj",checkAll,checkAllVal)
}

export const TokenImageCalls = async (req, res) => {
  var data = {};
  var tokenimages = await UserDb.findOne({ curraddress: req.body.currAddr })
  if (tokenimages) {
    data.image = tokenimages.image;
    data.curraddress = tokenimages.curraddress;
    data.name = tokenimages.name;
    data.customurl = tokenimages.customurl;
    data._id = tokenimages._id;
    data.activate = tokenimages.activate
  }
  res.json({ data: data })
  //////////console.log("owqpiepwqie",tokenimages)
}

export const getSearchList = async (req, res) => {
  var ReqBody = req.body;
  ////////////console.log(ReqBody);
  var RetData = {
    users: [],
    items: [],
    collections: []
  };
  var ReqBody = req.body;
  var keyword = ReqBody.keyword;

  if(keyword == "" || keyword == null){
    return res.json(RetData);
  }

  async.waterfall([
    async function (done) {
      var findData = {};
      findData.name = {
        $regex: keyword
      }
      var respData = await UserDb.aggregate([
        {
          $match: {
            "search_keyword": {
              "$regex": keyword
            }
          }
        },
        // {
        //   $lookup: {
        //     from: 'followers',
        //     localField: 'curraddress',
        //     foreignField: 'followerAddress',
        //     as: 'FollowerList'
        //   }
        // },

        // {
        //   $unwind: {
        //     path: '$FollowerList',
        //     preserveNullAndEmptyArrays: true
        //   }
        // },
        {
          $limit: ReqBody.limit
        },
        {
          $project: {
            name: 1,
            curraddress: 1,
            bio: 1,
            customurl: 1,
            _id: 1,
            image: 1,
            coverimage: 1,
            //count: { $sum: '$FollowerList.userAddress' }
          }
        }
      ])
      RetData.users = respData;
      done();
    },
    async function (done) {
      var findData = {};
      findData.tokenName = {
        $regex: keyword
      }
      let limit = ReqBody.limit ? parseInt(ReqBody.limit) : Config.limitMax;
      let page = 1;
      let skip = (page - 1) * limit;
      var data = {};
      data.sorts = {
        'timestamp': -1
      }
      data.limit = limit;
      data.skip = skip;
      data.initial = {
        "tokenName": {
          "$regex": keyword,
        }
      }
      data.tokenowners_current = {
       $and:[{'tokenowners_current.status': { '$eq': 'list' }},{'tokenowners_current.balance': { '$gt': 0 }}]
        

      }
      data.ReqBody = ReqBody;

      var respData = await ItemDetailList(data);
      respData.from = 'search-token-collectibles-list-home';
      if (respData) {
        RetData.items = respData;
      }
      done();
    },

    function (done) {
      ////////////console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",RetData)

      return res.json(RetData);
    },
  ], function (err, result) {
    // //////////console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",err)
    if (err) {
      //////////console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",err)

      return false
    };

  });
}


export const ActivityCall = async (req, res) => {
console.log("home",req.body)
var checkdata = req.body;
console.log("checkdata",req.body)
  var RetData = {};
  var reqBody = req.query;
  var data = {};
  let tabName = (reqBody.tabName && reqBody.tabName != 'All') ? reqBody.tabName : 'All';

  let limit = reqBody.limit ? parseInt(reqBody.limit) : Config.limitMax;
  let page = reqBody.page ? parseInt(reqBody.page) : 1;
  let skip = (page - 1) * limit;
  data.sorts = {
    'created': -1
  }
  data.limit = limit;
  data.skip = skip;
  
  if (tabName == "All") {
    data.initial = {};
  }
  else {
    
    data.initial = {
      "$or": [{ "from": { $eq: reqBody.currAddr } }, { "to": { $eq: reqBody.currAddr } }]
    }
    
  }
  data.ReqBody = reqBody;
  RetData = await ActivityList(data);
  RetData.from = 'activity-list-activity';
  res.json(RetData)
}

async function ActivityList(data) {

  var Query = [
    { $match: data.initial },
    {$sort:{'created': -1}},
    {$skip:data.skip},
    {$limit:data.limit},
    {
      $lookup:
      {
        from: "tokens",
        let: { tC: "$tokenCounts" },
        pipeline: [
          {
            $match:
            {
              $expr: { $eq: ["$tokenCounts", "$$tC"] }
            }
          },
        ],
        as: "tokens_current"
      }
    },
    { $unwind: {
      path:'$tokens_current',
    preserveNullAndEmptyArrays:true} },
    {
      $lookup: {
        from: 'users',
        localField: 'from',
        foreignField: 'curraddress',
        as: "fromField"
      }
    },
    { $unwind: { path: '$fromField' } },
    {
      $lookup: {
        from: 'users',
        localField: 'to',
        foreignField: 'curraddress',
        as: "to_user"
      }
    },
    { $unwind: { path: '$to_user' } },

    {
      $project: {
        _id: 0,
        tokens_current:1,
        tokenName: '$tokens_current.tokenName',
        contractAddress: '$tokens_current.contractAddress',
        type: '$tokens_current.type',
        NFT_Type: '$tokens_current.NFT_Type',
        amount: 1,
        currencySymbol: 1,
        activity: 1,
        action: 1,
        tokenCounts: 1,
        balance: 1,
        created: 1,
        fromField: {
          _id: "$fromField._id",
          image: "$fromField.image",
          name: "$fromField.name",
          curraddress: "$fromField.curraddress",
          customurl: "$fromField.customurl"
        },
        to_user: {
          _id: "$to_user._id",
          image: "$to_user.image",
          name: "$to_user.name",
          curraddress: "$to_user.curraddress",
          customurl: "$to_user.customurl"
        },
        image: '$tokens_current.image',
        additionalImage: '$tokens_current.additionalImage',
        thumb_image: '$tokens_current.thumb_image',
        thumb_additionalImage: '$tokens_current.thumb_additionalImage',
        tokenCreator  : '$tokens_current.tokenCreator',
        for           : 1
      }
    }
  ]
  try {
    var data = await Activity.aggregate(Query);
    //////////console.log("eurewtewrweyweu____________________________________",data)
    return {
      success: true,
      list: data,
    };
  }
  catch (err) {
    //////////console.log("___________________________________________________",err)
    return {
      err: err,
      success: false,
      msg: "Error on server",
    };
  }
}

export const getcmslistinhome = async (req, res) => {

  var data = await cmsnew.findOne({ "question": req.body.load })
  //////////console.log("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", data)
  if (data) {
    res.json({ data: data })
  }
  else {
    res.json({})
  }
}



export const burnToken = async (req, res) => {
  var ReqBody = req.body;
  //////////console.log("eqwewquetqwteywqetywtquetywqutewqyeytwquewq",req.body)
  if (ReqBody.status == 'click') {
    var RetData = {};
    let limit = ReqBody.limit ? parseInt(ReqBody.limit) : Config.limitMax;
    let page = ReqBody.page ? parseInt(ReqBody.page) : 1;
    let skip = (page - 1) * limit;

    var data = {};
    data.limit = limit;
    data.skip = skip;
    data.sorts = {
      'timestamp': -1
    }
    data.initial = {
      // 'burnToken': { '$ne': 0 }  ,
    };
    data.tokenowners_current = {
      $and: [{
        'tokenowners_current.burnToken': { '$ne': 0 },
      },
      { 'tokenowners_current.tokenOwner': { '$eq': String(req.body.currAddr) } }
      ]
    }
    // data.tokenowners_current['tokenowners_current.tokenOwner'] = String(req.body.currAddr);

    var list = await TokenDb.aggregate(
      [
        { $match: data.initial },

        {
          $lookup:
          {
            from: "tokenowners",
            let: { tC: "$tokenCounts" },
            pipeline: [
              {
                $match:
                {
                  $expr:
                  {
                    $and:
                      [
                        { $eq: ["$tokenCounts", "$$tC"] },

                      ]
                  }
                },
              },

            ],
            as: "tokenowners_current"
          }
        },
        {
          $unwind: {
            path: '$tokenowners_current',
            preserveNullAndEmptyArrays: true,
          }
        },
        { $match: data.tokenowners_current },
        { $sort: data.sorts },
        { $skip: data.skip },
        { $limit: data.limit },
        {
          $lookup: {
            from: "users",
            localField: "tokenCreator",
            foreignField: "curraddress",
            as: "tokencreatorinfo"
          },
        },
        {
          $unwind: {
            path: '$tokencreatorinfo',
            preserveNullAndEmptyArrays: true,
          }
        },
        {
          $lookup: {
            from: "contracts",
            localField: "contractAddress",
            foreignField: "conAddr",
            as: "usercontract"
          },
        },
        {
          $unwind: {
            path: '$usercontract',
            preserveNullAndEmptyArrays: true,
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "tokenowners_current.tokenOwner",
            foreignField: "curraddress",
            as: "tokenuser"
          },
        },
        {
          $unwind: {
            path: '$tokenuser',
            preserveNullAndEmptyArrays: true,
          }
        },


        {
          $project: {
            _id: 1,
            tokenPrice: 1,
            tokenCategory: 1,
            image: 1,
            tokenCounts: 1,
            tokenName: 1,
            tokenBid: 1,
            tokenOwner: 1,
            tokenCreator: 1,
            status: 1,
            hashValue: 1,
            type: 1,
            balance: 1,
            ipfsimage: 1, additionalImage: 1,
            tokenQuantity: 1,
            contractAddress: 1,
            minimumBid: 1,
            endclocktime: 1,
            clocktime: 1,
            likecount: 1,
            PutOnSale: 1,
            PutOnSaleType: 1,
            tokenowners_current: 1,
            CoinName: 1,
            tokenowners_current_count: 1,
            // tokenowners_current: { $arrayElemAt: ["$tokenowners_current", 0] },
            ipfsimage: 1, additionalImage: 1,
            tokenOwnerInfo: {
              _id: "$tokenuser._id",
              image: "$tokenuser.image",
              name: "$tokenuser.name",
              curraddress: "$tokenuser.curraddress",
              customurl: "$tokenuser.customurl"
            },
            tokenCreatorInfo: {
              _id: "$tokencreatorinfo._id",
              image: "$tokencreatorinfo.image",
              name: "$tokencreatorinfo.name",
              curraddress: "$tokencreatorinfo.curraddress",
              customurl: "$tokencreatorinfo.customurl"
            },
            usercontract: {
              imageUser: "$usercontract.imageUser",
              type: "$usercontract.type",
              name: "$usercontract.name",
              url: "$usercontract.url",
              conAddr: "$usercontract.conAddr"
            },

          }
        }
      ]);

    data.ReqBody = ReqBody;

    // RetData = await ItemDetailList(data);
    RetData.list = list;
    RetData.from = 'token-collectibles-list-home';
    //////////console.log("dashdgsajhasgj*********************************************************************",RetData)

    return res.json({ data: RetData });


  }
  else if (ReqBody.status == 'load') {
    var counts = await TokenOwnerDb.find({ "tokenOwner": req.body.currAddr, "burnToken": { $gt: 0 } }).count()
    if (counts) {
      return res.json({ count: counts })
    }
  }

}

export const TransferComplete = async (req, res) => {
  var Datas = {}
  var RqBody = req.body;
  var userData = await UserDb.findOne({ 'curraddress': RqBody.UserAccountAddr })
  var findData = await TokenOwnerDb.findOne({
    'tokenCounts': String(RqBody.tokenCounts), //changed
    'tokenOwner': RqBody.tokenOwner,
    'type': RqBody.tokenType,

  })

  var findDataSave = await TokenOwnerDb.findOne({
    'tokenCounts': String(RqBody.tokenCounts), //changed
    'tokenOwner': RqBody.UserAccountAddr,
    'type': RqBody.tokenType,

  })
  if (userData == null) {
    var addDates = new UserDb({
      '_id': RqBody.UserAccountAddr,
      'curraddress': RqBody.UserAccountAddr
    })
    await addDates.save()
  }
  if (findDataSave == null) {
    var addDate = new TokenOwnerDb({
      tokenCounts: String(RqBody.tokenCounts),
      tokenOwner: RqBody.UserAccountAddr,
      tokenPrice: 0,
      balance: Number(RqBody.NoOfToken),
      quantity: Number(RqBody.NoOfToken),
      contractAddress: RqBody.contractAddress,
      hashValue: RqBody.transactionHash,
      status: "transfer",
      type: RqBody.tokenType,
      tokenCreator: RqBody.tokenCreator,
      burnToken: 0,
      previousPrice: 0
    })
    await addDate.save()
      .then((data) => {
        Datas.load = "success"
        //////console.log("uewutewtwerwerweyutrewur",data)
      })

  }
  else {
    await TokenOwnerDb.findOneAndUpdate({
      'tokenCounts': String(RqBody.tokenCounts),
      'tokenOwner': RqBody.UserAccountAddr,
      'type': RqBody.tokenType,

    },
      {
        "$set": {
          'balance': Number(findDataSave.balance) + Number(RqBody.NoOfToken),
          'timestamp': new Date()
        }
      }, {
      new: true
    }
    )
      .exec((data) => {
        //////console.log("uewutewtwerwerweyutrewur",data)
      })
  }

  if (findData) {
    if (findData.tokenOwner != RqBody.UserAccountAddr) {
      if (Number(findData.balance) == Number(RqBody.NoOfToken)) {
        await TokenOwnerDb.findOneAndUpdate({
          'tokenCounts': String(RqBody.tokenCounts),
          'tokenOwner': RqBody.tokenOwner,
          'type': RqBody.tokenType
        },
          {
            "$set": {
              'balance': 0, 'timestamp': new Date()
            }
          }, {
          new: true
        }).exec((err, data) => {
          if (err) ////console.log(err)
            Datas.updatelod = "success"
          //////console.log("uewutewtwerwerweyutrewur",data)
        })

      }
      else {
        await TokenOwnerDb.findOneAndUpdate({
          'tokenCounts': String(RqBody.tokenCounts),
          'tokenOwner': RqBody.tokenOwner,
          'type': RqBody.tokenType,
        },
          {
            "$set": {
              'balance': Number(findData.balance) - Number(RqBody.NoOfToken),
              'timestamp': new Date()
            }
          }, {
          new: true
        }).exec((err, data) => {
          if (err) ////console.log(err)
            data.updatelod = "success"
          //////console.log("uewutewtwerwerweyutrewur",data)
        })
      }

    }

    else {
      await TokenOwnerDb.findOneAndUpdate({
        'tokenCounts': String(RqBody.tokenCounts),
        'tokenOwner': RqBody.UserAccountAddr,
        'type': RqBody.tokenType,
      },
        {
          "$set": {
            'balance': Number(findData.balance),
            'tokenPrice': 0,
            'timestamp': new Date()
          }
        }, {
        new: true
      }).exec((err, data) => {
        if (err) ////console.log(err)
          data.updatelod = "success"
        //////console.log("uewutewtwerwerweyutrewur",data)
      })
    }
  }

  res.json(Datas)
}



export const wenlamboConvert = async (req, res) => {

  request('https://api.pancakeswap.info/api/v2/tokens/0x8cB6Aa6e8575d87961Bd01D2ff09007c2499eC56', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //////console.log("body  fsdfsdf ",JSON.parse(body).data.price) // Print the google web page.
      var newValue = JSON.parse(body).data.price
      res.json({ value: newValue })
    }
  })

}

/**
 * ROUTE			:	  /token/add/item/validation
 * METHOD 		:	  POST
 * C-DATE   	:   25_01_22
 * S-DATE   	:   25-01-22
*/

export const AddItemValidation = async (req, res) => {
  let imageFormat = /\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP|gif|mp4)$/;
  var retJson = {};
  var reqBody = req.body;
  var errors = {};
  ////////////console.log('reqBody', reqBody);

  var data = {};
  data.tableName = TokenDb;
  data.findData = { "tokenName": reqBody.TokenName }
  data.selectData = { "tokenName": 1 };
  var resp = await MongooseHelper.findOne(data);

  if (resp.record) {
    errors.TokenName = "Name Exits";
  }
  retJson.errors = errors;
  return res.status(200).json(retJson);
}


/**
 * ROUTE			:	  /token/add/item
 * METHOD 		:	  POST
 * C-DATE   	:   25_01_22
 * S-DATE   	:   25-01-22
*/

export const AddItem = async (req, res) => {

  var ReqBody = req.body;
  console.log("add item",ReqBody)
  var ReqFiles = req.files;
  const { data, name, mimetype } = ReqFiles.Image;
  const timestamp = Date.now();
  if(mimetype.includes('video'))
    var ref = `${timestamp}.mp4`
  else if(mimetype.includes('audio'))
    var ref = `${timestamp}.mp3`
  else if(mimetype.includes('image')){
      var ref = `${timestamp}.webp`;
      var thumb_ref = `${timestamp}.webp`;
    }

  else if(mimetype.includes('application/octet-stream')){
    var fileformat = (name.split('.').pop())
    console.log("fileformat",fileformat)
    if(fileformat == "glb")
        var ref = `${timestamp}.glb`
  }
  // else
  //   var ref = `${timestamp}.webp`;

  if(ReqFiles.Thumb  &&  (ReqFiles.Thumb.mimetype).includes('image')){
    var thumb_ref = `${timestamp}.webp`;

  }
  
console.log("thumb_ref",ReqBody.thumb_ipfs,thumb_ref)
  var Name = ReqBody.Name;
  var Count = String(ReqBody.Count);
  var Description = ReqBody.Description;
  var Price = ReqBody.Price;
  var Royalities = ReqBody.Royalities;
  var Category = ReqBody.Category_label;
  var Bid = ReqBody.Bid;
  var Properties = ReqBody.Properties;
  var Owner = ReqBody.Owner;
  var Creator = ReqBody.Creator;
  var CategoryId = ReqBody.CategoryId;
  var Quantity = Number(ReqBody.Quantity);
  var Balance = Number(ReqBody.Balance);
  var ContractAddress = String(ReqBody.ContractAddress).toLowerCase();
  var Status = ReqBody.Status;
  var HashValue = ReqBody.HashValue;
  var Type = ReqBody.Type;
  var MinimumBid = ReqBody.MinimumBid;
  var EndClocktime = ReqBody.EndClocktime;
  var Clocktime = ReqBody.Clocktime;
  var UnLockcontent = ReqBody.UnLockcontent;
  var swapPrice = ReqBody.swapPrice;
  // var ImageName=ReqBody.Image
  var ImageName = ref;
  var ipfsimage = ReqBody.ipfsimage;
  var CoinName = ReqBody.CoinName;
  var symbol=ReqBody.symbol;
  TokenDb.findOne({ tokenOwner: String(Owner).toLowerCase(), contractAddress: ContractAddress, tokenCounts: Count })
 .then(async(findTokenDb)=>{

  if (findTokenDb != null) {
    console.log("fail conditin check")
    res.json({ RespType: "fail" });
  }
  else {
    var NewItem = {
      tokenCounts: Count,
      tokenName: Name,
      tokenDesc: Description,
      tokenPrice: Price,
      tokenRoyality: Royalities,
      tokenCategory: Category,
      tokenBid: Bid,
      tokenProperty: Properties,
      tokenOwner: Owner,
      tokenCreator: Creator,
      categoryid: CategoryId,
      tokenQuantity: Quantity,
      balance: Balance,
      contractAddress: ContractAddress,
      status: Status,
      hashValue: HashValue,
      type: Type,
      minimumBid: MinimumBid,
      unlockcontent: UnLockcontent,
      image: ImageName,
      ipfsimage: ipfsimage,
      thumb: thumb_ref,
      thumb_ipfs: ReqBody.thumb_ipfs,
      thumb_additionalImage : thumb_ref,
      swapPrice: swapPrice,
      burnToken: 0,
      CoinName: CoinName,
      additionalImage: ref,
      symbol:symbol
    }
    console.log("check balance inmint ",NewItem.balance);

    if (ReqBody.Clocktime) {
      NewItem.clocktime = ReqBody.Clocktime;
    }
    if (ReqBody.EndClocktime) {
      NewItem.endclocktime = ReqBody.EndClocktime;
    }

    if (typeof ReqBody.PutOnSale != 'undefined') {
      NewItem.PutOnSale = ReqBody.PutOnSale;
      if (ReqBody.PutOnSale==true||ReqBody.PutOnSale=='true') {
      NewItem.status='list'
    }
    else{
      NewItem.status='not-list'
    }
  }
    if (typeof ReqBody.PutOnSaleType != 'undefined') {
      NewItem.PutOnSaleType = ReqBody.PutOnSaleType;
    }
    var TokenNews = new TokenDb(NewItem);
    TokenNews.save()
    .then(async(TokenNew)=>{
    TokenOwnerDb.findOne({ tokenOwner: String(Owner).toLowerCase(), contractAddress: ContractAddress, tokenCounts: Count }).then(async(findTokenOwneDb)=>{
    if (findTokenOwneDb != null) {
      res.json({ RespType: "fail" });

    }
    else {
    var NewItem = {
      tokenCounts: Count,
      tokenOwner: Owner,
      tokenCreator: Creator,
      status: TokenNew.status,
      hashValue: HashValue,
      tokenPrice: TokenNew.tokenPrice,
      deleted:1,
      quantity: Quantity,
      balance: Balance,
      contractAddress: ContractAddress,
      type: Type,
      burnToken: 0,
      CoinName: CoinName,
      minimumBid: MinimumBid,
      symbol:TokenNew.symbol,
      clocktime:TokenNew.clocktime,
      endclocktime:TokenNew.endclocktime,
    }
    var sendtokenowner=new TokenOwnerDb(NewItem)
    await sendtokenowner.save()
  }
  })


    var UploadFullPath = 'public/compressedImage/' + Creator + '/' + ref;
    var UploadFullPath_thumb = 'public/Thumb_compressedImage/' + Creator + '/' + thumb_ref;
    var additionalFile = "nftImg/" + Creator + '/' + ref;
    var additionalFile_thumb = "Thumb_nftImg/" + Creator + '/' + thumb_ref;

    if (TokenNew) {
      //original imaage are save here
      await fs.mkdir('public/compressedImage/' + Creator, { recursive: true }, async function (err) {
        if (err) return;
        if (ImageName != "" && ReqFiles && ReqFiles.Image) {
          if (ImageName != "" && ReqFiles && ReqFiles.Image) {
            ReqFiles.Image.mv(UploadFullPath, function (err) {
              if (err) return;
            });
          }
          //compressed Img are saved here
          await fs.mkdir("public/nftImg/" + Creator, { recursive: true }, function (err) {
            if (err) return;
            //File compression concepts here
           if (mimetype.includes('image')) {
              sharp(data, { animated: true })
                .webp({ quality: 80 })
                .toFile("public/" + additionalFile)
                .then((data) => {
                })
                .catch(error => {
                });
            }
            // if (mimetype.includes('audio')||(mimetype.includes('video'))) {
            //   ffmpeg(UploadFullPath)
            //     .setStartTime('00:00:01')
            //     .setDuration(5)
            //     .output('public/nftImg/' + Creator + "/" + ref)
            //     .on('end', function (err) {
            //       if (!err) {
            //        }
            //     })
            //     .on('error', function (err) {
            //      }).run();
            // }
          });
        }
      });
      if(ReqFiles.Thumb){
        //original thumb
        await fs.mkdir('public/Thumb_compressedImage/' + Creator, { recursive: true }, async function (err) {
          if (err) return;
          if (ReqFiles && ReqFiles.Thumb) {
            if (ReqFiles && ReqFiles.Thumb) {
              ReqFiles.Thumb.mv(UploadFullPath_thumb, function (err) {
                if (err) return;
              });
            }
            //compressed Img are saved here
            await fs.mkdir("public/Thumb_nftImg/" + Creator, { recursive: true }, function (err) {
              if (err) return;
              //File compression concepts here
              if ((ReqFiles.Thumb.mimetype).includes('image')) {
                sharp(ReqFiles.Thumb.data, { animated: true })
                  .webp({ quality: 80 })
                  .toFile("public/" + additionalFile_thumb)
                  .then((data) => {
                  })
                  .catch(error => {
                  });
              }
            });
          }
        });
      }

      res.json({ RespType: "Token Added successfully"});
    }
    var checkLa = await ActivityHelper.save({
      createData: {
        action: 'mint',
        activity: 'minted by',
        from: Creator,
        to: Creator,
        tokenCounts: Count,
        hashValue : HashValue,
        balance:Balance
      }
    });
    })
  }
})
.catch((e)=>{
  res.json({ RespType: "fail" });
})
}

//Other Platform Functionalities

export const getNftFromMoralis = async (req, res) => {
  try {
    // const serverUrl = Config.MoralisserverUrl;
    // const appId = Config.MoralisappId;
    // Moralis.start({ serverUrl, appId });
    // NFTCollection.find({ ownerAddress: req.body.useraddress })
    // .then(async (nftexist) => {
    //   if (nftexist.length == 0 || req.body.refresh == true) {
    //     const NFTs = await Moralis.Web3API.account.getNFTs({ chain: Config.MoralisChain, address: req.body.useraddress });
    //     if (NFTs && (NFTs.result).length>0) {
    //       // console.log("NFTs Moralis>>>>>>>>..",NFTs)
    //       var NewData = {
    //         _id: String(req.body.useraddress),
    //         tokenDetails: NFTs.result,
    //         ownerAddress: req.body.useraddress
    //       }
    //       if (nftexist.length == 0) {
    //         var NewNfts = new NFTCollection(NewData);
    //         NewNfts.save();
    //       }
    //       else {
    //         await NFTCollection.update({ "ownerAddress": req.body.useraddress }, { "$set": { "tokenDetails": NFTs.result } })
    //       }
    //       if (req.body.senddata == "refresh") {
    //         res.json({ soci: NFTs })
    //       }

    //       else {
    //         res.json([])
    //       }
    //     }

    //     else {
    //       res.json([])
    //     }
    //   }
    //   else {
    //     res.json([])
    //   }
    // })
    res.json([])
  }
  catch (e) {
  }

}

export const getCollections = async (req, res) => {
  var curraddress = req.body.curraddress;
   if(req.body.senddata=='count'){
  var countData=  await NFTCollection.aggregate(
    [{$match:{"ownerAddress": curraddress}},
  {$unwind: "$tokenDetails"},
    {$match:
    {"tokenDetails.token_address":{"$nin":
    ["0x02953B010A2C203C25e11552B95F6e1efC28832C".toLowerCase(),
    "0xEd4A4Dab84272CE45C6790C49F653C1ca721bbf1".toLowerCase(),
    "0x245fB436cc3eb66762A551139713b63ee068d8E1".toLowerCase(),
    "0x1938f408543A19EF6d6d60C3b8A806eBD4E69236".toLowerCase(),
    "0xdb9faaf1d12d26fccb178a778f47c0406deec06d".toLowerCase(),
    "0xc2dde9d465e044661f865b0bcbddd11353fef0eb".toLowerCase(),
    "0x8D43916d784759B46255c0F47e3b67E1c8375e40".toLowerCase(),//live
    "0x1419c94D6560B81F16486A4c57C7c66f1253Cf20".toLowerCase(),//live
    "0x008505ac19add467B1a6177A27D8D383A078dA26".toLowerCase(),//live
    "0x1938f408543A19EF6d6d60C3b8A806eBD4E69236".toLowerCase(),//live,
  "0xc91ebaa40a95eb1ad31cecb3130db1f232c8ee09"
  ]}}},
      {
        $group:{
          _id:'$ownerAddress',
          count:{$sum:1}
        }
      }
      ])
      res.status(200).json({ data: countData })
    }
    else if(req.body.senddata=='list'){
      var List=[]
  var findVal = await NFTCollection.aggregate(
    [
    {$match:{"ownerAddress": curraddress}},
    {$unwind: "$tokenDetails"},
      {$match:
      {"tokenDetails.token_address":{"$nin":
       ["0x02953B010A2C203C25e11552B95F6e1efC28832C".toLowerCase(),
      "0xEd4A4Dab84272CE45C6790C49F653C1ca721bbf1".toLowerCase(),
      "0x245fB436cc3eb66762A551139713b63ee068d8E1".toLowerCase(),
      "0x1938f408543A19EF6d6d60C3b8A806eBD4E69236".toLowerCase(),
      "0xdb9faaf1d12d26fccb178a778f47c0406deec06d".toLowerCase(),
      "0xc2dde9d465e044661f865b0bcbddd11353fef0eb".toLowerCase(),
      "0x8D43916d784759B46255c0F47e3b67E1c8375e40".toLowerCase(),//live
      "0x1419c94D6560B81F16486A4c57C7c66f1253Cf20".toLowerCase(),//live
      "0x008505ac19add467B1a6177A27D8D383A078dA26".toLowerCase(),//live
      "0x1938f408543A19EF6d6d60C3b8A806eBD4E69236".toLowerCase(),//live,
      "0xc91ebaa40a95eb1ad31cecb3130db1f232c8ee09"
    ]

         }}
          },
        //  {$limit:6} ,
         {
           $project:{
           token_uri:'$tokenDetails.token_uri',
           amount:'$tokenDetails.amount',
           token_address:'$tokenDetails.token_address',
           token_id:"$tokenDetails.token_id",
           contract_type:"$tokenDetails.contract_type",
           ownerAddress:1,
           symbol:"$tokenDetails.symbol",
           contract_type:"$tokenDetails.contract_type"

           }
         }
    ],async(err,findVa)=>{

    var data=findVa.filter((item)=>{
      if(item.token_uri!=null){
        return item
    }})
    var newSend=await genrate_tokeUri(data)

    console.log("countdata",newSend)
    res.status(200).json({ list: newSend})

       })
      }
}
const genrate_tokeUri=async(findVal)=>{
  var findVa=findVal
      let newSend = await Promise.all(findVa.map(async (item) => {
        var data=await axios.get(item.token_uri)
        .then((data)=>{
          var pass={
            token_uri:item.token_uri,
            amount:item.amount,
            token_address:item.token_address,
            token_id:item.token_id,
            contract_type:item.contract_type,
            ownerAddress:item.ownerAddress,
            symbol:item.symbol,
            contract_type:item.contract_type,
            image:data.data.image&&data.data.image,
            name:data.data.name&&data.data.name,
            description:data.data.description&&data.data.description
          }

          return pass
          })
          .catch(async(e)=>{
           console.log("errrrrrr",e.toString())
           if(e.toString()=="Error: socket hang up"){
              // var pass={
              //   token_uri:item.token_uri,
              //   amount:item.amount,
              //   token_address:item.token_address,
              //   token_id:item.token_id,
              //   contract_type:item.contract_type,
              //   ownerAddress:item.ownerAddress,
              //   symbol:item.symbol,
              //   contract_type:item.contract_type,
              //    }
            // var pass =await genrate_tokeUri(findVa)
              return "error"
           }
          })
      return data
      }));
      return newSend;
}

export const setTokenDetails = async (req, res) => {
// console.log("amount>>>>>>>>>>>>>",req.body)
  if (req.body.curAddr == "") {
    res.json({ RespType: "success" });
  }
  else {
    try {
      var data = req.body;
      if (data) {
        var find = await TokenOwnerDb.find({
          contractAddress: String(data.contractAddress).toLowerCase(),
          tokenOwner: String(data.paramAddress).toLowerCase(),
          tokenCounts: String(data.tokenCounts)
        })
        var findIpfImfUrl = await TokenOwnerDb.findOne({
          contractAddress: String(data.contractAddress).toLowerCase(),
          tokenOwner: String(data.paramAddress).toLowerCase(),
          tokenCounts: String(data.tokenCounts)
        })


        if (find.length > 0&&findIpfImfUrl!=null) {
          var findVal = await NFTCollection.aggregate(
            [
            {$match:{"ownerAddress": data.paramAddress}},
            {$unwind: "$tokenDetails"},
              {$match:
              {"tokenDetails.token_id":String(data.tokenCounts)}
                  },

                 {
                   $project:{
                   token_uri:'$tokenDetails.token_uri',
                   amount:'$tokenDetails.amount',
                   token_address:'$tokenDetails.token_address',
                   token_id:"$tokenDetails.token_id",
                   contract_type:"$tokenDetails.contract_type",
                   ownerAddress:1,
                   symbol:"$tokenDetails.symbol",
                   contract_type:"$tokenDetails.contract_type"

                   }
                 }
            ],async(err,findVa)=>{

              var data=findVa.filter((item)=>{
                if(item.token_uri!=null){
                  return item
              }})
              var newSend=await genrate_tokeUri(data)
            if(newSend=='error'){
                       res.json({ RespType: "socket error" });
            }
            else{
               var checkimg=newSend.image?newSend.image:newSend.token_uri
               console.log("tokenuri>>>>>>>>>",checkimg)
                        if(checkimg==req.body.image){
                        //  console.log("otherNFTCollectionVa.tokenDetails[0].token_uri metaimg",newValue.image,metadata.image)
                        res.json({ RespType: "success" });
                      }
                      else{

                        var ipfsurl = "https://ipfs.io/ipfs/"
                        var metaimg = req.body.image;
                        // console.log("otherNFTCollectionVa.tokenDetails[0].token_uri metaimg",metaimg)

                        if ((metaimg.includes("https://"))||(metaimg.includes("ipfs://")) || (metaimg.includes("ipfs:/")) || (metaimg.includes("ipfs/"))) {
                          var spliturl = (((metaimg).split("ipfs://").pop()).split("ipfs/").pop()).split("ipfs:/").pop()
                          var imgurl = ipfsurl + spliturl;
                        }
                        else if(metaimg.includes("https://")==false){
                          var imgurl = ipfsurl + metaimg;
                        }
                        else {
                          var imgurl = metaimg;
                        }
                        var ref;
                        try{
                          console.log("img url>>>>>>",imgurl)
                          const type = await fetch(imgurl);
                          console.log("response",type)
                          var buffer = await type.buffer();
                       const timestamp = new Date().toISOString();
                       console.log("console.log(response.headers.get('content-type'));",type.headers.get('content-type'));
                        if (type.headers.get('content-type').split('/')[0] == 'image') {
                          ref = `${timestamp}.webp`;
                          return ref
                        }
                        else {
                          ref = `${timestamp}.mp4`;
                          return ref
                        }
                    }
                      catch(e){
                        console.log("errrr>>>>>>>>>>",e)
                      ref= 'error'
                      }
                      finally{
                      if(ref=='error'){
                        res.json({ RespType: "false" });
                      }
                      else{
                        var imgprocess = {
                          imgurl:imgurl,
                          ownerAddress: data.paramAddress,
                          imgurlType: ref,buffer:buffer
                        }
                        getImgFromURL(imgprocess)
                        console.log("wqpowpqwpopqwqowpqwpoqp>>>>>>>>",ref)
                        TokenDb.findOneAndUpdate({
                          contractAddress: String(data.contractAddress).toLowerCase(),
                          tokenCounts: String(data.tokenCounts),
                        },
                        {$set:{
                          image: ref,
                          additionalImage: ref,
                        }},{new:true})
                        .then((data)=>{
                          res.json({ RespType: "success" });
                        })
                        .catch((e)=>{
                          console.log("err",e)
                          res.json({ RespType: "false" });
                        })

                      }
                    }
                  }
                    }
                    })


                  }
        else {


          var ipfsurl = "https://ipfs.io/ipfs/"
          var metaimg = req.body.image;

          if ((metaimg.includes("https://"))||(metaimg.includes("ipfs://")) || (metaimg.includes("ipfs:/")) || (metaimg.includes("ipfs/"))) {
            var spliturl = (((metaimg).split("ipfs://").pop()).split("ipfs/").pop()).split("ipfs:/").pop()
            var imgurl = ipfsurl + spliturl;
          }
          else if(metaimg.includes("https://")==false){
            var imgurl = ipfsurl + metaimg;
          }
          else {
            var imgurl = metaimg;
          }
          var ref;
          try{
            console.log("img url>>>>>>",imgurl)
            const type = await fetch(imgurl);
            console.log("response",type)
            var buffer = await type.buffer();
         const timestamp = new Date().toISOString();
         console.log("console.log(response.headers.get('content-type'));",type.headers.get('content-type'));
          if (type.headers.get('content-type').split('/')[0] == 'image') {
            ref = `${timestamp}.webp`;
            return ref
          }
          else {
            ref = `${timestamp}.mp4`;
            return ref
          }
      }
        catch(e){
          console.log("errrr>>>>>>>>>>",e)
        ref= 'error'
        }
        finally{
            var imgprocess = {
              imgurl:imgurl,
              ownerAddress: data.paramAddress,
              imgurlType: ref
            }

            var newNft = {
              tokenCounts: String(data.tokenCounts),
              tokenName: req.body.name,
              tokenDesc:req.body.description,
              tokenRoyality: 0,
              tokenBid: true,
              tokenProperty: "",
              tokenOwner: String(data.paramAddress).toLowerCase(),
              tokenCreator: String(data.paramAddress).toLowerCase(),
              contractAddress: String(data.contractAddress).toLowerCase(),
              categoryid: "609233105cd292247cfbd3ce",
              tokenCategory: "All",
              tokenQuantity: parseInt(req.body.amount),
              balance: parseInt(req.body.amount),
              status: "true",
              image: ref,
              additionalImage: ref,
              ipfsimage:spliturl,
              symbol:req.body.symbol, //mustadd
              type: req.body.type== 'ERC721' ? 721 : 1155,
            }
            var savedata = new TokenDb(newNft);
            savedata.save()
              .then((data) => {
                var NewData = {
                  tokenCounts: String(data.tokenCounts),
                  tokenPrice: 0,
                  balance: data.balance,
                  quantity: data.balance,
                  tokenOwner: String(data.tokenOwner).toLowerCase(),
                  tokenCreator: String(data.tokenOwner).toLowerCase(),
                  contractAddress: String(data.contractAddress).toLowerCase(),
                  hashValue: "nil",
                  status: "true",
                  type: req.body.type== 'ERC721' ? 721 : 1155,
                  PutOnSale: false
                }
                var TokenOwnerNew = new TokenOwnerDb(NewData);
                TokenOwnerNew.save()
                  .then(async (data2) => {

                    var checkLa = await ActivityHelper.save({
                      createData: {
                        action: 'Approved',
                        activity: 'Approved Other platform token to This platform for',
                        from: String(data.tokenOwner).toLowerCase(),
                        to: String(data.tokenOwner).toLowerCase(),
                        tokenCounts: String(data.tokenCounts), //changed
                      }
                    });
                    getImgFromURL(imgprocess)
                    res.json({ RespType: "success" });
                  })
                  .catch((error) => {

                console.log("err >> iioii",error)
                    res.json({ RespType: "false" });
                  })
              })
              .catch((e) => {
                console.log("err >>",e)
                res.json({ RespType: "false" });
              })
            }

    }
  }
}
    catch (e) {
      console.log("Set TokenDetailCatch", e)
      res.json({ RespType: "false" });
    }
  }
}
export const getImgFromURL = async (req) => {
  console.log("img url come 1")
  var additionalFile = "public/nftImg/" + req.ownerAddress;
  var metaimg = req.imgurl;
  var buffer=req.buffer;
  var url = metaimg;
  try{
 console.log("buffer",buffer)

   fs.mkdir(additionalFile, { recursive: true }, function (err) {
    sharp(buffer, { animated: true })
      .webp({ quality: 80 })
      .toFile(additionalFile + '/' + req.imgurlType)
      .then(async (data) => {
        console.log("img url come 2")
        return true;
      })
      .catch(error => {
        let errorstr = error.toString();
        if (errorstr == "Error: Input buffer contains unsupported image format") {
          ffmpeg(url)
            .setStartTime('00:00:01')
            .setDuration(5)
            .output(additionalFile + "/" + req.imgurlType)
            .on('end', function (err) {
              return true;
            })
            .on('error', function (err) {
              return false;
            }).run();
         }
      });
  });
}
catch(e){
    return false
}
}

export const updatemeta = async (req, res) => {
  NFTCollection.aggregate([
    {
      $unwind: "$tokenDetails"
    },
    {
      $match: {
        "ownerAddress": req.body.tokenOwner, "tokenDetails.token_id": req.body.tokenCounts, "tokenDetails.owner_of": req.body.tokenOwner, "tokenDetails.token_address": req.body.contractAddress
      }
    }
  ]).then(async (resp) => {
    //console.log("resr",resp)
    if (resp.length > 0) {
      var updatebalance = Number(resp[0].tokenDetails.amount) - Number(req.body.NoOfToken)
      NFTCollection.update({ "ownerAddress": req.body.tokenOwner, "tokenDetails.token_id": req.body.tokenCounts, "tokenDetails.token_address": req.body.contractAddress }, { "$set": { "tokenDetails.$.amount": updatebalance } }).then(() => {
        res.json({ RespType: "success" });
      })
    }
    else {
      res.json({ RespType: "success" });
    }
  })
}


export const findAndUpdataBalance = async (req, res) => {
  var ReqBody = req.body;
  var tokenCounts = String(ReqBody.tokenCounts); //changed
  var currentOwner = ReqBody.currentOwner;
  var balance = Number(ReqBody.balance);
  var owner = ReqBody.owner;
  var contractAddress = ReqBody.contractAddress;
  var checkExistingbalance = await TokenOwnerDb.findOne(
    { tokenOwner: currentOwner, tokenCounts: tokenCounts, contractAddress: contractAddress },
    { _id: 0, quantity: 1, balance: 1 }
  );

  if (checkExistingbalance != null) {
    //console.log('>>>checkExistingbalance',checkExistingbalance.balance);
    if (Number(checkExistingbalance.balance) != Number(balance)) {
      var update = {}
      if (Number(checkExistingbalance.quantity) < Number(balance)) {
        update = {
          $set: {
            balance: Number(balance),
            quantity: Number(balance)
          }
        }
      }
      else {
        update = {
          $set: {
            balance: Number(balance)
          }
        }
      }
      var updatedData = await TokenOwnerDb.update({ tokenOwner: currentOwner, tokenCounts: tokenCounts }, update, { new: true });
      ////console.log('>>>>updatedData',updatedData);
    }
  }
  return res
    .status(200)
    .json({ success: true });
}



export const InfopageRedirection = async (req, res) => {
  var tokenCounts = String(req.body.tokenCounts);
  console.log("tokencounts", req.body.tokenCounts)
  TokenDb.findOne({ tokenCounts: tokenCounts }).then((data) => {
    res.json({ data: data })
  })
}


/**
 * ROUTE			:	  /tokenAddress
 * METHOD 		:	  GET
 * C-DATE   	:   25_01_22
 * S-DATE   	:   25-01-22
*/


export const tokenAddress=async(req,res)=>{
  try{
   Tokenaddress.find({},{token:1,address:1}).then((getdata)=>{
      console.log("TokenAddress",getdata)
     res.json(getdata)
    })
 }
   catch(e){
     res.json([])
   }
 }


/**
 * ROUTE			:	  /token/show/top
 * METHOD 		:	  GET
 * C-DATE   	:   26_01_22
 * S-DATE   	:   26-01-22
*/


 export const ShowTop = async (req, res) => {
	try {
		var totalSales = await Activity.find({ $or: [{ action: "purchase" }, { action: 'accept' }] }).count()
		var totalUsers = await UserDb.find({}).count()
		// var totalNft=await TokenDb.find({deleted:1,burnToken:{$gt:0}}).count()
		var totalBidings = await BiddingDb.find({ status: { $in: ['partiallyCompleted', 'pending'] } }).count()
		var totalNft = await TokenDb.aggregate(
			[{
				$lookup: {
					from: "tokenowners",
					let: { tC: "$tokenCounts", tO: "$tokenOwner" },
					pipeline: [{
						$match: {
							$expr: {
								$and: [{ $eq: ["$tokenCounts", "$$tC"] },
								{ $gt: ["$balance", 0] },
								]
							}
						},
					},],
					as: "tokenowners_current"
				}
			},
			{
				$unwind: {
					path: '$tokenowners_current',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$group: {
					'_id': null,
					'users_count': {
						'$sum': "$tokenowners_current.balance"
					}
				}
			}
			])

		res.json({ totalSales: totalSales, totalUsers: totalUsers, totalBidings: totalBidings, totalNft: totalNft })
	}
	catch (e) {
		res.json({})

	}
}


export const bpxlist=async(req,res)=>{
  const binance=new Binance({
    apiKey: 'ZMO8XGlYgeP8iBTI3ihHJfSWyvZR15ejHz0HLNMUMOQpihwgXvJZ6Z01sjeBM6gC',
    apiSecret: 'ThWVatBHD6t7HZVJxsUYrqZSdKZuxzBqAhI4j8tSVqlXX82zi4IrfL1OJVthER34',
})
console.log(await binance.dailyStats({ symbol: 'BPXWBNB' }))
}

export const marketSttus=async(req,res)=>{
  var payload =req.body.payload
  axios.post('https://api.dex.guru/v2/tokens/',payload)
  .then((data)=>{
    res.json(data.data)
  }).catch((E)=>{
   res.json([])
  })
}



export const Subscriber = async (req, res) => {
  try {
    let reqBody = req.body;
   
    let email = reqBody.email;
    console.log("datat mail ",reqBody.email)
    let findSubscriber = await subscriber.find({ email: email });
    if (findSubscriber.length == 0) {
      let addSubscriber = new subscriber({
        email: email
      });
      await addSubscriber.save().then((data) => {
        if (data) {
          return res.json({ success: true, message: 'Subscriber added' })
        }
      }).catch((error) => {
        return res.json({ success: false, message: 'Oops something went wrong' });
      })
    } else {
      return res.json({ success: true, message: 'You already subscribed' })
    }
  } catch (error) {
    return res.json({ success: false, message: 'Oops something went wrong' });
  }
}
