import { Response } from "express";

export interface ISuccess {
  res: Response;
  data: Record<string, any>;
  statusCode?: number;
  message?: string;
}

export interface IError {
  res: Response;
  error: unknown;
  statusCode?: number;
  message?: string;
}

/**
 * Base class for controllers.
 */
abstract class BaseController {
  /**
   * Submit a successful response.
   * @param {Response} res -The response from Express.
   * @param {number} statusCode -HTTP status code.
   * @param {Record} data -Data to send in the response.
   * @param {number} statusCode -HTTP status code.
   */
  protected sendSuccess({ res, data, statusCode = 200 }: ISuccess) {
    res.status(statusCode).json({ data });
  }

  /**
   * Handles errors and sends an error response.
   * @param {Response} res -The response from Express.
   * @param {Record} error -Custom error to send extra data.
   * @param {string} message -Custom error message.
   * @param {number} statusCode -HTTP status code.
   */
  protected handleError({ res, error, message, statusCode = 500 }: IError) {
    res.status(statusCode).json({ error, message });
  }
}

export default BaseController;
