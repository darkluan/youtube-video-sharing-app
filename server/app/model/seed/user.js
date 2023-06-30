const Model = require("../index").users;
const config = require("app/config");

module.exports = async () => {
  let count = await Model.count({});
  // if (count == 0) {
  //   await Model.bulkCreate(
  //     [{
  //       userName: "abc"
  //     }],
  //     {
  //       returning: true
  //     });
  // }
};
