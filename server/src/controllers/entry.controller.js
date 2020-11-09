import mongoose from 'mongoose';
import mapEntrySchema from '../models/mapEntry.model';
import errorHandler from '../helpers/dbErrorHandler';
import User from '../models/user.model';

const MapEntry = mongoose.model('MapEntry', mapEntrySchema);

const create = async (req, res) => {
  const entry = new MapEntry(req.body);
  const emailApearingAt = req.body.apearingAt;
  try {
    const user = await User.findOne({ email: `${emailApearingAt}` });
    user.mapEntries.push(entry);
    await user.save();
    return res.status(200).json({
      message: 'Pin Succesfully Added!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// eslint-disable-next-line consistent-return
const remove = async (req, res) => {
  try {
    const user = req.profile;
    await user.mapEntries.pull(req.params.entryId);
    const UserWithDeletedEntry = await user.save();
    UserWithDeletedEntry.hashed_password = undefined;
    UserWithDeletedEntry.salt = undefined;
    res.json(UserWithDeletedEntry);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create, remove,
};
