/**
 * AppError
 */
export default class UniformError extends Error {
  protected status: any;

  /**
   * AppError default constructor
   * @param {string} [message]
   * @param {number} [status]
   */
  constructor(message, status?) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Unknown Error';
    this.status = status || 500;
  }
}
