/**
 * Middleware for validating request data.
 * @param {Object} schema - Simple object representing expected fields and types.
 */
const validateRequest = (schema) => {
    return (req, res, next) => {
        const errors = [];
        const body = req.body;

        for (const field in schema) {
            if (schema[field].required && (body[field] === undefined || body[field] === null)) {
                errors.push(`${field} is required`);
            } else if (body[field] && typeof body[field] !== schema[field].type) {
                errors.push(`${field} must be of type ${schema[field].type}`);
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next();
    };
};

module.exports = validateRequest;
