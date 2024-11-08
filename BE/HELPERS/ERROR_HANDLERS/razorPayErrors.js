class RAZOR_ERROR extends Error {
    constructor(message) {
        super(message);
        this.name = 'RAZOR_ERROR';
        this.statusCode = message.error.code;
        this.message = message.error.description;
    }
}

module.exports = { RAZOR_ERROR };
