
export default class NotFoundError extends Error {
  /**
   * NotFoundError default constructor
   * @param {string} [message]
   */
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
