module.exports = function (sequelize, DataTypes) {
    const Message = sequelize.define('Message', {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Message.associate = (models) => {
        Message.belongsTo(models.User), {
            foreignKey: {
                allowNull: false
            }
        }
    };
    return Message;
};