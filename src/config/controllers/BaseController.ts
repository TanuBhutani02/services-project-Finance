import { Request, Response } from "express";
import { createResponse } from "../../utils/responseHandler";
import { IBaseController } from "./IBaseController";

/**
 * Abstract base controller class that implements the IBaseController interface.
 * Provides common methods for handling success and error responses.
 */
export abstract class BaseController implements IBaseController {
  // Abstract methods to be implemented by derived classes
  abstract get(req: Request, res: Response): void;
  abstract getAll(req: Request, res: Response): void;
  abstract update(req: Request, res: Response): void;
  abstract remove(req: Request, res: Response): void;
  abstract create(req: Request, res: Response): void;

  /**
   * Handles successful responses.
   * @param res - The response object.
   * @param data - The data to be sent in the response.
   */
  protected handleSuccess(res: Response, data?: any) {
    res.status(200).json(createResponse(data, 200));
  }

  /**
   * Handles error responses.
   * @param res - The response object.
   * @param error - The error to be handled.
   */
  protected handleError(res: Response, error: any) {
    // Log the error for debugging purposes
    console.error('Error:', error);

    if (error instanceof Error) {
      // Handle specific error types if needed
      switch (true) {
        case error.message.includes('not found'):
          res.status(404).json({ error: error.message });
          break;
        case error.message.includes('forbidden'):
          res.status(403).json({ error: error.message });
          break;
        case error.message.includes('unauthorized'):
          res.status(401).json({ error: error.message });
          break;
        case error.message.includes('bad request'):
          res.status(400).json({ error: error.message });
          break;
        default:
          res.status(400).json({ error: error.message });
          break;
      }
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}