const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const catchAsync = require('../../utils/catchAsync');
const { create,query } = require('../../services/user.service');


const createUser = catchAsync(async (req, res) => {
  console.log(req.body)
  const user = await create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await query(filter, options);
  res.send(result);
});


module.exports = {
  createUser,
  getUsers,
};
