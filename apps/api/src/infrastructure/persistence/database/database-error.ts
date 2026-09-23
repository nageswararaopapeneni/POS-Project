export class DatabaseError extends Error {
  readonly code: string;

  constructor(message: string, code = "DATABASE_ERROR") {
    super(message);
    this.name = "DatabaseError";
    this.code = code;
  }
}