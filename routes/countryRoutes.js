import express from "express";

import {
  about,
  createCountry,
  createForm,
  deleteCountry,
  editForm,
  exportCSV,
  getDashboard,
  home,
  importCountries,
  updateCountry
} from "../controllers/countryController.js";

import countryValidator from "../validators/countryValidator.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/", home);

router.get("/about", about);

router.get("/countries/import", importCountries);

router.get("/countries/export/csv", exportCSV);

router.get("/countries", getDashboard);

router.get("/countries/create", createForm);

router.post(
  "/countries/create",
  countryValidator,
  validationMiddleware,
  createCountry
);

router.get("/countries/edit/:id", editForm);

router.put(
  "/countries/edit/:id",
  countryValidator,
  validationMiddleware,
  updateCountry
);

router.delete("/countries/delete/:id", deleteCountry);

export default router;