module.exports = function (sequelize, Sequelize) {
  /**лоты*/
  const Lots = sequelize.define("lots", {
    idLot: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    numberOfBets: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    minRate: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    currentPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    finished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    winner: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });
  return Lots;
};
