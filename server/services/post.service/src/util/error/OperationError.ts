
export default class OperationError extends Error {
  /**
   * OperationError default constructor
   * @param {string} [message]
   */
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
