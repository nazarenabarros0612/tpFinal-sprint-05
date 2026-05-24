import axios from "axios";

const API_URL = "https://restcountries.com/v3.1/region/america";

const getSpanishCountries = async () => {
  const response = await axios.get(API_URL);

  const countries = response.data;

  const filteredCountries = countries
    .filter(country => country.languages?.spa)
    .map(country => {
      let giniValue = null;

      if (country.gini) {
        const giniValues = Object.values(country.gini);
        giniValue = giniValues[giniValues.length - 1];
      }

      return {
        officialName:
          country.name?.spa?.official || country.name?.official || "Sin nombre",

        capital: country.capital || ["Sin capital"],

        borders: country.borders || [],

        area: country.area || 0,

        population: country.population || 0,

        timezones: country.timezones || [],

        gini: giniValue,

        creator: "Naza Barros"
      };
    });

  return filteredCountries;
};

export default getSpanishCountries;