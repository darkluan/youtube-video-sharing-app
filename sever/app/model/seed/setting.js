const Model = require("../index").settings;
const SETTINGS = [
  {
    key: 'ADMIN_ADDRESSES',
    value: '0x050E793e825F6a55452041beA1bAef95e4251099'
  },
];

module.exports = async () => {
  const models = [];

  for (let item of SETTINGS) {
    let setting = await Model.findOne({
      where: {
        key: item.key,
      }
    });

    if (!setting) {
      setting = {
        key: item.key,
        value: item.value
      };

      models.push(setting);
    }
  }

  await Model.bulkCreate(
    models,
    {
      returning: true
    });
};
