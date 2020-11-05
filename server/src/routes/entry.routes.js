import express from 'express';
import createEntry from '../controllers/entry.controller';

const router = express.Router();

router.route('/api/entries')
  .post(createEntry);

export default router;
