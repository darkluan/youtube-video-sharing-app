const GrantType = require("./value-object/token-grant-type");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user_tokens",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      grant_type: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: GrantType.PASSWORD,
      },
      access_token: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      refresh_token_expired_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.TEXT("medium"),
        allowNull: true,
      },
      revoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
      getterMethods: {
        isExpired() {
          return this.refresh_token_expired_date <= new Date();
        },
      },
    }
  );
};
