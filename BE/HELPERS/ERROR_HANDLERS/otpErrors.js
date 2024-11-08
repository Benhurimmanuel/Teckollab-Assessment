class OTP_ERROR extends Error {
    constructor(message) {
        super(message);
        this.name = 'OTP_ERROR';
        this.statusCode = 401;
        switch (message) {
            case 'otp sending error': {
                this.message = 'Looks Like we are not able to send you the otp, please check your number and retry';
                break;
            }
            case 'otp verification Error': {
                this.name = 'OTP_ERROR';
                this.statusCode = 401;
                this.message = "Looks Like we couldn't verify your OTP, Please try again";
                break;
            }
            default: {
                this.name = 'OTP_ERROR';
                this.statusCode = 401;
                this.message = 'Something Went Wrong,Please try again';
            }
        }
    }
}

module.exports = { OTP_ERROR };
