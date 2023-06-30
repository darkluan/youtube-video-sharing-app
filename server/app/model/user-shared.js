module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define(
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
      is_delete: {
        type: DataTypes.BOOLEAN,
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
  Model.associate = (models) => {
    Model.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id",
      targetKey: "id",
    });
  };
  return Model;
};
