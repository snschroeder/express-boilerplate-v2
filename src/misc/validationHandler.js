// basic input validation to ensure all required inputs are received
// Inputs: req and res objects from Express and an array of all required Inputs
// Output: 400 status and message of first failing case, otherwise none

function validationHandler(req, res, requiredInput) {
  requiredInput.forEach((val) => {
    if (!req.body[val]) {
      return res.status(400).send(`${val} is required`);
    }
  })
}

module.exports = validationHandler;
