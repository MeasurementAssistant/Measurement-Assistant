class HttpError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError;
