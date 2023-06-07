const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a user
 * @param {Object} userbody
 * @return {Promise<User>}
 */
const create = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const query = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};


module.exports = {
  create,
  query,
};
