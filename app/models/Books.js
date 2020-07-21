module.exports = function (sequelize, Sequelize) {
  /**книги*/
  const Books = sequelize.define("books", {
    idBook: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    yearOfPublishing: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    arrivalTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    BBK: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    UDC: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ISBN: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    annotation: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    format: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberOfPages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    show: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    costOfPlace: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bought: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Books;
};
