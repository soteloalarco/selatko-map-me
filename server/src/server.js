/* eslint-disable no-console */
import mongoose from 'mongoose';
import path from 'path';
import express from 'express';
import app from './express';

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/selatko-map-me', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${process.env.DATABASE_URL || 'mongodb://localhost:27017/selatko-map-me'}`);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(process.env.PORT || 1337, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', process.env.PORT || 1337);
});
