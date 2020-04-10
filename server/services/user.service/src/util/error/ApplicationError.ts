import UniformError from './UniformError';

/**
 * @param {number} [status]
 * @param {string} [message]
 */
export default class ApplicationError extends UniformError {
  constructor(message, status?) {
    super(message, status);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
