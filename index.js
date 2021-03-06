const keystone = require('keystone');

const path = require('path');
const { keys } = require('underscore');

require('dotenv').config();

keystone.init({
  name: 'Keystone CMS',
  static: [path.join(__dirname, './public')],
  'admin path': 'admin',
  'auto update': true,
  port: process.env.PORT || 3001,
  mongo: process.env.MONGO_URI,
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET,
  'cloudinary config': process.env.CLOUDINARY_URL,
});

keystone.import('./server/models');

keystone.set('routes', require('./server/routes'));

keystone.start();
