import { Response } from "express";
export function handleError(res: Response, error: any) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
