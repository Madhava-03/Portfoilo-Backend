const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;

// so this is the wrapper we will use around each and every async function to catch async errors instead of writing the try catch block everytime
