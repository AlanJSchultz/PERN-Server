module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bowlinglog', {
        owner: DataTypes.INTEGER,
        ballweight: DataTypes.INTEGER,
        ballbrand: DataTypes.STRING,
        ballmodel: DataTypes.STRING,
        bowlingcenter: DataTypes.STRING,
        bowlinglanes: DataTypes.STRING,
        laneconditions: DataTypes.STRING,
        approachconditions: DataTypes.STRING,
        gamesbowled: DataTypes.STRING,
        comments: DataTypes.STRING,
        date: DataTypes.STRING
    });
};
