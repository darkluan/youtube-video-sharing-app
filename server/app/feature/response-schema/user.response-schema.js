const objectMapper = require('object-mapper');

const destObject = {
  array: {
    "[].id": '[].id',
    "[].address": '[].address',
    "[].avatar": '[].avatar?',
    "[].fullname": '[].fullname?',
    "[].username": '[].username'
  },
  single: {
    "id": 'id',
    "address": 'address',
    "avatar": 'avatar?',
    "fullname": 'fullname?',
    "username": 'username?'
  }
};

module.exports = srcObject => {
  if (Array.isArray(srcObject)) {
    let result = objectMapper(srcObject, destObject.array);
    return result;
  }
  else {
    return objectMapper(srcObject, destObject.single);
  }
};