import mongoose from 'mongoose';

const MapEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: String,
  image: {
    type: String,
    trim: true,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  visitedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  apearingAt: {
    type: String,
    required: true,
  },
});

export default MapEntrySchema;
