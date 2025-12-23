class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // calling parent class constructor
    this.statusCode = statusCode; // adding a new property to the class

    Error.captureStackTrace(this, this.constructor); // static function of the error class  that's why we write the Error.captureStackTrace because simple object of the class does not access the static function of the class i mean we cannot do this.captureStackTrace or object.captureStackTrace
  }
}
module.exports = ErrorHandler;
