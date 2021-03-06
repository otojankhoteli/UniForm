import UniformError from './UniformError';

export default class NotFoundError extends UniformError {
  /**
   * NotFoundError default constructor
   * @param {number} [status]
   * @param {string} [message]
   */
  constructor(message: string, status?: number) {
    super(message, status);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
