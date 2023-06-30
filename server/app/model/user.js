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
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );
};
