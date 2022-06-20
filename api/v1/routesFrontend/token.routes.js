import express from 'express';
const router = express();

import * as TokenCtrl from '../controllersFrontend/token.controller';
import * as ActivityCtrl from '../controllersFrontend/activity.controller';
import * as CronCnt from '../controllersFrontend/cron'
router.route('/count/get').get(TokenCtrl.CountGet);
router.route('/category/list').get(TokenCtrl.CategoryList);
router.route('/category/list1').post(TokenCtrl.CategoryList1);
router.route('/add/item/validation').post(TokenCtrl.AddItemValidation);
router.route('/add/item').post(TokenCtrl.AddItem);
router.route('/like').post(TokenCtrl.Like);
router.route('/like/list').post(TokenCtrl.LikeList);
router.route('/price/change').post(TokenCtrl.TokenPriceChange);
router.route('/purchase/complete').post(TokenCtrl.PurchaseComplete);
router.route('/collectibles/list/myitems').post(TokenCtrl.MyItems_CollectiblesList);

router.route('/collectibles/list/home').post(TokenCtrl.Home_CollectiblesList);
router.route('/collectibles/list/follow').post(TokenCtrl.Follow_CollectiblesList);
router.route('/tokenCounts').post(TokenCtrl.TokenCounts);
router.route('/bid/apply').post(TokenCtrl.BidApply);
router.route('/bid/accept').post(TokenCtrl.BidAccept);
router.route('/bid/cancel').post(TokenCtrl.BidCancel);
router.route('/collectibles/list/newHome').post(TokenCtrl.Home_New_CollectiblesList);
router.route('/test/activityUpdate').post(ActivityCtrl.activityUpdate);
router.route('/home/topCreatorsApi').get(TokenCtrl.topCreatorsApi); //get user,collection,creator calclation
router.route('/create/ipfsImageHashGet').post(TokenCtrl.ipfsImageHashGet);
router.route('/report/reportFunc').post(TokenCtrl.reportFunc);
router.route('/social/sociallinksfunction').get(TokenCtrl.sociallinksfunction);
router.route('/social/faqlists').get(TokenCtrl.faqlists);
router.route('/null_time_auction').post(TokenCtrl.null_time_auction);

router.route('/notifications').post(TokenCtrl.notifications);
router.route('/notificationStatusChange').post(TokenCtrl.notificationStatusChange);

router.route('/TokenImageCalls').post(TokenCtrl.TokenImageCalls);

router.route('/timeAuctionFunction').post(TokenCtrl.timeAuctionFunction);
router.route('/getSearchList/').post(TokenCtrl.getSearchList);
router.route('/ActivityCall').get(TokenCtrl.ActivityCall);

router.route('/use/getcmslistinhome').post(TokenCtrl.getcmslistinhome);

router.route('/burns/burnToken').post(TokenCtrl.burnToken);
router.route('/tranfer/complete').post(TokenCtrl.TransferComplete);


router.route('/test/wenlamboConvert').get(TokenCtrl.wenlamboConvert);


router.route('/findAndUpdataBalance').post(TokenCtrl.findAndUpdataBalance);
router.route('/getOtherNft').post(TokenCtrl.getNftFromMoralis);
router.route('/getCollections').post(TokenCtrl.getCollections);
router.route('/getImgFromURL').post(TokenCtrl.getImgFromURL);
router.route('/settokenCounts').post(TokenCtrl.setTokenDetails);

router.route('/updateusermeta').post(TokenCtrl.updatemeta);

router.route('/InfopageRedirection').post(TokenCtrl.InfopageRedirection);
router.route('/tokenAddress').get(TokenCtrl.tokenAddress);
router.route('/show/top').get(TokenCtrl.ShowTop);

router.route('/yes/bpx-list').get(TokenCtrl.bpxlist);

router.route('/market/data').post(TokenCtrl.marketSttus)
router.route('/cron/service').get(CronCnt.cron)

//subscribe for newsletter
router.route('/subscriber').post(TokenCtrl.Subscriber);
export default router;
