export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Origin is required.'
        }
      }
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Destination is required.'
        }
      }
    },
    flightDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'FlightDate is required.'
        }
      }
    },
    returnDate: DataTypes.DATEONLY,
    accommodationId: {
      type: DataTypes.INTEGER
    },
    reason: {
      type: DataTypes.ENUM,
      values: ['BUSINESS', 'VACATION', 'EXPEDITION'],
      defaultValue: 'BUSINESS'
    }
  });

  Request.associate = models => {
    Request.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Request.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      onDelete: 'CASCADE',
    });
  };

  return Request;
};