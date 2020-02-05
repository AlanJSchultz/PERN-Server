module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bowler', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
        teamname: DataTypes.STRING
    });
};
