import { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render(
      req.originalUrl.includes("edit")
        ? "countries/edit"
        : "countries/create",
      {
        title: "Formulario",
        errors: errors.array(),
        country: req.body
      }
    );
  }

  next();
};

export default validationMiddleware;