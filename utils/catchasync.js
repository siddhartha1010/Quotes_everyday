// module.exports = (fn) => {

//     This line exports a function as a module. The function takes one parameter, fn, which is assumed to be another function.
//     return (req, res, next) => {

//     The exported function returns another function that takes three parameters: req (request), res (response), and next (middleware callback).
//     fn(req, res, next).catch(next);

//     Inside the returned function, it calls the provided fn (assumed to be an asynchronous function) with the given req, res, and next parameters.
//     If an error occurs during the execution of fn, it catches the error using .catch() and passes it to the next middleware callback.

module.exports = (fn) => {
  return (req, res, next) => {
    //!removing catch in async using this block
    fn(req, res, next).catch(next); //similar to writing catch(err=>next(err))
  };
};
