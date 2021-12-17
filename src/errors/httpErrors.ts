class HttpError extends Error {
  public statusCode: number;

  constructor(msg: string, statusCode = 500) {
    super(msg);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError;
