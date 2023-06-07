const mongoose = require('mongoose');
const { User, Token, Wealthometer } = require('./src/api/v1/models');
const config = require('./src/config/config');

beforeAll(async () => {
  mongoose.connect(config.mongoose.url, config.mongoose.options);
  console.log('Connnect to database...');
});

afterAll(async () => {
  // await User.deleteMany();
  await Wealthometer.deleteMany();
  await Token.deleteMany();
  await mongoose.connection.close();
});
