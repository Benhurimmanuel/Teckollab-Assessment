const Sequelize = require('sequelize');
const sequelize = require('../DB_CONFIG/config');

// Function to generate a random 5-character alphanumeric string
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
        defaultValue: generateRandomTrackingId, // Custom default value generator
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
        defaultValue: 'Pending',
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
Transactions.beforeCreate((transaction, options) => {
    transaction.tracking_id = generateRandomTrackingId();
});

module.exports = Transactions;
