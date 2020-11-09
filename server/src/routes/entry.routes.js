import express from 'express';
import entryCtrl from '../controllers/entry.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/entries')
  .post(entryCtrl.create);

router.route('/api/entries/:userId/:entryId')
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, entryCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;
