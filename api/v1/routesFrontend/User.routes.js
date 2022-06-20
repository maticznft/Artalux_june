import express from 'express';
const router = express();

import * as UserCtrl from '../controllersFrontend/user.controller';

router.route('/address/details/getorsave').post(UserCtrl.Details_GetOrSave);
router.route('/address/details/get').post(UserCtrl.Details_Get);
router.route('/changereceiptstatus').post(UserCtrl.ChangeReceiptStatus);
router.route('/follow/list').post(UserCtrl.FollowList);
router.route('/follow/change').post(UserCtrl.FollowChange);
router.route('/profile/update').post(UserCtrl.UserUpdate);
router.route('/editprofile').post(UserCtrl.editprofileval, UserCtrl.editprofile);
router.route('/getprofile/').post(UserCtrl.getprofile);
router.route('/getfollowers/').post(UserCtrl.getfollowers);
router.route('/followUnfollow/').post(UserCtrl.followUnfollow);
router.route('/checkFollower/').post(UserCtrl.checkFollower);

router.route('/test/coverimagevalidation').post(UserCtrl.coverimagevalidations);
router.route('/test/coverImage').post(UserCtrl.coverImage);
router.route('/test/pics1').post(UserCtrl.pics1);
router.route('/activity/:from').post(UserCtrl.Activity);
router.route('/get/Ranks').get(UserCtrl.Ranking);
router.route('/get/Activity').get(UserCtrl.ActivityPage);
router.route('/AcceptTerms').post(UserCtrl.AcceptTermsFn);
router.route('/getterms').get(UserCtrl.gettermschecked);
export default router;
