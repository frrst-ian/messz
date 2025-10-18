const { body } = require("express-validator");

const registerValidator = [
    body("name")
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 6, max: 128 })
        .withMessage("Full name must be at least 6 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .normalizeEmail()
        .withMessage("Email must be valid")
        .isLength({ max: 50 })
        .withMessage("Email must not exceed 50 characters"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 128 })
        .withMessage("Password must be at least 6 characters"),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Please confirm your password")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
];

const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .normalizeEmail()
        .withMessage("Must be a valid email")
        .isLength({ max: 50 })
        .withMessage("Email must be under 50 characters"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 1, max: 128 })
        .withMessage("Password must be under 128 characters"),
];

module.exports = {
    registerValidator,
    loginValidator,
};
