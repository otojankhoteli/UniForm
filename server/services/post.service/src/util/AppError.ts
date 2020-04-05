/**
 * AppError
 */
export default class AppError extends Error {
  private status: any;

  /**
   * AppError default constructor
   * @param {number} [status]
   * @param {string} [message]
   */
  constructor(status, message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Unknown Error';
    this.status = status || 500;
  }
}
