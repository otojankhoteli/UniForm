import UniformError from './UniformError';

export default class ApplicationError extends UniformError {
  /**
   * @param {number} [status]
   * @param {string} [message]
   */
  constructor(message, status?) {
    super(message, status);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
