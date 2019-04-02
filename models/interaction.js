
module.exports = function (sequelize, DataTypes) {
  const Interaction = sequelize.define('Interaction', {
    rating: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'proposed'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });
  Interaction.associate = (models) => {
    Interaction.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Interaction.belongsTo(models.Dog, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Interaction;
};
