/**
 * AppError
 */
export default class UniformError extends Error {
  protected status: any;

  /**
   * AppError default constructor
   * @param {number} [status]
   * @param {string} [message]
   */
  constructor(message, status?) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Unknown Error';
    this.status = status || 500;
  }
}
