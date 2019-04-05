
module.exports = function (sequelize, DataTypes) {
  const Interaction = sequelize.define('Interaction', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
    invitedDog: {
      type: DataTypes.INTEGER
    },
    invitedOwner: {
      type: DataTypes.INTEGER,
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
