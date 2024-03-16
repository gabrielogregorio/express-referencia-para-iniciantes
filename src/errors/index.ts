export class AppError {
  error: string;

  status: number;

  constructor(error: string, status: number) {
    this.error = error;
    this.status = status;
  }
}
