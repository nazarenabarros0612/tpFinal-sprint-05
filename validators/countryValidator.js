import { body } from "express-validator";

const countryValidator = [
  body("officialName")
    .trim()
    .isLength({ min: 3, max: 90 })
    .withMessage("El nombre oficial debe tener entre 3 y 90 caracteres"),

  body("capital.*")
    .optional()
    .isLength({ min: 3, max: 90 })
    .withMessage("Cada capital debe tener entre 3 y 90 caracteres"),

  body("borders.*")
    .optional()
    .matches(/^[A-Z]{3}$/)
    .withMessage("Cada border debe tener exactamente 3 letras mayúsculas"),

  body("area")
    .isFloat({ min: 0 })
    .withMessage("El área debe ser positiva"),

  body("population")
    .isInt({ min: 0 })
    .withMessage("La población debe ser un entero positivo"),

  body("gini")
    .optional({ values: "falsy" })
    .isFloat({ min: 0, max: 100 })
    .withMessage("El gini debe estar entre 0 y 100")
];

export default countryValidator;