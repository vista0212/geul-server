export abstract class Logger {
  /**
   * Write an 'error' level log.
   */
  abstract error(message: string, error?: Error): void;
  /**
   * Write a 'warn' level log.
   */
  abstract warn(message: string, error?: Error): void;
  /**
   * Write a 'info' level log.
   */
  abstract info(message: string, error?: Error): void;
  /**
   * Write a 'debug' level log.
   */
  abstract debug(message: string, error?: Error): void;
  /**
   * Write a 'verbose' level log.
   */
  abstract verbose(message: string, error?: Error): void;
}
