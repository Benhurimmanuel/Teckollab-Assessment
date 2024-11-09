const Sequelize = require('sequelize');
const sequelize = require('../DB_CONFIG/config');

const generateRandomTrackingId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
};

const Transactions = sequelize.define('Transactions', {
    tracking_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        // Removed defaultValue here to avoid SQL Server error, because of alter
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    customer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    payment_mode: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        // Removed defaultValue here to avoid SQL Server error
        validate: {
            isIn: [['Completed', 'Pending', 'Canceled']],
        },
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

// Hook to set default values before creating a new record
Transactions.beforeCreate((transaction, options) => {
    if (!transaction.tracking_id) {
        transaction.tracking_id = generateRandomTrackingId();
    }
    if (!transaction.status) {
        transaction.status = 'Pending'; // Set default 'Pending' if not provided
    }
});

module.exports = Transactions;
