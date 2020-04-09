import UniformError from './UniformError';

export default class NotFoundError extends UniformError {

  /**
   * AppError default constructor
   * @param {number} [status]
   * @param {string} [message]
   */
  constructor(status, message) {
    super(status, message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
