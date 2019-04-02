
module.exports = function (sequelize, DataTypes) {
  const Location = sequelize.define('Location', {
    whatKind: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    open: {
      type: DataTypes.TIME
    },
    close: {
      type: DataTypes.TIME
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Location.associate = (models) => {
    Location.hasMany(models.Interaction, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Location;
};
