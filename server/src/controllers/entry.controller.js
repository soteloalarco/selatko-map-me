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

export default create;
