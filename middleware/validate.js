// Validation middleware for request body fields

// Validate required fields exist and are non-empty
const validateRequired = (fields) => {
  return (req, res, next) => {
    const errors = [];
    for (const field of fields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
        errors.push(`${field} is required`);
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  };
};

// Validate email format
const validateEmail = (req, res, next) => {
  if (req.body.email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }
  next();
};

// Validate price/stock are positive numbers
const validatePositiveNumber = (fields) => {
  return (req, res, next) => {
    const errors = [];
    for (const field of fields) {
      if (req.body[field] !== undefined && (typeof req.body[field] !== "number" || req.body[field] < 0)) {
        errors.push(`${field} must be a positive number`);
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  };
};

// Validate MongoDB ObjectId format
const mongoose = require("mongoose");
const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid ${paramName} format` });
    }
    next();
  };
};

module.exports = {
  validateRequired,
  validateEmail,
  validatePositiveNumber,
  validateObjectId,
};
