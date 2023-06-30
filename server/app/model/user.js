module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4(),
      },
      username: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      salt: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );
};
