class BackendError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'BackendError';
    }
}

module.exports = BackendError;
