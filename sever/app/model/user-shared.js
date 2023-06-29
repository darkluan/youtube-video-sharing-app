module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user_shareds",
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
      youtube_url: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      youtube_id: {
        type: DataTypes.STRING(256),
        allowNull: true,
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
