import Country from "../models/Country.js";
import getSpanishCountries from "../services/countryService.js";
import { Parser } from "json2csv";

export const home = (req, res) => {
  res.render("home", {
    title: "Inicio"
  });
};

export const about = (req, res) => {
  res.render("countries/about", {
    title: "Acerca de"
  });
};

export const importCountries = async (req, res) => {
  try {
    const countries = await getSpanishCountries();

    for (const country of countries) {
      await Country.findOneAndUpdate(
        {
          officialName: country.officialName
        },
        country,
        {
          upsert: true,
          new: true
        }
      );
    }

    res.redirect("/countries");
  } catch (error) {
    console.log(error);
    res.send("Error al importar países");
  }
};

export const getDashboard = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const query = {
      officialName: {
        $regex: search,
        $options: "i"
      }
    };

    const totalCountries = await Country.countDocuments(query);

    const countries = await Country.find(query)
      .sort({ officialName: 1 })
      .skip(skip)
      .limit(limit);

    const allCountries = await Country.find();

    const totalPopulation = allCountries.reduce(
      (acc, country) => acc + country.population,
      0
    );

    const totalArea = allCountries.reduce(
      (acc, country) => acc + country.area,
      0
    );

    const countriesWithGini = allCountries.filter(
      country => country.gini !== null && country.gini !== undefined
    );

    const averageGini =
      countriesWithGini.reduce((acc, country) => acc + country.gini, 0) /
      countriesWithGini.length;

    res.render("countries/dashboard", {
      title: "Dashboard",
      countries,
      currentPage: page,
      totalPages: Math.ceil(totalCountries / limit),
      search,
      totalPopulation,
      totalArea,
      averageGini,
      errors: []
    });
  } catch (error) {
    console.log(error);
    res.send("Error al obtener dashboard");
  }
};

export const createForm = (req, res) => {
  res.render("countries/create", {
    title: "Agregar país",
    errors: [],
    country: {}
  });
};

export const createCountry = async (req, res) => {
  try {
    const newCountry = new Country({
      officialName: req.body.officialName,
      capital: req.body.capital
        ? req.body.capital.split(",").map(item => item.trim())
        : [],
      borders: req.body.borders
        ? req.body.borders.split(",").map(item => item.trim())
        : [],
      area: req.body.area,
      population: req.body.population,
      timezones: req.body.timezones
        ? req.body.timezones.split(",").map(item => item.trim())
        : [],
      gini: req.body.gini || null,
      creator: "Naza Barros"
    });

    await newCountry.save();

    res.redirect("/countries");
  } catch (error) {
    console.log(error);
    res.send("Error al crear el país");
  }
};

export const editForm = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);

    res.render("countries/edit", {
      title: "Editar país",
      country,
      errors: []
    });
  } catch (error) {
    console.log(error);
    res.send("Error al cargar el formulario");
  }
};

export const updateCountry = async (req, res) => {
  try {
    await Country.findByIdAndUpdate(req.params.id, {
      officialName: req.body.officialName,
      capital: req.body.capital
        ? req.body.capital.split(",").map(item => item.trim())
        : [],
      borders: req.body.borders
        ? req.body.borders.split(",").map(item => item.trim())
        : [],
      area: req.body.area,
      population: req.body.population,
      timezones: req.body.timezones
        ? req.body.timezones.split(",").map(item => item.trim())
        : [],
      gini: req.body.gini || null,
      creator: "Naza Barros"
    });

    res.redirect("/countries");
  } catch (error) {
    console.log(error);
    res.send("Error al actualizar país");
  }
};

export const deleteCountry = async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);

    res.redirect("/countries");
  } catch (error) {
    console.log(error);
    res.send("Error al eliminar país");
  }
};

export const exportCSV = async (req, res) => {
  try {
    const countries = await Country.find().lean();

    const parser = new Parser();

    const csv = parser.parse(countries);

    res.header("Content-Type", "text/csv");
    res.attachment("countries.csv");

    return res.send(csv);
  } catch (error) {
    console.log(error);
    res.send("Error al exportando CSV");
  }
};