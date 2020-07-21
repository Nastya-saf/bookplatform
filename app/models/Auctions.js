module.exports = function(sequelize, Sequelize) {
  /**аукционы*/
  const Auctions = sequelize.define("auctions", {
    idAuction: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bidDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
  return Auctions;
};
