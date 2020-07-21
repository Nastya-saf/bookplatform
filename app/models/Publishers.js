module.exports = function (sequelize, Sequelize) {
  /**издательства*/
  const Publishers = sequelize.define("publishers", {
    idPublisher: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(2047),
      allowNull: false,
    },
    added: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Publishers;
};
