/* eslint-disable func-names */
import mongoose from 'mongoose';
import crypto from 'crypto';
import MapEntrySchema from './mapEntry.model';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already registered',
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
  image: {
    type: String,
    trim: true,
  },
  aboutMe: String,
  mapEntries: [MapEntrySchema],
});

/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// eslint-disable-next-line no-unused-vars
UserSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

UserSchema.methods = {
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt() {
    return `${Math.round((new Date().valueOf() * Math.random()))}`;
  },
};

export default mongoose.model('User', UserSchema);
