export default class CardModelError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CardModelError';
    }
}
