import { ApplicationError } from "./application-error";

export type ApplicationResult<T> =
  | {
      readonly success: true;
      readonly data: T;
    }
  | {
      readonly success: false;
      readonly error: ApplicationError;
    };

export function success<T>(data: T): ApplicationResult<T> {
  return {
    success: true,
    data,
  };
}

export function failure<T = never>(
  error: ApplicationError,
): ApplicationResult<T> {
  return {
    success: false,
    error,
  };
}