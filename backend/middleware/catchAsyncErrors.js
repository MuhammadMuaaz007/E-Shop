module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
// we are using this to catch the error in async function because if we use try catch block in every async function then it will be repetitive code so we are using this function to catch the error in async function and pass it to the error middleware
// we are using Promise.resolve to convert the function into a promise and then we are using catch to catch the error and pass it to the next middleware which is the error middleware
// this is a higher order function which takes a function as an argument and returns a function
// we are using this function in every async function in the controllers
// for example: router.get("/me", isAuthenticatedUser, catchAsyncErrors(getUserDetails));   