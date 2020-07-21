module.exports = function (sequelize, Sequelize) {
  /**глосарий*/
  const Glossary = sequelize.define("glossary", {
    idWord: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    word: {
      type: Sequelize.STRING(2047),
      allowNull: false,
    },
    definition: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Glossary;
};
