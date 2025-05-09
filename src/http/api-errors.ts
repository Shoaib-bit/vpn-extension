/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  [key: string]: any;
}

export class APIError extends Error {
  public statusCode?: number;
  public data?: any;

  constructor(message: string, statusCode?: number, data?: any) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    this.data = data;
  }

  static fromAxiosError(
    error: AxiosError<ApiErrorResponse>,
    defaultMessage: string
  ): APIError {
    const statusCode = error.response?.status;
    const message = error.response?.data?.message || defaultMessage;
    const data = error.response?.data;

    return new APIError(message, statusCode, data);
  }
}
